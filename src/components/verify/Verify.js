import React from 'react';
import queryString from 'query-string';
export default class Verify extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            verified: false
        }
    }

    componentDidMount(){
        const query = queryString.parse(this.props.location.search);

        fetch(`https://fathomless-eyrie-65525.herokuapp.com/api/verify?token=${query.token}&id=${query.id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${query.token}`
            }
        })
            .then( res=> res.json())
            .then(resData => {
                
                this.setState({verified: resData.verified})
                this.props.history.push('/login')
                
            });

    }

    render(){
        let {verified} = this.state;
        return (
            <div>
                {verified ? <p>Verified</p> : <p>Not Verififed</p>}
            </div>
        )
        
    }
}