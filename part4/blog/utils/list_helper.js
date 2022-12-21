const dummy = (blogs) => 1;

const totalLikes = (blogs) => blogs.reduce((sum, item) => sum + item.likes, 0);

const favoriteBlog = (blogs) => {
  let maxLikes = 0;
  let favBlog = {};
  blogs.forEach((b) => {
    if (b.likes > maxLikes) {
      maxLikes = b.likes;
      const { title, author, likes } = b;
      favBlog = { title, author, likes };
    }
  });
  return favBlog;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
};
