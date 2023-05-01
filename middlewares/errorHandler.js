import ErrorResponse from '../utils/error.js';

const errorHandler = (err, req, res, next) => {
  const error = { ...err };
  error.message = err.message;

  // duplicate key value error (mongodb)
  if (err.code === 11000) {
    const message = `Duplicate value don't allowed!`;
    error = new ErrorResponse(message, 400);
  }
  //   mongoDB || validation error
  if (err.message === 'validationError') {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }
};

export default errorHandler;
