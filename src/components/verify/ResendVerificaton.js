import React from 'react';
import AuthService from '../../services/AuthService';
import queryString from 'query-string';


export default class ResendVerification extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            mobile_number: '',
            password: '',
            email: '',
            sent: false,
            error: ''
        }
    }

    componentDidMount(){
        const user = queryString.parse(this.props.location.search);

        fetch(`http://localhost:8000/user/${user.id}`)
            .then( res => (!res.ok) ? res.json().then(e => Promise.reject(e)) : res.json())
            .then(resData => {
                if(resData.error){
                    this.props.history.push('/register')
                }
            })
    }

    handleNumber = (e)=>{
        this.setState({mobile_number: e.target.value})
    }

    handlePassword = (e)=>{
        this.setState({ password: e.target.value})
    }

    send = (e)=>{
        e.preventDefault();
        return fetch(`http://localhost:8000/api/verify?`)
    }

    handleSubmit = (e)=>{
        e.preventDefault();

        AuthService.postLogin(this.state.mobile_number, this.state.password)
            .then( res=> {
    
                this.setState({ email: res.email})

                if(res){
                fetch(`http://localhost:8000/api/verify?token=${res.authToken}&id=${res.id}`, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        'authorization': `bearer ${res.authToken}`
                    },
                    body: JSON.stringify({email: res.email})
                })
                    this.setState({ sent: true})
                        
                } 
             });
    }


    render(){

        return (
            <section>
                {this.state.sent ? <h3>Confirmation sent to email: {this.state.email}</h3> : <form onSubmit={this.handleSubmit}>
                    <header>Your email has not been verified yet. Please type in your log in information</header>
                    <fieldset>
                        <label htmlFor="ver_email">Mobile Number:</label>
                        <input type="text" id="ver_email" onChange={this.handleNumber} value={this.state.mobile_number}></input>
                        <label htmlFor="ver_password">Password:</label>
                        <input type="password" id="ver_pass" onChange={this.handlePassword} value={this.state.password}></input>
                        <button type="submit"></button>
                    </fieldset>
                </form>}
            </section>
        )
    }
}