import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';
import { Form, Button } from 'react-bootstrap'; // Import React Bootstrap components

//AddVitals mutation
const ADD_VITALS = gql`
  mutation AddVitals($timeStamp: String!, $bloodPressure: String!, $heartRate: Int!, $temperature: Int!, $respiratoryRate: Int!, $bloodOxygen: Int!) {
    addVitals(timeStamp: $timeStamp, bloodPressure: $bloodPressure, heartRate: $heartRate, temperature: $temperature, respiratoryRate: $respiratoryRate, bloodOxygen: $bloodOxygen ) {
      timeStamp
    }
  }
`;

// AddVitals component
const AddVitals = () => {
    const [timeStamp, setTimeStamp] = useState('');
    const [bloodPressure, setBloodPressure] = useState('');
    const [heartRate, setHeartRate] = useState('');
    const [temperature, setTemperature] = useState('');
    const [respiratoryRate, setRespiratoryRate] = useState('');
    const [bloodOxygen, setBloodOxygen] = useState('');
    const navigate = useNavigate();
    const [addVitals] = useMutation(ADD_VITALS);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await addVitals({ variables: { timeStamp, bloodPressure, heartRate, temperature, respiratoryRate, bloodOxygen } });
        // Clear input fields
        setTimeStamp('');
        setBloodPressure('');
        setHeartRate('');
        setTemperature('');
        setRespiratoryRate('');
        setBloodOxygen('');
        navigate('/listvitals');
      } catch (err) {
        console.error('Error creating vitals:', err);
        // Handle the error, e.g., show an error message to the user.
      }
    };

     // AddVitals component UI with React Bootstrap components
  return (
    <div>
      <h2>Add Vitals</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Label>Time Stamp:</Form.Label>
          <Form.Control type="text" value={timeStamp} onChange={(e) => setTimeStamp(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formContent">
          <Form.Label>Blood Pressure:</Form.Label>
          <Form.Control type="text" value={bloodPressure} onChange={(e) => setBloodPressure(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formContent">
          <Form.Label>Heart Rate:</Form.Label>
          <Form.Control type="text" value={heartRate} onChange={(e) => setHeartRate(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formContent">
          <Form.Label>Temperature:</Form.Label>
          <Form.Control type="text" value={temperature} onChange={(e) => setTemperature(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formContent">
          <Form.Label>Respiratory Rate:</Form.Label>
          <Form.Control type="text" value={respiratoryRate} onChange={(e) => setRespiratoryRate(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formContent">
          <Form.Label>Blood Oxygen:</Form.Label>
          <Form.Control type="text" value={bloodOxygen} onChange={(e) => setBloodOxygen(e.target.value)} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit Vitals
        </Button>
      </Form>
    </div>
  );
};

export default AddVitals;