const Joi = require("joi");
const messages = require("./messages");

const registerValidation = (data) => {
  const schema = Joi.object({
    firstname: Joi.string().min(3).required().messages(messages.firstname),
    email: Joi.string().min(6).required().email().messages(messages.email),
    password: Joi.string().min(6).required().messages(messages.password),
  });

  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email().messages(messages.email),
    password: Joi.string().min(6).required().messages(messages.password),
  });

  return schema.validate(data);
};

const activationValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email().messages(messages.email),
    activationLink: Joi.string()
      .min(36)
      .max(36)
      .required()
      .messages(messages.activation),
  });

  return schema.validate(data);
};

const checkUserValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email().messages(messages.email),
  });

  return schema.validate(data);
};

const favoritesValidation = (data) => {
  const schema = Joi.object({
    action: Joi.string().min(3).max(6).required().messages(messages.action),
    email: Joi.string().min(6).required().email().messages(messages.email),
    id: Joi.number().messages(messages.id),
    poster: Joi.string().min(15).max(200).messages(messages.poster),
    title: Joi.string().min(2).max(25).messages(messages.title),
    slug: Joi.string().min(10).max(200).messages(messages.slug),
  });

  return schema.validate(data);
};

const timestampValidation = (data) => {
  const schema = Joi.object({
    action: Joi.string().min(3).max(6).required().messages(messages.action),
    email: Joi.string().min(6).required().email().messages(messages.email),
    id: Joi.number().required().messages(messages.id),
    season: Joi.number().messages(messages.season),
    episode: Joi.number().messages(messages.episode),
    time: Joi.number().messages(messages.time),
    translation: Joi.number().messages(messages.translation),
    quality: Joi.number().messages(messages.quality),
  });

  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.activationValidation = activationValidation;
module.exports.checkUserValidation = checkUserValidation;
module.exports.favoritesValidation = favoritesValidation;
module.exports.timestampValidation = timestampValidation;
