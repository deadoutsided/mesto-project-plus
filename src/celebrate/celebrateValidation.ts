import { celebrate, Joi } from 'celebrate';
import linkRegEx from '../utils/utils';

export const objectIdValidation = celebrate({
  params: Joi.object({
    id: Joi.string().required().hex().length(24),
  }),
});

export const createUserValidation = celebrate({
  body: Joi.object({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
    avatar: Joi.string().pattern(linkRegEx),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
});

export const changeProfileValidation = celebrate({
  body: Joi.object({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(200),
  }),
});

export const changeAvatarValidation = celebrate({
  body: Joi.object({
    avatar: Joi.string().pattern(linkRegEx),
  }),
});

export const loginValidation = celebrate({
  body: Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
});

export const createCardValidation = celebrate({
  body: Joi.object({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().pattern(linkRegEx),
  }),
});
