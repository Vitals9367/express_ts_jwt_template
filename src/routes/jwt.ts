import express from 'express';
import verifyToken from '../middleware/jwt';
import {verifyToken as verifyTokenController} from '../controllers/jwt.controller';

const router = express.Router();

router.post('/verify-token',[verifyToken],verifyTokenController)

export default router;