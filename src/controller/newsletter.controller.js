import Subscriber from '../models/subscriber.model.js';

export const subscribe = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email || !email.includes('@')) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.',
      });
    }

    const cleanEmail = email.trim().toLowerCase();
    const existing = await Subscriber.findOne({ email: cleanEmail });
    if (existing) {
      if (!existing.isActive) {
        existing.isActive = true;
        await existing.save();
      }
      return res.status(200).json({
        success: true,
        message: 'You are already subscribed to our newsletter!',
      });
    }

    await Subscriber.create({ email: cleanEmail });
    res.status(200).json({
      success: true,
      message: 'Thank you for subscribing to our health newsletter!',
    });
  } catch (error) {
    next(error);
  }
};

export const getSubscribers = async (req, res, next) => {
  try {
    const subscribers = await Subscriber.find({ isActive: true }).sort({ createdAt: -1 }).lean();
    res.json(subscribers);
  } catch (error) {
    next(error);
  }
};

export const deleteSubscriber = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await Subscriber.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Subscriber not found' });
    }

    res.json({
      success: true,
      message: 'Subscriber removed successfully',
      id: deleted._id,
    });
  } catch (error) {
    next(error);
  }
};
