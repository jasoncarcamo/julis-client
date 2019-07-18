import React from 'react';
import TokenService from '../../../services/TokenService';
import {format as formatDate, getTime} from 'date-fns'
import {Route, Link} from 'react-router-dom';
import EditService from '../edit-service/EditService';

export default class ServiceHistory extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            services: [],
            service_type: '',
            comments: '',
            day: '',
            best_time_reached: '',
            date_created: '',
            price: ''
        }
    }

    componentWillMount(){
        
        fetch('http://localhost:8000/user/service', {            
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
            .then( res => res.json())
            .then( resData => this.setState({services: resData.services}));
    }


    componentDidMount(){
        
        fetch('http://localhost:8000/user/service', {            
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
            .then( res => res.json())
            .then( resData => this.setState({services: resData.services}));
    }


    handleCancelService = (e)=>{
        e.preventDefault()
        fetch(`http://localhost:8000/user/service`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify({id: e.target.id})

        })

        this.props.refresh();
    }
   
    render(){
        
        return(
            <section>
                <ul>
                    {this.state.services.map( service => (<li key={service.id}><header onClick={this.handleCancelService}>{formatDate(getTime(service.date_modified), 'MMM Do YYYY hh:mm:ss A ZZ ')}</header><p>{service.comments}</p><button type="button" onClick={this.handleCancelService} id={service.id}>Cancel</button><Link to={`/user/editservice?id=${service.id}`}>Edit</Link></li>))}
                </ul>
            </section>
        )
    }
}