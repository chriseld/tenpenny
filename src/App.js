import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import './App.css';

import Header from './Components/Header';
import PageRouter from './Components/PageRouter';

function App() {

  const isLogged = useSelector(state => state.isLogged);
  const dispatch = useDispatch();

  return (
    <div className="app">

      <Header />
      <PageRouter />
   </div>
  );
}

export default App;
