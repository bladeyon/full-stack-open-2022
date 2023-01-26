const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const logger = require('./logger');
const User = require('../models/user');
// const requestLogger = (req, res, next) => {
//   console.log(req.method, req.url, res.statusCode, res.statusMessage);
//   next();
// };

const requestLogger = morgan('tiny');

const errorHandler = (error, request, response, next) => {
  logger.error(error.name, '--->', error.message);
  if (error.name === 'CastError') {
    response.status(400).send({ error: 'malformatted id' });
    return;
  }
  if (error.name === 'ValidationError') {
    response.status(400).json({ error: error.message });
    return;
  }
  if (error.name === 'JsonWebTokenError') {
    response.status(401).json({ error: 'token missing or invalid' });
    return;
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

const userExtractor = async (request, response, next) => {
  const token = request?.token;
  if (token) {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    if (decodedToken.id) {
      const user = await User.findById(decodedToken.id);
      logger.info(user);
      if (user) {
        request.user = user;
      } else {
        next(new jwt.JsonWebTokenError('token error, user not exist'));
      }
    } else {
      next(new jwt.JsonWebTokenError('token error'));
    }
  } else {
    next(new jwt.JsonWebTokenError('token not exist'));
  }

  next();
};

module.exports = {
  requestLogger,
  errorHandler,
  tokenExtractor,
  userExtractor
};
