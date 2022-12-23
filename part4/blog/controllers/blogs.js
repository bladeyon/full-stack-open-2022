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

module.exports = blogRouter;
