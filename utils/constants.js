const VALIDATION_ERROR = 400;
const UNAUTHORIZED_ERROR = 401;
const FORBIDDEN_ERROR = 403;
const NOT_FOUND_ERROR = 404;
const CONFLICT_ERROR = 409;
const SERVER_ERROR = 500;
const STATUS_CODE = 200;
const STATUS_OK = 201;

const RESOURCE_ERROR = 'Запрашиваемый ресурс не найден';
const INCORRECT_ERROR = 'Неправильные почта или пароль';
const SERVER_NOT_WORKING = 'На сервере произошла ошибка';
const AUTHORIZATION = 'Необходима авторизация';
const USER_NOT_FOUND = 'Запрашиваемый пользователь не найден';
const INCORRECT_DATA_ERROR = 'Переданы некорректные данные';
const USER_EMAIL_EXIST = 'Пользователь с такой почтой уже существует';
const MOVIES_NOT_FOUND = 'Фильм не найден';
const NO_ACCESS_RIGHTS = 'Недостаточно прав доступа';
const INCORRECT_URL = 'Некорректный адрес ссылки';
const INCORRECT_EMAIL = 'Некорректный email';

// eslint-disable-next-line no-useless-escape
const REGEX_URL = /^(https?:\/\/)?([a-z0-9\-]+\.)+[a-z]{2,6}([\/\?\#][^\s]*)?$/;

module.exports = {
  VALIDATION_ERROR,
  UNAUTHORIZED_ERROR,
  FORBIDDEN_ERROR,
  NOT_FOUND_ERROR,
  CONFLICT_ERROR,
  SERVER_ERROR,
  STATUS_CODE,
  STATUS_OK,
  REGEX_URL,
  RESOURCE_ERROR,
  INCORRECT_ERROR,
  SERVER_NOT_WORKING,
  AUTHORIZATION,
  USER_NOT_FOUND,
  INCORRECT_DATA_ERROR,
  USER_EMAIL_EXIST,
  MOVIES_NOT_FOUND,
  NO_ACCESS_RIGHTS,
  INCORRECT_URL,
  INCORRECT_EMAIL,
};
