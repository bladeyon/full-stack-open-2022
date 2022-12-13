const express = require("express");

const http = express();
http.use(express.json());

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456"
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523"
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345"
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122"
  }
];

http.get("/api/persons", (request, response) => {
  response.send(persons);
});

http.get("/info", (request, response) => {
  response.setHeader("Content-Type", "text/html");
  response.send(`
  <p>Phonebook has info for ${persons.length} people</p>
  <p>${new Date()}</P>
  `);
});

http.get("/api/persons/:id", (request, response) => {
  const id = +request.params.id;
  const person = persons.find((p) => p.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).json(`The person with id ${id} was not found`);
  }
});

http.delete("/api/persons/:id", (request, response) => {
  const id = +request.params.id;
  const delIdx = persons.findIndex((p) => p.id === id);
  if (delIdx > -1) {
    persons.splice(delIdx, 1);
  } else {
    response.status(404).json(`The person with id ${id} was not found`);
  }
  response.json();
});

http.post("/api/persons", (request, response) => {
  const person = request.body;

  let id = +Math.random().toString().slice(2);
  person.id = id;
  persons = persons.concat(person);
  response.send(person);
});

http.listen(3001, () => {
  console.log(`Server running on port 3001`);
});
