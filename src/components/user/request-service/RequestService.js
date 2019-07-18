import React from 'react';
import TokenService from '../../../services/TokenService';


export default class RequestService extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            service_type: '',
            day: '',
            best_time_reached: '',
            comments: '',
            price: ''
        }
    }

    handelService = (e)=>{
        this.setState({service_type: e.target.value});
    }

    handleDay = (e)=>{
        this.setState({day: e.target.value});
    }

    handleBestTime = (e)=>{
        this.setState({best_time_reached: e.target.value});
    }

    handleComments = (e)=>{
        this.setState({comments: e.target.value});
    }

    handlePrice = (e)=>{
        this.setState({price: e.target.value});
    }


    handleSubmit = (e)=>{
        e.preventDefault();
        
        fetch(`http://localhost:8000/user/service`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify({service_type: this.state.service_type, comments: this.state.comments, day: this.state.day, best_time_reached: this.state.best_time_reached, price: this.state.price, user_id: this.props.user, date_modified: new Date()})
        })
        .then( res => res.json())
        .then(resData => this.props.history.push('/user/services'));
    }


    render(){
        
        return (
            <section>
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <header>Make a request</header>
                        <label htmlFor="req_service_type">service type</label>
                        <input type="text" id="req_service_type" onChange={this.handelService} value={this.state.service_type}></input>

                        <label htmlFor="req_day">What day?</label>
                        <input type="text" id="req_day" onChange={this.handleDay} value={this.state.day}></input>

                        <label htmlFor="req_best_time">What time?</label>
                        <input type="text" id="req_best_time" onChange={this.handleBestTime} value={this.state.best_time_reached}></input>

                        <label htmlFor="req_comments">Comments?</label>
                        <input type="text" id="req_comments" onChange={this.handleComments} value={this.state.comments}></input>

                        <label htmlFor="req_price">Price</label>
                        <input type="text" id="req_price" onChange={this.handlePrice} value={this.state.price}></input> 

                        <button type="submit">Go</button>
                    </fieldset>
                </form>
            </section>
        )
    }
}