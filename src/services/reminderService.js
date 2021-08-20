import axios from 'axios';
import { SERVER_URL } from '../config';
import { authHeader } from '../helpers';

let baseRoute = SERVER_URL;

export const reminderService = {
    getReminders
}

function getReminders() {
    console.log("into reminderService");

    const requestOptions = {
        headers: authHeader()
    };

    return axios
        .get(`${baseRoute}/reminder`, requestOptions)
        .then(res => {
            console.log("res.customers >> "); console.log(res.data.data);
            return res.data
        })
        .catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
            }
        });
}