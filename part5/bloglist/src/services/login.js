import http from '../utils/http';

const baseUrl = '/api/login';

export const login = (data) => {
  return http.post(baseUrl, JSON.stringify(data));
};
