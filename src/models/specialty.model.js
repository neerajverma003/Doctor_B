import mongoose from 'mongoose';

const specialtySchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  slug: { type: String, required: true, unique: true, index: true, lowercase: true, trim: true },
  icon: { type: String, default: 'heart' },
  title: { type: String, required: true, trim: true },
  shortDesc: { type: String, required: true },
  fullDesc: { type: String, required: true },
  color: { type: String, default: '#1a6bbd' },
}, {
  timestamps: true,
});

export const Specialty = mongoose.model('Specialty', specialtySchema);
export default Specialty;
