import { Request, Response } from 'express';
import { Error as monErr } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
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

export const getUser = async (req: ModifiedReq, res: Response) => {
  try {
    const id = req.params.id !== 'me' ? req.params.id : req.user?.token;
    const user = await User.findById(id).orFail();

    return res.send(user);
  } catch (e) {
    if (e instanceof monErr.DocumentNotFoundError) {
      return res.status(HttpStatusCode.NOT_FOUND).send({ messgae: ErrorMessage.USER_NOT_FOUND });
    }
    if (e instanceof monErr.CastError) {
      return res.status(HttpStatusCode.BAD_REQUEST).send({ message: ErrorMessage.BAD_REQUEST });
    }
    return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .send({ message: ErrorMessage.INTERNAL_SERVER_ERROR });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const
      {
        name = undefined, about = undefined, avatar = undefined, email,
      } = req.body;
    const password = await bcrypt.hash(req.body.password, 10);
    const newUser = await User.create({
      name, about, avatar, email, password,
    });

    return res.send(newUser);
  } catch (e) {
    if (e instanceof monErr.ValidationError) {
      return res.status(HttpStatusCode.BAD_REQUEST).send({ message: ErrorMessage.BAD_REQUEST });
    }
    return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .send({ message: ErrorMessage.INTERNAL_SERVER_ERROR });
  }
};

export const changeProfile = async (req: ModifiedReq, res: Response) => {
  try {
    const { name, about } = req.body;
    const userId = req.user?.token;

    const changedUser = await User.findByIdAndUpdate(
      userId,
      { name, about },
      {
        new: true,
        runValidators: true,
      },
    ).orFail();

    return res.send(changedUser);
  } catch (e) {
    if (e instanceof monErr.DocumentNotFoundError) {
      return res.status(HttpStatusCode.NOT_FOUND).send({ messgae: ErrorMessage.USER_NOT_FOUND });
    }
    if (e instanceof monErr.ValidationError) {
      return res.status(HttpStatusCode.BAD_REQUEST).send({ message: ErrorMessage.BAD_REQUEST });
    }
    return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .send({ message: ErrorMessage.INTERNAL_SERVER_ERROR });
  }
};

export const changeAvatar = async (req: ModifiedReq, res: Response) => {
  try {
    const { avatar } = req.body;
    const userId = req.user?.token;

    const changedUser = await User.findByIdAndUpdate(
      userId,
      { avatar },
      {
        new: true,
        runValidators: true,
      },
    ).orFail();

    return res.send(changedUser);
  } catch (e) {
    if (e instanceof monErr.DocumentNotFoundError) {
      return res.status(HttpStatusCode.NOT_FOUND).send({ messgae: ErrorMessage.USER_NOT_FOUND });
    }
    if (e instanceof monErr.ValidationError) {
      return res.status(HttpStatusCode.BAD_REQUEST).send({ message: ErrorMessage.BAD_REQUEST });
    }
    return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .send({ message: ErrorMessage.INTERNAL_SERVER_ERROR });
  }
};

export const login = async (req: ModifiedReq, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password').orFail();
    if (!(await bcrypt.compare(password, user.password))) {
      throw new monErr.DocumentNotFoundError(ErrorMessage.UNAUTHORIZED);
    }
    const token = jwt.sign({ _id: user._id }, 'secret-key', { expiresIn: '7d' });
    return res.cookie('jwt', token, {
      maxAge: 3600000 * 24 * 7,
      httpOnly: true,
    }).end();
  } catch (e) {
    if (e instanceof monErr.DocumentNotFoundError) {
      return res.status(HttpStatusCode.UNAUTHORIZED).send({ message: ErrorMessage.UNAUTHORIZED });
    }
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .send({ message: ErrorMessage.INTERNAL_SERVER_ERROR });
  }
};
