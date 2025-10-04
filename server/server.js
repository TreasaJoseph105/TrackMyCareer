require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config');

const authRoutes = require('./routes/authRoutes');
const atsRoutes = require('./routes/atsRoutes');
const trackerRoutes = require('./routes/trackerRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB()
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/ats', atsRoutes);
app.use('/api/tracker', trackerRoutes);

// Basic error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
