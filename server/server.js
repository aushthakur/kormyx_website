const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const { google } = require('googleapis');

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

const meetingSchema = new mongoose.Schema({
  name: String,
  email: String,
  date: String,
  time: String,
  createdAt: { type: Date, default: Date.now }
});

const Meeting = mongoose.model('Meeting', meetingSchema);

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

app.post('/api/schedule', async (req, res) => {
  try {
    const { name, email, date, time } = req.body;

    // Save to Database
    const newMeeting = new Meeting({ name, email, date, time });
    await newMeeting.save();

    // Google Calendar Integration
    // Requires GOOGLE_APPLICATION_CREDENTIALS in .env pointing to the service account JSON
    try {
      if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
        const auth = new google.auth.GoogleAuth({
          scopes: ['https://www.googleapis.com/auth/calendar']
        });
        
        const calendar = google.calendar({ version: 'v3', auth });
        
        // Convert date and time to ISO format
        const startDateTime = new Date(`${date} ${time}`).toISOString();
        const endDateTime = new Date(new Date(startDateTime).getTime() + 60 * 60 * 1000).toISOString(); // 1 hour meeting

        const event = {
          summary: `Strategy Meeting with ${name}`,
          description: `Discovery call scheduled by ${name} (${email})`,
          start: {
            dateTime: startDateTime,
            timeZone: 'America/Los_Angeles', // Can be configured
          },
          end: {
            dateTime: endDateTime,
            timeZone: 'America/Los_Angeles',
          },
          attendees: [
            { email: email }
          ],
        };

        await calendar.events.insert({
          calendarId: 'primary',
          resource: event,
          sendUpdates: 'all' // Sends email to attendees
        });
        console.log('Google Calendar event created successfully.');
      } else {
        console.warn('Google Calendar credentials not provided. Saved to DB only.');
      }
    } catch (calendarError) {
      console.error('Failed to create Google Calendar event:', calendarError);
      // Still return success since DB save worked
    }

    res.status(201).json({ message: 'Meeting scheduled successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to schedule meeting' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
