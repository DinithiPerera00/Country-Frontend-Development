import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(`❌ ${data.message}`);
      } else {
        setMessage('✅ Login successful!');
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setTimeout(() => navigate('/all'), 1000);
      }
    } catch (err) {
      console.error('Login error:', err);
      setMessage('❌ Error logging in. Please try again.');
    }
  };

  // Inline CSS styles
  const styles = {
    body: {
      backgroundImage: 'url("/world.jpg")',
      fontFamily: "'Asap', sans-serif",
      minHeight: '100vh',
      margin: 0,
      padding: 0,
    },
    container: {
      overflow: 'hidden',
      backgroundColor: 'white',
      padding: '40px 30px 30px 30px',
      borderRadius: '10px',
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: '400px',
      transform: 'translate(-50%, -50%)',
      boxShadow: '5px 10px 10px rgba(2, 128, 144, 0.2)',
      zIndex: 1,
    },
    input: {
      fontFamily: "'Asap', sans-serif",
      display: 'block',
      borderRadius: '5px',
      fontSize: '16px',
      background: 'white',
      width: '100%',
      border: '1px solid #ccc',
      padding: '10px 10px',
      margin: '15px 0',
    },
    button: {
      fontFamily: "'Asap', sans-serif",
      cursor: 'pointer',
      color: '#fff',
      fontSize: '16px',
      textTransform: 'uppercase',
      width: '100%',
      border: '0',
      padding: '10px 0',
      marginTop: '10px',
      borderRadius: '5px',
      backgroundColor: '#007bff',
    },
    link: {
      textDecoration: 'none',
      color: '#f45b69',
      fontSize: '14px',
    },
    alert: {
      textAlign: 'center',
      fontSize: '14px',
      padding: '8px',
      marginBottom: '10px',
      borderRadius: '5px',
    },
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>🔐 Login</h1>

        {message && (
          <div
            style={{
              ...styles.alert,
              backgroundColor: message.includes('✅') ? '#d4edda' : '#f8d7da',
              color: message.includes('✅') ? '#155724' : '#721c24',
            }}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <input
            name="email"
            type="email"
            placeholder="📧 Email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="🔒 Password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button}>
            🔓 Log In
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '15px' }}>
          Don't have an account?{' '}
          <Link to="/signup" style={styles.link}>
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
