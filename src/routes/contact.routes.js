import express from 'express';
import {
  submitContact,
  getAppointments,
  updateAppointmentStatus,
  deleteAppointment,
} from '../controller/contact.controller.js';

const router = express.Router();

router.post('/', submitContact);
router.get('/', getAppointments);
router.patch('/:id/status', updateAppointmentStatus);
router.delete('/:id', deleteAppointment);

export default router;
