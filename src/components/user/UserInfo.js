import React from 'react';


export default class UserInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    handleSubmit = (e)=>{
        e.preventDefault();
        return fetch('http://localhost:8000/user/3ada609b-b1ba-4f07-9df4-4f54f4101827carcamo').then(res => res.json()).then(resData => console.log(resData));
    }
    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <fieldset>
                    <button type="submit">Go</button>
                </fieldset>
            </form>
        )
    }
}