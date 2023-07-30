import { Request, Response, NextFunction } from 'express';
import { ModifiedReq } from '../types';

const auth = (req: Request, res: Response, next: NextFunction) => {
  const customReq = req as ModifiedReq;
  customReq.user = {
    _id: '64c41ce53cb75a58c7e54d82', // 64c41ce53cb75a58c7e54d82
  };

  next();
};

export default auth;
