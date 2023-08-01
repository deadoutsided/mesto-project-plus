import { Request, Response, NextFunction } from 'express';
import { Error as monErr } from 'mongoose';
import { ErrorMessage, HttpStatusCode, ICustomErr } from '../types/error';
import ForbiddenError from '../errors/Forbidden';
import NotFoundError from '../errors/NotFound';
import UnauthorizedError from '../errors/UnauthorizedErr';

export default (err: ICustomErr, req: Request, res: Response, next: NextFunction) => {
  if (err.code === 11000) {
    return res.status(HttpStatusCode.CONFLICT).send({ message: ErrorMessage.CONFLICT });
  }

  if (err instanceof ForbiddenError
    || err instanceof NotFoundError
    || err instanceof UnauthorizedError) {
    return res.status(err.code).send({ message: err.message });
  }

  if (err instanceof monErr.ValidationError) {
    return res.status(HttpStatusCode.BAD_REQUEST).send({ message: ErrorMessage.BAD_REQUEST });
  }

  if (err instanceof monErr.DocumentNotFoundError
    || err instanceof monErr.CastError) {
    return res.status(HttpStatusCode.NOT_FOUND).send({ message: ErrorMessage.RESOURCE_NOT_FOUND });
  }

  res.status(HttpStatusCode.INTERNAL_SERVER_ERROR)
    .send({ message: ErrorMessage.INTERNAL_SERVER_ERROR });

  return next();
};
