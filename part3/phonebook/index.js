const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const http = express();

http.use(cors());
http.use(express.json());
http.use(express.static('build'))

// http.use(morgan("tiny"));
morgan.token("type", (req, res) => req.headers["authorization"]);

http.use(morgan(":type"));

http.use(
  morgan((tokens, req, res) => {
    const method = tokens.method(req, res);
    const logs = [
      method,
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms"
    ];
    if (method === "POST") {
      logs.push(JSON.stringify(req.body));
    }
    return logs.join(" ");
  })
);

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
  response.end();
});

http.post("/api/persons", (request, response) => {
  const person = { ...request.body };

  if (!(person.name && person.number)) {
    response.statusMessage = "name or number missing";
    response.status(400).end();
    return;
  }

  // check repeat
  const idx = persons.findIndex((p) => p.name === person.name);
  if (idx > -1) {
    response.statusMessage = "name already exists";
    response.status(400).end();
    return;
  }

  let id = +Math.random().toString().slice(2);
  person.id = id;
  persons = persons.concat(person);
  response.send(person);
});

const PORT = process.env.PORT || 3001;
http.listen(PORT, () => {
  console.log(`Server running on port 3001`);
});
