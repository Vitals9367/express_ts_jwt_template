import express from 'express';
import { signin,signup } from '../controllers/auth.controller';
import emailExists from '../middleware/auth';

const router = express.Router();

router.get('/', (req:express.Request, res:express.Response) => {
    res.status(200).send({message: 'auth controller'});
});
router.post('/signin', signin);
router.post('/signup', signup);

export default router;