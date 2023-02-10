import axios from 'axios';
import getToken from './index';

const config = {
  // baseUrl: 'http://localhost:3001/',
  timeout: 10 * 1000
};
const instance = axios.create(config);

instance.interceptors.request.use((config) => {
  if (!config.url.includes('/login')) {
    config.headers['Authorization'] = `bearer ${getToken()}`;
  }
  if (config.method === 'post') {
    config.headers['Content-Type'] = 'application/json;charset=utf-8';
  }

  return config;
});
instance.interceptors.response.use((response) => {
  const data = response.data;
  if (response.status >= 200) {
    return data;
  } else {
    return Promise.reject(data);
  }
});

export default instance;
