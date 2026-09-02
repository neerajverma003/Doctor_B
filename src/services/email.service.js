import nodemailer from 'nodemailer';
import Doctor from '../models/doctor.model.js';
import {
  renderPatientAppointmentEmail,
  renderAdminAppointmentAlert,
  renderPatientContactEmail,
  renderAdminContactAlert,
  renderPasswordResetEmail,
  renderPasswordResetOtpEmail,
} from '../templates/emailTemplates.js';

let transporter = null;

/**
 * Initialize or retrieve the reusable Nodemailer transporter.
 */
function getTransporter() {
  if (transporter) return transporter;

  const smtpUser = process.env.SMTP_EMAIL || process.env.EMAIL_USER;
  const smtpPass = (process.env.SMTP_PASSWORD || process.env.EMAIL_PASS || '').replace(/\s+/g, '');

  if (!smtpUser || !smtpPass) {
    console.warn(' [Email Service] SMTP_EMAIL or SMTP_PASSWORD is not configured in environment variables.');
    return null;
  }

  // Direct Gmail SSL configuration (reliable on port 465)
  transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  return transporter;
}

/**
 * Helper to fetch live doctor details from the database
 */
async function getDoctorDetails() {
  try {
    const doc = await Doctor.findOne().lean();
    return doc || {};
  } catch (err) {
    return {};
  }
}

/**
 * Send dual notification for Appointment Requests
 * 1. Confirmation to Patient
 * 2. Alert to Admin
 */
export async function sendAppointmentNotification({ name, email, phone, preferredDate, message, id }) {
  try {
    const mailer = getTransporter();
    const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_EMAIL;
    const smtpEmail = process.env.SMTP_EMAIL;

    if (!mailer || !smtpEmail) {
      console.warn(' [Email Service] SMTP configuration missing. Skipping email dispatch.');
      return { success: false, reason: 'SMTP not configured' };
    }

    const doctor = await getDoctorDetails();
    const sender = `"${doctor.name || 'Medical Clinic'}" <${smtpEmail}>`;

    // 1. Patient Confirmation Email
    const patientMailOptions = {
      from: sender,
      to: email,
      subject: `Appointment Request Received - ${doctor.name || 'Medical Clinic'}`,
      html: renderPatientAppointmentEmail({ name, preferredDate, phone, message, doctor }),
    };

    // 2. Admin Alert Email (sent if adminEmail is configured)
    const emailPromises = [mailer.sendMail(patientMailOptions)];

    if (adminEmail) {
      const adminMailOptions = {
        from: sender,
        to: adminEmail,
        replyTo: email,
        subject: `📅 New Appointment Request: ${name}`,
        html: renderAdminAppointmentAlert({ name, email, phone, preferredDate, message, appointmentId: id }),
      };
      emailPromises.push(mailer.sendMail(adminMailOptions));
    }

    const results = await Promise.allSettled(emailPromises);
    const patientSent = results[0]?.status === 'fulfilled';
    const adminSent = results[1] ? results[1].status === 'fulfilled' : false;

    if (patientSent) {
      console.log(` [Email Service] Patient confirmation sent to: ${email}`);
    } else {
      console.error(` [Email Service] Failed to send patient email:`, results[0]?.reason?.message);
    }

    if (adminEmail && adminSent) {
      console.log(` [Email Service] Admin notification sent to: ${adminEmail}`);
    } else if (adminEmail) {
      console.error(` [Email Service] Failed to send admin email:`, results[1]?.reason?.message);
    }

    return { success: true, patientSent, adminSent };
  } catch (error) {
    console.error(' [Email Service Error]:', error.message || error);
    return { success: false, error: error.message };
  }
}

/**
 * Send dual notification for General Contact Inquiries
 * 1. Confirmation to Patient
 * 2. Alert to Admin
 */
