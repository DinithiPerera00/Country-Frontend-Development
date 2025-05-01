import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import CountryList from '../components/CountryList';

function RegionPage() {
  const { regionName } = useParams();
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/region/${regionName}`)
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
        setCountries(sorted);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching region countries:", err);
        setLoading(false);
      });
  }, [regionName]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Countries in {regionName}</h2>
      <Link to="/all" style={{ color: '#007bff' }}>← Back to All Countries</Link>
      <br /><br />
      {loading ? <p>Loading...</p> : <CountryList countries={countries} />}
    </div>
  );
}

export default RegionPage;
