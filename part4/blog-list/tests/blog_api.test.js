require("dotenv").config();

const mongoose = require("mongoose");
const Blog = require("../models/blog.schema");
const User = require("../models/user.schema");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

let token;
let user;

beforeAll(async () => {
  await User.deleteMany({});

  await api.post("/api/user").send({
    name: "name1",
    username: "test",
    password: "testPassword",
  });

  const userLogin = await api
    .post("/api/login")
    .send({
      username: "test",
      password: "testPassword",
    })
    .expect(200);

  token = userLogin.body.token;
  user = userLogin.body;
});

test("1 blog is returned from DB", async () => {
  await Blog.deleteMany({});

  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send({
      title: "test1",
      author: "author1",
      url: "wadkbawda",
      likes: 2,
      user: user.id,
    })
    .expect(201);

  const blogs = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  expect(blogs.body.length).toStrictEqual(1);
});

test("returned blogs have id property", async () => {
  await Blog.deleteMany({});
  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send({
      title: "test1",
      author: "author1",
      url: "wadkbawda",
      likes: 2,
      user: user.id,
    })
    .expect(201);

  const blogs = await api.get("/api/blogs");
  expect(blogs.body[0].id).toBeDefined();
  expect(blogs.body[0]._id).not.toBeDefined();
  expect(blogs.body[0].user).toBeDefined();
  expect(blogs.body[0].user.username).toBeDefined();
  expect(blogs.body[0].user.name).toBeDefined();
});

test("blog is saved correctly", async () => {
  await Blog.deleteMany({});

  let blogs = await api.get("/api/blogs");
  expect(blogs.body.length).toStrictEqual(0);

  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
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

test("expect likes to be 0 is not defined", async () => {
  await Blog.deleteMany({});

  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send({
      title: "test1",
      author: "author1",
      url: "wadkbawda",
    })
    .expect(201);

  const blogs = await api.get("/api/blogs");
  expect(blogs.body[0].likes).toStrictEqual(0);
});

test("malformed data returns error", async () => {
  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send({
      author: "author1",
      url: "wadkbawda",
    })
    .expect(400);

  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send({
      title: "test1",
      author: "author1",
    })
    .expect(400);
});

test("update blog entry", async () => {
  await Blog.deleteMany({});

  const newBlog = await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send({
      title: "test1",
      author: "author1",
      url: "wadkbawda",
    })
    .expect(201);

  await api
    .delete(`/api/blogs/${newBlog.body.id}`)
    .set("Authorization", `Bearer ${token}`)
    .expect(204);

  const blogs = await api.get("/api/blogs");
  expect(blogs.body.length).toStrictEqual(0);
});

test("update blog entry", async () => {
  await Blog.deleteMany({});

  const newBlog = await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send({
      title: "test1",
      author: "author1",
      url: "wadkbawda",
      likes: 0,
    })
    .expect(201);

  const updatedBlog = await api
    .put(`/api/blogs/${newBlog.body.id}`)
    .send({ likes: 10 })
    .expect(200);

  const blogs = await api.get("/api/blogs");
  expect(blogs.body[0].likes).toStrictEqual(10);
});

test("delete blog entry", async () => {
  await Blog.deleteMany();

  const newBlog = await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send({
      title: "test1",
      author: "author1",
      url: "wadkbawda",
    })
    .expect(201);

  await api
    .delete(`/api/blogs/${newBlog.body.id}`)
    .set("Authorization", `Bearer ${token}`)
    .expect(204);

  const blogs = await api.get("/api/blogs");
  expect(blogs.body.length).toStrictEqual(0);
});

test("delete blog entry by another user", async () => {
  await Blog.deleteMany();

  await api.post("/api/user").send({
    name: "name2",
    username: "test2",
    password: "testPassword2",
  });

  const anotherUserLogin = await api
    .post("/api/login")
    .send({
      username: "test2",
      password: "testPassword2",
    })
    .expect(200);

  const anotherUserToken = anotherUserLogin.body.token;

  const newBlog = await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send({
      title: "test1",
      author: "author1",
      url: "wadkbawda",
    })
    .expect(201);

  await api
    .delete(`/api/blogs/${newBlog.body.id}`)
    .set("Authorization", `Bearer ${anotherUserToken}`)
    .expect(401);

  const blogs = await api.get("/api/blogs");
  expect(blogs.body.length).toStrictEqual(1);
});

afterAll(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});
  await mongoose.connection.close();
});
