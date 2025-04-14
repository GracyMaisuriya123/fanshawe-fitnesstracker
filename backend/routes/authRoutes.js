const express = require('express');
const router = express.Router();
const admin = require('../firebaseConfig'); // Firebase Admin SDK
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30'; 

// Signup Route
router.post('/signup', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await admin.auth().createUser({ email, password });

        // Generate JWT
        const token = jwt.sign({ uid: user.uid }, JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ user, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const userRecord = await admin.auth().getUserByEmail(email);

        // Generate JWT
        const token = jwt.sign({ uid: userRecord.uid }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ user: userRecord, token });
    } catch (error) {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

module.exports = router;
