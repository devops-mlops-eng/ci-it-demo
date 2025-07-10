const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');
const Test = require('../../models/TestModel');

beforeAll(async () => {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/testdb';
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  await Test.deleteMany(); // clear previous data
  await Test.create({ message: 'Hello from test DB' });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('GET /api/test', () => {
  it('should return data from MongoDB', async () => {
    const res = await request(app).get('/api/test');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty('message', 'Hello from test DB');
  });
});
