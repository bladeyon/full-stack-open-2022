const express = require("express");

const http = express();

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

http.listen(3001, () => {
  console.log(`Server running on port 3001`);
});
