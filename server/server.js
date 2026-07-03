const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/kormyx_agency';

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const leadSchema = new mongoose.Schema({
  name: String,
  email: String,
  service: String,
  message: String,
  date: { type: Date, default: Date.now }
});

const Lead = mongoose.model('Lead', leadSchema);

const projectQuerySchema = new mongoose.Schema({
  serviceType: String,
  answers: [{ question: String, answer: String }],
  contactInfo: {
    name: String,
    email: String
  },
  date: { type: Date, default: Date.now }
});

const ProjectQuery = mongoose.model('ProjectQuery', projectQuerySchema);

app.post('/api/contact', async (req, res) => {
  try {
    const newLead = new Lead(req.body);
    await newLead.save();
    res.status(201).json({ message: 'Lead captured successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to capture lead' });
  }
});

app.post('/api/project-query', async (req, res) => {
  try {
    const newQuery = new ProjectQuery(req.body);
    await newQuery.save();
    res.status(201).json({ message: 'Project query captured successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to capture project query' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
