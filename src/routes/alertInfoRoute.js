import { Router } from "express";
import { create_alertInfo,get_alertInfo } from "../controllers/alertInfo.js";

const router = Router();


router.route('/').post(create_alertInfo).get(get_alertInfo);


export default router;