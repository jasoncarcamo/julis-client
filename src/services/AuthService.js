
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
    },
    registerUser({first_name, last_name, email, password, home_number,  mobile_number, address, city, state_region, zipcode, best_days_reached, best_time_reached, message, id}){
        return fetch('http://localhost:8000/api/register', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({first_name, last_name, email, password, home_number,  mobile_number, address, city, state_region, zipcode, best_days_reached, best_time_reached, message, id})
        })
        .then( res => {
            if(!res.ok){
                return res.json().then(e => Promise.reject(e))
            }
            return res.json();
        })
    }
,
}



module.exports = AuthService;