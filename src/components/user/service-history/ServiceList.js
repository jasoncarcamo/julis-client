import React from 'react';
import {format as formatDate, getTime} from 'date-fns'
import {Link } from 'react-router-dom';


export default class ServiceList extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            confirm: false
        }
    }


    render(){
        const service = this.props.service;
        return (
                <li key={service.id}>
                   
                    <header className="hi">Date set for {formatDate(getTime(service.date_modified), 'MMM Do YYYY ')}{service.best_time_reached}</header>

                    <p>Service type: {service.service_type}</p>

                    <p>Comments: {service.comments}</p>

                    <div>
                        <Link to={`/user/editservice?`} className="edit_button" id={service.id}>Edit</Link>  
                        
                        {this.state.confirm ? (
                        <div>
                            <button onClick={this.props.handleCancelService} className={service.id} >confirm</button> 
                            
                            <button className="cancel_confirm" onClick={()=> this.setState({confirm: false})}>Cancel</button>
                        </div>) : (
                        <div>
                            <button type="button" className="cancel_confirm" onClick={() => this.setState({confirm: true})} >Cancel clean up</button>
                        </div>)}     
                    </div>
                </li>)
    }
}