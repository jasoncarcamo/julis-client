import React from 'react';
import AuthService from '../../services/AuthService';
import {Link} from 'react-router-dom';
import uuid4 from 'uuid/v4';
import './registration.css';


export default class Registration extends React.Component{
    constructor(props){
        super(props);
        this.state = {
           first_name: '',
           last_name: '',
           email: '' ,
           password: '',
           passConfirm: '',
           home_number: '',
           mobile_number: '',
           address: '',
           city: '',
           state_region: '',
           zipcode: '',
           error: '' 
        }
    }


    
    handleFirstName = (e)=>{
        this.setState({ first_name: e.target.value});
    }

    handleLastName = (e)=>{
        this.setState({ last_name: e.target.value});
    }

    handleEmail = (e)=>{
        this.setState({ email: e.target.value});
    }

    handlePassword = (e)=>{
        this.setState({password: e.target.value});
    }
    
    handlePasswordConfirmation = (e)=>{
        this.setState({ passConfirm: e.target.value})
    }

    handlePasswordMatch = ()=>{
        
        if(this.state.password.length > 2 && this.state.passConfirm.length > 2 && this.state.password === this.state.passConfirm){
            return (<span className="reg_error" style={{color: 'green'}}>Passwords match!</span>);
        } else{
            return (<span className="reg_error">Passwords do not match.</span>);
        }
    
    }

    handleHomeNumber =(e)=>{
        this.setState({ home_number: e.target.value})
    }

    handleMobileNumber = (e)=>{
        this.setState({ mobile_number: e.target.value});
    }

    handleAddress = (e)=>{
        this.setState({ address: e.target.value});
    }

    handleCity = (e)=>{
        this.setState({ city: e.target.value});
    }

    handleStateRegion = (e)=>{
        this.setState({ state_region: e.target.value});
    } 

    handleZipCode = (e)=>{
        this.setState({ zipcode: e.target.value});
    }

    
    validatePassword = (password) => {
        const REGEX_UPPER_LOWER_NUMBER_SPECIAL = (/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&])[\S]+/);

        if (password.length < 8) {
          return <span className="reg_error" style={{color: 'red'}}>Password must be longer than 8 characters</span>
        }
        if (password.length > 72) {
          return <span className="reg_error" style={{color: 'orange'}}>Password must be less than 72 characters</span>
        }
        if (password.startsWith(' ') || password.endsWith(' ')) {
          return <span className="reg_error" style={{color: 'orange'}}>Password must not start or end with empty spaces</span>
        }
        if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)) {
          return <span className="reg_error" style={{color: 'orange'}}>Password must contain one upper case, lower case, number and special character</span>
        }
        return <span className="reg_error" style={{color: 'green'}}>Looking good!</span>
      }


    handleSubmit = (e)=>{
        e.preventDefault();


        let {first_name, last_name, email, password, home_number, mobile_number, address, city, state_region, zipcode} = this.state;

        const profile_id = uuid4();

        let newUser = {
            first_name,
            last_name,
            email,
            password,
            home_number,
            mobile_number,
            address,
            city,
            state_region,
            zipcode,
            id: profile_id + last_name
        }

        
        AuthService.registerUser(newUser).then(res => {
            if(res){
                this.props.history.push(`/login`)
            }
        })
        .catch(error => this.setState({ error: error.error}));

    }

    render(){
        return (
            <section id="reg_section">
                <form onSubmit={this.handleSubmit} id="reg_form">
                    <fieldset>
                    

                        <label htmlFor="reg_first_name">* First Name:</label>
                        <input type="text" id="reg_first_name" onChange={this.handleFirstName} value={this.state.first_name} required/>

                        <label htmlFor="reg_last_name">* Last Name:</label>
                        <input type="text" id="reg_last_name" onChange={this.handleLastName} value={this.state.last_name} required/>


                        <label htmlFor="reg_email">* Email:</label>
                        <input type="text" id="reg_email" onChange={this.handleEmail} value={this.state.email} required/>

                        <label htmlFor="reg_password">* Enter a password:</label>
                        <input type="password" id="reg_password" onChange={this.handlePassword} value={this.state.password} required/>
                        {this.validatePassword(this.state.password)}
                        
                        <label htmlFor="re_password_confirm">* Retype password:
                        </label>
                        <input type="password" onChange={this.handlePasswordConfirmation} value={this.state.passConfirm} required></input>     
                        {this.state.passConfirm.length < 1 ? '' : this.handlePasswordMatch()}

                        <label htmlFor="reg_home_number">Home Number:</label>
                        <input text="text" id="reg_phone_number" onChange={this.handleHomeNumber} value={this.state.home_number}></input>

                        <label htmlFor="reg_mobile_number">* Mobile Number:</label>
                        <input type="text" id="reg_mobile_number" onChange={this.handleMobileNumber} value={this.state.mobile_number} required/> 

                        <label htmlFor="reg_address">* Address:</label>
                        <input type="text" id="reg_address" onChange={this.handleAddress} value={this.state.address}/>

                        <label htmlFor="reg_city">* City:</label>
                        <input type="text" id="reg_city" onChange={this.handleCity} value={this.state.city} required/>

                        <label htmlFor="reg_state">* State Region:</label>
                        <input type="text" id="reg_state" onChange={this.handleStateRegion} value={this.state.state_region} required/>

                        <label htmlFor="reg_zipcode">* Zip Code</label>
                        <input type="text" id="reg_zipcode" onChange={this.handleZipCode} value={this.state.zipcode} required/>

                        <button type="submit" className="signup_button" id="reg_submit">Sign me up</button>
                        {this.state.error ? <span className="reg_error">{this.state.error} <Link to="login" >Log in</Link></span> : ''}
                    </fieldset>
                    
                </form>
            </section>
        )
    }
}