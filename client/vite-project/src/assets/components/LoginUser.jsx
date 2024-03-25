//Login.js
import React, { useState, useEffect } from 'react';
//import ReactDOM from 'react-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { gql, useQuery, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';


import "./entryform.css"
//
import VitalsHome from '../components/VitalsHome'
//
// mutation for user login
const LOGIN_USER = gql`
    mutation LoginUser( $email: String!, $password: String! ) {
        loginUser( email: $email, password: $password  )         

    }
`;
// query for checking if student is logged in
const LOGGED_IN_USER = gql`
  query IsLoggedIn {
    isLoggedIn
  }
`;

// Login function component
function LoginUser() {
    //
    //const navigate = useNavigate();
    let navigate = useNavigate()
    // loginUser is a function that can be called to execute
    // the LOGIN_USER mutation, and { data, loading, error } 
    // is an object that contains information about the state of the mutation.
    const [loginUser, { data, loading, error }] = useMutation(LOGIN_USER);
    //
    //state variable for the screen, admin or user
    const [screen, setScreen] = useState(false);
    //store input field data, user name and password
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    //

    const handleLogin = async (event) => {
        event.preventDefault();
        console.log('Attempting login with email and password:', email, password);

        console.log('email and password: ', email + ' ' + password);

        try {
          const { data } = await loginUser({
            variables: { email, password }
            
          });
          //refetchQueries: [{ query: LOGGED_IN_USER }],
          console.log('data from server: ', data)
          console.log('Logged in as:', data.loginUser);
          setScreen(data.loginUser);
          setEmail('');
          setPassword('');
         
          console.log('screen: ', screen)
        } catch (error) {
          console.error('Login error:', error);
        }
    };
    // a destructuring assignment that uses the useQuery hook from
    //  the @apollo/client library to fetch data from a GraphQL server.
    const { data: isLoggedInData, loading: isLoggedInLoading, error: isLoggedInError, refetch: refetchLoggedInData } = useQuery(LOGGED_IN_USER);
    //
    // useEffect block
    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                console.log('--- in checkLoginStatus function ---');
                await refetchLoggedInData(); // Trigger manual refetch
                const isLoggedInVar = isLoggedInData?.isLoggedIn;
                console.log('auth status from graphql server: ', isLoggedInVar);
                if (isLoggedInVar !== undefined && isLoggedInVar !== screen) {
                    console.log('user is logged in');
                    console.log('screen: ', screen);
                    console.log('isLoggedInVar in useEffect: ', isLoggedInVar);
                    // update the screen state variable only if it's different
                    setScreen(isLoggedInVar);
                }
            } catch (e) {
                setScreen(false);
                console.log('error: ', e);
            }
        };

         // Run the checkLoginStatus function once when the component mounts
         checkLoginStatus();
        }, [isLoggedInData, refetchLoggedInData, screen]); // Include refetchLoggedInData in the dependency array
    
         // Check if user is logged in
  if (isLoggedInData?.isLoggedIn === true) {
    console.log('student is logged in');
    console.log('screen: ', screen);
  }

  // Render the login form or the welcome message based on the value of 'screen'
  return (
    <div className="entryform">
        { screen !==false ? ( 
            <VitalsHome screen={screen} setScreen={setScreen} /> ) : (

            <Form onSubmit={handleLogin}>
                
                <Form.Group>
                    <Form.Label> Email:</Form.Label>
                    <Form.Control id="email" type="email"  onChange={(event) => setEmail(event.target.value)} 
                        placeholder="Email:" />
                </Form.Group>                    
                
                <Form.Group>
                    <Form.Label> Password:</Form.Label>
                    <Form.Control id="password" type="password"  onChange={(event) => setPassword(event.target.value)}
                        placeholder="Password:" />
                </Form.Group>  
        
                <Button size = "lg" variant="primary" type="submit" >
                    Login
                </Button>
              
            </Form>
        )}            
        
    </div>
);
}
//
export default LoginUser;