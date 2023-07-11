const blogsRouter = require("express").Router();
const Blog = require("../models/blog.schema");
const middleware = require("../utils/middleware");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", "username name");
  response.json(blogs);
});

blogsRouter.post("/", middleware.userExtractor, async (request, response) => {
  const body = request.body;
  const user = request.user;

  if (!body.title || !body.url) {
    return response.status(400).json({ error: "title or url missing" });
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

blogsRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response) => {
    const blog = await Blog.findById(request.params.id);
    const user = request.user;

    if (blog.user.toString() !== user.id.toString()) {
      return response
        .status(401)
        .json({ error: "only the creator can delete blogs" });
    }

    await Blog.findByIdAndRemove(request.params.id);
    user.blogs = user.blogs.filter(
      (b) => b.id.toString() !== request.params.id
    );
    await user.save();

    response.status(204).end();
  }
);

blogsRouter.put("/:id", async (request, response) => {
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
