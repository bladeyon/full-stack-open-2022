const morgan = require('morgan');

// const requestLogger = (req, res, next) => {
//   console.log(req.method, req.url, res.statusCode, res.statusMessage);
//   next();
// };

const requestLogger = morgan('tiny');

const errorHandler = (error, request, response, next) => {
  console.log(error.name, error.message);
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  }
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

module.exports = {
  requestLogger,
  errorHandler
};
