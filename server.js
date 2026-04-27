require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();

// Auto create uploads folder
const uploadDir = 'uploads/resumes';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log(`✅ Uploads folder created successfully`);
} else {
  console.log(`📁 Uploads folder already exists`);
}

// Middleware
app.use(cors());
app.use(express.json());

// Basic Routes
app.get('/', (req, res) => {
  res.send('🚀 Job Board Backend is Running!');
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working fine!' });
});

// We will connect real routes later
// app.use('/api/auth', require('./routes/authRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});