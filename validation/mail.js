const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.user_id = !isEmpty(data.user_id) ? data.user_id : '';
  data.from = !isEmpty(data.from) ? data.from : '';
  data.to= !isEmpty(data.to) ? data.to : '';
  data.subject= !isEmpty(data.subject) ? data.subject : '';
  data.text= !isEmpty(data.text) ? data.text : '';

  if (Validator.isEmpty(data.user_id)) {
    errors.user_id = 'User id field is required';
  }

  if (!Validator.isEmail(data.from)) {
    errors.from = 'From is invalid';
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = 'From field is required';
  }

  if (!Validator.isEmail(data.to)) {
    errors.to = 'To is invalid';
  }

  if (Validator.isEmpty(data.to)) {
    errors.to = 'To field is required';
  }

  if (Validator.isEmpty(data.subject)) {
    errors.subject = 'Subject field is required';
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = 'Text field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
