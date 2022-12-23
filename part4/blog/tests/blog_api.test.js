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

describe('blogs api test', () => {
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
});

afterAll(() => {
  mongoose.connection.close();
});