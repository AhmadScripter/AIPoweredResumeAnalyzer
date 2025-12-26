require("dotenv").config();
const express = require('express');
const connectDB = require("./config/db");
const app = express();
connectDB();

app.use(express.json());

const resumeRoutes = require('./routes/resumeRoutes');
const authRoutes = require('./routes/authRoutes');
const path = require('path');

app.use('/api/auth', authRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));