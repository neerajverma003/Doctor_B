import Review from '../models/review.model.js';

export const getReviews = async (req, res, next) => {
  try {
    const { limit } = req.query;
    let query = Review.find().sort({ id: 1 }).lean();
    if (limit) {
      query = query.limit(parseInt(limit, 10));
    }
    const reviews = await query;
    res.json(reviews);
  } catch (error) {
    next(error);
  }
};

export const createReview = async (req, res, next) => {
  try {
    const { id, name, age, condition, rating, review, avatar, date } = req.body;

    if (!name || !condition || !rating || !review) {
      return res.status(400).json({
        success: false,
        message: 'name, condition, rating (1-5), and review text are required.',
      });
    }

    const autoId = id || (await Review.countDocuments()) + 1;
    const initialAvatar = avatar || name.trim().split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

    const newReview = await Review.create({
      id: autoId,
      name: name.trim(),
      age: age ? Number(age) : undefined,
      condition: condition.trim(),
      rating: Number(rating),
      review: review.trim(),
      avatar: initialAvatar,
      date: date ? new Date(date) : new Date(),
    });

    res.status(201).json({
      success: true,
      message: 'Review created successfully',
      data: newReview,
    });
  } catch (error) {
    next(error);
  }
};

export const updateReview = async (req, res, next) => {
  try {
    const param = req.params.id;
    const query = isNaN(param) ? { _id: param } : { id: Number(param) };
    const { name, age, condition, rating, review, avatar, date } = req.body;

    const updateData = {};
    if (name !== undefined) updateData.name = name.trim();
    if (age !== undefined) updateData.age = Number(age);
    if (condition !== undefined) updateData.condition = condition.trim();
    if (rating !== undefined) updateData.rating = Number(rating);
    if (review !== undefined) updateData.review = review.trim();
    if (avatar !== undefined) updateData.avatar = avatar.trim();
    if (date !== undefined) updateData.date = new Date(date);

    const updated = await Review.findOneAndUpdate(query, updateData, { new: true, runValidators: true });
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    res.json({
      success: true,
      message: 'Review updated successfully',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteReview = async (req, res, next) => {
  try {
    const param = req.params.id;
    const query = isNaN(param) ? { _id: param } : { id: Number(param) };

    const deleted = await Review.findOneAndDelete(query);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    res.json({
      success: true,
      message: 'Review deleted successfully',
      id: deleted.id,
    });
  } catch (error) {
    next(error);
  }
};
