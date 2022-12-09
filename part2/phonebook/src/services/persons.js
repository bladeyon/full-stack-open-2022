import axios from "axios";

const http = new axios.Axios({});
const baseUrl = "http://localhost:3001/persons";

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
  return res.then((response) => JSON.parse(response.data));
};
