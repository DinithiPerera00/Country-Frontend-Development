import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import AllCountriesPage from './pages/AllCountriesPage';
import CountryDetailsPage from './pages/CountryDetailsPage';
import './App.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="App-header">
      <h1>Countries App</h1>
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => navigate('/all')}>All Countries</button>
        {/* Future buttons can navigate to other pages like /region, /currency, etc. */}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/all" element={<AllCountriesPage />} />
        </Routes>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/all" element={<AllCountriesPage />} />
          <Route path="/country/:code" element={<CountryDetailsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
