const express = require('express');
const { SessionsClient } = require('@google-cloud/dialogflow');
const cors = require('cors');
require('dotenv').config(); // To load environment variables

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Google Cloud Dialogflow setup
const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID; // Your Google Cloud Project ID
const sessionId = '12345'; // Session ID, it can be dynamic if needed
const languageCode = 'en'; // Language code for the chatbot (e.g., 'en' for English)

const sessionClient = new SessionsClient();

app.post('/api/chat', async (req, res) => {
    const userMessage = req.body.message;

    // Check if the user message is provided
    if (!userMessage) {
        return res.status(400).send('Message is required');
    }

    try {
        // Create session path
        const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

        // Construct the request to Dialogflow
        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: userMessage,
                    languageCode: languageCode,
                },
            },
        };

        // Send request to Dialogflow
        const responses = await sessionClient.detectIntent(request);
        const result = responses[0].queryResult;

        // Send back the response from Dialogflow
        if (result.intent) {
            res.json({ message: result.fulfillmentText });
        } else {
            res.status(500).send('No intent matched.');
        }
    } catch (error) {
        console.error('Error communicating with Google Cloud Dialogflow:', error);
        res.status(500).send('Error communicating with AI');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});














