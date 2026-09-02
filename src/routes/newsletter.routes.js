import express from 'express';
import { subscribe, getSubscribers, deleteSubscriber } from '../controller/newsletter.controller.js';

const router = express.Router();

router.post('/', subscribe);
router.get('/', getSubscribers);
router.delete('/:id', deleteSubscriber);

export default router;
