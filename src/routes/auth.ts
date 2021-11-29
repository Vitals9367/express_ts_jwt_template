import express from 'express';
import { signin,signup } from '../controllers/auth.controller';
import emailExists from '../middleware/auth';

const router = express.Router();

router.get('/', (req:express.Request, res:express.Response) => {
    res.status(200).send({message: 'auth controller'});
});
router.post('/signin', [emailExists], signin);
router.post('/signup', [emailExists], signup);

export default router;