export async function sendContactNotification({ name, email, phone, message, id }) {
  try {
    const mailer = getTransporter();
    const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_EMAIL;
    const smtpEmail = process.env.SMTP_EMAIL;

    if (!mailer || !smtpEmail) {
      console.warn(' [Email Service] SMTP configuration missing. Skipping email dispatch.');
      return { success: false, reason: 'SMTP not configured' };
    }

    const doctor = await getDoctorDetails();
    const sender = `"${doctor.name || 'Medical Clinic'}" <${smtpEmail}>`;

    // 1. Patient Confirmation Email
    const patientMailOptions = {
      from: sender,
      to: email,
      subject: `Thank You For Contacting Us - ${doctor.name || 'Medical Clinic'}`,
      html: renderPatientContactEmail({ name, phone, message, doctor }),
    };

    // 2. Admin Alert Email (sent if adminEmail is configured)
    const emailPromises = [mailer.sendMail(patientMailOptions)];

    if (adminEmail) {
      const adminMailOptions = {
        from: sender,
        to: adminEmail,
        replyTo: email,
        subject: `✉️ New Contact Inquiry: ${name}`,
        html: renderAdminContactAlert({ name, email, phone, message, contactId: id }),
      };
      emailPromises.push(mailer.sendMail(adminMailOptions));
    }

    const results = await Promise.allSettled(emailPromises);
    const patientSent = results[0]?.status === 'fulfilled';
    const adminSent = results[1] ? results[1].status === 'fulfilled' : false;

    if (patientSent) {
      console.log(` [Email Service] Patient inquiry confirmation sent to: ${email}`);
    } else {
      console.error(` [Email Service] Failed to send patient inquiry email:`, results[0]?.reason?.message);
    }

    if (adminEmail && adminSent) {
      console.log(` [Email Service] Admin notification sent to: ${adminEmail}`);
    } else if (adminEmail) {
      console.error(` [Email Service] Failed to send admin inquiry alert:`, results[1]?.reason?.message);
    }

    return { success: true, patientSent, adminSent };
  } catch (error) {
    console.error(' [Email Service Error]:', error.message || error);
    return { success: false, error: error.message };
  }
}

/**
 * Send Password Reset Email with one-time verification link
 */
export async function sendPasswordResetNotification({ email, name, resetUrl }) {
  try {
    const mailer = getTransporter();
    const smtpEmail = process.env.SMTP_EMAIL;

    if (!mailer || !smtpEmail) {
      console.warn(' [Email Service] SMTP configuration missing. Cannot send password reset email.');
      return { success: false, reason: 'SMTP not configured' };
    }

    const doctor = await getDoctorDetails();
    const sender = `"${doctor.name || 'Admin Security'}" <${smtpEmail}>`;

    const plainText = `Hello ${name || 'Administrator'},

We received a request to reset your admin password for ${email}.

Please click the link below to set a new password:
${resetUrl}

Note: This link will expire in 30 minutes. If you did not request a password reset, please disregard this email.

Regards,
Admin Security`;

    const mailOptions = {
      from: sender,
      to: email,
      subject: 'Reset Your Admin Password',
      text: plainText,
      html: renderPasswordResetEmail({ name, email, resetUrl }),
    };

    const info = await mailer.sendMail(mailOptions);
    console.log(` [Email Service] Password reset email sent to: ${email} (${info.messageId})`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error(' [Email Service Error] Failed to send password reset email:', error.message || error);
    return { success: false, error: error.message };
  }
}

/**
 * Send Password Reset 6-Digit OTP Email
 */
export async function sendPasswordResetOtpNotification({ email, name, otp }) {
  try {
    const mailer = getTransporter();
    const smtpEmail = process.env.SMTP_EMAIL;

    if (!mailer || !smtpEmail) {
      console.warn(' [Email Service] SMTP configuration missing. Cannot send OTP email.');
      return { success: false, reason: 'SMTP not configured' };
    }

    const doctor = await getDoctorDetails();
    const sender = `"${doctor.name || 'Admin Security'}" <${smtpEmail}>`;

    const plainText = `Hello ${name || 'Administrator'},

We received a request to reset your admin password for ${email}.

Your 6-digit verification code (OTP) is:
${otp}

Note: This code is valid for 10 minutes. Do not share this OTP with anyone.

If you did not request a password reset, please ignore this email.

Regards,
Admin Security`;

    const mailOptions = {
      from: sender,
      to: email,
      subject: `Your Password Reset OTP: ${otp}`,
      text: plainText,
      html: renderPasswordResetOtpEmail({ name, email, otp }),
    };

    const info = await mailer.sendMail(mailOptions);
    console.log(` [Email Service] Password reset OTP email sent to: ${email} (${info.messageId})`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error(' [Email Service Error] Failed to send OTP email:', error.message || error);
    return { success: false, error: error.message };
  }
}
