import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import profileRoutes from "./routes/profileRoutes.js";

<<<<<<< HEAD
const authRoutes = require('./routes/authRoutes');
const atsRoutes = require('./routes/atsRoutes');
const trackerRoutes = require('./routes/trackerRoutes');
=======
dotenv.config();
>>>>>>> 41cbdac13983c2b956376753827286bc671ebbdb

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

<<<<<<< HEAD
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
=======
// Routes
app.use("/api/profiles", profileRoutes);

// Server
>>>>>>> 41cbdac13983c2b956376753827286bc671ebbdb
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => console.log("❌ Mongo Error:", err));
