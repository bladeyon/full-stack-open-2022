const _ = require('lodash');

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

const mostBlogs = (blogs) => {
  const mostBlog = { author: '', blogs: 0 };
  const group = _.groupBy(blogs, 'author');
  const tmpObj = _.mapValues(group, 'length');
  const maxCount = Math.max(..._.values(tmpObj));
  let mostAuth = '';
  _.forOwn(tmpObj, (value, key) => {
    // const tempObjEntries = _.toPairs(tmpObj);
    // console.log(tempObjEntries);
    // for (const [key, value] of tempObjEntries) {
    // console.log('item', item);
    // const [key, value] = item;
    // _.forIn(tempObjEntries, ([key, value]) => {
    console.log(value, key);
    if (value === maxCount) {
      mostAuth = key;
    }
  });
  console.log(maxCount, mostAuth);
  mostBlog.author = mostAuth;
  mostBlog.blogs = maxCount;
  return mostBlog;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
};
