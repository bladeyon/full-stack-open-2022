import { useState, useEffect } from "react";
import {
  getPersonList,
  addPerson,
  delPerson,
  putPerson
} from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(persons);

  useEffect(() => {
    console.log("execute effect");
    const data = getPersonList();
    data.then((data) => {
      reload(data);
    });
  }, []);

  const reload = (data) => {
    setPersons(data);
    filterPersons(data, query);
  };

  const handleSave = (e) => {
    e.preventDefault();

    let existIdx = persons.findIndex((p) => p.name === newName);
    if (existIdx !== -1) {
      const newPerson = {
        id: persons[existIdx].id,
        name: newName,
        phone: newPhone
      };
      const result = window.confirm(
        `${newName} is already added to phonebook, replace the old phone with a new one?`
      );
      if (result) {
        putPerson(newPerson).then((data) => {
          const newPersons = [...JSON.parse(JSON.stringify(persons))]; // simple copy
          newPersons.splice(existIdx, 1, newPerson); // replace
          reload(newPersons);
        });
      }
    } else {
      const newPerson = { name: newName, phone: newPhone };
      addPerson(newPerson).then((data) => {
        const newPersons = persons.concat(data);
        reload(newPersons);
      });
    }
    setNewName("");
    setNewPhone("");
  };

  const handleDelPerson = (person) => {
    const result = window.confirm(`Delete ${person.name} ?`);
    if (result) {
      delPerson(person.id).then(() => {
        const data = persons.filter((p) => p.id !== person.id);
        reload(data);
      });
    }
  };

  const handleNameChange = (e) => {
    let value = e.target.value;
    setNewName(value);
  };
  const handlePhoneChange = (e) => {
    let value = e.target.value;
    setNewPhone(value);
  };
  const handleQueryChange = (e) => {
    let value = e.target.value;
    setQuery(value);
    filterPersons(persons, value);
  };

  const filterPersons = (arr, query) => {
    const newResult = arr.filter((person) =>
      person.name.toLowerCase().includes(query.toLowerCase())
    );
    setResult(newResult);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter query={query} onChange={handleQueryChange} />
      <h2>Add new person</h2>
      <PersonForm
        onSubmit={handleSave}
        nameOpt={{ value: newName, onChange: handleNameChange }}
        phoneOpt={{ value: newPhone, onChange: handlePhoneChange }}
      />
      <h2>Numbers</h2>
      <Persons result={result} delPerson={handleDelPerson} />
    </div>
  );
};

const Filter = ({ query, onChange }) => {
  return (
    <div>
      filter person with <input value={query} onChange={onChange} />
    </div>
  );
};

const PersonForm = ({ onSubmit, nameOpt, phoneOpt }) => {
  return (
    <form onSubmit={onSubmit}>
      name:
      <input name="text" value={nameOpt.value} onChange={nameOpt.onChange} />
      phone:
      <input name="phone" value={phoneOpt.value} onChange={phoneOpt.onChange} />
      <button type="submit">save</button>
    </form>
  );
};

const Persons = ({ result, delPerson }) => {
  return (
    <ul>
      {result.map((person) => (
        <li key={person.name}>
          {person.name} {person.phone}
          <button onClick={() => delPerson(person)}>delete</button>
        </li>
      ))}
    </ul>
  );
};

export default App;
