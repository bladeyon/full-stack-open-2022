const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.method, req.url, res.statusCode, res.statusMessage);
  next();
});

// database
const databaseUrl = process.env.MONGODB_URL;
mongoose.connect(databaseUrl);
const blogsSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
});

const Blog = mongoose.model("Blog", blogsSchema);

app.get("/api/blogs", (req, res) => {
  Blog.find({}).then((result) => {
    res.json(result);
  });
});

app.post("/api/blogs", (req, res) => {
  const blog = { ...req.body };

  const newBlog = new Blog(blog);

  newBlog.save().then((result) => {
    res.status(201).json(result);
  });
});


const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
