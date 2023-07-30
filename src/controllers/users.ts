import { Request, Response } from 'express';
import { ModifiedReq } from '../types';
import User from '../models/user';
import { ErrorMessage, HttpStatusCode } from '../types/error';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({});
    return res.send(users);
  } catch (e) {
    return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .send({ message: ErrorMessage.INTERNAL_SERVER_ERROR });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw new Error(ErrorMessage.BAD_REQUEST);
    }

    const user = await User.findById(id);

    if (!user) {
      throw new Error(ErrorMessage.USER_NOT_FOUND);
    }

    return res.send(user);
  } catch (e) {
    if (
      e instanceof Error
      && (e.message === ErrorMessage.BAD_REQUEST || ErrorMessage.USER_NOT_FOUND)
    ) {
      return res.status(HttpStatusCode.NOT_FOUND).send({ message: e.message });
    }
    return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .send({ message: ErrorMessage.INTERNAL_SERVER_ERROR });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, about, avatar } = req.body;

    if (!name || !about || !avatar) {
      throw new Error(ErrorMessage.BAD_REQUEST);
    }

    const newUser = await User.create({ name, about, avatar });
    if (!newUser) {
      throw new Error(ErrorMessage.INTERNAL_SERVER_ERROR);
    }

    return res.send(newUser);
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

export const changeProfile = async (req: ModifiedReq, res: Response) => {
  try {
    const { name, about } = req.body;
    const userId = req.user?._id;

    if (!name || !about) {
      throw new Error(ErrorMessage.BAD_REQUEST);
    }

    const changedUser = await User.findByIdAndUpdate(
      userId,
      { name, about },
      { new: true },
    );

    if (!changedUser) {
      throw new Error(ErrorMessage.USER_NOT_FOUND);
    }

    return res.send(changedUser);
  } catch (e) {
    if (
      e instanceof Error
      && (e.message === ErrorMessage.BAD_REQUEST
      || e.message === ErrorMessage.USER_NOT_FOUND)
    ) {
      return res.status(HttpStatusCode.NOT_FOUND).send({ message: e.message });
    }
    return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .send({ message: ErrorMessage.INTERNAL_SERVER_ERROR });
  }
};

export const changeAvatar = async (req: ModifiedReq, res: Response) => {
  try {
    const { avatar } = req.body;
    const userId = req.user?._id;

    if (!avatar) {
      throw new Error(ErrorMessage.BAD_REQUEST);
    }

    const changedUser = await User.findByIdAndUpdate(
      userId,
      { avatar },
      { new: true },
    );

    if (!changedUser) {
      throw new Error(ErrorMessage.USER_NOT_FOUND);
    }

    return res.send(changedUser);
  } catch (e) {
    if (
      e instanceof Error
      && (e.message === ErrorMessage.BAD_REQUEST || ErrorMessage.USER_NOT_FOUND)
    ) {
      return res.status(HttpStatusCode.NOT_FOUND).send({ message: e.message });
    }
    return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .send({ message: ErrorMessage.INTERNAL_SERVER_ERROR });
  }
};
