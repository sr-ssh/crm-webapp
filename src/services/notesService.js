import axios from 'axios';
import { SERVER_URL } from '../config';
import { authHeader } from '../helpers';
import { handleResponse, handleError } from '../helpers'

let baseRoute = SERVER_URL;

export const notesService = {
    getNotes,
    addNotes,
    editStatusNotes
};

function getNotes(orderId) {
    console.log("into notesService");


    return axios
        .get(`${baseRoute}/order/notes/${orderId}`)
        .then(res => {
            console.log("res.user >> "); console.log(res.data.data);
            return res.data
        })
        .catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                handleError(error.response.status)
            }
        });
}


function addNotes(orderId, notes) {
    console.log("into notesService");

    const requestOptions = {
        body: { orderId, notes }
    };
    return axios
        .put(`${baseRoute}/order/notes`, requestOptions.body)
        .then(res => {
            console.log("res.user >> "); console.log(res.data.data);
            return res.data
        })
        .catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                handleError(error.response.status)
            }
        });
}

function editStatusNotes(orderId, status) {
    console.log("into notesService");

    const requestOptions = {
        body: { orderId, status }
    };
    return axios
        .put(`${baseRoute}/order/notes/status`, requestOptions.body)
        .then(res => {
            console.log("res.user >> "); console.log(res.data.data);
            return res.data
        })
        .catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                handleError(error.response.status)
            }
        });
}
