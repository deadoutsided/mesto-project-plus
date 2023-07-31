import { Router } from 'express';
import {
  getUser,
  getUsers,
  changeProfile,
  changeAvatar,
} from '../controllers/users';

const router = Router();

router.get('/', getUsers);

router.get('/:id', getUser);

router.get('/me', getUser);

router.patch('/me', changeProfile);

router.patch('/me/avatar', changeAvatar);

export default router;
