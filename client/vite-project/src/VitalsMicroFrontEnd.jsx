import React, { useState } from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AddVitals from './components/AddVitals';
import EditVitals from './components/EditVitals';
import ListVitals from './components/ListVitals';

function VitalsApp() {
    const [showAddVitals, setShowAddVitals] = useState(false);
    const[showEditVitals, setShowEditVitals] = useState(false);
    const[showListVitals, setShowListVitals] = useState(false);
    
  
    async function handleAddVitals() {
        try {
            const response = await fetch('http://localhost:3000/vitals/add', {
              method: 'POST',
            });
            const data = await response.text();
            setShowAddVitals(data);
          } catch (error) {
            console.error('Error adding vital:', error);
          }
       
    }

    async function handleEditVitals() {
        try {
            const response = await fetch('http://localhost:3000/vitals/:id', {
              method: 'POST',
            });
            const data = await response.text();
            setShowEditVitals(data);
          } catch (error) {
            console.error('Error editng vital:', error);
          }
    }
    async function handleListVitals() {
        try {
            const response = await fetch('http://localhost:3000/vitals', {
              method: 'POST',
            });
            const data = await response.text();
            setShowEditVitals(data);
          } catch (error) {
            console.error('Error adding vital:', error);
          }
    }
  
    return (
      <div>
        <h2>Vitals Management</h2>
        <button onClick={handleAddVitals}>Add Vitals</button>
        <button onClick={handleEditVitals}>Edit Vitals</button>
        <button onClick={handleListVitals}>List Vitals</button>
  
        {showAddVitals && <AddVitals />}
        {showEditVitals && <EditVitals />}
        {showListVitals && <ListVitals />}
        
      </div>
    );
}

export default VitalsApp;
