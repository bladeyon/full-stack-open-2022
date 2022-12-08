import { useState } from "react";

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
      setPersons(persons.concat({ name: newName, phone: newPhone }));
    }
    setNewName("");
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
    console.log('query', value);
    setQuery(value);
    const newResult = persons.filter((person) =>
      person.name.toLowerCase().includes(value.toLowerCase())
    );
    console.log(query, newResult);
    setResult(newResult);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      filter person with <input value={query} onChange={handleQueryChange} />
      <h2>Add new person</h2>
      <form onSubmit={handleSave}>
        name:
        <input name="text" value={newName} onChange={handleNameChange} />
        phone:
        <input name="phone" value={newPhone} onChange={handlePhoneChange} />
        <button type="submit">save</button>
      </form>
      <h2>Numbers</h2>
      <ul>
        {result.map((person) => (
          <li key={person.name}>
            {person.name} {person.phone}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
