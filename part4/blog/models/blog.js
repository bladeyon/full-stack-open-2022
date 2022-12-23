const mongoose = require('mongoose');

const blogsSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: { type: Number, default: 0 }
});

blogsSchema.set('toJSON', {
  transform: (doc, ret) => {
    const res = { ...ret };
    res.id = res._id.toString();
    delete res._id;
    delete res.__v;
    return res;
  }
});

const Blog = mongoose.model('Blog', blogsSchema);

module.exports = Blog;
