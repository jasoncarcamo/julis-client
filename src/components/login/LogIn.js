import React from 'react';
import AuthService from '../../services/AuthService';
import { thisExpression } from '@babel/types';


export default class LogIn extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user_name: '',
            password: ''
        }
    }

    handleUserName = (e)=>{
        this.setState({user_name: e.target.value})
    }

    handlePassword = (e)=>{
        this.setState({ password: e.target.value})
    }

    handleSubmit = (e)=>{
        e.preventDefault();
        const {user_name, password} = this.state;

        AuthService.postLogin(user_name, password).then( res => {
            
        });
        
    }

    handleUser = (e)=>{
        e.preventDefault();
        
    }

    render(){
        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <label htmlFor="user_name">Username:</label>
                        <input type="text" id="user_name" onChange={this.handleUserName} value={this.state.user_name}></input>

                        <label htmlFor="password">Password</label>
                        <input id="password" type="password" onChange={this.handlePassword} value={this.state.password}></input>

                        <button type="submit">Log In</button>
                    </fieldset>
                </form>
                <form onSubmit={this.handleUser}>
                    <fieldset>
                        <input type="text" value={this.state.user_name} onChange={this.handleUserName}></input>
                        <button type="submit">Go</button>
                    </fieldset>
                </form>
            </>
        )
    }
} 