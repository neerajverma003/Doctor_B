import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  slug: { type: String, required: true, unique: true, index: true, lowercase: true, trim: true },
  title: { type: String, required: true, trim: true },
  category: { type: String, required: true, index: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  readTime: { type: String, default: '5 min read' },
  date: { type: Date, default: Date.now },
  featured: { type: Boolean, default: false, index: true },
  tags: [{ type: String, trim: true }],
}, {
  timestamps: true,
});

export const Article = mongoose.model('Article', articleSchema);
export default Article;
