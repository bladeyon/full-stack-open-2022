import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';

const useNote = (url) => {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    axios.get(url).then((res) => {
      setNotes(res.data);
    });
  }, [url]);
  return notes;
};

const App = () => {
  const [counter, setCounter] = useState(0);
  const [values, setValues] = useState([]);
  const notes = useNote(API_URL);

  const handleClick = () => {
    setCounter(counter + 1);
    setValues(values.concat(counter));
  };
  return (
    <div className="container">
      hello webpack {counter} clicks
      <button onClick={handleClick}>click</button>
      <div>
        {notes.length} notes on server {API_URL}
      </div>
    </div>
  );
};

export default App;
