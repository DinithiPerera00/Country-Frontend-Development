import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function CountryDetailsPage() {
  const { code } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/alpha/${code}`)
      .then((res) => res.json())
      .then((data) => {
        setCountry(data[0]); // v3.1 returns array
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching country:", err);
        setLoading(false);
      });
  }, [code]);

  if (loading) return <p>Loading country details...</p>;
  if (!country) return <p>Country not found.</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>{country.name.common}</h2>
      <img src={country.flags.svg} alt={`${country.name.common} flag`} width="150" />
      <p><strong>Official Name:</strong> {country.name.official}</p>
      <p><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</p>
      <p><strong>Region:</strong> {country.region}</p>
      <p><strong>Subregion:</strong> {country.subregion}</p>
      <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
      <p><strong>Country Code (CCA3):</strong> {country.cca3}</p>
      <br />
      <Link to="/all" style={{ color: '#007bff' }}>← Back to All Countries</Link>
    </div>
  );
}

export default CountryDetailsPage;
