const express = require('express');
const mongoose = require('mongoose');
const Test = require('./models/TestModel');

const app = express();
app.use(express.json());

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/testdb';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Route: Fetch from DB
app.get('/api/test', async (req, res) => {
  const results = await Test.find();
  res.status(200).json(results);
});

module.exports = app;
