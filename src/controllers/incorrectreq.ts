import { NextFunction, Request, Response } from 'express';
import { ErrorMessage } from '../types/error';
import NotFoundError from '../errors/NotFound';

// eslint-disable-next-line max-len
const sendNotFoundError = (req: Request, res: Response, next: NextFunction) => next(new NotFoundError(ErrorMessage.RESOURCE_NOT_FOUND));

export default sendNotFoundError;
