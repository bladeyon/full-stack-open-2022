import axios from "axios";

const http = new axios.Axios({});
const baseUrl = "/api/persons";

export const getPersonList = () => {
  const res = http.get(baseUrl);
  return res.then((response) => JSON.parse(response.data));
};

export const addPerson = (person) => {
  const res = http.post(baseUrl, JSON.stringify(person), {
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    }
  });
  return res.then((response) => {
    const data = JSON.parse(response.data);
    if (response.status === 200) {
      return data;
    }
    return Promise.reject(data);
  });
};

export const delPerson = (id) => {
  return http.delete(`${baseUrl}/${id}`).then((response) => {
    const data = JSON.parse(response.data);
    if (response.status === 200) {
      return data;
    }
    return Promise.reject(data);
  });
};

export const putPerson = (person) => {
  return http
    .put(`${baseUrl}/${person.id}`, JSON.stringify(person), {
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      }
    })
    .then((response) => {
      const data = JSON.parse(response.data);
      if (response.status === 200) {
        return data;
      }
      return Promise.reject(data);
    });
};
