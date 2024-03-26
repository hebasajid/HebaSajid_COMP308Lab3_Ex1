// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3003;

console.log(__dirname); 
const User = require('../models/user-server-model.js');

// Route for user login
app.post('/auth/login', async (req, res) => {
  try {
  
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send('User not found');
    }

   
    const isValidPassword = await user.isValidPassword(password);
    if (!isValidPassword) {
      return res.status(401).send('Invalid password');
    }

    
    res.send('User authenticated');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route for user signup
app.post('/auth/signup', async (req, res) => {
    try {
      const newUser = new User(req.body);
      await newUser.save();
      res.send('User registered successfully');
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  // Route for user logout
app.post('/auth/logout', (req, res) => {
    try {
      res.send('User logged out successfully');
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
    }
  });

// Start the Express server
app.listen(port, () => {
  console.log(`User Authentication Microservice listening on port ${port}`);
});
