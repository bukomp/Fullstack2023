require("dotenv").config();

const mongoose = require("mongoose");
const Blog = require("../models/blog.schema");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

test("1 blog is returned from DB", async () => {
  await Blog.deleteMany();
  await new Blog({
    title: "test1",
    author: "author1",
    url: "wadkbawda",
    likes: 2,
  }).save();

  const blogs = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  expect(blogs.body.length).toStrictEqual(1);
});

test("returned blogs have id property", async () => {
  await Blog.deleteMany();
  await new Blog({
    title: "test1",
    author: "author1",
    url: "wadkbawda",
    likes: 2,
  }).save();

  const blogs = await api.get("/api/blogs");

  expect(blogs.body[0].id).toBeDefined();
  expect(blogs.body[0]._id).not.toBeDefined();
});

test("blog is saved correctly", async () => {
  await Blog.deleteMany();

  let blogs = await api.get("/api/blogs");
  expect(blogs.body.length).toStrictEqual(0);

  await api
    .post("/api/blogs")
    .send({
      title: "test1",
      author: "author1",
      url: "wadkbawda",
      likes: 2,
    })
    .expect(201);

  blogs = await api.get("/api/blogs");
  expect(blogs.body.length).toStrictEqual(1);
  expect(blogs.body[0]).toHaveProperty(["title"]);
  expect(blogs.body[0]).toHaveProperty(["author"]);
  expect(blogs.body[0]).toHaveProperty(["url"]);
  expect(blogs.body[0]).toHaveProperty(["likes"]);
});

afterAll(async () => {
  await Blog.deleteMany();
  await mongoose.connection.close();
});
