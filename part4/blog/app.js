const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./utils/config');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');
const blogRouter = require('./controllers/blogs');
const userRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');

const app = express();

const databaseUrl = config.MONGODB_URL;
mongoose
  .connect(databaseUrl)
  .then(() => {
    logger.info('Already connect to MongoDB');
  })
  .catch((err) => {
    logger.error('Error connect to MongoDB:', err.message);
  });

// middleware
app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

app.use('/api/login', loginRouter);
app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);

app.use(middleware.errorHandler);

module.exports = app;
