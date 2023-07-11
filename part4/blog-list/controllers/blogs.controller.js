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

blogsRouter.delete("/blogs/:id", async (request, response) => {
  try {
    const blog = await Blog.findById(request.params.id);
    if (!blog) {
      return response.sendStatus(404);
    }

    await Blog.findByIdAndDelete(request.params.id);

    response.sendStatus(204);
  } catch (error) {
    return response.status(500).send(error);
  }
});

blogsRouter.put("/blogs/:id", async (request, response) => {
  try {
    const blog = await Blog.findById(request.params.id);
    if (!blog) {
      return response.sendStatus(404);
    }
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, {
      likes: request.body.likes,
    });

    response.status(200).json(updatedBlog);
  } catch (error) {
    return response.status(500).send(error);
  }
});

module.exports = blogsRouter;
