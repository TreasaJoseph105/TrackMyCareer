require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config');

const atsRoutes = require('./routes/atsRoutes');
const trackerRoutes = require('./routes/trackerRoutes');

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/ats', atsRoutes);
app.use('/api/tracker', trackerRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
