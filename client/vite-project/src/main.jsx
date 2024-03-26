import React from 'react'
import ReactDOM from 'react-dom/client'
//import App from './App.jsx'
import './index.css'
import VitalsMicroFrontEnd from './VitalsMicroFrontEnd'
import UserMicroFrontEnd from './UserMicroFrontEnd'
//
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <VitalsMicroFrontEnd />
    <UserMicroFrontEnd/>
 
  </React.StrictMode>,
)
