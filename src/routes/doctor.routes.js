import express from 'express';
import { getDoctor, createOrUpdateDoctor } from '../controller/doctor.controller.js';

const router = express.Router();

router.get('/', getDoctor);
router.post('/', createOrUpdateDoctor);
router.put('/', createOrUpdateDoctor);

export default router;
