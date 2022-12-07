import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "hello note" }]);
  const [newName, setNewName] = useState("");

  const handleSave = (e) => {
    e.preventDefault();

    let isNameExist = persons.some((p) => p.name === newName);
    if (isNameExist) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat({ name: newName }));
    }
    setNewName("");
  };

  const handleNameChange = (e) => {
    let value = e.target.value;
    setNewName(value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSave}>
        name:
        <input name="text" value={newName} onChange={handleNameChange} />
        <button type="submit">save</button>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <li key={person.name}>{person.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
