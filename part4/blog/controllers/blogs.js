const blogRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');

const getUserByToken = async (req, next) => {
  console.log('getUserByToken:', req.token);

  try {
    const decodedToken = jwt.verify(req.token, process.env.SECRET_KEY);
    console.log('decodedToken:', decodedToken);
    if (decodedToken.id) {
      const user = await User.findById(decodedToken.id);
      console.log('user by token.id: ', user);
      if (!user) {
        throw new jwt.JsonWebTokenError('User does not exist');
      }
      return user;
    }
    throw new jwt.JsonWebTokenError('decodedToken.id does not exist');
  } catch (error) {
    next(error);
  }
};

blogRouter.get('/', async (req, res) => {
  const result = await Blog.find({}).populate('user', {
    username: 1,
    name: 1
  });
  res.json(result);
});

blogRouter.get('/:id', (req, res) => {
  Blog.find({ _id: req.params.id }).then((result) => {
    res.json(result);
  });
});

blogRouter.post('/', async (req, res, next) => {
  const data = { ...req.body };

  const user = await User.findById(data.userId);

  const newBlog = new Blog({
    title: data.title,
    url: data.url,
    likes: data.likes,
    user: user._id
  });
  try {
    const saveBlog = await newBlog.save();
    user.blogs = user.blogs.concat(newBlog._id);
    await user.save();
    res.status(201).json(saveBlog);
  } catch (err) {
    next(err);
  }
});

blogRouter.put('/:id', async (req, res, next) => {
  const user = await getUserByToken(req, next);
  const blog = { ...req.body };
  const { id } = req.params;
  try {
    if (user?.blogs && !user?.blogs.includes(id)) {
      res.status(401).json({ error: "Can't modify other people's blog" });
      return;
    }

    const result = await Blog.findByIdAndUpdate(id, blog, {
      new: true
    });
    res.json(result);
  } catch (err) {
    next(err);
  }
});

blogRouter.delete('/:id', async (req, res, next) => {
  const user = await getUserByToken(req, next);
  const { id } = req.params;

  try {
    if (!user.blogs.includes(id)) {
      res.status(401).json({ error: "Can't delete other people's blog" });
      return;
    }

    const blog = await Blog.findById(id);
    console.log(blog);
    // 判断是否存在
    if (blog) {
      await Blog.deleteOne({ _id: id });
      // 删除user.blogs中的id
      user.blogs = user.blogs.filter((b) => b.toString() !== id);
      await user.save();
      res.status(204).end();
    } else {
      console.log(`_id=${id} does not exist`);
      next();
    }
  } catch (error) {
    next(error);
  }
});

module.exports = blogRouter;
