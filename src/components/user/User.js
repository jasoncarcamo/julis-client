import React from 'react';
import UserService from '../../services/UserService';
import RequestService from './request-service/RequestService';
import TokenService from '../../services/TokenService';
import {Route, Link, withRouter} from 'react-router-dom';
import ServiceHistory from './service-history/ServiceHistory';
import EditService from './edit-service/EditService';
import './user.css';


class User extends React.Component{
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
        
        if(UserService.getId()){
            
            fetch(`https://fathomless-eyrie-65525.herokuapp.com/user/`, {
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
            <section id="user_section">

                <h1 style={{color: 'black'}}>Hello <span style={{color: '#DB7093'}}>{this.state.first_name}</span></h1>

                <div>
                    <Link to={`/user/services`} className="User-Link">My Services</Link>
                    <Link to={`/user/newservice`} className="User-Link">Arrange Clean Up</Link>
                </div>

                <Route exact path="/user" component={props => <ServiceHistory {...props} refresh={this.handleRefresh}/>}/>
                <Route exact path={`/user/services`} component={props => <ServiceHistory {...props} refresh={this.handleRefresh}/>}></Route>                
                <Route exact path={`/user/newservice`} render={props => <RequestService {...props} user={UserService.getId()} refresh={this.handleRefresh}></RequestService> }></Route>
                <Route path="/user/editservice" component={EditService}></Route>
                
            </section>
        )
    }
}

export default withRouter(User);