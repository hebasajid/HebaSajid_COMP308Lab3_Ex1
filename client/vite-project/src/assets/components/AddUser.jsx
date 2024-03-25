// AddUser component
import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
//
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
// AddStudent mutation
const ADD_USER = gql`
  mutation AddUser($userName: String!, $firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    createUser(userName: $userName, firstName: $firstName, lastName: $lastName,  email: $email, password: $password) {
      userName
    }
  }
`;

// AddStudent component
const AddUser = () => {
    let navigate = useNavigate()
    const [userName, setUserName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showLoading, setShowLoading] = useState(false);
// AddUser mutation
const [addUser] = useMutation(ADD_USER);
//
const saveUser = (e) => {
    setShowLoading(true);
    e.preventDefault();
    // Add user
    addUser({ variables: { userName, firstName, lastName, email, password } });
    // Clear input fields
    setUserName('');
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setShowLoading(false);
    navigate('/login')  // navigate to login
  };
  //

    // AddUser component UI
    return (
        <div>
        {showLoading && 
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner> 
          } 
          <h2>Create User</h2>
          <Form onSubmit={saveUser}>
            <Form.Group>
                <Form.Label> User Name: </Form.Label>
                <Form.Control type="text" name="userName" id="userName" placeholder="Enter userName" value={userName} onChange={(e) => setUserName(e.target.value)} />
            </Form.Group>
            <Form.Group>
                <Form.Label> First Name: </Form.Label>
                <Form.Control type="text" name="firstName" id="firstName" placeholder="Enter firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </Form.Group>
            <Form.Group>
                <Form.Label> Last Name: </Form.Label>
                <Form.Control type="text" name="lastName" id="lastName" placeholder="Enter lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" name="email" id="email" rows="3" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" id="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit">
                Save
            </Button>
    
          </Form>
        </div>
    
      );
    };
    //
    export default AddUser;