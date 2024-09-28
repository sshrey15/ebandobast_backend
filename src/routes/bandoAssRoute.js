import express from 'express';
import {
  createBandobastAssignment,
  getBandobastAssignments,
  getBandobastAssignment,
  updateBandobastAssignment,
  deleteBandobastAssignment,
} from '../controllers/bandobastAssignment.js';

const router = express.Router();

router.post('/', createBandobastAssignment);
router.get('/', getBandobastAssignments);
router.get('/:id', getBandobastAssignment);
router.put('/:id', updateBandobastAssignment);
router.delete('/:id', deleteBandobastAssignment);

export default router;