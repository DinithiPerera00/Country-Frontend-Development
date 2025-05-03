import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div
      style={{
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: 'url("/world.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        padding: '20px',
        color: 'white',
        textShadow: '1px 1px 4px #000',
      }}
    >
      {/* Top-right Login & Sign Up buttons */}
      <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
        <Link
          to="/login"
          style={{
            marginRight: '10px',
            padding: '8px 16px',
            backgroundColor: '#007bff',
            color: 'white',
            borderRadius: '4px',
            textDecoration: 'none',
          }}
        >
           Login
        </Link>
        <Link
          to="/signup"
          style={{
            padding: '8px 16px',
            backgroundColor: '#007bff',
            color: 'white',
            borderRadius: '4px',
            textDecoration: 'none',
          }}
        >
           SignUp
        </Link>
      </div>

      <div style={{ textAlign: 'center', maxWidth: '700px' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>
          🌍 Welcome to the Countries App
        </h1>
        <p style={{ fontSize: '1.25rem', marginBottom: '30px' }}>
          Choose a region to explore:
        </p>
        <div style={{ marginBottom: '40px', fontSize: '1.2rem' }}>
          <Link to="/region/Africa" style={{ margin: '0 10px', color: 'white' }}>Africa</Link>
          <Link to="/region/Americas" style={{ margin: '0 10px', color: 'white' }}>Americas</Link>
          <Link to="/region/Asia" style={{ margin: '0 10px', color: 'white' }}>Asia</Link>
          <Link to="/region/Europe" style={{ margin: '0 10px', color: 'white' }}>Europe</Link>
          <Link to="/region/Oceania" style={{ margin: '0 10px', color: 'white' }}>Oceania</Link>
        </div>
        <Link
          to="/all"
          style={{
            display: 'inline-block',
            padding: '12px 24px',
            backgroundColor: '#007bff',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '6px',
            fontSize: '1.1rem',
          }}
        >
          → View All Countries
        </Link>
      </div>
    </div>
  );
}

export default Home;
