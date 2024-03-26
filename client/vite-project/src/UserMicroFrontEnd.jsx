import React, { useState } from 'react';
//import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import AddUser from './components/AddUser';
import LoginUser from './components/LoginUser';

function App () {
    const [showLoginUser, setShowLoginUser] = useState(false);
    const [showAddUser, setShowAddUser] = useState(false);
  
    async function handleLogin() {
        try {
          const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
          });
          const data = await response.text();
          setShowLoginUser(data);
        } catch (error) {
          console.error('Error logging in:', error);
        }
      }
  
      async function handleSignUp() {
        try {
          const response = await fetch('http://localhost:3000/auth/signup', {
            method: 'POST',
          });
          const data = await response.text();
          setShowAddUser(data);
        } catch (error) {
          console.error('Error logging in:', error);
        }
      }
  
    return (
        
      <div>
        <h2>User Authentication</h2>
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleSignUp}>Sign Up</button>
  
        {/* Render LoginUser component if showLoginUser is true */}
        {showLoginUser && <LoginUser />}
  
        {/* Render AddUser component if showAddUser is true */}
        {showAddUser && <AddUser />}
      </div>
    );
  }


  export default App;