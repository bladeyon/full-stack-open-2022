import http from '../utils/http';

const baseUrl = '/api/blogs';

export const getBlogList = () => {
  return http.get(baseUrl);
};

export const addBlog = (blog) => {
  return http.post(baseUrl, JSON.stringify(blog));
};

export const delBlog = (id) => {
  return http.delete(`${baseUrl}/${id}`);
};

export const putBlog = (blog) => {
  return http.put(`${baseUrl}/${blog.id}`, JSON.stringify(blog));
};
