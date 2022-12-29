const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

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

blogRouter.put('/:id', (req, res, next) => {
  const blog = { ...req.body };
  const { id } = req.params;

  Blog.findByIdAndUpdate(id, blog, {
    new: true
  })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => next(err));
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
