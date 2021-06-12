
import axios from 'axios';
import { SERVER_URL } from '../config';

let baseRoute = SERVER_URL;

export const userService = {
    login,
    register,
    logout
};


function login(mobileOrEmail, password) {
    console.log("into userService");
    return axios
        .post(`${baseRoute}/login`, {mobileOrEmail, password})
        .then(res => {
            console.log("res.user >> "); 
            console.log(res.data.data);
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(res.data.data));
            return res.data.data
        })
        .catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
            }
        });
}

function register(user) {
    console.log("into userService");
    return axios
        .post(`${baseRoute}/`, user)
        .then(res => {
            console.log("res.user >> "); console.log(res.data.data);
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            // localStorage.setItem('user', JSON.stringify(res.data.data));
            return res.data.data
        })
        .catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
            }
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

