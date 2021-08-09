import axios from 'axios';
import { SERVER_URL } from '../config';
import { authHeader } from '../helpers';
import { handleResponse, handleError } from '../helpers'

let baseRoute = SERVER_URL;

axios.interceptors.request.use(request => {
    console.log('Starting Request', request)
    request.headers = authHeader();
    return request
})

export const notesService = {
    getNotes
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
