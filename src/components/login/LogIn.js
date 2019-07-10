import React from 'react';
import AuthService from '../../services/AuthService';
import { thisExpression } from '@babel/types';


export default class LogIn extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            mobile_number: null,
            password: ''
        }
    }

    handleNumber = (e)=>{
        this.setState({mobile_number: e.target.value})
    }

    handlePassword = (e)=>{
        this.setState({ password: e.target.value})
    }

    handleSubmit = (e)=>{
        e.preventDefault();
        const {mobile_number, password} = this.state;

        AuthService.postLogin(mobile_number, password).then( res => {
            
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
                        <label htmlFor="user_name">Mobile Number:</label>
                        <input type="text" id="user_name" onChange={this.handleNumber} value={this.state.mobile_number}></input>

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