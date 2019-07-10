import React from 'react';
import './App.css';
import LogIn from './components/login/LogIn';
import Header from './components/header/Header';
import {Route} from 'react-router-dom';
import Registration from './components/registration/Registration';
import UserInfo from './components/user/UserInfo';

function App() {
  return (
    <div className="App">
      <Route path="/" component={Header}></Route>
      <Route exact path="/login" component={LogIn}></Route>  
      <Route exact path="/register" component={Registration}></Route>
      <Route exact path="/user" component={UserInfo}></Route>
    </div>
  );
}

export default App;
