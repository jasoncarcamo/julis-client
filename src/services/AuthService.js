
const AuthService = {
    postLogin(mobile_number, password){
        return fetch('https://fathomless-eyrie-65525.herokuapp.com/api/login', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({mobile_number, password})
        })
        .then( res => {
            return !res.ok ? res.json().then(e => {
                return Promise.reject(e)}) : res.json()
        })
    },
    registerUser({first_name, last_name, email, password, home_number,  mobile_number, address, city, state_region, zipcode, id}){
        return fetch('https://fathomless-eyrie-65525.herokuapp.com/api/register', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({first_name, last_name, email, password, home_number,  mobile_number, address, city, state_region, zipcode, id})
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