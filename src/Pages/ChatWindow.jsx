// ChatWindow.jsx
import React, { useState } from 'react';
import './CSS/ChatWindow.css';

function ChatWindow({ selectedChat }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    setMessages([...messages, { text: inputValue, sender: 'me' }]);
    setInputValue('');
    // Send message to the server or other chat participant
  };

  return (
    <div className="ChatWindow">
      <h2>{selectedChat ? `Chat with ${selectedChat.name}` : 'Select a chat'}</h2>
      <div className="Messages">
        {messages.map((msg, index) => (
          <div key={index} className={`Message ${msg.sender === 'me' ? 'Sent' : 'Received'}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="InputContainer">
        <input 
          type="text" 
          placeholder="Type a message..." 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)} 
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatWindow;
