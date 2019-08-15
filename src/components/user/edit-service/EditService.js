import React from 'react';
import {withRouter} from 'react-router-dom';
import tokenService from '../../../services/TokenService';
import queryString from 'query-string';
import DatePicker from 'react-date-picker';
import TimePicker from 'react-time-picker';
import './editservice.css';

class EditService extends React.Component{
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
            service_type: '',
            comments: '',
            time: '',            
            date: new Date(),
            price: '0.00'
        }
    }

    componentDidMount(){
        
        const serviceId = queryString.parse(this.props.location.search);
        fetch(`https://fathomless-eyrie-65525.herokuapp.com/user/service?id=${serviceId.id}`, {
            headers: {
                "content-type": "application/json",
                "authorization": `bearer ${tokenService.getAuthToken()}`
            }
        })
        .then(res => res.json())
        .then(resData => {
            console.log(resData)
            this.handleEditService(resData.services, serviceId.id);
        });
    }

    handleEditService = (services, serviceId) =>{
        const inputArray = document.getElementsByTagName("input");
        const currentService = services.find(service => service.id === Number(serviceId));
        let serviceArray;
        if(currentService.service_type.includes(",")){
            serviceArray = currentService.service_type.split(',');
            for(let i = 0; i < serviceArray.length; i++){
                inputArray[serviceArray[i]].click()
                console.log(inputArray[serviceArray[i]])
            }
            console.log(serviceArray)
        } else{
            console.log('Bye')
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
            serviceArray = newService.split(',');      
            
            if(serviceArray[0] === ""){
                serviceArray.shift();                
            }
            
            newService = serviceArray.join(',');
            newPrice = parseFloat(this.state.price) + parseFloat(e.target.value)
                        
        } else{
            
            targetName = e.target.name
            serviceArray = this.state.service_type.split(',');
            serviceIndex = serviceArray.indexOf(targetName)
            
            serviceArray.splice(serviceIndex, 1)
            if(serviceArray[0] === ""){
                serviceArray.shift()
            }
            
            newService = serviceArray.join(', ')
            
            newPrice = parseFloat(this.state.price) - parseFloat(e.target.value)
        }
        
        this.setState({service_type: newService})
        this.setState({ price: newPrice});
       
    }

    handleComments = (e)=>{
        
        this.setState({ comments: e.target.value})
    }

    handleDay = (date)=>{
        this.setState({date})
    }

    handleTime = (time)=>{
        this.setState({time})
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
    
    
    handlePrice = (e)=>{
        this.setState({ price: e.target.value})
    }

    handleSubmit = (e)=>{
        
        e.preventDefault();
        const serviceId = queryString.parse(this.props.location.search);
        fetch(`https://fathomless-eyrie-65525.herokuapp.com/user/service`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${tokenService.getAuthToken()}`
            },
            body: JSON.stringify({service_type: this.state.service_type, comments: this.state.comments, day: this.state.date, best_time_reached: `${this.formatTime()}`, price: this.state.price, id: serviceId.id, date_modified: new Date()})
        })
        this.props.history.push('/user/services')
    }

    render(){

        return (
            <section id="edit_section">
                <form onSubmit={this.handleSubmit} id="edit_form">
                    <fieldset>
                        <header><h1>Edit your service.</h1></header>

                        <div className="checkbox-grid">
                            <div>
                                {this.state.services.map( service => (
                                    <label key={service.name} htmlFor={`edit_${service.name}`}>
                                        <input type="checkbox" id={`edit_${service.name}`} name={service.name} value={service.price} onChange={this.handleService}>                               
                                        </input>{service.name}
                                    </label>)
                                )}
                            </div>

                            <span id="edit_price">${this.state.price}</span>
                        </div>

                        <label htmlFor="edit_day">When?</label>
                        <DatePicker className="edit_days" value={this.state.date} onChange={this.handleDay} required/>

                        <label htmlFor="edit_time">Time:
                        </label>
                        <TimePicker id="edit_time" onChange={this.handleTime} value={this.state.time} disableClock={true} />

                        <label htmlFor="edit_comments">Comments
                        ?</label>
                        <textarea id="edit_comments" onChange={this.handleComments} value={this.state.comments} placeholder="Any special request?"></textarea>

                        <button type="submit" id="edit_submit">Go</button>
                    </fieldset>
                </form>
            </section>
        )
    }
}

export default withRouter(EditService);