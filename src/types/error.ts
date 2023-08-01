/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
export enum HttpStatusCode{
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  CONFLICT = 409,
}

export enum ErrorMessage{
  USER_NOT_FOUND = 'Пользователь не найден',
  CARD_NOT_FOUND = 'Карточка не найдена',
  INTERNAL_SERVER_ERROR = 'Произошла ошибка на стороне сервера',
  BAD_REQUEST = 'Некорректный запрос',
  RESOURCE_NOT_FOUND = 'Такого ресурса не существует',
  UNAUTHORIZED = 'Необходима авторизация',
  LOGINPASS = 'Неверный Логин или пароль',
  FORBIDDEN = 'Недостаточно прав',
  CONFLICT = 'На этот email уже зарегистрирован пользователь',
}

export interface ICustomErr extends Error{
  code?: number;
}
