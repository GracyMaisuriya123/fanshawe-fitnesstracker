const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

// Simple API to handle chat messages
app.post('/api/chat', (req, res) => {
  const userMessage = req.body.message;
  console.log(`Received message from user: ${userMessage}`);


  let aiResponse = "I'm not sure how to respond to that.";

  if (userMessage.toLowerCase().includes('hello')) {
    aiResponse = "Hello! How can I assist you today?";
  } else if (userMessage.toLowerCase().includes('how are you')) {
    aiResponse = "I'm just a bot, but I'm doing great! How about you?";
  }else if (userMessage.toLowerCase().includes('fine')) {
    aiResponse = "Thats'great. How can i help you today?";
  } else if (userMessage.toLowerCase().includes('what is the best workout to start with?')) {
    aiResponse = "You can choose your personal level workout through our workout routine page or else you can book a group workout with our personalized and mastered coaches.";
  }  else if (userMessage.toLowerCase().includes('bye')) {
    aiResponse = "Goodbye! Have a great day!";
  }

  // Send response back to the frontend
  res.json({ message: aiResponse });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
