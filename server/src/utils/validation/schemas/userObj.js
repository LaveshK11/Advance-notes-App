
const Joi = require("joi");

const registrationSchema = Joi.object({
  name: Joi.string().required().min(1).max(50),
  email: Joi.string().email({ tlds: false }).required(),
  password: Joi.string()
    .regex(/[0-9a-zA-Z]*\d[0-9a-zA-Z]*/) // at least one digit in any position
    .regex(/[0-9a-zA-Z]*[a-zA-Z][0-9a-zA-Z]*/) // at least one letter in any position
    .min(4)
    .required(),
});

const LoginSchema = Joi.object({
  email: Joi.string().email({ tlds: false }).required(),
  password: Joi.string()
    .regex(/[0-9a-zA-Z]*\d[0-9a-zA-Z]*/) // at least one digit in any position
    .regex(/[0-9a-zA-Z]*[a-zA-Z][0-9a-zA-Z]*/) // at least one letter in any position
    .min(4)
    .required(),
});

module.exports = { registrationSchema, LoginSchema };