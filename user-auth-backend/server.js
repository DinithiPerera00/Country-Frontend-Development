require('dotenv').config(); // Load environment variables

const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');  // Import bcryptjs for password hashing

const app = express();
const PORT = 5000;

// Middleware
app.use(cors({ origin: 'http://localhost:3000' }));  // Allow frontend on port 3000 to access the backend
app.use(express.json());

// Load secrets from .env
const JWT_SECRET = process.env.JWT_SECRET;
const MONGODB_URL = process.env.MONGODB_URL;

// ✅ Connect to MongoDB (no deprecated options)
mongoose.connect(MONGODB_URL)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Import the Profile model
const Profile = require('./models/UserModel'); // Import from the Profile.js file

// ✅ Signup Route
app.post('/signup', async (req, res) => {
  const { email, password, userName } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await Profile.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with that email' });
    }

    // Hash the password before saving the user
    const hashedPassword = await bcrypt.hash(password, 10);

    const newProfile = new Profile({ email, password: hashedPassword, userName });
    await newProfile.save();

    // Create a JWT token
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
    
    // Send the response
    res.status(201).json({ profile: newProfile, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Login Route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const profile = await Profile.findOne({ email });
    if (!profile) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check the password using bcrypt
    const isMatch = await bcrypt.compare(password, profile.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ profile, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});



// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});


