import express from 'express';
import {
  createCoordinates,
  getCoordinates,
  getCoordinate,
  updateCoordinates,
  deleteCoordinates,
} from '../controllers/coordinates.js';

const router = express.Router();

router.post('/', createCoordinates);
router.get('/', getCoordinates);
router.get('/:id', getCoordinate);
router.put('/:id', updateCoordinates);
router.delete('/:id', deleteCoordinates);

export default router;