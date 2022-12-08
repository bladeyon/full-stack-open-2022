import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(persons);

  useEffect(() => {
    console.log("execute effect");
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log(response);
      const data = response.data;
      setPersons(data);
      filterPersons(data, query);
    });
  }, []);
  console.log("persons", persons.length);
  const handleSave = (e) => {
    e.preventDefault();

    let isNameExist = persons.some((p) => p.name === newName);
    if (isNameExist) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const newPersons = persons.concat({ name: newName, phone: newPhone });
      setPersons(newPersons);
      filterPersons(newPersons, query);
    }
    setNewName("");
    setNewPhone("");
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
    console.log("query", value);
    setQuery(value);
    filterPersons(persons, value);
  };

  const filterPersons = (arr, query) => {
    const newResult = arr.filter((person) =>
      person.name.toLowerCase().includes(query.toLowerCase())
    );
    console.log(query, newResult);
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
      <Persons result={result} />
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

const Persons = ({ result }) => {
  return (
    <ul>
      {result.map((person) => (
        <li key={person.name}>
          {person.name} {person.phone}
        </li>
      ))}
    </ul>
  );
};

export default App;
