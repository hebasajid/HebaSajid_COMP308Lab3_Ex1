//VitalsHome.jsx
import CreateVitals from './AddVitals';
import ListVitals from './ListVitals';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';

const LOG_OUT_MUTATION = gql`
  mutation LogOut {
    logOut
  }
`;

const LOGGED_IN_USER = gql`
  query IsLoggedIn {
    isLoggedIn
  }
`;

function VitalsHome(props) {
    const { screen, setScreen } = props;
    const navigate = useNavigate();
    const [data, setData] = useState();
    const [courseOperation, setCourseOperation] = useState('no-op');
    const [logOut, { loading, error }] = useMutation(LOG_OUT_MUTATION);
    const { data: isLoggedInData, loading: isLoggedInLoading, error: isLoggedInError, refetch } = useQuery(LOGGED_IN_USER);
  
    useEffect(() => {
      // If the refetch function is available, call it to get the updated data
      if (refetch) {
        refetch();
      }
    }, [screen, refetch]);

    // Show loading indicator if data is still being fetched
  if (isLoggedInLoading) return <p>Loading...</p>;

  // Show error message if there was an error fetching the data
  if (isLoggedInError) return <p>Error: {isLoggedInError.message}</p>;

  // Check if the user is logged in
  const isLoggedIn = isLoggedInData.isLoggedIn;

  const verifyCookie = async () => {
    try {
      // Refetch the data to get the updated value
      await refetch();
      const isLoggedIn = isLoggedInData.isLoggedIn;
      console.log('isLoggedIn:', isLoggedIn);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleLogOut = () => {
    logOut()
      .then(() => {
        setScreen(false);
        navigate('/login');
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  return (
    <div className="App">
      {(() => {
        switch (courseOperation) {
          case 'list':
            return <ListVitals />;
          case 'create':
            return <CreateVitals  />;
          default:
            return (
              <div>
                <p>{screen}</p>
                <p>{data}</p>
                <button onClick={verifyCookie}>Verify Cookie</button>
                <button onClick={() => setCourseOperation('create')}>Add Vitals</button>
                <button onClick={() => setCourseOperation('list')}>List Vitals</button>
                <button onClick={handleLogOut}>Log out</button>
              </div>
            );
        }
      })()}
    </div>
  );
}

export default VitalsHome;