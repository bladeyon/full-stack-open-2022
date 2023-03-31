import axios from 'axios';
import getToken from './index';

const config = {
  // baseUrl: 'http://localhost:3001/',
  timeout: 10 * 1000,
  requestOptions: {
    withToken: true,
    authenticationScheme: 'bearer'
  }
};
const instance = axios.create(config);

instance.interceptors.request.use((config) => {
  const token = getToken();
  if (config.requestOptions?.withToken) {
    config.headers['Authorization'] = config.requestOptions
      ?.authenticationScheme
      ? `${config.requestOptions?.authenticationScheme} ${token}`
      : token;
  }
  if (config.method === 'post') {
    config.headers['Content-Type'] = 'application/json;charset=utf-8';
  }

  return config;
});
instance.interceptors.response.use(
  (response) => {
    const data = response.data;
    // console.log('interceptors.response', data);
    if (response.status.toString().padStart('2')) {
      return data;
    } else {
      return Promise.reject(data);
    }
  },
  (error) => {
    const { response, code, message, config } = error || {};
    return Promise.reject(response?.data?.error ?? message);
  }
);

export default instance;
