import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function SignUpPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(formData);  // Log formData for debugging

      const res = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(`❌ ${data.message}`);
      } else {
        setMessage('✅ Signup successful!');
        console.log('User created:', data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/login');
      }
    } catch (err) {
      console.error(err);
      setMessage('❌ Something went wrong.');
    }
  };

  return (
    <div style={styles.body}>
      <div style={styles.main}>
        <div style={styles.signup}>
          <form onSubmit={handleSubmit} style={styles.form}>
            <label htmlFor="chk" aria-hidden="true" style={styles.label}>📝 Create Your Account</label>

            {message && (
              <div style={styles.alert}>{message}</div>
            )}

            <input
              name="name"
              type="text"
              placeholder="👤 Full Name"
              value={formData.name}
              onChange={handleChange}
              style={styles.input}
              required
            />
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
            <button type="submit" style={styles.button}>🚀 Sign Up Now</button>

            <p style={styles.loginLink}>
              Already have an account?{' '}
              <Link to="/login" style={styles.link}>Log in here</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

const styles = {
  body: {
    margin: 0,
    backgroundImage: 'url("/world.jpg")',
    padding: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    fontFamily: "'Jost', sans-serif",
    background: 'linear-gradient(to bottom, #0f0c29, #302b63, #24243e)',
  },
  main: {
    width: '350px',
    height: '600px',
    overflow: 'hidden',
    backgroundImage: 'url("/world.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '10px',
    boxShadow: '5px 20px 50px #000',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signup: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    backdropFilter: 'blur(5px)',
    padding: '30px',
    borderRadius: '10px',
    boxSizing: 'border-box',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '15px',
  },
  label: {
    color: '#573b8a',
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '10px',
    textAlign: 'center',
  },
  alert: {
    backgroundColor: '#e0e0e0',
    color: '#000',
    padding: '10px 15px',
    borderRadius: '5px',
    fontSize: '1rem',
    textAlign: 'center',
    width: '100%',
  },
  input: {
    width: '100%',
    padding: '12px',
    borderRadius: '5px',
    border: 'none',
    background: '#e0dede',
    outline: 'none',
    fontSize: '1rem',
  },
  button: {
    width: '100%',
    padding: '12px',
    background: '#007bff',
    color: '#fff',
    fontSize: '1rem',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: '0.2s ease-in',
  },
  loginLink: {
    marginTop: '10px',
    fontSize: '1rem',
    textAlign: 'center',
  },
  link: {
    color: '#573b8a',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};

export default SignUpPage;
