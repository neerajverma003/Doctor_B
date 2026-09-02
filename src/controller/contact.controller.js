import Appointment from '../models/appointment.model.js';
import {
  sendAppointmentNotification,
  sendContactNotification,
} from '../services/email.service.js';

export const submitContact = async (req, res, next) => {
  try {
    const { name, email, phone, preferredDate, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required fields.',
      });
    }

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedName = name.trim();
    const trimmedPhone = phone ? phone.trim() : '';
    const trimmedMessage = message.trim();
    const parsedDate = preferredDate ? new Date(preferredDate) : null;

    const appointment = await Appointment.create({
      name: trimmedName,
      email: trimmedEmail,
      phone: trimmedPhone,
      preferredDate: parsedDate,
      message: trimmedMessage,
      status: 'pending',
    });

    // Trigger dual email notification asynchronously (never blocks response)
    if (parsedDate) {
      sendAppointmentNotification({
        name: trimmedName,
        email: trimmedEmail,
        phone: trimmedPhone,
        preferredDate: parsedDate,
        message: trimmedMessage,
        id: appointment._id,
      }).catch((err) => {
        console.error('Background appointment email error:', err);
      });
    } else {
      sendContactNotification({
        name: trimmedName,
        email: trimmedEmail,
        phone: trimmedPhone,
        message: trimmedMessage,
        id: appointment._id,
      }).catch((err) => {
        console.error('Background contact email error:', err);
      });
    }

    res.status(201).json({
      success: true,
      message: `Thank you, ${appointment.name}! We have received your request and will contact you within 24 hours.`,
      data: appointment,
    });
  } catch (error) {
    next(error);
  }
};

export const getAppointments = async (req, res, next) => {
  try {
    const { status, limit = 100, page = 1 } = req.query;
    const filter = status && status !== 'All' ? { status } : {};
    const skip = (page - 1) * limit;

    const [appointments, total] = await Promise.all([
      Appointment.find(filter).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit, 10)).lean(),
      Appointment.countDocuments(filter),
    ]);

    res.json({ appointments, total, page: parseInt(page, 10), pages: Math.ceil(total / limit) });
  } catch (error) {
    next(error);
  }
};

export const updateAppointmentStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'confirmed', 'completed', 'cancelled'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value. Must be pending, confirmed, completed, or cancelled.',
      });
    }

    const updated = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    res.json({
      success: true,
      message: `Appointment status updated to ${status}`,
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteAppointment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await Appointment.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    res.json({
      success: true,
      message: 'Appointment deleted successfully',
      id: deleted._id,
    });
  } catch (error) {
    next(error);
  }
};
