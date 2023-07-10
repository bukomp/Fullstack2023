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
}, 100000);

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
}, 100000);

afterAll(async () => {
  await Blog.deleteMany();
  await mongoose.connection.close();
});
