const testingRouter = require('express').Router();
const Blog = require('../models/blog.schema');
const User = require('../models/user.schema');

testingRouter.post('/reset', async (request, response) => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  response.status(204).end();
});

module.exports = testingRouter;
