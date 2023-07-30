export enum HttpStatusCode{
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export enum ErrorMessage{
  USER_NOT_FOUND = 'Пользователь не найден',
  CARD_NOT_FOUND = 'Карточка не найдена',
  INTERNAL_SERVER_ERROR = 'Произошла ошибка на стороне сервера',
  BAD_REQUEST = 'Некорректный запрос',
}