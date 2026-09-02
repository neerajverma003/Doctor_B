import express from 'express';
import { getReviews, createReview, updateReview, deleteReview } from '../controller/review.controller.js';

const router = express.Router();

router.get('/', getReviews);
router.post('/', createReview);
router.put('/:id', updateReview);
router.delete('/:id', deleteReview);

export default router;
