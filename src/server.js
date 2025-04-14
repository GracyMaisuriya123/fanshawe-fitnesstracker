const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const OPENAI_API_KEY = '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'; // Replace with your OpenAI API key

app.post('/api/chat', async (req, res) => {
    const userMessage = req.body.message;

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: userMessage }],
        }, {
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
        });

        const aiMessage = response.data.choices[0].message.content;
        res.json({ message: aiMessage });
    } catch (error) {
        console.error('Error communicating with OpenAI:', error);
        res.status(500).send('Error communicating with AI');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});