import { ErrorMessage } from '../types/error';
import NotFoundError from '../errors/NotFound';

const sendNotFoundError = () => {
  throw new NotFoundError(ErrorMessage.RESOURCE_NOT_FOUND);
};

export default sendNotFoundError;
