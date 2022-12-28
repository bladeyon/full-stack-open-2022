const userRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

userRouter.get('/', async (req, res) => {
  const result = await User.find({});
  res.json(result);
});

userRouter.post('/', async (req, res, next) => {
  const data = { ...req.body };
  const user = new User(data);
  if (user.password?.length < 3) {
    res.status(400).send('Password length must be at least 3');
  }

  const users = await User.find({ username: user.username });
  if (users.length) {
    res.status(400).send(`username ${user.username} already exists`);
  }

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  try {
    const result = await user.save();
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = userRouter;
