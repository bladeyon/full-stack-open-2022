import { useState, useEffect } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", phone: "040-123456", id: 1 },
    { name: "Ada Lovelace", phone: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", phone: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", phone: "39-23-6423122", id: 4 }
  ]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(persons);

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
