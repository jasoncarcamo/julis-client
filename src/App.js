import React from 'react';
import './App.css';
import LogIn from './components/login/LogIn';
import Header from './components/header/Header';
import LandingPage from './components/landingpage/LandingPage';
import {Route} from 'react-router-dom';
import Registration from './components/registration/Registration';
import User from './components/user/User';



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
        return (
            <section>
                <section className="App">
                    <Route path="/" component={Header}></Route>
                    <Route exact path="/" component={LandingPage}></Route>
                    <Route exact path="/login" render={props => <LogIn {...props}/>}></Route>  
                    <Route exact path="/register" component={Registration}></Route>
                    <Route path="/user/" render={props => <User {...props} user={this.state.id} refresh={this.goToLogin}/>}></Route>
                </section>
                <footer>
                    <p>Copyright Julis Cleaning Company, All rights reserved</p>
                </footer>
            </section>
        );
    }
}

