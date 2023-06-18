export const errorHandler = (status, message) => {
  const error = new Error();
  error.message = message;
  return error;
};
