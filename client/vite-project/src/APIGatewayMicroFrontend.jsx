// APIGatewayMicroFrontend.js
import React, { useEffect, useState } from 'react';
import LoginUser from '../src/assets/components/LoginUser';
import AddUser from '../src/assets/components/AddUser';

function APIGatewayMicroFrontend() {
  const [vitals, setVitals] = useState(null);
  const [loginStatus, setLoginStatus] = useState('');

  useEffect(() => {
    async function fetchVitals() {
      try {
        const response = await fetch('http://localhost:3000/vitals');
        console.log('response', response);
        const data = await response.json();
        setVitals(data);
      } catch (error) {
        console.error('Error fetching vitals:', error);
      }
    }

    fetchVitals();
  }, []);

  async function handleLogin() {
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
      });
      const data = await response.text();
      setLoginStatus(data);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  }

  return (
    <div>
      <h2>Vitals Microservice</h2>
      {vitals ? (
        <ul>
          {vitals.map((vital) => (
            <li key={vital.id}>{vital.timeStamp}</li>
          ))}
        </ul>
      ) : (
        <p>Loading vitals...</p>
      )}

      <h2>User Authentication Microservice</h2>
      <button onClick={handleLogin}>Login</button>
      {loginStatus && <p>{loginStatus}</p>}
    </div>
  );
}

export default APIGatewayMicroFrontend;

