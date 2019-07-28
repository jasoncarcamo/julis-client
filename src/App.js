import React from 'react';
import './App.css';
import LogIn from './components/login/LogIn';
import Header from './components/header/Header';
import LandingPage from './landingpage/LandingPage';
import {Route} from 'react-router-dom';
import Registration from './components/registration/Registration';
import User from './components/user/User';
import ApiContext from './apiContext/ApiContext';
import Verify from './components/verify/Verify';
import ResendVerification from './components/verify/ResendVerificaton';



export default class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            id: '',
        }
    }

    componentDidMount(){
        
    }

    handleAddId = (id)=>{
        this.setState({id});
    }
   
    
    render(){
        let value ={
            id: this.state.id,
            setId: this.handleAddId
        }

       
        return (
            <ApiContext.Provider value={value}>
                <div className="App">
                    <Route path="/" component={Header}></Route>
                    <Route exact path="/" component={LandingPage}></Route>
                    <Route exact path="/login" render={props => <LogIn {...props}/>}></Route>  
                    <Route exact path="/register" component={Registration}></Route>
                    <Route path="/user/" render={props => <User {...props} user={this.state.id} refresh={this.goToLogin}/>}></Route>
                    <Route exact path="/api/verify" component={Verify}></Route>
                    <Route exact path="/api/resend" component={ResendVerification}></Route>
                </div>
            </ApiContext.Provider>
        );
    }
}

