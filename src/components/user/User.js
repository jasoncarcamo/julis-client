import React from 'react';
import ApiContext from '../../apiContext/ApiContext';
import UserService from '../../services/UserService';
import RequestService from './request-service/RequestService';
import TokenService from '../../services/TokenService';
import {Route, Link} from 'react-router-dom';
import ServiceHistory from './service-history/ServiceHistory';
import EditService from './edit-service/EditService';

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

    static context = ApiContext;

    componentDidMount(){
        
        if(UserService.getId()){
            
            fetch(`http://localhost:8000/user/`, {
                headers: {
                    'authorization': `bearer ${TokenService.getAuthToken()}`
                }
            })
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
    
    handleRefresh = (e)=> {
        this.props.history.push('/user/services')
    }

    
    render(){
        
        return (
            <section>
                <Link to={`/user/services`}>Service details</Link>
                <Link to={`/user/newservice`}>Arrange Clean Up</Link>
                <h1>Hello {this.state.first_name}</h1>
                <Route exact path={`/user/services`} component={props => <ServiceHistory{...props} refresh={this.handleRefresh}/>}></Route>
                
                <Route exact path={`/user/newservice`} render={props => <RequestService {...props} user={UserService.getId()}></RequestService> }></Route>
                <Route path="/user/editservice" component={EditService}></Route>
            </section>
        )
    }
}