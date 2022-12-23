const listHelper = require('../utils/list_helper');

test('dummy returns one', () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 5,
      __v: 0
    }
  ];
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test('sum of the likes of blogs', () => {
    const result = listHelper.totalLikes(listHelper.initBlogs);
    expect(result).toBe(36);
  });
});

describe('favorite blog', () => {
  test('max likes', () => {
    const result = listHelper.favoriteBlog(listHelper.initBlogs);
    // console.log(result);
    expect(result).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    });
  });

  test('most blogs', () => {
    const result = listHelper.mostBlogs(listHelper.initBlogs);
    expect(result).toEqual({ author: 'Robert C. Martin', blogs: 3 });
  });

  test('most likes', () => {
    const result = listHelper.mostLikes(listHelper.initBlogs);
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 17 });
  });
});
