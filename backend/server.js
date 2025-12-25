require("dotenv").config();
const express = require('express');
const connectDB = require("./config/db");
const app = express();
connectDB();

app.use(express.json());


const authRoutes = require('./routes/authRoutes');


app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));