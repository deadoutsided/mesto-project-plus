import { Router } from 'express';
import {
  getUser,
  getUsers,
  changeProfile,
  changeAvatar,
} from '../controllers/users';
import { changeAvatarValidation, changeProfileValidation, objectIdValidation } from '../celebrate/celebrateValidation';

const router = Router();

router.get('/', getUsers);

router.get('/:id', objectIdValidation, getUser);

router.get('/me', objectIdValidation, getUser);

router.patch('/me', changeProfileValidation, changeProfile);

router.patch('/me/avatar', changeAvatarValidation, changeAvatar);

export default router;
