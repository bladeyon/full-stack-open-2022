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

test('get all blogs list', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
}, 10000);

afterAll(() => {
  mongoose.connection.close();
});
