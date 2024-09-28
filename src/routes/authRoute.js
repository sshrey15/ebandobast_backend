import { Router } from 'express';
import {
  login_admin,
  login_dutyofficer,
  get_admin,
  get_dutyofficer,
  get_single_admin,
  get_single_dutyofficer
} from '../controllers/auth.js';

const router = Router();

router.route('/admin').post(login_admin).get(get_admin);
router.route('/admin/:id').get(get_single_admin); // New route for getting a single admin
router.route('/dutyofficer').post(login_dutyofficer).get(get_dutyofficer);
router.route('/dutyofficer/:id').get(get_single_dutyofficer); // New route for getting a single duty officer

export default router;

