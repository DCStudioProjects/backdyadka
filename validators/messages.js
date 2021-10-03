module.exports = {
  action: {
    "string.base": `Сервер не смог обработать Ваш запрос. Попробуйте ещё раз или обратитесь в поддержку.`,
    "string.empty": `Сервер не смог обработать Ваш запрос. Попробуйте ещё раз или обратитесь в поддержку.`,
    "string.min": `Сервер не смог обработать Ваш запрос. Попробуйте ещё раз или обратитесь в поддержку.`,
    "any.required": `Сервер не смог обработать Ваш запрос. Попробуйте ещё раз или обратитесь в поддержку.`,
  },
  firstname: {
    "string.base": `Имя пользователя должно состоять только из букв.`,
    "string.empty": `Поле "имя пользователя" не может быть пустым.`,
    "string.min": `Имя пользователя не может быть короче {#limit} символов.`,
    "any.required": `Поле "имя пользователя" является обязательным.`,
  },

  email: {
    "string.base": `Убедитесь в том, что вы ввели действительно email.`,
    "string.empty": `Поле "email" не может быть пустым.`,
    "string.min": `Email не может быть короче {#limit} символов.`,
    "string.email": `Убедитесь в правильности введённого email.`,
    "any.required": `Поле "email" является обязательным.`,
  },

  password: {
    "string.base": `В пароле должна содержаться хотя бы одна буква.`,
    "string.empty": `Поле "пароль" не может быть пустым.`,
    "string.min": `Пароль не может быть короче {#limit} символов.`,
    "any.required": `Поле "пароль" является обязательным.`,
  },

  activation: {
    "string.base": `Некорректная ссылка активации.`,
    "string.empty": `Некорректная ссылка активации.`,
    "string.min": `Некорректная ссылка активации.`,
    "any.required": `Некорректная ссылка активации.`,
  },

  id: {
    "number.base": `Некорректный id.`,
    "number.empty": `Поле "id" не может быть пустым.`,
    "any.required": `Поле "id" является обязательным.`,
  },

  season: {
    "number.base": `Некорректный номер сезона.`,
    "number.empty": `Поле "сезон" не может быть пустым.`,
    "any.required": `Поле "сезон" является обязательным.`,
  },

  episode: {
    "number.base": `Некорректный номер серии.`,
    "number.empty": `Поле "серия" не может быть пустым.`,
    "any.required": `Поле "серия" является обязательным.`,
  },

  time: {
    "number.base": `Некорректная временная метка.`,
    "number.empty": `Поле "временная метка" не может быть пустым.`,
    "any.required": `Поле "временная метка" является обязательным.`,
  },

  poster: {
    "string.base": `Некорректная ссылка на постер.`,
    "string.empty": `Отсутствует ссылка на постер.`,
    //"string.min": `Пароль не может быть короче {#limit} символов.`,
    //"string.max": `Пароль не может быть короче {#limit} символов.`,
    "any.required": `Ссылка на постер является обязательной.`,
  },

  title: {
    "string.base": `Некорректный заголовок.`,
    "string.empty": `Отсутствует заголовок.`,
    //"string.min": `Пароль не может быть короче {#limit} символов.`,
    //"string.max": `Пароль не может быть короче {#limit} символов.`,
    "any.required": `Заголовок является обязательным.`,
  },

  slug: {
    "string.base": `Некорректный путь.`,
    "string.empty": `Отсутствует путь.`,
    //"string.min": `Пароль не может быть короче {#limit} символов.`,
    //"string.max": `Пароль не может быть короче {#limit} символов.`,
    "any.required": `Путь является обязательным.`,
  },

  translation: {
    "number.base": `Некорректный ID перевода.`,
    "number.empty": `Поле "ID перевода" не может быть пустым.`,
    "any.required": `Поле "ID перевода" является обязательным.`,
  },

  quality: {
    "string.base": `Некорректное качество.`,
    "string.empty": `Отсутствует качество.`,
    "any.required": `качество является обязательным.`,
  },
};