import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Waitlist from './models/Waitlist.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));

// Email validation function
const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// Add to waitlist (POST /waitlist)
app.post('/waitlist', async (req, res) => {
    try {
        let { email } = req.body;
        if (!email) return res.status(400).json({ error: 'Email is required' });

        email = email.trim();
        if (!isValidEmail(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        const existingEntry = await Waitlist.findOne({ email });
        if (existingEntry) {
            return res.status(400).json({ error: 'Email is already on the waitlist' });
        }

        const newEntry = new Waitlist({ email });
        await newEntry.save();
        res.status(201).json({ message: '✅ Successfully joined the waitlist' });

    } catch (err) {
        console.error("❌ Error adding to waitlist:", err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Fetch waitlist (GET /waitlist)
app.get('/waitlist', async (req, res) => {
    try {
        const waitlist = await Waitlist.find().sort({ joinedAt: -1 }); // Sort newest first
        res.json(waitlist);
    } catch (err) {
        console.error("❌ Error fetching waitlist:", err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
