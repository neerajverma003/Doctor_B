import express from 'express';
import {
  getSpecialties,
  getSpecialtyBySlug,
  getAllProcedures,
  createSpecialty,
  updateSpecialty,
  deleteSpecialty,
  createProcedure,
  updateProcedure,
  deleteProcedure,
} from '../controller/specialty.controller.js';

const router = express.Router();

// Specific procedure routes
router.get('/procedures/all', getAllProcedures);
router.post('/procedures', createProcedure);
router.put('/procedures/:id', updateProcedure);
router.delete('/procedures/:id', deleteProcedure);

// Root collection routes
router.get('/', getSpecialties);
router.post('/', createSpecialty);

// Parameterized specialty routes
router.put('/:id', updateSpecialty);
router.delete('/:id', deleteSpecialty);
router.get('/:slug', getSpecialtyBySlug);

export default router;
