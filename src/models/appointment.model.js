import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  phone: { type: String, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  preferredDate: { type: Date },
  message: { type: String, required: true, trim: true },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending',
    index: true,
  },
}, {
  timestamps: true,
});

export const Appointment = mongoose.model('Appointment', appointmentSchema);
export default Appointment;
