
import axios from 'axios';
import { SERVER_URL } from '../config';
import { authHeader } from '../helpers';
import { handleResponse, handleError } from '../helpers'


let baseRoute = SERVER_URL;

export const settingService = {
    getShareLink
};


function getShareLink() {
    console.log("into settingService");

    const requestOptions = {
        headers: authHeader()
    };

    return axios
        .get(`${baseRoute}/settings/order/share`, requestOptions)
        .then(res => {
            console.log("res.user >> ");
            console.log(res.data);
            return handleResponse(res)
        })
        .catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                handleError(error.response.status);
            }
        });
}


