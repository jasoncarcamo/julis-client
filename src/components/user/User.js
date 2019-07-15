import React from 'react';
import ApiContext from '../../apiContext/ApiContext';
import UserService from '../../services/UserService';
import RequestService from './RequestService/RequestService';
import TokenService from '../../services/TokenService';

export default class User extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            first_name: 'oknfiwe', 
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
        
        if(this.props.match.params.id === UserService.getId()){
            
            fetch(`http://localhost:8000/user/${UserService.getId()}`)
                .then( res => (!res.ok) ? res.json().then(e => Promise.reject(e)): res.json())
                    .then( resData => {
                        
                        this.setState({

                            first_name: resData.first_name,
                            last_name: resData.last_name,
                            email: resData.email, 
                            home_number: resData.home_number,
                            mobile_number: resData.mobile_number,
                            date_created: resData.date_created,
                            date_modified: resData.date_modified,
                            address: resData.address,
                            city: resData.city,
                            state_region: resData.state_region,
                            zipcode: resData.zipcode,
                            verified: resData.verified                            
                        })
                    
                    });
        } else{
            UserService.clearId();
            TokenService.clearAuthToken();
            this.props.history.push('/login')
        }
    }

    static context = ApiContext;

    
    render(){
        
        return (
            <section>
                <h2>Hello {this.state.first_name}</h2>
                
                <RequestService user={UserService.getId()}/>
            </section>
        )
    }
}