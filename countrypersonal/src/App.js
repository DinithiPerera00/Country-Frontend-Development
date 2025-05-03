import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AllCountriesPage from './pages/AllCountriesPage';
import CountryDetailsPage from './pages/CountryDetailsPage';
import RegionPage from './pages/RegionPage';
import Home from './pages/Home'; 
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import CountryAlphaPage from './pages/CountryAlphaPage';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/all" element={<AllCountriesPage />} />
          <Route path="/country/:code" element={<CountryDetailsPage />} />
          <Route path="/region/:regionName" element={<RegionPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/alpha/:code" element={<CountryAlphaPage />} />
          

        </Routes>
      </div>
    </Router>
  );
}

export default App;
