const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateExperienceInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  if (validator.isEmpty(data.title)){
    errors.title = 'Job title is required';
  }
  
  data.company = !isEmpty(data.company) ? data.company : '';
  if (validator.isEmpty(data.company)){
    errors.company = 'Company is required';
  }

  data.from = !isEmpty(data.from) ? data.from : '';
  if (validator.isEmpty(data.from)){
    errors.from = 'From date is required';
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};