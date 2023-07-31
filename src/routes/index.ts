import { Router } from 'express';
import usersRoutes from './users';
import cardsRoutes from './cards';
import signinRoute from './signin';
import signupRoute from './signup';
import sendNotFoundError from '../controllers/incorrectreq';

const router = Router();

router.use('/signin', signinRoute);
router.use('/signup', signupRoute);
router.use('/users', usersRoutes);
router.use('/cards', cardsRoutes);
router.all('*', sendNotFoundError);

export default router;
