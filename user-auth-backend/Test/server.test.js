// Test/server.test.js
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const User = require('../models/UserModel'); // Adjust path

const user = {
  email: 'testuser@example.com',
  password: 'Password123!',
  userName: 'testuser'
};

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URL);
  await User.deleteMany({}); // Clear existing users
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('User Routes', () => {
  describe('POST /signup', () => {
    it('should sign up a new user and return a token', async () => {
      const res = await request(app)
        .post('/signup')
        .send(user);

      expect(res.status).toBe(201);
      expect(res.body.token).toBeDefined();
    });

    it('should return error if user already exists', async () => {
      const res = await request(app)
        .post('/signup')
        .send(user);

      expect(res.status).toBe(400);
    });
  });

  describe('POST /login', () => {
    it('should log in a user and return a token', async () => {
      const res = await request(app)
        .post('/login')
        .send({
          email: user.email,
          password: user.password
        });

      expect(res.status).toBe(200);
      expect(res.body.profile.email).toBe(user.email);
      expect(res.body.token).toBeDefined();
    });

    it('should return error for invalid credentials', async () => {
      const res = await request(app)
        .post('/login')
        .send({
          email: user.email,
          password: 'wrongpassword'
        });

      expect(res.status).toBe(401);
    });
  });
});
