require("dotenv").config();
const path = require('path');
const express = require('express');
const app = express();
const connectDB = require("./config/db");
connectDB();

app.use(express.json());

const resumeRoutes = require('./routes/resumeRoutes');
const authRoutes = require('./routes/authRoutes');
const jdRoutes = require('./routes/jdRoutes');
const analysisRoutes = require('./routes/analysisRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/jd', jdRoutes);
app.use('/api/analysis', analysisRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));