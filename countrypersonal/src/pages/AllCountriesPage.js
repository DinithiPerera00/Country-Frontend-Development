import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import CountryList from '../components/CountryList';
import { FaUserCircle } from 'react-icons/fa';

function AllCountriesPage() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const token = localStorage.getItem('token');

  const regions = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
        setCountries(sorted);
        setFilteredCountries(sorted);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching countries:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const filtered = countries.filter((country) => {
      const matchesSearch = country.name.common.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRegion = selectedRegion === 'All' || country.region === selectedRegion;
      return matchesSearch && matchesRegion;
    });
    setFilteredCountries(filtered);
  }, [searchTerm, selectedRegion, countries]);

  // Clear both filters
  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedRegion('All');
  };

  return (
    <div style={{ padding: '20px', position: 'relative' }}>
      {token && (
      <Link
        to="/profile"
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          fontSize: '1.8rem',
          color: '#000000',
          textDecoration: 'none',
        }}
        title="Profile"
      >
        <FaUserCircle style={{ fontSize: '1.6rem' }}  />
        
      </Link>
    )}


      <h2>All Countries</h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search countries..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: '8px 12px',
          marginBottom: '10px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          width: '100%',
          maxWidth: '400px'
        }}
      />

      {/* Region Dropdown */}
      <select
        value={selectedRegion}
        onChange={(e) => setSelectedRegion(e.target.value)}
        style={{
          padding: '8px 12px',
          marginBottom: '20px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          marginLeft: '10px'
        }}
      >
        {regions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>

      {/* Clear Filters Button */}
      <button
        onClick={handleClearFilters}
        style={{
          marginLeft: '10px',
          padding: '8px 16px',
          backgroundColor: '#ff5c5c',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Clear Filters
      </button>

      {/* Country Cards */}
      {loading ? <p>Loading...</p> : <CountryList countries={filteredCountries} />}
    </div>
  );
}

export default AllCountriesPage;
