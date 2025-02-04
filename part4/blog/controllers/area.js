const areaRouter = require('express').Router();
const http = require('http');
const url = require('url');

areaRouter.get('/', (req, ret) => {
  const reqUrl = url.parse(req.url);
  // console.log(reqUrl);
  const fileName = reqUrl.query.split('=')[1];
  const areaUrl = `http://geo.datav.aliyun.com/areas_v3/bound/${fileName}.json`;

  http
    .get(areaUrl, (res) => {
      const { statusCode } = res;
      const contentType = res.headers['content-type'];

      let error;
      // Any 2xx status code signals a successful response but
      // here we're only checking for 200.
      if (statusCode !== 200) {
        error = new Error('Request Failed.\n' + `Status Code: ${statusCode}`);
      } else if (!/^application\/json/.test(contentType)) {
        error = new Error(
          'Invalid content-type.\n'
            + `Expected application/json but received ${contentType}`
        );
      }
      if (error) {
        console.error(error.message);
        // Consume response data to free up memory
        res.resume();
        return;
      }

      // res.setEncoding('utf8');
      let rawData = '';
      res.on('data', (chunk) => {
        rawData += chunk;
      });
      res.on('end', () => {
        try {
          ret.end(rawData);
          // const parsedData = JSON.parse(rawData);
          // console.log(parsedData);
        } catch (e) {
          console.error(e.message);
        }
      });
    })
    .on('error', (e) => {
      console.error(`Got error: ${e.message}`);
    });
});

module.exports = areaRouter;
