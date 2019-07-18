import React from 'react';
import tokenService from '../../../services/TokenService';
import queryString from 'query-string';


export default class EditService extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            service_type: '',
            comments: '',
            day: '',
            best_time_reached: '',
            price: ''
        }
    }

    componentWillMount(){
        const serviceId = queryString.parse(this.props.location.search);
        console.log(serviceId)
        fetch(`http://localhost:8000/user/service`, {
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${tokenService.getAuthToken()}`
            }
        })
        .then( res => res.json())
        .then(resData => {

            const currentService = resData.services.filter( service => service.id == serviceId.id)[0]
            
            this.setState({ service_type: currentService.service_type, comments: currentService.comments, day: currentService.day, price: currentService.price
            })
        })
        console.log(this.state)
    }

    handleService = (e)=>{
        this.setState({ service_type: e.target.value})
    }

    handleComments = (e)=>{
        this.setState({ comments: e.target.value})
    }

    handleDay = (e)=>{
        this.setState({ day: e.target.value})
    }

    handleTime = (e)=>{
        this.setState({ best_time_reached: e.target.value})
    }

    handlePrice = (e)=>{
        this.setState({ price: e.target.value})
    }

    handleSubmit = (e)=>{
        
        e.preventDefault();
        const serviceId = queryString.parse(this.props.location.search);
        fetch(`http://localhost:8000/user/service`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${tokenService.getAuthToken()}`
            },
            body: JSON.stringify({service_type: this.state.service_type, comments: this.state.comments, day: this.state.day, best_time_reached: this.state.best_time_reached, price: this.state.price, id: serviceId.id, date_modified: new Date()})
        })
        this.props.history.push('/user/services')
    }

    render(){
        
        return (
            <section>
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <label htmlFor="edit_type">Service type:</label>
                        <input type="text" id="edit_type" onChange={this.handleService} value={this.state.service_type}/>

                        <label htmlFor="edit_comments">Comments
                        ?</label>
                        <input type="text" id="edit_comments" onChange={this.handleComments} value={this.state.comments}></input>

                        <label htmlFor="edit_day">Day</label>
                        <input type="text" id="edit_day" onChange={this.handleDay} value={this.state.day}></input>

                        <label htmlFor="edit_time">Time:
                        </label>
                        <input type="text" id="edit_time" onChange={this.handleTime} value={this.state.best_time_reached}></input>

                        <label htmlFor="edit_price">Price:
                        </label>
                        <input type="text" id="edit_price" onChange={this.handlePrice} value={this.state.price}></input>
                        <button type="submit">Go</button>
                    </fieldset>
                </form>
            </section>
        )
    }
}