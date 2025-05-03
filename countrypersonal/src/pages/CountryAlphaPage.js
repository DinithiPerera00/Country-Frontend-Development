import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function CountryAlphaPage() {
  const { code } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/alpha/${code}`)
      .then((res) => res.json())
      .then((data) => {
        setCountry(data[0]); // the API returns an array
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching country:", err);
        setLoading(false);
      });
  }, [code]);

  if (loading) return <p className="text-center mt-5">Loading country details...</p>;
  if (!country) return <p className="text-center mt-5">Country not found.</p>;

  return (
    <div className="container mt-5">
      <Link to="/all" className="btn btn-secondary mb-4">← Back to All Countries</Link>

      <div className="card shadow-lg p-4">
        <div className="text-center mb-4">
          <img
            src={country.flags.svg}
            alt={`${country.name.common} flag`}
            style={{ width: '150px', height: 'auto' }}
          />
        </div>

        <h2 className="text-center mb-3">{country.name.common}</h2>
        <p><strong>Official Name:</strong> {country.name.official}</p>
        <p><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</p>
        <p><strong>Region:</strong> {country.region}</p>
        <p><strong>Subregion:</strong> {country.subregion}</p>
        <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
        <p><strong>Timezones:</strong> {country.timezones.join(', ')}</p>
        <p><strong>Continents:</strong> {country.continents?.join(', ')}</p>
        <p><strong>Country Code:</strong> {country.cca3}</p>
      </div>
    </div>
  );
}

export default CountryAlphaPage;
