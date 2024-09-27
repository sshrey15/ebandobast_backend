import {Router} from 'express'
import {create_bandobast, get_bandobast, join_bandobast} from '../controllers/bandobast.js';
const router = Router();

router.route('/').post(create_bandobast);
router.route('/').get(get_bandobast);
router.route('/join').post(join_bandobast);

export default router;