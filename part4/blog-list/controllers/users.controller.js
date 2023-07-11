const bcrypt = require("bcryptjs");
const usersRouter = require("express").Router();
const User = require("../models/user.schema");

usersRouter.post("/user", async (request, response) => {
  const { username, name, password } = request.body;

  if (!username || !password) {
    return response
      .status(400)
      .send({ error: "username and password must be provided" });
  }

  if (username.length < 3 || password.length < 3) {
    return response.status(400).send({
      error: "username and password must be at least 3 characters long",
    });
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return response.status(400).send({ error: "username already exists" });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  try {
    const savedUser = await user.save();
    response.status(201).json(savedUser);
  } catch (error) {
    response.status(500).send({ error: "could not save user" });
  }
});

usersRouter.get("/user/all", async (request, response) => {
  const allUsers = await User.find({});
  return response.status(200).json(allUsers);
});

module.exports = usersRouter;
