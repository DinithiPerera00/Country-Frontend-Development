// app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// Load secrets from .env
const JWT_SECRET = process.env.JWT_SECRET;
const MONGODB_URL = process.env.MONGODB_URL;

// MongoDB connection (only connect if not already connected)
if (mongoose.connection.readyState === 0) {
  mongoose.connect(MONGODB_URL)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch((err) => console.error('❌ MongoDB connection error:', err));
}

// Import the Profile model
const Profile = require('./models/UserModel');

// Signup Route
app.post('/signup', async (req, res) => {
  const { email, password, userName } = req.body;

  try {
    const existingUser = await Profile.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with that email' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newProfile = new Profile({ email, password: hashedPassword, userName });
    await newProfile.save();

    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ profile: newProfile, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login Route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const profile = await Profile.findOne({ email });
    if (!profile) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, profile.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ profile, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = app;
