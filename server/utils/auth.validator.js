const Joi = require("joi");
const errorFunction = require("./errorFunction")
const passwordComplexity = require("joi-password-complexity");

const authvalidation = Joi.object({
    email: Joi.string().email().required(),
    password: passwordComplexity().required()
});

module.exports = authvalidation