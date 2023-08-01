import { HttpStatusCode } from '../types/error';

export default class ForbiddenError extends Error {
  code: number;

  constructor(message: string) {
    super(message);
    this.code = HttpStatusCode.FORBIDDEN;
  }
}
