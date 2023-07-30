import { Request, Response } from 'express';
import { ModifiedReq } from '../types';
import Card from '../models/card';
import { HttpStatusCode, ErrorMessage } from '../types/error';

export const getCards = async (req: Request, res: Response) => {
  try {
    const cards = await Card.find({}).populate('owner');
    return res.send(cards);
  } catch {
    return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .send({ message: ErrorMessage.INTERNAL_SERVER_ERROR });
  }
};

export const createCard = async (req: ModifiedReq, res: Response) => {
  try {
    const { name, link } = req.body;
    const owner = req.user?._id;
    if (!name || !link) {
      throw new Error(ErrorMessage.BAD_REQUEST);
    }
    const newCard = await Card.create({ name, link, owner });
    if (!newCard) {
      throw new Error(ErrorMessage.INTERNAL_SERVER_ERROR);
    }
    return res.send(newCard);
  } catch (e) {
    if (e instanceof Error && e.message === ErrorMessage.BAD_REQUEST) {
      return res
        .status(HttpStatusCode.BAD_REQUEST)
        .send({ message: ErrorMessage.BAD_REQUEST });
    }
    return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .send({ message: ErrorMessage.INTERNAL_SERVER_ERROR });
  }
};

export const deleteCard = async (req: Request, res: Response) => {
  try {
    const { cardId } = req.params;
    if (!cardId) {
      throw new Error(ErrorMessage.BAD_REQUEST);
    }

    const delCard = await Card.findByIdAndDelete(req.params.cardId);

    if (!delCard) {
      throw new Error(ErrorMessage.CARD_NOT_FOUND);
    }
    return res.send(delCard);
  } catch (e) {
    if (
      e instanceof Error && (e.message === ErrorMessage.BAD_REQUEST
      || e.message === ErrorMessage.CARD_NOT_FOUND)
    ) {
      return res.status(HttpStatusCode.NOT_FOUND).send({ message: e.message });
    }
    return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .send({ message: ErrorMessage.INTERNAL_SERVER_ERROR });
  }
};

export const addLike = async (req: ModifiedReq, res: Response) => {
  try {
    const userId = req.user?._id;
    const { cardId } = req.params;

    if (!cardId) {
      throw new Error(ErrorMessage.BAD_REQUEST);
    }

    const likedCard = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: userId } },
      { new: true },
    );

    if (!likedCard) {
      throw new Error(ErrorMessage.CARD_NOT_FOUND);
    }
    return res.send(likedCard);
  } catch (e) {
    if (
      e instanceof Error
      && (e.message === ErrorMessage.CARD_NOT_FOUND
      || e.message === ErrorMessage.BAD_REQUEST)
    ) {
      return res.status(HttpStatusCode.NOT_FOUND).send({ message: e.message });
    }
    return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .send({ message: ErrorMessage.INTERNAL_SERVER_ERROR });
  }
};

export const deleteLike = async (req: ModifiedReq, res: Response) => {
  try {
    const userId = req.user?._id;
    const { cardId } = req.params;

    if (!cardId) {
      throw new Error(ErrorMessage.BAD_REQUEST);
    }

    const likelessCard = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: userId } as any },
      { new: true },
    );

    if (!likelessCard) {
      throw new Error(ErrorMessage.CARD_NOT_FOUND);
    }
    return res.send(likelessCard);
  } catch (e) {
    if (
      e instanceof Error
      && (e.message === ErrorMessage.BAD_REQUEST
      || e.message === ErrorMessage.CARD_NOT_FOUND)
    ) {
      return res.status(HttpStatusCode.NOT_FOUND).send({ message: e.message });
    }
    return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .send({ message: ErrorMessage.INTERNAL_SERVER_ERROR });
  }
};
