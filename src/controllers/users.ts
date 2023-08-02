import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ModifiedReq } from '../types';
import User from '../models/user';
import { ErrorMessage, HttpStatusCode } from '../types/error';
import UnauthorizedError from '../errors/UnauthorizedErr';

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find({});
    return res.send(users);
  } catch (e) {
    return next(e);
  }
};

export const getUser = async (req: ModifiedReq, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id !== 'me' ? req.params.id : req.user?.token;
    const user = await User.findById(id).orFail();

    return res.send(user);
  } catch (e) {
    return next(e);
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const
      {
        name = undefined, about = undefined, avatar = undefined, email,
      } = req.body;
    const password = await bcrypt.hash(req.body.password, 10);
    const newUser = await User.create({
      name, about, avatar, email, password,
    });

    const userRes = newUser.toObject();

    delete userRes.password;

    return res.status(HttpStatusCode.RESOURCE_CREATED).send(userRes);
  } catch (e) {
    return next(e);
  }
};

export const changeProfile = async (req: ModifiedReq, res: Response, next: NextFunction) => {
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
    return next(e);
  }
};

export const changeAvatar = async (req: ModifiedReq, res: Response, next: NextFunction) => {
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
    return next(e);
  }
};

export const login = async (req: ModifiedReq, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password').orFail(new UnauthorizedError(ErrorMessage.LOGINPASS));
    if (!(await bcrypt.compare(password, user.password as string))) {
      return next(new UnauthorizedError(ErrorMessage.LOGINPASS));
    }
    const token = jwt.sign({ _id: user._id }, 'secret-key', { expiresIn: '7d' });
    return res.cookie('jwt', token, {
      maxAge: 3600000 * 24 * 7,
      httpOnly: true,
    }).end();
  } catch (e) {
    return next(e);
  }
};
