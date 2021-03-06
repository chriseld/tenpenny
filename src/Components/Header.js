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
import { Dropdown, Form } from 'react-bootstrap';
import { DropdownButton } from 'react-bootstrap';

import JWTDecode from './JWTDecode';

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
    localStorage.removeItem('userToken');
    window.location.replace("/");
}

function dropdownDisplay() {
    if(isLogged === true) {
        return(
            <>
            <NavDropdown.Item onClick={handleShowProfile}>Profile</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={(()=> logout())}>Log Out</NavDropdown.Item>
            </>
        )
    } else {
        return(
            <>
            <NavDropdown.Item onClick={handleShowLogin}>Log In</NavDropdown.Item>
            <NavDropdown.Item onClick={handleShowRegister}>Register</NavDropdown.Item>
            </>
        )
    }
}


return (
        <>
            <JWTDecode />
            <Navbar bg="dark" expand="lg" variant="dark" fixed="top">
            <Navbar.Brand href="/" className="pageTitle" style={{color: '#a39f82'}}>
                <img
                alt="Tenpenny logo"
                src={tenpennyLogo}
                width="30"
                height="30"
                className="d-inline-block align-top"
                />{' '}
                <span style={{color: '#d7d7d7'}}>TEN</span>PENNY
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <NavDropdown title="Account" id="basic-nav-dropdown">
                {dropdownDisplay()}
            </NavDropdown>
            </Nav>
            </Navbar.Collapse>
            </Navbar>
            

            <Modal show={login} onHide={handleCloseLogin}>
                <Modal.Header Style="background-color: #d7d7d7">
                    <Modal.Title>Log In</Modal.Title>
                </Modal.Header>
                <Modal.Body><LoginForm /></Modal.Body>
                <Modal.Footer Style="background-color: #d7d7d7">
                    <Button variant="secondary" onClick={handleCloseLogin}>
                        Close
                    </Button>
                </Modal.Footer>
             </Modal>

             <Modal show={register} onHide={handleCloseRegister}>
                <Modal.Header Style="background-color: #d7d7d7">
                    <Modal.Title>Register</Modal.Title>
                </Modal.Header>
                <Modal.Body><RegisterForm /></Modal.Body>
                <Modal.Footer Style="background-color: #d7d7d7">
                    <Button variant="secondary" onClick={handleCloseRegister}>
                        Close
                    </Button>
                </Modal.Footer>
             </Modal>

             <Modal show={profile} onHide={handleCloseProfile}>
                <Modal.Header Style="background-color: #d7d7d7">
                    <Modal.Title>Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body><ProfileForm /></Modal.Body>
                <Modal.Footer Style="background-color: #d7d7d7">
                    <Button variant="secondary" onClick={handleCloseProfile}>
                        Close
                    </Button>
                </Modal.Footer>
             </Modal>
        </>
    )
}

export default Header
