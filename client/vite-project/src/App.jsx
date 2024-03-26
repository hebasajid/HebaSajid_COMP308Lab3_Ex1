import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import './App.css';

// Import components
import Home from './components/Home';
import AddUser from './components/AddUser';
import LoginUser from './components/LoginUser';
import AddVitals from './components/AddVitals';
import ListVitals from './components/ListVitals';
import VitalsHome from './components/VitalsHome';
import EditVitals from './components/EditVitals';

// App component
function App() {
  return (
    <Router>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/home">
            React Client For GraphQL API
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/home">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/createuser">
                Create User
              </Nav.Link>
              <Nav.Link as={Link} to="/addvitals">
                Add Vitals
              </Nav.Link>
              <Nav.Link as={Link} to="/listvitals">
                List Vitals
              </Nav.Link>
              
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div>
        <Routes>
          <Route path="/"index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<LoginUser />} />
          <Route path="/createuser" element={<AddUser />} />
          <Route path = "/editvitals/:id" element={<EditVitals />} />
          <Route path="/addvitals" element={<AddVitals />} />
          <Route path="/listvitals" element={<ListVitals />} />
          <Route path="/vitalshome" element={<VitalsHome/>} />
         
        </Routes>
      </div>
    </Router>
  );
}
//
export default App;

