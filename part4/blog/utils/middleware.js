const morgan = require('morgan');

// const requestLogger = (req, res, next) => {
//   console.log(req.method, req.url, res.statusCode, res.statusMessage);
//   next();
// };

const requestLogger = morgan('tiny');

module.exports = {
  requestLogger
};
