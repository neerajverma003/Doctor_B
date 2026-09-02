import express from 'express';
import authRoutes from './auth.routes.js';
import doctorRoutes from './doctor.routes.js';
import specialtyRoutes from './specialty.routes.js';
import reviewRoutes from './review.routes.js';
import articleRoutes from './article.routes.js';
import faqRoutes from './faq.routes.js';
import contactRoutes from './contact.routes.js';
import newsletterRoutes from './newsletter.routes.js';

const apiRouter = express.Router();

apiRouter.use('/auth', authRoutes);
apiRouter.use('/doctor', doctorRoutes);
apiRouter.use('/specialties', specialtyRoutes);
apiRouter.use('/reviews', reviewRoutes);
apiRouter.use('/articles', articleRoutes);
apiRouter.use('/faqs', faqRoutes);
apiRouter.use('/contact', contactRoutes);
apiRouter.use('/newsletter', newsletterRoutes);

export default apiRouter;
