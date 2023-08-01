import { HttpStatusCode } from '../types/error';

export default class NotFoundError extends Error {
  code: number;

  constructor(message: string) {
    super(message);
    this.code = HttpStatusCode.NOT_FOUND;
  }
}
