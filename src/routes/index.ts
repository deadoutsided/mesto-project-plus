import { Router } from 'express';
import usersRoutes from './users';
import cardsRoutes from './cards';
import signinRoute from './signin';
import signupRoute from './signup';
import sendNotFoundError from '../controllers/incorrectreq';
import auth from '../middlewares/auth';
import handleError from '../middlewares/handleError';
import { requestLogger, errorLogger } from '../middlewares/logger';

const router = Router();

router.use(requestLogger);

router.use('/signin', signinRoute);
router.use('/signup', signupRoute);
router.use(auth);
router.use('/users', usersRoutes);
router.use('/cards', cardsRoutes);
router.all('*', sendNotFoundError);

router.use(errorLogger);

router.use(handleError);

export default router;
