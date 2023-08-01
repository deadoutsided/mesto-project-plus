import { Router } from 'express';
import { createUser } from '../controllers/users';
import { createUserValidation } from '../celebrate/celebrateValidation';

const router = Router();

router.post('/', createUserValidation, createUser);

export default router;
