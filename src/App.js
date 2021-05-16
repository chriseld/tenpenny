import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import './App.css';
import {LoginModal} from './Components/LoginModal';
import {RegisterModal} from './Components/RegisterModal';
import {ProfileModal} from './Components/ProfileModal';

function App() {

  const isLogged = useSelector(state => state.isLogged);
  const dispatch = useDispatch();

  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);
  const [profile, setProfile] = useState(false);

  const homeGuest = () => {
    return(
      <>
      <button id="login" onClick={() => setLogin(true)}>Login</button>
      <button id="register" onClick={() => setRegister(true)}>Register</button>
      </>
    )
  }

  const homeUser = () => {
    return(
      <>
      <button onClick={(()=> dispatch({type:'LOG_OUT'}))}>Log Out</button>
      <button id='profileBtn'onClick={() => setProfile(true)}>Profile</button>
      </>
    )
  }

  const loginMenu = () => {
    if(isLogged) {
      return homeUser();
    } else {
      return homeGuest();
    }
  }

  return (
    <div className="app">
      
      {/* <button id="login" onClick={() => setLogin(true)}>Login</button>
      <button id="register" onClick={() => setRegister(true)}>Register</button> */}

      {loginMenu()}

      {/* <button onClick={(()=> dispatch({type:'LOG_IN'}))}>FLIP STATE</button> */}

      <LoginModal onClose={() => setLogin(false)} show={login} />
      <RegisterModal onClose={() => setRegister(false)} show={register} />
      <ProfileModal onClose={() => setProfile(false)} show={profile} />
   </div>
  );
}

export default App;
