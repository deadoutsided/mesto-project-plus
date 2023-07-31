import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ModifiedReq } from '../types';
import { ErrorMessage, HttpStatusCode } from '../types/error';

const auth = (req: ModifiedReq, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(HttpStatusCode.UNAUTHORIZED)
      .send({ message: ErrorMessage.UNAUTHORIZED });
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, 'secret-key') as { _id: string };
  } catch (e) {
    return res.status(HttpStatusCode.UNAUTHORIZED).send({ message: ErrorMessage.UNAUTHORIZED });
  }

  req.user = payload;

  return next();
};

export default auth;
