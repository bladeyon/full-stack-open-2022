const personRouter = require("express").Router();
const Person = require("../models/person");

personRouter.get("/", (request, response) => {
  Person.find({}).then((result) => {
    response.send(result);
  });
});

personRouter.get("/info", (request, response) => {
  response.setHeader("Content-Type", "text/html");
  Person.count().then((count) => {
    response.send(`
  <p>Phonebook has info for ${count} people</p>
  <p>${new Date()}</P>
  `);
  });
});

personRouter.get("/:id", (request, response, next) => {
  const id = request.params.id;
  Person.findById(id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end(`The person with id ${id} was not found`);
      }
    })
    .catch((err) => {
      next(err);
    });
});

personRouter.delete("/:id", (request, response, next) => {
  const id = request.params.id;
  Person.findByIdAndRemove(id)
    .then(() => {
      response.end();
    })
    .catch((error) => {
      next(error);
    });
});

personRouter.post("/", (request, response, next) => {
  const person = { ...request.body };

  // if (!(person.name && person.number)) {
  //   // response.statusMessage = "name or number missing";
  //   response.status(400).send({ error: "name or number missing" });
  //   return;
  // }

  // check repeat
  Person.find({ name: person.name }).then((res) => {
    if (res.length) {
      // response.statusMessage = "name already exists";
      response.status(400).send({ error: "name already exists" });
      return;
    }

    const newPerson = new Person(person);
    newPerson
      .save()
      .then((res) => {
        console.log(res, `added ${res.name} ${res.number} to phonebook`);
        response.send(res);
      })
      .catch((error) => {
        next(error);
      });
  });
});

personRouter.put("/:id", (request, response, next) => {
  const person = { ...request.body };
  const id = request.params.id;

  // if (!(person.name && person.number)) {
  //   response.statusMessage = "name or number missing";
  //   response.status(400).end();
  //   return;
  // }

  Person.findByIdAndUpdate(id, person, {
    new: true, // 默认为false, 返回更新前的对象；设为true,返回更新后的person
    runValidators: true
  })
    .then((res) => {
      console.log(`modify ${res.name} ${res.number} to phonebook`);
      response.send(res);
    })
    .catch((error) => next(error));
});

module.exports = personRouter;
