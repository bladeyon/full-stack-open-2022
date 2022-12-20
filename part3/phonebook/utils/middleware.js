const logger = require("./logger");
const morgan = require("morgan");

// app.use(morgan("tiny"));
// morgan.token("type", (req) => req.headers["authorization"]);
// app.use(morgan(":type"));

const requestLogger = morgan((tokens, req, res) => {
  const method = tokens.method(req, res);
  const logs = [
    method,
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, "content-length"),
    "-",
    tokens["response-time"](req, res),
    "ms"
  ];
  if (method === "POST") {
    logs.push(JSON.stringify(req.body));
  }
  return logger.info(logs.join(" "));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

// error handling
const errorHandler = (error, request, response, next) => {
  console.log(error.message);
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
};
