import mongoose from 'mongoose';

const procedureSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  specialtyId: { type: Number, required: true, index: true },
  category: {
    type: String,
    required: true,
    enum: ['Interventional', 'Diagnostic', 'Structural', 'Preventive'],
    index: true,
  },
  title: { type: String, required: true, trim: true },
  desc: { type: String, required: true },
  duration: { type: String, required: true },
  recovery: { type: String, required: true },
  anesthesia: { type: String, required: true },
}, {
  timestamps: true,
});

export const Procedure = mongoose.model('Procedure', procedureSchema);
export default Procedure;
