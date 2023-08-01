import { Router } from 'express';
import {
  getCards,
  createCard,
  deleteCard,
  deleteLike,
  addLike,
} from '../controllers/cards';
import { createCardValidation, objectIdValidation } from '../celebrate/celebrateValidation';

const router = Router();

router.get('/', getCards);

router.post('/', createCardValidation, createCard);

router.delete('/:cardId', objectIdValidation, deleteCard);

router.put('/:cardId/likes', objectIdValidation, addLike);

router.delete('/:cardId/likes', objectIdValidation, deleteLike);

export default router;
