import React from 'react';
import TokenService from '../../services/TokenService';
import {Link} from 'react-router-dom';
import UserService from '../../services/UserService';
import './header.css'


export default class Header extends React.Component{

    renderLogIn = ()=>{
        return (
            <ul className="header-links">
                <Link to="/register" className="Link">Sign Up</Link>
                <Link to="/login" className="Link"> Log In</Link>
            </ul>
        )
    }

    componentDidMount(){
        
    }

    renderLogOut = ()=>{
        return (
            <ul className="header-links">
                <Link to="/user/services" className="Link">services</Link>
                <Link to="/" onClick={this.handleLogOut} className="Link">Log Out</Link>
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
                <nav id="header-nav">
                    <div><Link to="/" id="logo-icon">Julis Cleaning Service Inc.</Link></div>

                    {TokenService.hasAuthToken() ? this.renderLogOut() : this.renderLogIn()}
                </nav>
            </header>
        )
    }
}