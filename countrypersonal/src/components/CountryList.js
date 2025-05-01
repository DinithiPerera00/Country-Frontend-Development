import React from 'react';
import { Link } from 'react-router-dom';

function CountryList({ countries }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '20px',
      padding: '10px'
    }}>
      {countries.map((country, index) => (
        <Link
          to={`/country/${country.cca3}`}
          key={index}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <div style={{
            border: '1px solid #ddd',
            borderRadius: '10px',
            padding: '15px',
            textAlign: 'center',
            backgroundColor: '#f8f8f8',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s',
          }}>
            <img
              src={country.flags.svg}
              alt={`${country.name.common} flag`}
              style={{ width: '80px', height: 'auto', marginBottom: '10px' }}
            />
            <h4>{country.name.common}</h4>
            <p style={{ margin: 0 }}><strong>{country.cca3}</strong></p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default CountryList;
