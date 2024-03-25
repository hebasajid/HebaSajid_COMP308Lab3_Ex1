// Import necessary modules
const express = require('express');
const app = express();
const port = 3002;

// Import Vitals Schema and Model
const Vitals = require('../models/vitals-server-model');

// Route to add a new vital
app.post('/vitals/add',  async (req, res) => {
  const { timeStamp, bloodPressure, heartRate, temperature, respiratoryRate, bloodOxygen } = req.body;
  const userId = req.userId;

  try {
      const vitalsModel = new Vitals({ timeStamp, bloodPressure, heartRate, temperature, respiratoryRate, bloodOxygen, userId });
      const savedVitals = await vitalsModel.save();
      res.json(savedVitals);
  } catch (error) {
      console.error('Error adding vitals:', error);
      res.status(500).json({ error: 'Failed to add vitals' });
  }
});

  
// Route to update a vital
app.put('/vitals/:id', async (req, res) => {
  const { id } = req.params;
  const { timeStamp, bloodPressure, heartRate, temperature, respiratoryRate, bloodOxygen } = req.body;

  try {
      const vital = await Vitals.findById(id).exec();
      if (!vital || String(vital.userId) !== req.userId) {
          res.status(403).json({ error: 'Unauthorized' });
      } else {
          vital.timeStamp = timeStamp;
          vital.bloodPressure = bloodPressure;
          vital.heartRate = heartRate;
          vital.temperature = temperature;
          vital.respiratoryRate = respiratoryRate;
          vital.bloodOxygen = bloodOxygen;
          const updatedVitals = await vital.save();
          res.json(updatedVitals);
      }
  } catch (error) {
      console.error('Error updating vitals:', error);
      res.status(500).json({ error: 'Failed to update vitals' });
  }
});

// Route to list all vitals
app.get('/vitals',  async (req, res) => {
  try {
      const vitals = await Vitals.find({ userId: req.userId }).exec();
      res.json(vitals);
  } catch (error) {
      console.error('Error listing vitals:', error);
      res.status(500).json({ error: 'Failed to list vitals' });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Vital Signs Microservice listening on port ${port}`);
});
