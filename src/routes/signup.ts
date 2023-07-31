import { Router } from 'express';
import { createUser } from '../controllers/users';

const router = Router();

router.post('/signup', createUser);

export default router;
