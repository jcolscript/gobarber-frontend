import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string;
}

export function getValidationErros(err: ValidationError): Errors {
  const validationError: Errors = {};

  err.inner.forEach(error => {
    validationError[error.path] = error.message;
  });

  return validationError;
}
