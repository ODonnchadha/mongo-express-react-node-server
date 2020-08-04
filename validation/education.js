const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateEducationInput(data) {
  let errors = {};

  data.school = !isEmpty(data.school) ? data.school : '';
  if (validator.isEmpty(data.school)){
    errors.school = 'School is required';
  }
  
  data.degree = !isEmpty(data.degree) ? data.degree : '';
  if (validator.isEmpty(data.degree)){
    errors.degree = 'Degree is required';
  }

  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : '';
  if (validator.isEmpty(data.fieldofstudy)){
    errors.fieldofstudy = 'Field of study is required';
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