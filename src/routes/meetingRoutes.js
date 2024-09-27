import express from 'express';
import {
  createMeeting,
  getMeetings,
  getMeeting,
  updateMeeting,
  deleteMeeting
} from '../controllers/meetingController.js';

const router = express.Router();

router.post('/', createMeeting);
router.get('/', getMeetings);
router.get('/:id', getMeeting);
router.put('/:id', updateMeeting);
router.delete('/:id', deleteMeeting);

export default router;