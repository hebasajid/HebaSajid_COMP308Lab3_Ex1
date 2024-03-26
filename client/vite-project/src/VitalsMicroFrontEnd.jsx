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
        // Logic to toggle the visibility of the AddVitals component
        setShowAddVitals(!showAddVitals);
    }

    async function handleEditVitals() {
        // Logic to toggle the visibility of the AddVitals component
        setShowEditVitals(!showEditVitals);
    }
    async function handleListVitals() {
        // Logic to toggle the visibility of the AddVitals component
        setShowListVitals(!showListVitals);
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
