const TokenService = {
    saveAuthToken(token){
        window.localStorage.setItem('clean-comp-user', token);
    },
    getAuthToken(){
        return window.localStorage.getItem('clean-comp-user');
    },
    clearAuthToken(){
        window.localStorage.removeItem('clean-comp-user')
    },
    hasAuthToken(){
        return TokenService.getAuthToken()
    },
    
};



module.exports = TokenService;