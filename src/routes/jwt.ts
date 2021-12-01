import express from 'express';
import {verifyAccess, verifyRefresh} from '../controllers/jwt.controller';

const router = express.Router();

router.post('/verify-access-token', verifyAccess);
router.post('/verify-refresh-token', verifyRefresh);

export default router;