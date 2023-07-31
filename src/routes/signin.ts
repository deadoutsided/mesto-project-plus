import { Router } from 'express';
import { login } from '../controllers/users';

const router = Router();

router.post('/', login);

export default router;
