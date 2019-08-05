import React from 'react';
import TokenService from '../../../services/TokenService';
import {format as formatDate, getTime} from 'date-fns'
import {Link} from 'react-router-dom';
import './servicehistory.css';


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
            price: '',
            confirm: false
        }
    }

    componentDidMount(){
        
        fetch('https://fathomless-eyrie-65525.herokuapp.com/user/service', {            
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
            .then( res => res.json())
            .then( resData => this.setState({services: resData.services}));
    }

    renderServices = ()=>{
        this.state.services.map( service => (
            <li key={service.id}>
               
                <header className="hi">Date set for {formatDate(getTime(service.date_modified), 'MMM Do YYYY ')}{service.best_time_reached}</header>
                <p>{service.service_type}</p>
                <p>{service.comments}</p>
                <Link to={`/user/editservice?id=${service.id}`}>Edit</Link>  
                {this.state.confirm ? (
                <>
                    <button onClick={this.handleCancelService} className={service.id}>confirm</button> 
                    
                    <button className="cancel_confirm" onClick={()=> this.setState({confirm: false})}>Cancel</button>
                </>) : <button type="button" className="cancel_confirm" onClick={() => this.setState({confirm: true})} >Cancel clean up</button>}                         
            </li>))  
    }

    renderServices = (services)=>{
        if(services.length !==0 ){
            return this.state.services.map( service => (
                <li key={service.id}>
                   
                    <header className="hi">Date set for {formatDate(getTime(service.date_modified), 'MMM Do YYYY ')}{service.best_time_reached}</header>
                    <p>{service.service_type}</p>
                    <p>{service.comments}</p>
                    <Link to={`/user/editservice?id=${service.id}`}>Edit</Link>  
                    {this.state.confirm ? (
                    <>
                        <button onClick={this.handleCancelService} className={service.id}>confirm</button> 
                        
                        <button className="cancel_confirm" onClick={()=> this.setState({confirm: false})}>Cancel</button>
                    </>) : <button type="button" className="cancel_confirm" onClick={() => this.setState({confirm: true})} >Cancel clean up</button>}                         
                </li>))
        } else{
            return <h1 className="no_service">You don't have any arranged services yet, click <Link to="/user/newservice">here</Link> to arrange your first service.</h1>
        }
    }

    handleCancelService = (e)=>{
        e.preventDefault()

        fetch(`https://fathomless-eyrie-65525.herokuapp.com/user/service`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify({id: e.target.className})

        })
            .then( res => {
                this.componentDidMount();
            })

        
    }

    
    render(){
        
        return(
            <section id="service_header">
                <ul>
                    {this.renderServices(this.state.services)}
                </ul>
            </section>
        )
    }
}