require("dotenv").config();

const mongoose = require("mongoose");
const User = require("../models/user.schema");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

test("1 user is returned from DB", async () => {
  await User.deleteMany({});

  const newUser = await api
    .post("/api/user")
    .send({
      name: "name1",
      username: "username1",
      password: "wadkbawda",
    })
    .expect(201)
    .expect("Content-Type", /application\/json/);

  expect(newUser).not.toHaveProperty(["passwordHash"]);

  const userList = await api.get("/api/user/all").expect(200);

  expect(userList.body.length).toStrictEqual(1);
});

test("user is not created if username is not unique", async () => {
  await User.deleteMany({});

  await api
    .post("/api/user")
    .send({
      name: "name1",
      username: "user",
      password: "password1",
    })
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const newUser = await api
    .post("/api/user")
    .send({
      name: "name2",
      username: "user",
      password: "password2",
    })
    .expect(400)
    .expect("Content-Type", /application\/json/);

  expect(newUser.body.error).toEqual("username already exists");

  const usersAtEnd = await api.get("/api/user/all").expect(200);
  expect(usersAtEnd.body.length).toStrictEqual(1);
});

test("user is not created if username or password are less than 3 characters long", async () => {
  await User.deleteMany({});

  const newUser = await api
    .post("/api/user")
    .send({
      name: "name",
      username: "us",
      password: "pass",
    })
    .expect(400)
    .expect("Content-Type", /application\/json/);

  expect(newUser.body.error).toEqual(
    "username and password must be at least 3 characters long"
  );

  const usersAtEnd = await api.get("/api/user/all").expect(200);
  expect(usersAtEnd.body.length).toStrictEqual(0);
});

afterAll(async () => {
  await User.deleteMany({});
  await mongoose.connection.close();
});
