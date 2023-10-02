import React, { useState } from 'react';

export default function ChatBot() {
  const [userInput, setUserInput] = useState('');
  const [botResponse, setBotResponse] = useState('');

  const handleUserInput = (event) => {
    setUserInput(event.target.value);
  };

  const handleSendMessage = async () => {
    if (userInput.trim() === '') {
      return;
    }

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_input: userInput }),
      });

      if (response.ok) {
        const data = await response.json();
        setBotResponse(data.message);
      } else {
        // Handle error response
        setBotResponse('An error occurred while processing your request.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setBotResponse('An error occurred while processing your request.');
    }

    setUserInput('');
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-messages">
        {/* Display user and bot messages /}
        {/ You can map through a list of messages if needed */}
        {userInput && (
          <div className="user-message">
            <p>User: {userInput}</p>
          </div>
        )}
        {botResponse && (
          <div className="bot-message">
            <p>Bot: {botResponse}</p>
          </div>
        )}
      </div>
      <div className="chatbot-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={userInput}
          onChange={handleUserInput}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}