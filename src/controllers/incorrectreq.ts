/* eslint-disable arrow-body-style */
import { Request, Response } from 'express';
import { HttpStatusCode, ErrorMessage } from '../types/error';

const sendNotFoundError = (req: Request, res: Response) => {
  return res.status(HttpStatusCode.NOT_FOUND).send({ message: ErrorMessage.RESOURCE_NOT_FUOND });
};

export default sendNotFoundError;
