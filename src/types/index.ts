import { Request } from 'express';
// import { JwtPayload } from 'jsonwebtoken';

export interface ModifiedReq extends Request {
  user?: {
    _id: string;
  };
}
