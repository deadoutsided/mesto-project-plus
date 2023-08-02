import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ModifiedReq } from '../types';
import { ErrorMessage } from '../types/error';
import UnauthorizedError from '../errors/UnauthorizedErr';

const auth = (req: ModifiedReq, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError(ErrorMessage.UNAUTHORIZED));
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, 'secret-key') as { _id: string };
  } catch (e) {
    return next(new UnauthorizedError(ErrorMessage.UNAUTHORIZED));
  }

  req.user = payload;
  return next();
};

export default auth;
