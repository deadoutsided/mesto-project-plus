import { NextFunction, Request, Response } from 'express';
import { ModifiedReq } from '../types';
import Card from '../models/card';
import { ErrorMessage } from '../types/error';
import ForbiddenError from '../errors/Forbidden';

export const getCards = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cards = await Card.find({}).populate('owner');
    return res.send(cards);
  } catch (e) {
    return next(e);
  }
};

export const createCard = async (req: ModifiedReq, res: Response, next: NextFunction) => {
  try {
    const { name, link } = req.body;
    const owner = req.user?.token;

    const newCard = await Card.create({ name, link, owner });

    return res.send(newCard);
  } catch (e) {
    return next(e);
  }
};

export const deleteCard = async (req: ModifiedReq, res: Response, next: NextFunction) => {
  try {
    const { cardId } = req.params;

    const delCard = await Card.findById(cardId).orFail();

    if (delCard.owner.toString() !== req.user?.token) {
      return next(new ForbiddenError(ErrorMessage.FORBIDDEN));
    }

    const deletedCard = await delCard.deleteOne();

    return res.send(deletedCard);
  } catch (e) {
    return next(e);
  }
};

export const addLike = async (req: ModifiedReq, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.token;
    const { cardId } = req.params;

    const likedCard = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: userId } },
      { new: true },
    ).orFail();

    return res.send(likedCard);
  } catch (e) {
    return next(e);
  }
};

export const deleteLike = async (req: ModifiedReq, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.token;
    const { cardId } = req.params;

    const likelessCard = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: userId } as any },
      { new: true },
    ).orFail();

    return res.send(likelessCard);
  } catch (e) {
    return next(e);
  }
};
