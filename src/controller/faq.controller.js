import FAQ from '../models/faq.model.js';

export const getFaqs = async (req, res, next) => {
  try {
    const { category } = req.query;
    const filter = category && category !== 'All' ? { category } : {};
    const faqs = await FAQ.find(filter).sort({ id: 1 }).lean();
    res.json(faqs);
  } catch (error) {
    next(error);
  }
};

export const createFaq = async (req, res, next) => {
  try {
    const { id, category, question, answer } = req.body;

    if (!category || !question || !answer) {
      return res.status(400).json({
        success: false,
        message: 'category, question, and answer are required fields.',
      });
    }

    const autoId = id || (await FAQ.countDocuments()) + 1;

    const newFaq = await FAQ.create({
      id: autoId,
      category: category.trim(),
      question: question.trim(),
      answer: answer.trim(),
    });

    res.status(201).json({
      success: true,
      message: 'FAQ created successfully',
      data: newFaq,
    });
  } catch (error) {
    next(error);
  }
};

export const updateFaq = async (req, res, next) => {
  try {
    const param = req.params.id;
    const query = isNaN(param) ? { _id: param } : { id: Number(param) };
    const { category, question, answer } = req.body;

    const updateData = {};
    if (category !== undefined) updateData.category = category.trim();
    if (question !== undefined) updateData.question = question.trim();
    if (answer !== undefined) updateData.answer = answer.trim();

    const updated = await FAQ.findOneAndUpdate(query, updateData, { new: true, runValidators: true });
    if (!updated) {
      return res.status(404).json({ success: false, message: 'FAQ not found' });
    }

    res.json({
      success: true,
      message: 'FAQ updated successfully',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteFaq = async (req, res, next) => {
  try {
    const param = req.params.id;
    const query = isNaN(param) ? { _id: param } : { id: Number(param) };

    const deleted = await FAQ.findOneAndDelete(query);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'FAQ not found' });
    }

    res.json({
      success: true,
      message: 'FAQ deleted successfully',
      id: deleted.id,
    });
  } catch (error) {
    next(error);
  }
};
