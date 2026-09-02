import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true, trim: true },
  age: { type: Number },
  condition: { type: String, required: true, trim: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  review: { type: String, required: true },
  avatar: { type: String, default: 'AS' },
  date: { type: Date, default: Date.now },
}, {
  timestamps: true,
});

export const Review = mongoose.model('Review', reviewSchema);
export default Review;
