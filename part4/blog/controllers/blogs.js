const blogRouter = require('express').Router();
const Blog = require('../models/blog');

blogRouter.get('/', (req, res) => {
  Blog.find({}).then((result) => {
    res.json(result);
  });
});
blogRouter.get('/:id', (req, res) => {
  Blog.find({ _id: req.params.id }).then((result) => {
    res.json(result);
  });
});

blogRouter.post('/', (req, res, next) => {
  const blog = { ...req.body };

  const newBlog = new Blog(blog);

  newBlog
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => next(err));
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
