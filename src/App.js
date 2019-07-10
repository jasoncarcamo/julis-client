import React from 'react';
import './App.css';
import LogIn from './components/login/LogIn';
import Header from './components/header/Header';
import {Route} from 'react-router-dom';
import Registration from './components/registration/Registration'

function App() {
  return (
    <div className="App">
      <Route path="/" component={Header}></Route>
      <Route path="/login" component={LogIn}></Route>  
      <Route path="/register" component={Registration}></Route>
    </div>
  );
}

export default App;
