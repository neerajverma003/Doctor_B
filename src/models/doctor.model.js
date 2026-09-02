import mongoose from 'mongoose';

const workingHourSchema = new mongoose.Schema({
  day: { type: String, required: true },
  time: { type: String, required: true },
}, { _id: false });

const statSchema = new mongoose.Schema({
  label: { type: String, required: true },
  value: { type: String, required: true },
  icon: { type: String, default: 'award' },
}, { _id: false });

const valueSchema = new mongoose.Schema({
  icon: { type: String, default: 'heart' },
  title: { type: String, required: true },
  desc: { type: String, required: true },
}, { _id: false });

const milestoneSchema = new mongoose.Schema({
  year: { type: String, required: true },
  title: { type: String, required: true },
  desc: { type: String, required: true },
}, { _id: false });

const doctorSchema = new mongoose.Schema({
  id: { type: Number, default: 1 },
  name: { type: String, required: true, trim: true },
  title: { type: String, required: true, trim: true },
  specialty: { type: String, required: true, trim: true },
  tagline: { type: String, trim: true },
  bio: { type: String, required: true },
  shortBio: { type: String },
  mission: { type: String },
  quote: { type: String },
  phone: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  address: { type: String, required: true },
  training: { type: String, default: 'AIIMS New Delhi + Cleveland Clinic' },
  workingHours: [workingHourSchema],
  stats: [statSchema],
  socials: {
    linkedin: { type: String, default: '' },
    twitter: { type: String, default: '' },
    instagram: { type: String, default: '' },
    youtube: { type: String, default: '' },
  },
  values: [valueSchema],
  milestones: [milestoneSchema],
}, {
  timestamps: true,
});

export const Doctor = mongoose.model('Doctor', doctorSchema);
export default Doctor;
