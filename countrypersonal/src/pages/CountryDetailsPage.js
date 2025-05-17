import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function CountryDetailsPage() {
  const { code } = useParams();
  const [country, setCountry] = useState(null);
  const [borderCountries, setBorderCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavourite, setIsFavourite] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchCountryDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
        if (!response.ok) throw new Error(`Country not found (status: ${response.status})`);

        const data = await response.json();
        if (!data || data.length === 0) throw new Error('Country data not available');

        setCountry(data[0]);

        if (data[0].borders?.length > 0) {
          const bordersResponse = await fetch(
            `https://restcountries.com/v3.1/alpha?codes=${data[0].borders.join(',')}`
          );
          const bordersData = await bordersResponse.json();
          setBorderCountries(bordersData);
        }

        // Check if this country is already in favourites
        const favs = JSON.parse(localStorage.getItem('favouriteCountries') || '[]');
        setIsFavourite(favs.includes(data[0].cca3));

      } catch (err) {
        console.error("Error fetching country:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCountryDetails();
  }, [code]);

  const handleFavouriteClick = async () => {
    const favs = JSON.parse(localStorage.getItem('favouriteCountries') || '[]');
    let updatedFavs;
    if (favs.includes(country.cca3)) {
      updatedFavs = favs.filter(c => c !== country.cca3);
      setIsFavourite(false);
    } else {
      updatedFavs = [...favs, country.cca3];
      setIsFavourite(true);
    }

    // Update favourites in localStorage
    localStorage.setItem('favouriteCountries', JSON.stringify(updatedFavs));

    // Update favourites on the server for the logged-in user
    if (token) {
      try {
        const response = await fetch('http://localhost:5000/profile/favourites', {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ favourites: updatedFavs }),
        });

        if (!response.ok) {
          throw new Error('Failed to update favourites on the server');
        }
      } catch (err) {
        console.error('Error updating favourites:', err);
      }
    }
  };

  if (loading) {
    return (
      <div style={{ background: 'url("/burj.jpg")', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ textAlign: 'center', padding: '40px', backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
          <div style={{ width: '50px', height: '50px', border: '5px solid #f3f3f3', borderTop: '5px solid #3498db', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 20px' }}></div>
          <p style={{ fontSize: '18px', color: '#333' }}>Loading country details...</p>
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ padding: '30px', backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', maxWidth: '500px', textAlign: 'center' }}>
          <p style={{ color: '#721c24', fontSize: '18px', marginBottom: '20px' }}><strong>Error:</strong> {error}</p>
          <Link to="/all" style={{ color: '#007bff', textDecoration: 'none', fontSize: '16px', padding: '8px 16px', border: '1px solid #007bff', borderRadius: '5px' }}>
            ← Back to All Countries
          </Link>
        </div>
      </div>
    );
  }

  if (!country) {
    return (
      <div style={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ padding: '30px', backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', maxWidth: '500px', textAlign: 'center' }}>
          <p style={{ fontSize: '18px', marginBottom: '20px' }}>Country not found.</p>
          <Link to="/all" style={{ color: '#007bff', textDecoration: 'none', fontSize: '16px', padding: '8px 16px', border: '1px solid #007bff', borderRadius: '5px' }}>
            ← Back to All Countries
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', minHeight: '100vh', padding: '20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
        <Link to="/all" style={{ color: '#007bff', display: 'inline-block', marginBottom: '20px', textDecoration: 'none', fontSize: '16px', padding: '8px 16px', backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '5px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
          ← Back to All Countries
        </Link>

        <div style={{ background: 'url("/burj.jpg")', borderRadius: '10px', padding: '30px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', marginTop: '20px' }}>
            <div style={{ flex: '1', minWidth: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <img src={country.flags.svg} alt={`${country.name.common} flag`} style={{ width: '100%', maxWidth: '400px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }} />
              {country.coatOfArms?.svg && (
                <div style={{ marginTop: '20px' }}>
                  <h3 style={{ marginBottom: '10px', color: '#555' }}>Coat of Arms</h3>
                  <img src={country.coatOfArms.svg} alt={`${country.name.common} coat of arms`} style={{ width: '100%', maxWidth: '200px', border: '1px solid #ddd', borderRadius: '8px' }} />
                </div>
              )}

              {/* Heart Button */}
              <button
                onClick={handleFavouriteClick}
                title={isFavourite ? "Remove from favourites" : "Add to favourites"}
                style={{
                  marginTop: '20px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '28px',
                  color: isFavourite ? 'red' : '#ccc',
                  transition: 'color 0.3s ease'
                }}
              >
                ♥
              </button>
            </div>

            <div style={{ flex: '1', minWidth: '300px', padding: '0 10px' }}>
              <h2 style={{ marginBottom: '20px', fontSize: '28px', color: '#333' }}>{country.name.common}</h2>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
                <div>
                  <h3 style={{ fontSize: '18px', marginBottom: '10px', color: '#555' }}>Basic Information</h3>
                  <p><strong>Official Name:</strong> {country.name.official}</p>
                  <p><strong>Capital:</strong> {country.capital?.join(', ') || 'N/A'}</p>
                  <p><strong>Region:</strong> {country.region}</p>
                  <p><strong>Subregion:</strong> {country.subregion || 'N/A'}</p>
                </div>

                <div>
                  <h3 style={{ fontSize: '18px', marginBottom: '10px', color: '#555' }}>Statistics</h3>
                  <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
                  <p><strong>Area:</strong> {country.area?.toLocaleString()} km²</p>
                  <p><strong>Country Code:</strong> {country.cca3}</p>
                  <p><strong>Timezone:</strong> {country.timezones?.join(', ') || 'N/A'}</p>
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ fontSize: '18px', marginBottom: '10px', color: '#555' }}>Languages</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {country.languages && Object.entries(country.languages).map(([code, lang]) => (
                    <span key={code} style={{ padding: '5px 10px', backgroundColor: '#f0f0f0', borderRadius: '15px', fontSize: '14px' }}>
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ fontSize: '18px', marginBottom: '10px', color: '#555' }}>Currencies</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {country.currencies && Object.entries(country.currencies).map(([code, currency]) => (
                    <span key={code} style={{ padding: '5px 10px', backgroundColor: '#f0f0f0', borderRadius: '15px', fontSize: '14px' }}>
                      {currency.name} ({currency.symbol || 'No symbol'})
                    </span>
                  ))}
                </div>
              </div>

              {borderCountries.length > 0 && (
                <div style={{ marginTop: '30px' }}>
                  <h3 style={{ fontSize: '18px', marginBottom: '10px', color: '#555' }}>Neighboring Countries</h3>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {borderCountries.map(borderCountry => (
                      <Link key={borderCountry.cca3} to={`/country/${borderCountry.cca3}`} style={{ padding: '8px 15px', backgroundColor: '#e9ecef', borderRadius: '5px', color: '#007bff', textDecoration: 'none', fontSize: '14px' }}>
                        {borderCountry.name.common}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CountryDetailsPage;
