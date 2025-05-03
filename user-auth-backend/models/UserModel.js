const mongoose = require('mongoose');

// ✅ Mongoose Profile Schema
const profileSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,  // Ensure email is unique
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,  // Email regex for validation
  },
  password: {
    type: String,
    required: true, // Password is required
  },
  userName: {
    type: String,
    unique: true,  // Ensure userName is unique
    sparse: true,  // Allows null values for userName (removes unique constraint on null)
  },

}, {
  timestamps: true,  // Automatically add createdAt and updatedAt fields
});

// Create Profile model
const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
