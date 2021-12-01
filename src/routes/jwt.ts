import express from 'express';
import verifyToken from '../middleware/jwt';
//import {verifyAccessToken as verifyTokenController} from '../controllers/jwt.controller';

const router = express.Router();

//router.post('/verify-access-token',[verifyToken],verifyTokenController)

export default router;