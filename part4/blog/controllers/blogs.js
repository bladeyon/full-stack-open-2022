const blogRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');

const getToken = (req) => {
  const auth = req.get('authorization');
  if (auth && auth.toLowerCase().startsWith('bearer')) {
    return auth.slice(7);
  }
  return null;
};

const getUserByToken = async (req, next) => {
  const token = getToken(req);
  console.log(token);
  const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
  console.log(decodedToken);
  if (!decodedToken.id) {
    next();
  }
  const user = await User.findById(decodedToken.id);
  console.log(user);
  if (!user) {
    // user not found
    next();
  }
  return user;
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
    if (!user.blogs.includes(id)) {
      return res
        .status(401)
        .json({ error: "Can't modify other people's blog" });
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
  try {
    const blog = await Blog.find({ _id: req.params.id });
    console.log(blog);
    // 判断是否存在
    if (blog.length) {
      await Blog.deleteOne({ _id: req.params.id });
      res.status(204).end();
    } else {
      console.log(`_id=${req.params.id} does not exist`);
      next();
    }
  } catch (error) {
    next(error);
  }
});

module.exports = blogRouter;
