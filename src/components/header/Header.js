import React from 'react';
import TokenService from '../../services/TokenService';
import {Link} from 'react-router-dom';
import UserService from '../../services/UserService';


export default class Header extends React.Component{

    renderLogIn = ()=>{
        return (
            <ul>
                <Link to="/register">Sign Up</Link>
                <Link to="/login"> Log In</Link>
            </ul>
        )
    }

    renderLogOut = ()=>{
        return (
            <ul>
                <Link to="/" onClick={this.handleLogOut}>Log Out</Link>
            </ul>
        )
    }

    handleLogOut = ()=>{
        UserService.clearId();
        TokenService.clearAuthToken();
        this.props.history.push('/')
    }

    render(){
        return (
            <header>
                <nav>
                    <div><Link to="/">Logo</Link></div>

                    {TokenService.hasAuthToken() ? this.renderLogOut() : this.renderLogIn()}
                </nav>
            </header>
        )
    }
}