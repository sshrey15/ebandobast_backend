import express from 'express';
import {
  createPatrolling,
  getPatrollings,
  getPatrolling,
  updatePatrolling,
  deletePatrolling
} from '../controllers/patrolling.js';

const router = express.Router();

router.post('/', createPatrolling);
router.get('/', getPatrollings);
router.get('/:id', getPatrolling);
router.put('/:id', updatePatrolling);
router.delete('/:id', deletePatrolling);

export default router;