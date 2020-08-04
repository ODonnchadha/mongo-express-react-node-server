const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  if (!validator.isEmail(data.email)){
    errors.name = 'Email is invalid';
  }
  if (validator.isEmpty(data.email)){
    errors.email = 'Email is required';
  }
  
  data.password = !isEmpty(data.password) ? data.password : '';
  if (validator.isEmpty(data.password)){
    errors.password = 'Password is required';
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};