// EditVitals component
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gql, useQuery, useMutation } from '@apollo/client';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const GET_VITALS = gql`
  query GetVitals($id: String!) {
    vitals(id: $id) {
      timeStamp
      bloodPressure
      heartRate
      temperature
      respiratoryRate
      bloodOxygen
    }
  }
`;

const EDIT_VITALS = gql`
  mutation EditVitals($id: ID!, $timeStamp: String!, $bloodPressure: String!, $heartRate: Int!, $temperature: Int!, $respiratoryRate: Int!, $bloodOxygen: Int!) {
    editVitals(id: $id, timeStamp: $timeStamp, bloodPressure: $bloodPressure, heartRate: $heartRate, temperature: $temperature, respiratoryRate: $respiratoryRate, bloodOxygen: $bloodOxygen ) {
      id
      timeStamp
      bloodPressure
      heartRate
      temperature
      respiratoryRate
      bloodOxygen
    }
  }
`;

//
function EditVitals(props)
{
    const [vitals, setVitals] = useState({ id: '', timeStamp: '', bloodPressure: '', heartRate: '', temperature: '', respiratoryRate: '', bloodOxygen: '' });
    let navigate = useNavigate();
    const { id } = useParams(); // Get the id parameter from the URL
    console.log('in EditVitals, id=', id);
    //
    const { loading, error, data } = useQuery(GET_VITALS, {
        variables: { id },
        onCompleted: (data) => {
          const {timeStamp: currentTimeStamp, bloodPressure: currentBloodPressure, heartRate: currentHeartRate, temperature: currentTemperature, respiratoryRate: currentRespiratoryRate, bloodOxygen: currentBloodOxygen
            } = data.vitals;
          //
          setVitals({ id, timeStamp: currentTimeStamp, bloodPressure: currentBloodPressure, heartRate: currentHeartRate, temperature: currentTemperature, respiratoryRate: currentRespiratoryRate, bloodOxygen: currentBloodOxygen });
          
        },
      });
      // print error
      if (error) {  console.log('error=', error); }
      //print data
      if (data) { console.log('data=', data); }

      //
      const [updateVitals] = useMutation(EDIT_VITALS);

      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
      // 
      const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Submitting form...');
        
        try {
          console.log('Before updateVitals call');
          await updateVitals({
            variables: { id, ...vitals },
          });
          console.log('After updateVitals call');
          navigate('/listvitals');
        } catch (error) {
          console.error('Error updating vitals:', error);
          // Handle the error as needed (e.g., show an error message to the user)
        }
      };

      //
      //
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setVitals((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };
// const EditVitals = ({ vitalsId, existingTimeStamp, existingBloodPressure, existingHeartRate, existingTemperature, existingRespiratoryRate, existingBloodOxygen, onClose }) => {
//     const [timeStamp, setTimeStamp] = useState('');
//     const [bloodPressure, setBloodPressure] = useState('');
//     const [heartRate, setHeartRate] = useState('');
//     const [temperature, setTemperature] = useState('');
//     const [respiratoryRate, setRespiratoryRate] = useState('');
//     const [bloodOxygen, setBloodOxygen] = useState('');
  
//     useEffect(() => {
//       // Set the initial content when the component mounts
//       setTimeStamp(existingTimeStamp);
//       setBloodPressure(existingBloodPressure);
//       setHeartRate(existingHeartRate);
//       setTemperature(existingTemperature);
//       setRespiratoryRate(existingRespiratoryRate);
//       setBloodOxygen(existingBloodOxygen);
//     }, [existingTimeStamp,existingBloodPressure, existingHeartRate,existingTemperature,existingRespiratoryRate, existingBloodOxygen ]);
  
//     const [editVitals] = useMutation(EDIT_VITALS);
  
//     const handleSubmit = async (e) => {
//       e.preventDefault();
//       try {
//         await editVitals({ variables: { id: vitalsId, timeStamp, bloodPressure, heartRate, temperature, respiratoryRate, bloodOxygen } });
//         onClose();
//       } catch (err) {
//         console.error('Error editing vitals:', err);
//         // Handle the error, e.g., show an error message to the user.
//       }
//     };
    return (
        <div>
          <h1>Edit Vitals</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Time Stamp</Form.Label>
              <Form.Control
                type="text"
                name="timeStamp"
                placeholder="Enter time stamp"
                value={vitals.timeStamp || data.vitals.timeStamp}
                onChange={handleInputChange}
              />
            </Form.Group>
    
            <Form.Group controlId="formBloodPressure">
              <Form.Label>Blood Pressure</Form.Label>
              <Form.Control
                type="text"
                name="bloodPressure"
                placeholder="Enter blood pressure"
                value={vitals.bloodPressure || data.vitals.bloodPressure}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formHeartRate">
              <Form.Label>Heart Rate</Form.Label>
              <Form.Control
                type="text"
                name="heartRate"
                placeholder="Enter heart rate"
                value={vitals.heartRate || data.vitals.heartRate}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formTemperature">
              <Form.Label>Temperature</Form.Label>
              <Form.Control
                type="date"
                name="temperature"
                placeholder="Temperature"
                value={vitals.temperature || data.vitals.temperature}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formRespiratoryRate">
              <Form.Label>Respiratory Rate</Form.Label>
              <Form.Control
                type="text"
                name="respiratoryRate"
                placeholder="Enter respiratory rate"
                value={vitals.respiratoryRate || data.vitals.respiratoryRate}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formBloodOxygen">
              <Form.Label>Blood Oxygen</Form.Label>
              <Form.Control
                type="text"
                name="bloodOxygen"
                placeholder="Enter blood oxygen"
                value={vitals.bloodOxygen || data.vitals.bloodOxygen}
                onChange={handleInputChange}
              />
            </Form.Group>
            
    
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      );
    }
    //
    export default EditVitals;