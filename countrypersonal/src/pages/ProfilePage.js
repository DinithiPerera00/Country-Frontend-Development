import React, { useEffect, useState } from 'react';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('http://localhost:5000/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch profile: ${response.status}`);
        }

        const data = await response.json();
        setUser(data.profile);
        setFavourites(data.profile.favourites || []);
      } catch (error) {
        console.error('Profile fetch error:', error);
        setError(error.message);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchUserProfile();
    } else {
      setError('No token found. Please log in.');
      setLoading(false);
    }
  }, [token]);

  if (loading) return <div className="text-center mt-5">⏳ Loading user data...</div>;
  if (error) return <div className="alert alert-danger mt-5">⚠️ Error: {error}</div>;
  if (!user) return <div className="text-center mt-5">No user data available.</div>;

  return (
    <div
      className="min-vh-100"
      style={{
        backgroundColor: "lightblue",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh', 
        paddingTop: '2rem',
        paddingBottom: '2rem',
      }}
    >
      {/* User Info */}
      <div className="container bg-light p-4 rounded shadow-sm mb-5">
        <h2 className="text-center mb-4">👤 <strong>User Profile</strong></h2>
        <div className="row">
          <div className="col-md-6">
            <h5><strong>📧 Email:</strong> {user.email}</h5>
          </div>
        </div>
      </div>

      {/* Favourites */}
      <div className="container bg-white p-4 rounded shadow-sm">
        <h3 className="text-center mb-4">🌍 <strong>Favourite Countries</strong></h3>
        {favourites.length > 0 ? (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {favourites.map((item, index) => {
              const countryCode = typeof item === 'string' ? item : item.code;
              return (
                <div className="col" key={index}>
                  <div className="card h-100 text-center border-success p-3">
                    <div className="d-flex justify-content-center align-items-center">
                      <span className="fw-bold fs-5 me-4 text-dark">{countryCode}</span>
                      <a
                        href={`/country/${countryCode}`}
                        className="btn btn-outline-success"
                      >
                        View Details
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-muted mt-3">You haven’t added any favourite countries yet. ❤️</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
