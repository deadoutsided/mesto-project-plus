import { Request } from 'express';

export interface ModifiedReq extends Request {
  user?: {
    _id: string;
  };
}
