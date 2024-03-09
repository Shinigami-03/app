import React, { useState } from 'react';
import './App.css';
import ChatWindow from './Pages/ChatWindow';
import Sidebar from './Pages/Sidebar';

function App() {
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <div className="App">
      <Sidebar setSelectedChat={setSelectedChat} />
      <ChatWindow selectedChat={selectedChat} />
    </div>
  );
}

export default App;
