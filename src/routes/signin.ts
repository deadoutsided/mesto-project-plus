import { Router } from 'express';
import { login } from '../controllers/users';
import { loginValidation } from '../celebrate/celebrateValidation';

const router = Router();

router.post('/', loginValidation, login);

export default router;
