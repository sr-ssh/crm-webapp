
import axios from 'axios';
import { SERVER_URL } from '../config';
import { authHeader } from '../helpers';
import { handleResponse, handleError } from '../helpers'


let baseRoute = SERVER_URL;

export const settingService = {
    getSettingOrder,
    editSettingOrder
};


function getSettingOrder() {
    console.log("into settingService");

    const requestOptions = {
        headers: authHeader()
    };

    return axios
        .get(`${baseRoute}/settings/order`, requestOptions)
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


function editSettingOrder(params) {
    console.log("into settingService");

    const requestOptions = {
        headers: authHeader(),
        body: params
    };

    return axios
        .put(`${baseRoute}/settings/edit/order`, requestOptions.body, requestOptions.headers)
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

