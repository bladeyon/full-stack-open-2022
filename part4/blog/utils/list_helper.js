const _ = require('lodash');

const initBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
];

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

const mostLikes = (blogs) => {
  const mostLike = {};
  const group = _.groupBy(blogs, 'author');
  const tmpObj = _.mapValues(group, (g) => {
    console.log('g', g);
    return g.reduce((sum, item) => sum + item.likes, 0);
  });
  console.log('l', tmpObj);
  const maxCount = Math.max(..._.values(tmpObj));
  let mostAuth = '';
  _.forOwn(tmpObj, (value, key) => {
    if (value === maxCount) {
      mostAuth = key;
    }
  });
  mostLike.author = mostAuth;
  mostLike.likes = maxCount;
  return mostLike;
};

module.exports = {
  initBlogs,
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};
