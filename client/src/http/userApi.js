import jwt_decode from "jwt-decode";
import { host, authHost } from "./index.js";

const registration = async (firstName, middleName, lastName, login, password, supervisor) => {
    const { data } = await host.post('api/user/registration', {
        firstName,
        middleName,
        lastName,
        login,
        password,
        supervisor
    })
    if (data.message) {
        return data;
    } else {
        localStorage.setItem('token', data.token);
        return jwt_decode(data.token);
    }

}

const login = async (login, password) => {
    const { data } = await host.post('api/user/login', { login, password });
    console.log(data);
    if (data.message) {
        return data;
    }
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

const authCheck = async () => {
    const { data } = await authHost.get('api/user/checkAuth');
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

const fetchSubordinatesBySupervisor = async () => {
    const  {data}  = await authHost.get("api/user/getSubordinatesBySupervisor")
    return data;
}

export {
    registration,
    login,
    authCheck,
    fetchSubordinatesBySupervisor
}