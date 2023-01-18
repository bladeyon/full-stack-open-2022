const morgan = require('morgan');
const logger = require('./logger');
// const requestLogger = (req, res, next) => {
//   console.log(req.method, req.url, res.statusCode, res.statusMessage);
//   next();
// };

const requestLogger = morgan('tiny');

const errorHandler = (error, request, response, next) => {
  logger.error(error.name, error.message);
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  }
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }
  if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  next(error);
};

const tokenExtractor = (request, response, next) => {
  const auth = request.get('Authorization');
  if (auth && auth.toLowerCase().startsWith('bearer')) {
    request.token = auth.slice(7);
  }
  next();
};

module.exports = {
  requestLogger,
  errorHandler,
  tokenExtractor
};
