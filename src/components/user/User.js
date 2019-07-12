import React from 'react';
import ApiContext from '../../apiContext/ApiContext';
import UserService from '../../services/UserService';

export default class User extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            first_name: '', 
            last_name: '', 
            best_days_reach: '',
            best_time_reach: '',
            email: '', 
            home_number: '',
            mobile_number: '',
            date_created: '',
            date_modified: '',
            address: '',
            city: '',
            state_region: '',
            zipcode: '',
            message: '',
            verified: ''
        }
    }

    componentDidMount(){
        fetch(`http://localhost:8000/user/${UserService.getId()}`)
            .then( res => (!res.ok) ? res.json().then(e => Promise.reject(e)): res.json())
                .then( resData => {

                    this.setState({

                        first_name: resData.first_name,
                        last_name: resData.last_name, 
                        best_days_reach: resData.best_days_reach,
                        best_time_reach: resData.best_time_reach,
                        email: resData.email, 
                        home_number: resData.home_number,
                        mobile_number: resData.mobile_number,
                        date_created: resData.date_created,
                        date_modified: resData.date_modified,
                        address: resData.address,
                        city: resData.city,
                        state_region: resData.state_region,
                        zipcode: resData.zipcode,
                        message: resData.message,
                        verified: resData.verified
                        
                    })
                   
                });
    }

    static context = ApiContext;

    handleSubmit = (e)=>{
        e.preventDefault();
        return fetch('http://localhost:8000/user/699b1330-6e25-41b6-a707-3095798aa1b1carcamo').then(res => res.json()).then(resData => console.log(resData));
    }
    render(){

        return (
            <form onSubmit={this.handleSubmit}>
                <fieldset>
                    {this.props.user}
                    <button type="submit">Go</button>
                </fieldset>
            </form>
        )
    }
}