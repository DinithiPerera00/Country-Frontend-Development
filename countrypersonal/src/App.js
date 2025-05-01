import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCountries = (url) => {
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching countries:", err);
        setLoading(false);
      });
  };

  // Load all countries initially
  useEffect(() => {
    fetchCountries("https://restcountries.herokuapp.com/api/v1");
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Countries App</h1>

        <div style={{ marginBottom: "20px" }}>
          <button onClick={() => fetchCountries("https://restcountries.herokuapp.com/api/v1")}>
            All Countries
          </button>
          <button onClick={() => fetchCountries("https://restcountries.herokuapp.com/api/v1/region/Asia")}>
            Filter by Region: Asia
          </button>
          <button onClick={() => fetchCountries("https://restcountries.herokuapp.com/api/v1/currency/USD")}>
            Filter by Currency: USD
          </button>
          <button onClick={() => fetchCountries("https://restcountries.herokuapp.com/api/v1/callingcode/60")}>
            Filter by Calling Code: 60
          </button>
        </div>

        {loading ? (
          <p>Loading countries...</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {countries.map((country) => (
              <li key={country.alpha3Code} style={{ margin: '10px 0' }}>
                <strong>{country.name}</strong> — {country.region || "Unknown"}
              </li>
            ))}
          </ul>
        )}
      </header>
    </div>
  );
}

export default App;
