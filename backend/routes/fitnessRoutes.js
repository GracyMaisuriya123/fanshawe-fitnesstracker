const express = require('express');
const router = express.Router();
const db = require('../db'); // MySQL database connection
const admin = require('../firebaseConfig'); // Firebase for social data

// Fetch fitness progress from MySQL
router.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const [rows] = await db.query('SELECT * FROM fitness_logs WHERE user_id = ?', [userId]);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching fitness data' });
    }
});

// Update fitness progress in MySQL
router.put('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const { steps, calories, workout_minutes } = req.body;
        
        await db.query(
            'UPDATE fitness_logs SET steps = ?, calories = ?, workout_minutes = ? WHERE user_id = ?',
            [steps, calories, workout_minutes, userId]
        );

        res.json({ message: 'Fitness data updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error updating fitness progress' });
    }
});

module.exports = router;
