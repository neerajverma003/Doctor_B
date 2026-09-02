import express from 'express';
import { login, getMe, forgotPassword, resetPassword } from '../controller/auth.controller.js';
import { protectAdmin } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Public auth routes
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

// Protected session validation route
router.get('/me', protectAdmin, getMe);

export default router;
