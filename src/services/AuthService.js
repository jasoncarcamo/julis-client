const TokenService = require('./TokenService');

const AuthService = {
    postLogin(mobile_number, password){
        return fetch('http://localhost:8000/api/login', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({mobile_number, password})
        })
        .then( res => {
            return !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
        })
        .then( resData => {
    
            TokenService.saveAuthToken(resData.authToken);
            
        })
    },
    registerUser({first_name, last_name, email, password, home_number,  mobile_number, address, city, state_region, zipcode, best_days_reached, best_time_reached, id}){
        return fetch('http://localhost:8000/api/register', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({first_name, last_name, email, password, home_number,  mobile_number, address, city, state_region, zipcode, best_days_reached, best_time_reached, id})
        })
        .then( res => {
            if(!res.ok){
                return res.json().then(e => Promise.reject(e))
            }
            return res.json();
        })
    }
,
getUser(){
    return fetch('http://localhost:8000/api/jcarcamo', ).then( res => res.json()).then( resData => resData);
}
}



module.exports = AuthService;