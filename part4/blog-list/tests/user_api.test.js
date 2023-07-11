require("dotenv").config();

const mongoose = require("mongoose");
const User = require("../models/user.schema");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

test("1 user is returned from DB", async () => {
  await User.deleteMany();

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

afterAll(async () => {
  await User.deleteMany();
  await mongoose.connection.close();
});
