// Responsive HTML Email Templates (100% Dynamic - No Hardcoded Values)

/**
 * 1. Patient Appointment Confirmation Email
 */
export function renderPatientAppointmentEmail({ name, preferredDate, phone, message, doctor = {} }) {
  const doctorName = doctor?.name || 'Your Doctor';
  const doctorTitle = doctor?.title || doctor?.specialty || 'Specialist';
  const clinicPhone = doctor?.phone || '';
  const clinicEmail = doctor?.email || '';
  const clinicAddress = doctor?.address || '';

  const formattedDate = preferredDate
    ? new Date(preferredDate).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Flexible / Next Available Slot';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Appointment Request Received</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f8fc; font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif; color: #0f1d2e;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f4f8fc; padding: 30px 15px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 580px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(26, 107, 189, 0.08); border: 1px solid #d5e6f5;" cellspacing="0" cellpadding="0">
          
          <!-- Header Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #1a6bbd 0%, #0ea5a0 100%); padding: 32px 30px; text-align: center;">
              <div style="font-size: 24px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px;">
                ${doctorName}
              </div>
              <div style="font-size: 13px; color: #e0f2fe; text-transform: uppercase; letter-spacing: 1.5px; margin-top: 4px; font-weight: 600;">
                ${doctorTitle}
              </div>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 36px 32px 28px 32px;">
              <h1 style="font-size: 20px; font-weight: 700; color: #0f1d2e; margin: 0 0 12px 0;">
                Appointment Request Received
              </h1>
              <p style="font-size: 15px; line-height: 1.6; color: #475569; margin: 0 0 24px 0;">
                Dear <strong>${name}</strong>,<br><br>
                Thank you for scheduling your consultation with <strong>${doctorName}</strong>. We have successfully received your request. Our clinical coordination team is reviewing your preferred schedule and will contact you within <strong>24 hours</strong> to confirm your exact appointment slot.
              </p>

              <!-- Request Summary Box -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8fbff; border: 1px solid #d5e6f5; border-radius: 12px; margin-bottom: 24px; overflow: hidden;">
                <tr>
                  <td colspan="2" style="background-color: #eef5fc; padding: 12px 18px; font-size: 13px; font-weight: 700; color: #1a6bbd; text-transform: uppercase; letter-spacing: 0.5px;">
                    Summary of Your Request
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 18px; font-size: 14px; color: #64748b; width: 38%; border-bottom: 1px solid #eef5fc;">Patient Name:</td>
                  <td style="padding: 12px 18px; font-size: 14px; font-weight: 600; color: #0f1d2e; border-bottom: 1px solid #eef5fc;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 18px; font-size: 14px; color: #64748b; border-bottom: 1px solid #eef5fc;">Preferred Date:</td>
                  <td style="padding: 12px 18px; font-size: 14px; font-weight: 600; color: #0ea5a0; border-bottom: 1px solid #eef5fc;">${formattedDate}</td>
                </tr>
                ${phone ? `
                <tr>
                  <td style="padding: 12px 18px; font-size: 14px; color: #64748b; border-bottom: 1px solid #eef5fc;">Contact Phone:</td>
                  <td style="padding: 12px 18px; font-size: 14px; font-weight: 600; color: #0f1d2e; border-bottom: 1px solid #eef5fc;">${phone}</td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 12px 18px; font-size: 14px; color: #64748b; vertical-align: top;">Notes / Reason:</td>
                  <td style="padding: 12px 18px; font-size: 14px; color: #334155; line-height: 1.5;">${message || 'Consultation request'}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 18px; font-size: 14px; color: #64748b; border-top: 1px solid #eef5fc;">Current Status:</td>
                  <td style="padding: 12px 18px; font-size: 13px; border-top: 1px solid #eef5fc;">
                    <span style="background-color: #fef9c3; color: #854d0e; font-weight: 700; padding: 4px 10px; border-radius: 9999px; display: inline-block;">
                      ● Under Review
                    </span>
                  </td>
                </tr>
              </table>

              <!-- What Happens Next -->
              <div style="background-color: #ecfdf5; border-left: 4px solid #10b981; border-radius: 8px; padding: 14px 18px; margin-bottom: 24px;">
                <div style="font-size: 14px; font-weight: 700; color: #065f46; margin-bottom: 4px;">
                  What Happens Next?
                </div>
                <div style="font-size: 13px; color: #047857; line-height: 1.5;">
                  Our clinic coordinator will call or email you to confirm the exact consultation time and provide instructions for your appointment.
                </div>
              </div>

              ${(clinicPhone || clinicEmail) ? `
              <p style="font-size: 13px; color: #64748b; line-height: 1.5; margin: 0 0 20px 0;">
                Need urgent assistance or want to reschedule? Contact our clinic directly at:
                ${clinicPhone ? `<a href="tel:${clinicPhone}" style="color: #1a6bbd; font-weight: 600; text-decoration: none;">${clinicPhone}</a>` : ''}
                ${clinicPhone && clinicEmail ? ' · ' : ''}
                ${clinicEmail ? `<a href="mailto:${clinicEmail}" style="color: #1a6bbd; font-weight: 600; text-decoration: none;">${clinicEmail}</a>` : ''}
              </p>
              ` : ''}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fbff; border-top: 1px solid #d5e6f5; padding: 22px 30px; text-align: center;">
              <div style="font-size: 13px; font-weight: 600; color: #0f1d2e;">
                ${doctorName}
              </div>
              ${clinicAddress ? `
              <div style="font-size: 12px; color: #64748b; margin: 4px 0;">
                ${clinicAddress}
              </div>
              ` : ''}
              <div style="font-size: 11px; color: #94a3b8; margin-top: 10px;">
                This is an automated confirmation message. In case of acute medical emergencies, please dial your local emergency services immediately.
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * 2. Admin Appointment Alert Email
 */
export function renderAdminAppointmentAlert({ name, email, phone, preferredDate, message, appointmentId, adminUrl = 'http://localhost:5173/admin' }) {
  const formattedDate = preferredDate
    ? new Date(preferredDate).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Flexible / Next Available Slot';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Appointment Request</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f8fc; font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif; color: #0f1d2e;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f4f8fc; padding: 30px 15px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 580px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(26, 107, 189, 0.08); border: 1px solid #d5e6f5;" cellspacing="0" cellpadding="0">
          
          <!-- Header Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #1a6bbd 0%, #2563eb 100%); padding: 28px 30px; text-align: left;">
              <div style="display: inline-block; background-color: rgba(255, 255, 255, 0.2); color: #ffffff; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; padding: 4px 10px; border-radius: 6px; margin-bottom: 8px;">
                Admin Notification
              </div>
              <div style="font-size: 22px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px;">
                📅 New Appointment Booking Request
              </div>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 32px 30px;">
              <p style="font-size: 15px; color: #334155; margin: 0 0 20px 0; line-height: 1.5;">
                A new appointment booking request was submitted via the clinic website portal. Patient details:
              </p>

              <!-- Patient Details Table -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8fbff; border: 1px solid #d5e6f5; border-radius: 12px; margin-bottom: 24px; overflow: hidden;">
                <tr>
                  <td style="padding: 12px 16px; font-size: 13px; color: #64748b; width: 35%; border-bottom: 1px solid #eef5fc;">Patient Name:</td>
                  <td style="padding: 12px 16px; font-size: 15px; font-weight: 700; color: #0f1d2e; border-bottom: 1px solid #eef5fc;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; font-size: 13px; color: #64748b; border-bottom: 1px solid #eef5fc;">Email Address:</td>
                  <td style="padding: 12px 16px; font-size: 14px; font-weight: 600; color: #1a6bbd; border-bottom: 1px solid #eef5fc;">
                    <a href="mailto:${email}" style="color: #1a6bbd; text-decoration: none;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; font-size: 13px; color: #64748b; border-bottom: 1px solid #eef5fc;">Phone Number:</td>
                  <td style="padding: 12px 16px; font-size: 14px; font-weight: 600; color: #0f1d2e; border-bottom: 1px solid #eef5fc;">
                    ${phone ? `<a href="tel:${phone}" style="color: #0f1d2e; text-decoration: none;">${phone}</a>` : '<span style="color: #94a3b8;">Not provided</span>'}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; font-size: 13px; color: #64748b; border-bottom: 1px solid #eef5fc;">Requested Date:</td>
                  <td style="padding: 12px 16px; font-size: 14px; font-weight: 700; color: #0ea5a0; border-bottom: 1px solid #eef5fc;">
                    ${formattedDate}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; font-size: 13px; color: #64748b; vertical-align: top;">Symptoms / Notes:</td>
                  <td style="padding: 12px 16px; font-size: 14px; color: #334155; line-height: 1.5;">
                    ${message}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; font-size: 13px; color: #64748b; border-top: 1px solid #eef5fc;">Received:</td>
                  <td style="padding: 12px 16px; font-size: 13px; color: #64748b; border-top: 1px solid #eef5fc;">
                    ${new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}
                  </td>
                </tr>
              </table>

              <!-- Call to Action Button -->
              <div style="text-align: center; margin-top: 28px; margin-bottom: 12px;">
                <a href="${adminUrl}" style="display: inline-block; background: linear-gradient(135deg, #1a6bbd 0%, #0ea5a0 100%); color: #ffffff; font-size: 14px; font-weight: 700; text-decoration: none; padding: 13px 28px; border-radius: 10px; box-shadow: 0 6px 18px rgba(26, 107, 189, 0.25);">
                  Open in Admin Console →
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fbff; border-top: 1px solid #d5e6f5; padding: 16px 30px; text-align: center; font-size: 12px; color: #64748b;">
              Direct reply-to is configured for ${email}. You can hit Reply in your email client to email the patient.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * 3. Patient Contact Inquiry Confirmation Email
 */
export function renderPatientContactEmail({ name, phone, message, doctor = {} }) {
  const doctorName = doctor?.name || 'Doctor';
  const clinicPhone = doctor?.phone || '';
  const clinicEmail = doctor?.email || '';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You For Reaching Out</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f8fc; font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif; color: #0f1d2e;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f4f8fc; padding: 30px 15px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 580px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(26, 107, 189, 0.08); border: 1px solid #d5e6f5;" cellspacing="0" cellpadding="0">
          
          <!-- Header Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #1a6bbd 0%, #0ea5a0 100%); padding: 32px 30px; text-align: center;">
              <div style="font-size: 24px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px;">
                ${doctorName}
              </div>
              <div style="font-size: 13px; color: #e0f2fe; text-transform: uppercase; letter-spacing: 1.5px; margin-top: 4px; font-weight: 600;">
                Patient Care & Inquiries
              </div>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 36px 32px 28px 32px;">
              <h1 style="font-size: 20px; font-weight: 700; color: #0f1d2e; margin: 0 0 12px 0;">
                Thank You For Contacting Us
              </h1>
              <p style="font-size: 15px; line-height: 1.6; color: #475569; margin: 0 0 20px 0;">
                Dear <strong>${name}</strong>,<br><br>
                We have received your message. Our administration team will review your inquiry and get back to you shortly (typically within <strong>24 business hours</strong>).
              </p>

              <!-- Message Copy -->
              <div style="background-color: #f8fbff; border: 1px solid #d5e6f5; border-radius: 12px; padding: 18px; margin-bottom: 24px;">
                <div style="font-size: 12px; font-weight: 700; color: #1a6bbd; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">
                  Copy of Your Submitted Message:
                </div>
                <div style="font-size: 14px; color: #334155; line-height: 1.6; white-space: pre-wrap; font-style: italic;">
                  "${message}"
                </div>
              </div>

              ${(clinicPhone || clinicEmail) ? `
              <p style="font-size: 13px; color: #64748b; line-height: 1.5; margin: 0 0 10px 0;">
                If your inquiry is time-sensitive, feel free to contact our desk directly:
                ${clinicPhone ? `<a href="tel:${clinicPhone}" style="color: #1a6bbd; font-weight: 600; text-decoration: none;">${clinicPhone}</a>` : ''}
                ${clinicPhone && clinicEmail ? ' · ' : ''}
                ${clinicEmail ? `<a href="mailto:${clinicEmail}" style="color: #1a6bbd; font-weight: 600; text-decoration: none;">${clinicEmail}</a>` : ''}
              </p>
              ` : ''}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fbff; border-top: 1px solid #d5e6f5; padding: 22px 30px; text-align: center;">
              <div style="font-size: 13px; font-weight: 600; color: #0f1d2e;">
                ${doctorName}
              </div>
              ${doctor?.address ? `
              <div style="font-size: 12px; color: #64748b; margin: 4px 0;">
                ${doctor.address}
              </div>
              ` : ''}
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * 4. Admin Contact Alert Email
 */
export function renderAdminContactAlert({ name, email, phone, message, adminUrl = 'http://localhost:5173/admin' }) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Message</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f8fc; font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif; color: #0f1d2e;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f4f8fc; padding: 30px 15px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 580px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(26, 107, 189, 0.08); border: 1px solid #d5e6f5;" cellspacing="0" cellpadding="0">
          
          <!-- Header Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #0ea5a0 0%, #1a6bbd 100%); padding: 28px 30px; text-align: left;">
              <div style="display: inline-block; background-color: rgba(255, 255, 255, 0.2); color: #ffffff; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; padding: 4px 10px; border-radius: 6px; margin-bottom: 8px;">
                Admin Notification
              </div>
              <div style="font-size: 22px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px;">
                ✉️ New Patient Contact Inquiry
              </div>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 32px 30px;">
              <p style="font-size: 15px; color: #334155; margin: 0 0 20px 0; line-height: 1.5;">
                A visitor submitted a general inquiry via the Contact form:
              </p>

              <!-- Patient Details Table -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8fbff; border: 1px solid #d5e6f5; border-radius: 12px; margin-bottom: 24px; overflow: hidden;">
                <tr>
                  <td style="padding: 12px 16px; font-size: 13px; color: #64748b; width: 35%; border-bottom: 1px solid #eef5fc;">Name:</td>
                  <td style="padding: 12px 16px; font-size: 15px; font-weight: 700; color: #0f1d2e; border-bottom: 1px solid #eef5fc;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; font-size: 13px; color: #64748b; border-bottom: 1px solid #eef5fc;">Email Address:</td>
                  <td style="padding: 12px 16px; font-size: 14px; font-weight: 600; color: #1a6bbd; border-bottom: 1px solid #eef5fc;">
                    <a href="mailto:${email}" style="color: #1a6bbd; text-decoration: none;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; font-size: 13px; color: #64748b; border-bottom: 1px solid #eef5fc;">Phone Number:</td>
                  <td style="padding: 12px 16px; font-size: 14px; font-weight: 600; color: #0f1d2e; border-bottom: 1px solid #eef5fc;">
                    ${phone ? `<a href="tel:${phone}" style="color: #0f1d2e; text-decoration: none;">${phone}</a>` : '<span style="color: #94a3b8;">Not provided</span>'}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; font-size: 13px; color: #64748b; vertical-align: top;">Message:</td>
                  <td style="padding: 12px 16px; font-size: 14px; color: #334155; line-height: 1.6;">
                    ${message}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; font-size: 13px; color: #64748b; border-top: 1px solid #eef5fc;">Received:</td>
                  <td style="padding: 12px 16px; font-size: 13px; color: #64748b; border-top: 1px solid #eef5fc;">
                    ${new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}
                  </td>
                </tr>
              </table>

              <!-- Call to Action Button -->
              <div style="text-align: center; margin-top: 28px; margin-bottom: 12px;">
                <a href="${adminUrl}" style="display: inline-block; background: linear-gradient(135deg, #1a6bbd 0%, #0ea5a0 100%); color: #ffffff; font-size: 14px; font-weight: 700; text-decoration: none; padding: 13px 28px; border-radius: 10px; box-shadow: 0 6px 18px rgba(26, 107, 189, 0.25);">
                  View in Admin Portal →
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fbff; border-top: 1px solid #d5e6f5; padding: 16px 30px; text-align: center; font-size: 12px; color: #64748b;">
              Direct reply-to is configured for ${email}. You can hit Reply in your email client to email ${name} directly.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * 5. Admin Password Reset OTP Email (Simple & Clear Plain Format)
 */
export function renderPasswordResetOtpEmail({ name, email, otp }) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
</head>
<body style="font-family: Arial, sans-serif; font-size: 15px; line-height: 1.6; color: #222222; margin: 20px 10px; padding: 0;">
  <p>Hello ${name || 'Administrator'},</p>

  <p>We received a request to reset your admin password for <strong>${email}</strong>.</p>

  <p>Your 6-digit verification code (OTP) is:</p>

  <div style="margin: 20px 0; font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #1a6bbd; font-family: monospace;">
    ${otp}
  </div>

  <p style="color: #666666; font-size: 13px;">
    This code is valid for 10 minutes. Do not share this OTP with anyone.
  </p>

  <p style="color: #666666; font-size: 13px;">
    If you did not request a password reset, please ignore this email.
  </p>

  <p style="margin-top: 24px;">
    Regards,<br>
    Admin Security
  </p>
</body>
</html>
  `.trim();
}

/**
 * Legacy Link-based reset template
 */
export function renderPasswordResetEmail({ name, email, resetUrl }) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
</head>
<body style="font-family: Arial, sans-serif; font-size: 15px; line-height: 1.6; color: #222222; margin: 20px 10px; padding: 0;">
  <p>Hello ${name || 'Administrator'},</p>

  <p>We received a request to reset your admin password for <strong>${email}</strong>.</p>

  <p>Please click the link below to set a new password:</p>

  <p style="margin: 18px 0;">
    <a href="${resetUrl}" style="color: #1a6bbd; text-decoration: underline; word-break: break-all;">
      ${resetUrl}
    </a>
  </p>

  <p style="color: #666666; font-size: 13px; margin-top: 24px;">
    Note: This link will expire in 30 minutes. If you did not request a password reset, please disregard this email.
  </p>

  <p style="margin-top: 20px;">
    Regards,<br>
    Admin Security
  </p>
</body>
</html>
  `.trim();
}
