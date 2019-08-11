import React from 'react';
import TokenService from '../../services/TokenService';
import {Link} from 'react-router-dom';
import UserService from '../../services/UserService';
import './header.css'


export default class Header extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            screenWidth: window.innerWidth
        }
    }

    renderLogIn = ()=>{
        return (
            <ul id="header-links">
                <Link to="/register" className="Link" onClick={this.closeMenu}>Sign Up</Link>
                <Link to="/login" className="Link" onClick={this.closeMenu}> Log In</Link>
            </ul>
        )
    }

    componentDidMount(){        
        window.addEventListener("resize", this.handleResize)
    }

    componentWillUnmount(){
        window.removeEventListener("resize", this.handleResize)
    }

    renderLogOut = ()=>{
        return (
            <ul id="header-links">
                <li><Link to="/user/services" className="Link" onClick={this.closeMenu}>services</Link></li>

                <li><Link to="/" onClick={this.handleLogOut} className="Link">Log Out</Link></li>
            </ul>
        )
    }

    handleLogOut = ()=>{
        UserService.clearId();
        TokenService.clearAuthToken();
        this.props.history.push('/')
        this.closeMenu()
    }

    handleMenuIcon = () => {
        const headerLinks = document.getElementById('header-links');
        const datePicker = document.getElementsByClassName('react-date-picker');
        const timePicker = document.getElementsByClassName('react-time-picker');

        if(headerLinks.style.display !== "flex"){

            headerLinks.style.display = "flex";

            if(datePicker[0] && timePicker[0]){                
            datePicker[0].style.display = "none";
            timePicker[0].style.display = "none";
            } else{
                return;
            }
        } else{            

            headerLinks.style.display = "none";

            if(datePicker[0] && timePicker[0]){                
                datePicker[0].style.display = "block";
                timePicker[0].style.display = "block";
            } else {
                return;
            }
        };    
    }

    handleResize=()=>{
        const headerLinks = document.getElementById('header-links')
        if(window.innerWidth > 445){
            headerLinks.style.display = "flex";
        } else{
            headerLinks.style.display = "none";
        }
        this.setState({screenWidth: window.innerWidth});
    }

    closeMenu = () =>{
        const headerLinks = document.getElementById("header-links");   
        if(headerLinks.style.display === "flex"){
            headerLinks.style.display = "none";
        }
    }

   
    render(){
        return (
            <header>
                <nav id="header-nav">
                    <div ><Link to="/" id="logo-icon">Julis Cleaning Service Inc.</Link></div>

                    <div id="menu-icon" onClick={this.handleMenuIcon}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>

                    {TokenService.hasAuthToken() ? this.renderLogOut() : this.renderLogIn()}
                </nav>
            </header>
        )
    }
}