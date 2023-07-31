import { Request, Response } from 'express';
import { Error as monErr } from 'mongoose';
import { ModifiedReq } from '../types';
import Card from '../models/card';
import { HttpStatusCode, ErrorMessage } from '../types/error';

export const getCards = async (req: Request, res: Response) => {
  try {
    const cards = await Card.find({}).populate('owner').orFail();
    return res.send(cards);
  } catch (e) {
    return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .send({ message: ErrorMessage.INTERNAL_SERVER_ERROR });
  }
};

export const createCard = async (req: ModifiedReq, res: Response) => {
  try {
    const { name, link } = req.body;
    const owner = req.user?._id;

    const newCard = await Card.create({ name, link, owner });

    return res.send(newCard);
  } catch (e) {
    if (e instanceof monErr.ValidationError) {
      return res.status(HttpStatusCode.BAD_REQUEST).send({ message: ErrorMessage.BAD_REQUEST });
    }
    return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .send({ message: ErrorMessage.INTERNAL_SERVER_ERROR });
  }
};

export const deleteCard = async (req: Request, res: Response) => {
  try {
    const { cardId } = req.params;

    const delCard = await Card.findByIdAndDelete(cardId).orFail();

    return res.send(delCard);
  } catch (e) {
    if (
      e instanceof monErr.DocumentNotFoundError
      || e instanceof monErr.CastError
    ) {
      return res.status(HttpStatusCode.NOT_FOUND).send({ messgae: ErrorMessage.CARD_NOT_FOUND });
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

    const likedCard = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: userId } },
      { new: true },
    ).orFail();

    return res.send(likedCard);
  } catch (e) {
    if (
      e instanceof monErr.DocumentNotFoundError
      || e instanceof monErr.CastError
    ) {
      return res.status(HttpStatusCode.NOT_FOUND).send({ messgae: ErrorMessage.CARD_NOT_FOUND });
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

    const likelessCard = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: userId } as any },
      { new: true },
    ).orFail();

    return res.send(likelessCard);
  } catch (e) {
    if (
      e instanceof monErr.DocumentNotFoundError
      || e instanceof monErr.CastError
    ) {
      return res.status(HttpStatusCode.NOT_FOUND).send({ messgae: ErrorMessage.CARD_NOT_FOUND });
    }
    return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .send({ message: ErrorMessage.INTERNAL_SERVER_ERROR });
  }
};
