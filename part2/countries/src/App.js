import { useState, useEffect } from "react";
import axios from "axios";

const api_key = process.env.REACT_APP_API_KEY;

const App = () => {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(countries);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      const data = response.data;
      setCountries(data);
    });
  }, []);

  const handleQueryChange = (e) => {
    let value = e.target.value;
    setQuery(value);
    setTimeout(() => {
      filterCountries(countries, value);
    }, 300);
  };

  const filterCountries = (arr, query) => {
    const newResult = arr.filter((c) =>
      c.name.common.toLowerCase().includes(query.toLowerCase())
    );
    console.log(newResult);
    setResult(newResult);
  };

  return (
    <div>
      <Filter query={query} onChange={handleQueryChange} />
      <Countries result={result} />
    </div>
  );
};

const Filter = ({ query, onChange }) => {
  return (
    <div>
      filter countries <input value={query} onChange={onChange} />
    </div>
  );
};

const Countries = ({ result }) => {
  const [selCountry, setSelCountry] = useState();

  const showView = (country) => () => {
    setSelCountry(country);
  };

  if (result.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (result.length === 1) {
    const c = result[0];
    return <CountryView country={c} />;
  }
  return (
    <div>
      <ul>
        {result.map((c) => (
          <li key={c.name.official}>
            {c.name.common} <button onClick={showView(c)}>show</button>
          </li>
        ))}
      </ul>
      {JSON.stringify(selCountry) ? <CountryView country={selCountry} /> : ""}
    </div>
  );
};

const CountryView = ({ country }) => {
  const [weather, setWeather] = useState();
  const [lat, lon] = country.capitalInfo.latlng;
  // const part = "current";
  useEffect(() => {
    axios
      .get(
        // `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=${part}&appid=${api_key}`
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`
      )
      .then((response) => {
        const data = response.data;
        setWeather(data);
      });
  }, []);

  // const convertTemp = (value) => (((value - 32) * 5) / 9).toFixed(2); // 华氏度转换成摄氏度
  const convertTemp = (value) => (value - 273.15).toFixed(2); // 开氏温度比摄氏温度大 273.15°。

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>
      <h4>languages:</h4>
      <ul>
        {Object.values(country.languages).map((l) => (
          <li>{l}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt="flag" />
      {JSON.stringify(weather) ? (
        <div>
          <h4>Weather in {country.capital[0]}</h4>
          <p>
            temperature:
            {convertTemp(weather.main.temp)}
            Celsius
          </p>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="icon"
          />
          <p>wind {weather.wind.speed} m/s</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default App;
