import React from 'react';
import TokenService from '../../services/TokenService';
import {Link} from 'react-router-dom';


export default class Header extends React.Component{

    renderLogIn = ()=>{
        return (
            <ul>
                <a href="/">Sign Up</a>
                <a href="/"> Log In</a>
            </ul>
        )
    }

    renderLogOut = ()=>{
        return (
            <ul>
                <a href="/" onClick={this.handleLogOut}>Log Out</a>
            </ul>
        )
    }

    handleLogOut = ()=>{
        TokenService.clearAuthToken();
        this.props.history.push('/')
    }

    render(){
        return (
            <header>
                <nav>
                    <div>Logo</div>

                    {TokenService.hasAuthToken() ? this.renderLogOut() : this.renderLogIn()}
                </nav>
            </header>
        )
    }
}