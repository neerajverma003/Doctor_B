import mongoose from 'mongoose';

const faqSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  category: {
    type: String,
    required: true,
    enum: ['Appointments', 'Procedures', 'Heart Health', 'Emergency'],
    index: true,
  },
  question: { type: String, required: true, trim: true },
  answer: { type: String, required: true },
}, {
  timestamps: true,
});

export const FAQ = mongoose.model('FAQ', faqSchema);
export default FAQ;
