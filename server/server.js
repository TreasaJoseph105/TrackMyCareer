import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import profileRoutes from "./routes/profileRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/profiles", profileRoutes);

// Server
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => console.log("❌ Mongo Error:", err));
