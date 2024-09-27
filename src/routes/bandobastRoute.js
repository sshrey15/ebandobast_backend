import {Router} from 'express'
import {create_bandobast, get_bandobast} from '../controllers/bandobast.js';

const router = Router();

router.route('/create_bandobast').post(create_bandobast);
router.route('/get_bandobast').get(get_bandobast);

export default router;