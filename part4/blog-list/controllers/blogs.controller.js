const blogsRouter = require("express").Router();
const Blog = require("../models/blog.schema");
const User = require("../models/user.schema");

blogsRouter.get("/blogs", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", "username name");
  response.json(blogs);
});

blogsRouter.post("/blogs", async (request, response) => {
  const { title, url } = request.body;

  if (!title || !url) {
    return response.status(400).end();
  }

  const user = await User.findOne();
  if (!user) {
    return response.status(500).send({ error: "no users in database" });
  }

  const blog = new Blog({
    title: title,
    author: user.name,
    url: url,
    user: user._id,
  });

  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
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
