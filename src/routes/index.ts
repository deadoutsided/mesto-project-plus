import { Router } from 'express';
import usersRoutes from './users';
import cardsRoutes from './cards';
import sendNotFoundError from '../controllers/incorrectreq';

const router = Router();

router.use('/users', usersRoutes);
router.use('/cards', cardsRoutes);
router.all('*', sendNotFoundError);

export default router;
