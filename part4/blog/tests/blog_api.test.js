/**
 * 在执行 run test 时，参数解释：
 * --runInBand 会阻止jest并行执行test任务；
 * --forceExit 异步测试警告
 * test的第三个参数，默认超时是5s，第三个参数可以自定义超时时间
 */

const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

describe('blogs api tests', () => {
  test('get all blogs list', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  }, 10000);

  test('dose the id exist', async () => {
    // console.log(expect({ a: 1 }).toHaveProperty('id').toBeDefined());
    // expect({ a: 1 }).not.toHaveProperty('a');
    // const res = await api.get('/api/blogs'); // s.expect(200);
    // const blog = res.body.data;
    // console.log(res.body.data);
    // expect(blog[0].id).toBeDefined();

    const res = await api
      .get('/api/blogs/63a15a5f5d2684a3521ae12e')
      .expect(200);
    console.log(res.body);
    expect(res.body[0].id).toBeDefined();
  }, 100000);

  test('create blog', async () => {
    const res = await api
      .post('/api/blogs')
      // .send(JSON.stringify({
      //   title: 'hello supertest',
      //   author: 'Mike',
      //   url: 'http://localhost:3002/api/blogs',
      //   likes: 290
      // }))
      .send({
        title: 'hello supertest',
        author: 'Mike',
        url: 'http://localhost:3002/api/blogs',
        userId: '63abffedfcf6d540cd979946'
        // likes: 290
      })
      // .set('Accept', 'application/json')
      // .expect('Content-Type', /json/)
      .set(
        'Authorization',
        'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1pa2UiLCJpZCI6IjYzYWJmZmVkZmNmNmQ1NDBjZDk3OTk0NiIsImlhdCI6MTY3NDcxOTczOH0.hU8OVU8-3p2ZgMMPo13XWcCypMfhisg-RXCHORPdgbo'
      )
      .expect(201);
    expect(res.body.id).toBeDefined();
  }, 100000);

  test('create blog not token', async () => {
    const res = await api
      .post('/api/blogs')
      // .send(JSON.stringify({
      //   title: 'hello supertest',
      //   author: 'Mike',
      //   url: 'http://localhost:3002/api/blogs',
      //   likes: 290
      // }))
      .send({
        title: 'hello supertest',
        author: 'Mike',
        url: 'http://localhost:3002/api/blogs',
        userId: '63abffedfcf6d540cd979946'
        // likes: 290
      })
      // .set('Accept', 'application/json')
      // .expect('Content-Type', /json/)
      // .set(
      //   'Authorization',
      //   'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1pa2UiLCJpZCI6IjYzYWJmZmVkZmNmNmQ1NDBjZDk3OTk0NiIsImlhdCI6MTY3NDcxOTczOH0.hU8OVU8-3p2ZgMMPo13XWcCypMfhisg-RXCHORPdgbo'
      // )
      .expect(401);
    // expect(res.body.id).toBeDefined();
  }, 100000);

  test('delete a blog by id', async () => {
    const res = await api.get('/api/blogs');
    const delBlog = res.body[0];
    await api.delete(`/api/blogs/${delBlog.id}`).expect(204);
    // await api.delete('/api/blogs/63a5cd4092265a98e006e13b').expect(204);

    const newBlogs = await api.get('/api/blogs');

    const titles = newBlogs.body.map((b) => b.titles);
    expect(titles).not.toContain(delBlog.title);
  }, 100000);

  test('modify a blog', async () => {
    const res = await api.get('/api/blogs');
    const blog1 = res.body[0];
    const newTitle = 'hi put1';
    const modifyRes = await api
      .put(`/api/blogs/${blog1.id}`)
      .send({ title: newTitle })
      .expect(200)
      .expect('Content-Type', /application\/json/);
    const newBlog = modifyRes.body;
    expect(newBlog.title).toBe(newTitle);
  }, 10000);
});

describe('user api tests', () => {
  test('get user list', async () => {
    const res = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  }, 10000);

  test('create user', async () => {
    const newUser = { name: 'Mike', username: 'Mike', password: 'test' };
    const res = await api.post('/api/users').send(newUser).expect(201);

    expect(res.body.username).toBe(newUser.username);
  }, 10000);
});

afterAll(() => {
  mongoose.connection.close();
});
