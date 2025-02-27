// server.js (Backend Setup)

const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const Report = require('./models/schema'); // Updated to use schema.js

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({ origin: 'https://jovial-bunny-8ba2b1.netlify.app' }));

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// API to fetch reported places
app.get('/api/reports', async (req, res) => {
    try {
        const reports = await Report.find();
        res.json(reports);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// API to add a new report
app.post('/api/reports', async (req, res) => {
    try {
        const newReport = new Report(req.body);
        await newReport.save();
        res.status(201).json(newReport);
    } catch (err) {
        res.status(500).json({ message: 'Failed to save report' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
