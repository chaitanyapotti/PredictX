import { Router } from 'express';

import userRouter from './user';
import questionsRouter from './questions';

const router = Router();

router.use('/user', userRouter);
router.use('/questions', questionsRouter);

export default router;