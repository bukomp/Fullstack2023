const config = require('./utils/config');
const express = require('express');
const app = express();
const cors = require('cors');
const blogsRouter = require('./controllers/blogs.controller');
const usersRouter = require('./controllers/users.controller');
const loginRouter = require('./controllers/login.controller');
const mongoose = require('mongoose');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');

mongoose.set('strictQuery', false);

logger.info('connecting to', config.MONGODB_URL);

mongoose
  .connect(config.MONGODB_URL)
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message);
  });

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

app.use('/api', [usersRouter, loginRouter]);
app.use('/api/blogs', blogsRouter);

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/test.controller');
  app.use('/api/testing', testingRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
