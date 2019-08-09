import React from 'react';
import AuthService from '../../services/AuthService';
import TokenService from '../../services/TokenService';
import UserService from '../../services/UserService';
import './login.css';


export default class LogIn extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            mobile_number: '',
            password: '',
            error: ''
        }
    }

    componentDidMount(){

        if(UserService.hasId()){
            this.props.history.push(`/user/`)
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
        
        AuthService.postLogin(mobile_number, password).then( resData => {
            
            if(resData.error){
                this.setState({ error: resData.error})
            }
            if(resData.verified){
                TokenService.saveAuthToken(resData.authToken);
                UserService.saveId(resData.id)
                this.props.history.push(`/user/`)
            } else{
                this.props.history.push(`api/resend?token=${resData.authToken}`)
            }
            
        })
        .catch(error => this.setState({error: error.error}));
        
    }

    handleUser = (e)=>{
        e.preventDefault();
        
    }

    render(){
        return (
            <section id="login_section">
                <form onSubmit={this.handleSubmit} id="login_form">
                    <fieldset>
                        <label htmlFor="user_name">Mobile Number:</label>
                        <input type="text" id="user_name" onChange={this.handleNumber} value={this.state.mobile_number}></input>

                        <label htmlFor="password">Password:</label>
                        <input id="password" type="password" onChange={this.handlePassword} value={this.state.password}></input>

                        <button type="submit" className="login_button" id="login_submit">Log In</button>
                        {this.state.error ? <p id="login_error">{this.state.error}</p> : ''}
                    </fieldset>
                </form>
            </section>
        )
    }
} 