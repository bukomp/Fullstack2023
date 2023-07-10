const blogsRouter = require("express").Router();
const Blog = require("../models/blog.schema");

blogsRouter.get("/blogs", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post("/blogs", async (request, response) => {
  if (!request.body.title || !request.body.url) {
    return response.sendStatus(400);
  }

  const blog = new Blog(request.body);

  const result = await blog.save();
  response.status(201).json(result);
});

module.exports = blogsRouter;
