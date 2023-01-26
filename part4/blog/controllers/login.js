const loginRouter = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  const user = await User.findOne({ username });

  const pwdCorrect =
    user === null ? false : await bcrypt.compare(password, user.password);

  if (!(user && pwdCorrect)) {
    res.status(401).json({ error: 'Invalid username or password' });
    return;
  }

  // generate token
  const userForToken = {
    username: user.username,
    id: user._id
  };

  const token = jwt.sign(userForToken, process.env.SECRET_KEY);

  res.status(200).json({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
