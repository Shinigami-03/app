// Sidebar.jsx
import React, { useState } from 'react';
import './CSS/Sidebar.css';

function Sidebar({ setSelectedChat }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [allChats] = useState([
    { id: 1, name: 'Chat 1' },
    { id: 2, name: 'Chat 2' },
    { id: 3, name: 'Chat 3' },
    // Add more previous chats as needed
  ]);
  const allUsers = [
    { id: 1, name: 'User 1' },
    { id: 2, name: 'User 2' },
    { id: 3, name: 'User 3' },
    // Add more users as needed
  ];

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = allUsers.filter(user => user.name.toLowerCase().includes(query.toLowerCase()));
    setFilteredUsers(filtered);
  };

  const handleSelectUser = (user) => {
    setSelectedChat(user);
  };

  return (
    <div className="Sidebar">
      <h2>Chats</h2>
      <input 
        type="text" 
        placeholder="Search for users..." 
        value={searchQuery} 
        onChange={(e) => handleSearch(e.target.value)} 
      />
      <ul>
        {filteredUsers.map(user => (
          <li key={user.id} onClick={() => handleSelectUser(user)}>
            {user.name}
          </li>
        ))}
      </ul>
      <h3>All Chats</h3>
      <ul>
        {allChats.map(chat => (
          <li key={chat.id} onClick={() => setSelectedChat(chat)}>
            {chat.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
