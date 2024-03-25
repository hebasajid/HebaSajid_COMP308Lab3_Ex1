//server-api-gateway.js
const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

const cors = require('cors')
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
  });
app.use(cors());
//
const serviceEndpoints = {
  'Vital Signs Microservice': 'http://localhost:3002',
  'User Authentication Microservice': 'http://localhost:3003',
};

app.post('/auth/login', async (req, res) => {
  try {
    const response = await axios.post(`${serviceEndpoints['User Authentication Microservice']}/auth/login`);
    res.send(response.data);
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route for user signup
app.post('/auth/signup', async (req, res) => {
  try {
    const response = await axios.post(`${serviceEndpoints['User Authentication Microservice']}/auth/signup`, req.body);
    res.send(response.data);
  } catch (error) {
    console.error('Error signing up:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route for user logout
app.post('/auth/logout', async (req, res) => {
  try {
    const response = await axios.post(`${serviceEndpoints['User Authentication Microservice']}/auth/logout`);
    res.send(response.data);
  } catch (error) {
    console.error('Error logging out:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to add a new vital
app.post('/vitals/add', async (req, res) => {
  try {
    // Forward the request to the vital signs microservice
    const response = await axios.post(`${serviceEndpoints['Vital Signs Microservice']}/vitals/add`, req.body);
    res.send(response.data);
  } catch (error) {
    console.error('Error adding vital:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to update a vital
app.put('/vitals/:id', async (req, res) => {
  try {
    const vitalId = req.params.id;
    // Forward the request to the vital signs microservice
    const response = await axios.put(`${serviceEndpoints['Vital Signs Microservice']}/vitals/update/${vitalId}`, req.body);
    res.send(response.data);
  } catch (error) {
    console.error('Error updating vital:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to list all vitals
app.get('/vitals/list', async (req, res) => {
  try {
    // Forward the request to the vital signs microservice
    const response = await axios.get(`${serviceEndpoints['Vital Signs Microservice']}/vitals/list`);
    res.send(response.data);
  } catch (error) {
    console.error('Error listing vitals:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`API Gateway listening on port ${port}`);
});
