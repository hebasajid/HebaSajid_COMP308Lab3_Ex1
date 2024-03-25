import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
//import EditVitals from '../components/EditVitals';
import { Table } from 'react-bootstrap';

const GET_VITALS = gql`
 {
    vitals {
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

const ListVitals = () => {
    const { loading, error, data, refetch } = useQuery(GET_VITALS);
  //  const [selectedVitals, setSelectedVitals] = useState(null);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
  
    const handleRowClick = (vitalsId) => {
      setSelectedVitals(vitalsId);
    };

    return (
        <div>
          <h2>Vitals List</h2>
          <Table style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>Time Stamp</th>
                <th>Blood Pressure</th>
                <th>Heart Rate</th>
                <th>Temperature</th>
                <th>Respiratory Rate</th>
                <th>Oxygen</th>
              </tr>
            </thead>
            <tbody>
              {data.vitals.map((vitals, index) => (
                <tr
                  key={index}
                  onClick={() => handleRowClick(vitals.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <td>{vitals.timeStamp}</td>
                  <td>{vitals.bloodPressure}</td>
                  <td>{vitals.heartRate}</td>
                  <td>{vitals.temperature}</td>      
                  <td>{vitals.respiratoryRate}</td>     
                  <td>{vitals.bloodOxygen}</td> 
                  <td>
                                <Link to={`/editvitals/${vitals.id}`}>Edit</Link>
                            </td>
            
                </tr>
              ))}
            </tbody>
          </Table>
    
          <div className="center">
                <button className = "center" onClick={() => refetch()}>Refetch</button>
            </div>
            
        </div>
        
    );
}

export default ListVitals
          