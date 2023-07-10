require("dotenv").config();

const mongoose = require("mongoose");
const Blog = require("../models/blog.schema");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

test("blogs are returned as json", async () => {
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

afterAll(async () => {
  await mongoose.connection.close();
});
