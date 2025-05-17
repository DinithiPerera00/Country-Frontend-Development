require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const verifyToken = require('./Middleware/auth'); // ✅ Use middleware file

const app = express();
const PORT = 5000;

// Middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// Load secrets from .env
const JWT_SECRET = process.env.JWT_SECRET;
const MONGODB_URL = process.env.MONGODB_URL;

// Connect to MongoDB
mongoose.connect(MONGODB_URL)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// User Model
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
    const newProfile = new Profile({ email, password: hashedPassword, userName, favourites: [] });
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

// Protected Route: Get Profile
app.get('/profile', verifyToken, async (req, res) => {
  try {
    const profile = await Profile.findOne({ email: req.user.email });
    if (!profile) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ profile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Protected Route: Update User's Favourites
app.put('/profile/favourites', verifyToken, async (req, res) => {
  const { favourites } = req.body;

  try {
    const profile = await Profile.findOne({ email: req.user.email });
    if (!profile) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Ensure favourites is an array
    if (!Array.isArray(favourites)) {
      return res.status(400).json({ message: 'Favourites should be an array of country codes' });
    }

    // Update the favourites list in the database
    profile.favourites = favourites;

    await profile.save();
    res.json({ message: 'Favourites updated successfully', favourites: profile.favourites });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
