const bcrypt = require("bcryptjs");
const usersRouter = require("express").Router();
const User = require("../models/user.schema");

usersRouter.post("/user", async (request, response) => {
  const { username, name, password } = request.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

usersRouter.get("/user/all", async (request, response) => {
  const allUsers = await User.find({});
  return response.status(200).json(allUsers);
});

module.exports = usersRouter;
