import React from 'react';
import AuthService from '../../services/AuthService';
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
        
        if(this.state.password.length > 5 && this.state.passConfirm.length > 5 && this.state.password === this.state.passConfirm){
            return (<span className="correct_password">Great!</span>);
        } else{
            return (<span className="incorrect_password">Passwords do not match.</span>);
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
        });

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
                        
                        <label htmlFor="re_password_confirm">* Retype password:
                        </label>
                        <input type="password" onChange={this.handlePasswordConfirmation} value={this.state.passConfirm} required></input>     
                        {this.state.passConfirm.length < 5 ? '' : this.handlePasswordMatch()}

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
                        <input type="text" id="reg_zipcode" onChange={this.handleZipCode} vlaue={this.state.zipcode} required/>

                        <button type="submit" id="reg_submit">Sign me up</button>
                    </fieldset>
                </form>
            </section>
        )
    }
}