const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();
const { google } = require('googleapis');

const app = express();
app.use(cors());
app.use(express.json());
// Serve uploads statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ensure uploads directory exists
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

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
  selectedServices: [{
    service: String,
    subService: String
  }],
  createdAt: { type: Date, default: Date.now }
});

const Meeting = mongoose.model('Meeting', meetingSchema);

// --- New Blog Model ---
const blogSchema = new mongoose.Schema({
  title: String,
  category: String,
  author: String,
  readTime: String,
  description: String,
  content: String, // Stored as HTML
  imageUrl: String,
  date: { type: String, default: () => new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) },
  createdAt: { type: Date, default: Date.now }
});

const Blog = mongoose.model('Blog', blogSchema);

// --- Multer Configuration ---
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// --- Authentication Middleware ---
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET || 'super_secret', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// ==========================================
// PUBLIC ROUTES (Client Website)
// ==========================================

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
    const { name, email, date, time, selectedServices } = req.body;

    // Save to Database
    const newMeeting = new Meeting({ name, email, date, time, selectedServices });
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

// Fetch all published blogs for the client site
app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
});

// Fetch a single blog by ID
app.get('/api/blogs/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch blog' });
  }
});

// ==========================================
// ADMIN PANEL ROUTES (Protected)
// ==========================================

// Login Route
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  const adminUser = process.env.ADMIN_USERNAME || 'admin';
  const adminPass = process.env.ADMIN_PASSWORD || 'password';

  if (username === adminUser && password === adminPass) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET || 'super_secret', { expiresIn: '24h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Fetch Dashboard Data
app.get('/api/admin/dashboard-data', authenticateToken, async (req, res) => {
  try {
    const leads = await Lead.find().sort({ date: -1 });
    const queries = await ProjectQuery.find().sort({ date: -1 });
    const meetings = await Meeting.find().sort({ createdAt: -1 });
    
    res.json({ leads, queries, meetings });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
});

// Post a new Blog (with Image Upload)
app.post('/api/admin/blogs', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    const { title, category, author, readTime, description, content } = req.body;
    let imageUrl = '';
    
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }

    const newBlog = new Blog({
      title,
      category,
      author,
      readTime,
      description,
      content,
      imageUrl
    });

    await newBlog.save();
    res.status(201).json({ message: 'Blog published successfully', blog: newBlog });
  } catch (error) {
    res.status(500).json({ error: 'Failed to publish blog' });
  }
});

// --- RENDER KEEP-ALIVE PING ---
// Render free tier spins down after 15 mins of inactivity.
// This hits a lightweight endpoint every 10 minutes (600,000ms) to keep it alive.
app.get('/api/ping', (req, res) => {
  res.status(200).send('Pong');
});

setInterval(() => {
  const url = process.env.RENDER_EXTERNAL_URL 
    ? `${process.env.RENDER_EXTERNAL_URL}/api/ping` 
    : `http://localhost:${PORT}/api/ping`;

  const client = url.startsWith('https') ? require('https') : require('http');
  
  client.get(url, (resp) => {
    console.log(`[Keep-Alive] Ping successful - Status: ${resp.statusCode}`);
  }).on("error", (err) => {
    console.log(`[Keep-Alive] Ping failed: ${err.message}`);
  });
}, 600000); // 10 minutes

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
