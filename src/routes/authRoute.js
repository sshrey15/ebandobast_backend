import {Router} from 'express';
import { login_admin } from '../controllers/auth.js';

const router = Router();

router.route('/admin_login').post(login_admin);

export default router;

