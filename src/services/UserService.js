const UserService = {
    saveId(id){
        window.localStorage.setItem('user', id)
    },
    getId(){
        return window.localStorage.getItem('user');
    },
    hasId(){
        return UserService.getId();
    },
    clearId(){
        window.localStorage.removeItem('user')
    }
}

export default UserService;