import './App.css';
import { legacy_createStore as createStore } from 'redux';
import counterReducer from './reducer';
import { useState } from 'react';


function App() {
  const store = createStore(counterReducer);
  const [data, setData] = useState(store.getState()); // Object.entries

  store.subscribe(() => {
    const newState = store.getState();
    console.log(newState);
    setData({ ...newState });
  });

  const changeState = (type) => {
    return () => {
      store.dispatch({ type });
    };
  };

  return (
    <div className='App'>
      <p>{data.good - data.bad}</p>
      <button onClick={changeState('GOOD')}>good</button>
      <button onClick={changeState('OK')}>ok</button>
      <button onClick={changeState('BAD')}>bad</button>
    </div>
  );
}

export default App;
