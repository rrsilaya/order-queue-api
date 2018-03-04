export const getErrors = err => {
  const errors = [];

  for (let key in err.errors) {
    errors.push(err.errors[key].message);
  }

  return errors;
}