import React from 'react';


export default class UserInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    handleSubmit = (e)=>{
        e.preventDefault();
        return fetch('http://localhost:8000/user/699b1330-6e25-41b6-a707-3095798aa1b1carcamo').then(res => res.json()).then(resData => console.log(resData));
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