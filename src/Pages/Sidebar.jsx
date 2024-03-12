import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import './CSS/Sidebar.css';

function Sidebar({ setSelectedChat }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [allChats, setAllChats] = useState([]);

  useEffect(() => {
    // Initialize Firebase
    const firebaseConfig = {
      apiKey: "AIzaSyAImobzmRJVQPN7RdDkfhLBf0xki2vn_S8",
      authDomain: "chatmee137.firebaseapp.com",
      projectId: "chatmee137",
      storageBucket: "chatmee137.appspot.com",
      messagingSenderId: "709767228514",
      appId: "1:709767228514:web:9ebe70f8f2d29c8cfeb53b",
      measurementId: "G-KGLJDN3DH1"
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    // Fetch all users from Firebase
    const usersRef = firebase.database().ref('users');
    usersRef.on('value', (snapshot) => {
      const users = snapshot.val();
      if (users) {
        const userList = Object.keys(users).map(userId => ({ id: userId, name: users[userId].name }));
        setFilteredUsers(userList);
      }
    });

    // Fetch all chats from Firebase
    const chatsRef = firebase.database().ref('chats');
    chatsRef.on('value', (snapshot) => {
      const chats = snapshot.val();
      if (chats) {
        const chatList = Object.keys(chats).map(chatId => ({ id: chatId, name: chats[chatId].name }));
        setAllChats(chatList);
      }
    });

    return () => {
      // Unsubscribe from Firebase listeners when component unmounts
      usersRef.off();
      chatsRef.off();
    };
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = filteredUsers.filter(user => user.name.toLowerCase().includes(query.toLowerCase()));
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
