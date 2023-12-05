const Joi = require("joi");

const registerUserValidation = (req, res, next) => {
  const Schema = Joi.object({
    fullName: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).alphanum().required(),
  });

  const { error, value } = Schema.validate(req.body); 
  if (error) {
    return res.status(400).json({ message: "Bad Request", error }); 
  }
  next();
};
const loginUserValidation = (req, res, next) => {
  const Schema = Joi.object({
    // fullName: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).alphanum().required(),
  });

  const { error, value } = Schema.validate(req.body); 
  if (error) {
    return res.status(400).json({ message: "Bad Request", error }); 
  }
  next();
};

module.exports = {registerUserValidation ,loginUserValidation};

