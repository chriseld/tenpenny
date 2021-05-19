import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import {LoginForm} from './LoginForm';
import {RegisterForm} from './RegisterForm';
import {ProfileForm} from './ProfileForm';

import tenpennyLogo from '../assets/tenpenny.png'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Header() {

const isLogged = useSelector(state => state.isLogged);
const dispatch = useDispatch();

const [login, setLogin] = useState(false);
const [register, setRegister] = useState(false);
const [profile, setProfile] = useState(false);

const handleCloseLogin = () => setLogin(false);
const handleCloseRegister = () => setRegister(false);
const handleCloseProfile = () => setProfile(false);
const handleShowLogin = () => setLogin(true);
const handleShowRegister = () => setRegister(true);
const handleShowProfile = () => setProfile(true);

function logout() {
    dispatch({type:'LOG_OUT'});
    handleCloseLogin();
}

if(isLogged === true) {
    return (
        <>
            <Navbar bg="dark" expand="lg" variant="dark" fixed="top">
            <Navbar.Brand href="#home" className="pageTitle" style={{color: '#a39f82'}}>
                <img
                alt="Tenpenny logo"
                src={tenpennyLogo}
                width="30"
                height="30"
                className="d-inline-block align-top"
                />{' '}
                TENPENNY
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">About</Nav.Link>
            <NavDropdown title="Account" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={handleShowProfile}>Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={(()=> logout())}>Log Out</NavDropdown.Item>
            </NavDropdown>
            </Nav>
            </Navbar.Collapse>
            </Navbar>

             <Modal show={profile} onHide={handleCloseProfile}>
                <Modal.Header>
                    <Modal.Title>Log In</Modal.Title>
                </Modal.Header>
                <Modal.Body><ProfileForm /></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseProfile}>
                        Close
                    </Button>
                </Modal.Footer>
             </Modal>
        </>
    )
    } else {
        return (
            <>
            <Navbar bg="dark" expand="lg" variant="dark" fixed="top">
            <Navbar.Brand href="#home" className="pageTitle" style={{color: '#a39f82'}}>
                <img
                alt="Tenpenny logo"
                src={tenpennyLogo}
                width="30"
                height="30"
                className="d-inline-block align-top"
                />{' '}
                TENPENNY
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">About</Nav.Link>
            <NavDropdown title="Account" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={handleShowLogin}>Log In</NavDropdown.Item>
                <NavDropdown.Item onClick={handleShowRegister}>Register</NavDropdown.Item>
            </NavDropdown>
            </Nav>
            </Navbar.Collapse>
            </Navbar>

            <Modal show={login} onHide={handleCloseLogin}>
                <Modal.Header>
                    <Modal.Title>Log In</Modal.Title>
                </Modal.Header>
                <Modal.Body><LoginForm /></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseLogin}>
                        Close
                    </Button>
                </Modal.Footer>
             </Modal>

             <Modal show={register} onHide={handleCloseRegister}>
                <Modal.Header>
                    <Modal.Title>Register</Modal.Title>
                </Modal.Header>
                <Modal.Body><RegisterForm /></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseRegister}>
                        Close
                    </Button>
                </Modal.Footer>
             </Modal>

             <Modal show={profile} onHide={handleCloseProfile}>
                <Modal.Header>
                    <Modal.Title>Log In</Modal.Title>
                </Modal.Header>
                <Modal.Body><ProfileForm /></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseProfile}>
                        Close
                    </Button>
                </Modal.Footer>
             </Modal>
        </>
        )
    }
}

export default Header
