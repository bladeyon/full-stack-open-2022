const mongoose = require('mongoose');

const blogsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  url: { type: String, required: true },
  likes: { type: Number, default: 0 },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
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
