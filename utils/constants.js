const OK = 201;
const STATUS_CODE = 200;
const VALIDATION_ERROR = 400;
const UNAUTHORIZED_ERROR = 401;
const FORBIDDEN_ERROR = 403;
const NOT_FOUND_ERROR = 404;
const CONFLICT_ERROR = 409;
const SERVER_ERROR = 500;

const REGEX_URL = /https*:\/\/[\w\S]{1,}\.[\w\S]{1,}/;

const AUTHORIZATION = 'Необходимо войти на сайт';
const NOTFOUND_USER = 'Пользователь не найден';
const INCORRECT_DATA_ERROR = 'Введенные данные некорректны';
const USER_EMAIL_EXIST = 'Указанный email уже существует';
const NOTFOUND_MOVIE = 'Фильм не найден';
const ACCESS_DENIED = 'Недостаточно прав доступа';
const INCORRECT_URL = 'Некорректная ссылка';
const INCORRECT_EMAIL = 'Некорректный email';
const RESOURCE_ERROR = 'Запрашиваемый ресурс не найден';
const INCORRECT_CREDENTIALS = 'Неправильная почта или пароль';
const ERRORHANDLER_MESSAGE = 'Ошибка сервера';

module.exports = {
  OK,
  STATUS_CODE,
  REGEX_URL,
  VALIDATION_ERROR,
  UNAUTHORIZED_ERROR,
  FORBIDDEN_ERROR,
  NOT_FOUND_ERROR,
  CONFLICT_ERROR,
  SERVER_ERROR,
  RESOURCE_ERROR,
  INCORRECT_CREDENTIALS,
  ERRORHANDLER_MESSAGE,
  AUTHORIZATION,
  NOTFOUND_USER,
  INCORRECT_DATA_ERROR,
  USER_EMAIL_EXIST,
  NOTFOUND_MOVIE,
  ACCESS_DENIED,
  INCORRECT_URL,
  INCORRECT_EMAIL,
};
