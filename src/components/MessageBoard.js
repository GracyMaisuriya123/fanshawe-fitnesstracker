import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { auth, db } from './firebaseConfig';  // Ensure correct path to firebase config
import { doc, getDoc } from 'firebase/firestore';

const MessageBoard = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch user data from Firestore based on logged-in user UID
  useEffect(() => {
    const fetchUserName = async () => {
      const user = auth.currentUser;  // Get current logged-in user

      if (user) {
        try {
          const userRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            setUserName(userSnap.data().name); // Get name from Firestore
          } else {
            setUserName('Student');  // Default name if not found
          }
        } catch (error) {
          console.error('Error fetching user data from Firestore:', error);
        } finally {
          setLoading(false); // Set loading to false once done
        }
      }
    };

    fetchUserName();
  }, []);

  const handleSendMessage = async () => {
    if (newMessage.trim() !== '') {
      const userMessage = { sender: userName || 'Student', text: newMessage };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setNewMessage('');

      try {
        const response = await axios.post('http://localhost:4000/api/chat', {
          message: newMessage,
        });
        const aiMessage = { sender: 'AI', text: response.data.message };
        setMessages((prevMessages) => [...prevMessages, aiMessage]);
      } catch (error) {
        console.error('Error sending message to AI:', error);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Display loading while fetching user data
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h2>Chat with AI</h2>
      <div style={{ height: '300px', overflowY: 'auto', border: '1px solid #ddd', marginBottom: '10px', padding: '10px', backgroundColor: '#f9f9f9' }}>
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div key={index} style={{ padding: '5px 0' }}>
              <strong>{msg.sender}:</strong> {msg.text}
            </div>
          ))
        ) : (
          <p>No messages yet. Be the first to send a message!</p>
        )}
      </div>

      <div>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          style={{ width: '80%', padding: '10px', marginRight: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
        />
        <button
          onClick={handleSendMessage}
          style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          Send
        </button>
      </div>
      <footer style={{ padding: "20px", textAlign: "center", backgroundColor: "#2E3A59", color: "#fff", fontSize: "16px", marginTop: "20px" }}>
        <p>&copy; 2025 Fanshawe Fitness. All Rights Reserved.</p>
        <p style={{ fontSize: "14px", opacity: 0.8 }}>Built with ❤️ by Gracy Maisuriya</p>
      </footer>
    </div>
  );
};

export default MessageBoard;
