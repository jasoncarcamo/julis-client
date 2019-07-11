import React from 'react';
import AuthService from '../../services/AuthService';
import uuid4 from 'uuid/v4';
import TokenService from '../../services/TokenService';
import UserService from '../../services/UserService';



export default class Registration extends React.Component{
    constructor(props){
        super(props);
        this.state = {
           first_name: '',
           last_name: '',
           email: '' ,
           password: '',
           home_number: '',
           mobile_number: '',
           address: '',
           city: '',
           state_region: '',
           zipcode: '',
           best_days_reached: '',
           best_time_reached: '',
           message: ''
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

    handleBestDays = (e)=>{
        this.setState({ best_days_reached: e.target.value});
    }

    handleBestTime = (e)=>{
        this.setState({ best_time_reached: e.target.value});
    }

    handleMessage = (e)=>{
        this.setState({ message: e.target.value})
    }


    handleSubmit = (e)=>{
        e.preventDefault();


        let {first_name, last_name, email, password, home_number, mobile_number, address, city, state_region, zipcode, best_days_reached, best_time_reached, message} = this.state;

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
            best_days_reached,
            best_time_reached, 
            message,
            id: profile_id + last_name
        }

        
        AuthService.registerUser(newUser).then(res => {
            if(res){
                
                UserService.saveId(res.id);
                this.props.history.push(`/user/${res.id}`)
            }
        });

    }

    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <fieldset>
                

                    <label htmlFor="reg_first_name">First Name:</label>
                    <input type="text" id="reg_first_name" onChange={this.handleFirstName} value={this.state.first_name}/>

                    <label htmlFor="reg_last_name">Last Name:</label>
                    <input type="text" id="reg_last_name" onChange={this.handleLastName} value={this.state.last_name}/>


                    <label htmlFor="reg_email">Email:</label>
                    <input type="text" id="reg_email" onChange={this.handleEmail} value={this.state.email}/>

                    <label htmlFor="reg_password">Enter a password</label>
                    <input type="password" id="reg_password" onChange={this.handlePassword} value={this.state.password}/>
                    
                    <label htmlFor="reg_home_number">Home Number:</label>
                    <input text="text" id="reg_phone_number" onChange={this.handleHomeNumber} value={this.state.home_number}></input>

                    <label htmlFor="reg_mobile_number">Mobile Number:</label>
                    <input type="text" id="reg_mobile_number" onChange={this.handleMobileNumber} value={this.state.mobile_number}/> 

                    <label htmlFor="reg_address">Address:</label>
                    <input type="text" id="reg_address" onChange={this.handleAddress} value={this.state.address}/>

                    <label htmlFor="reg_city">City:</label>
                    <input type="text" id="reg_city" onChange={this.handleCity} value={this.state.city}/>

                    <label htmlFor="reg_state">State Region:</label>
                    <input type="text" id="reg_state" onChange={this.handleStateRegion} value={this.state.state_region}/>

                    <label htmlFor="reg_zipcode"></label>
                    <input type="number" id="reg_zipcode" onChange={this.handleZipCode} vlaue={this.state.zipcode}/>

                    <label htmlFor="reg_best_days">Best Day/ Days to be reached</label>
                    <input type="text" id="reg_best_days" onChange={this.handleBestDays} value={this.state.best_days_reached}/>

                    <label htmlFor="reg_best_time">Best Time to be reached</label> 
                    <input type="text" id="reg_best_time" onChange={this.handleBestTime} value={this.state.best_time_reached}/>
                    <label htmlFor="reg_message">Message:</label>
                    <textarea type="text" id="reg_message" placeholder="Any special requests?" onChange={this.handleMessage} value={this.state.message}/>


                    <button type="submit">Sign me up</button>
                </fieldset>
            </form>
        )
    }
}