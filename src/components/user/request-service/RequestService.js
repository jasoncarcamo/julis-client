import React from 'react';
import TokenService from '../../../services/TokenService';
import DatePicker from 'react-date-picker'
import TimePicker from 'react-time-picker';
import './requestservice.css'


export default class RequestService extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            services: [
                {
                    name: 'Windows',
                    price: '20.00'
                },
                {
                    name: 'Refridgerator',
                    price: '20.00'
                },
                {
                    name: 'Walls',
                    price: '30.00'
                }
            ],
            date: new Date(),
            service_type: '',
            time: '',
            comments: '',
            price: '0.00'
        }
    }

    handleService= (e)=>{
        let newService;
        let newPrice;
        let serviceArray;
        let serviceIndex;
        let targetName;

        if(e.target.checked){
            
            newService = this.state.service_type + ',' + e.target.name;     
            serviceArray = newService.split(',');      if(serviceArray[0] === ""){
                serviceArray.shift();                
            }
            
            newService = serviceArray.join(', ');
            newPrice = parseFloat(this.state.price) + parseFloat(e.target.value)
                        
        } else{
            
            targetName = e.target.name
            serviceArray = this.state.service_type.split(',');
            serviceIndex = serviceArray.indexOf(targetName)
            
            serviceArray.splice(serviceIndex, 1)
            if(serviceArray[0] === ""){
                serviceArray.shift()
            }
            
            newService = serviceArray.join(',')
            
            newPrice = parseFloat(this.state.price) - parseFloat(e.target.value)
        }
        
        this.setState({service_type: newService})
        this.setState({ price: newPrice});
              
    }

    handleDay = (date)=>{
        this.setState({date});        
    }

    handleBestTime = (time)=>{
        
        this.setState({time});
    }

    formatTime = ()=>{
        let newTime;
        const arr = this.state.time.split(':');
        if(arr[0] > 12){
            arr[0] = arr[0] - 12 ;
            newTime = arr.join(':') + ' PM';
        } else if(arr[0] === '00'){
            arr[0] = '12'
            newTime = arr.join(':') + ' AM'
        } else if(arr[0] === '12'){
            newTime = arr.join(':') + ' PM'
        }
        else{
            newTime = arr.join(':') + ' AM';
        }
        return newTime;
    }

    handleComments = (e)=>{
        this.setState({comments: e.target.value});
    }

    handlePrice = (e)=>{
        this.setState({price: e.target.value});
    }


    handleSubmit = (e)=>{
        e.preventDefault();
        
        fetch(`https://fathomless-eyrie-65525.herokuapp.com/user/service`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify({service_type: this.state.service_type, comments: this.state.comments, day: this.state.date, best_time_reached: `${this.formatTime()}`, price: this.state.price, user_id: this.props.user, date_modified: new Date()})
        })
        .then( res => res.json())
        .then(resData => this.props.refresh());
    }

    
    
    
    render(){
        return (
            <section id="req_section">
                <form onSubmit={this.handleSubmit} id="req_form">
                    
                    <fieldset>

                        <header><h1>Make a request</h1></header>
                        
                        <div className="checkbox-grid">

                            <div>
                                {this.state.services.map( service => (<label key={service.name} htmlFor={`req_${service.name}`}>
                                    <input type="checkbox" className="checkboxes" id={`req_${service.name}`} name={service.name} value={service.price} onChange={this.handleService}></input>
                                    {service.name}
                                </label>))}
                            </div>

                            <span id="req_price">${this.state.price}</span>

                        </div> 

                        <label htmlFor="req_days">When?
                        </label>
                        <DatePicker value={this.state.date} onChange={this.handleDay} required/>

                        <label htmlFor="req_time">Time:</label>
                        <TimePicker id="req-time" onChange={this.handleBestTime} value={this.state.time} disableClock={true} format="hh:mm a" amPmAriaLabel="PM"/>

                        <label htmlFor="req_comments">Comments?</label>
                        <textarea id="req_comments" onChange={this.handleComments} value={this.state.comments} placeholder="Any special requests?"></textarea>

                        <button type="submit" id="req_submit">Go</button>
                    </fieldset>
                </form>
            </section>
        )
    }
}