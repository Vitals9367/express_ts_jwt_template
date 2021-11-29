import express from 'express';
import authRouter from './auth';
import usersRouter from './users';
import jwtRouter from './jwt';

const rootRouter = express.Router();

rootRouter.use('/user', authRouter);
rootRouter.use('/users', usersRouter);
rootRouter.use('/jwt', jwtRouter)

export default rootRouter;