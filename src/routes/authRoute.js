import {Router} from 'express';
import {login_admin, login_dutyofficer} from '../controllers/auth.js';

const router = Router();

router.route('/admin_login').post(login_admin);
router.route('/dutyofficer_login').post(login_dutyofficer);

export default router;

