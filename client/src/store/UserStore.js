import { action, computed, makeObservable, observable } from 'mobx'
class UserStore {
    constructor() {
        this.isAuth = false;
        this.user = {};
        this.subordinates=[];
        makeObservable(this,{
            isAuth:observable,
            subordinates:observable,
            user:observable,
            getIsAuth:computed,
            getUser:computed,
            getSubordinates:computed,
            setSubordinates:action.bound,
            setIsAuth:action.bound,
            setUser:action.bound
        })
    }

    get getSubordinates(){
        return this.subordinates;
    }

    get getIsAuth() {
        return this.isAuth;
    }

    get getUser() {
        return this.user;
    }

    setIsAuth(bool) {
        return this.isAuth = bool;
    }

    setUser(user) {
        return this.user = user;
    }

    setSubordinates(array){
        return this.subordinates=array;
    }
}

export default UserStore;