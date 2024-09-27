import {Router} from 'express';
import {login_admin, login_dutyofficer,get_admin,get_dutyofficer} from '../controllers/auth.js';

const router = Router();

router.route('/admin').post(login_admin).get(get_admin);
router.route('/dutyofficer').post(login_dutyofficer).get(get_dutyofficer);

export default router;

