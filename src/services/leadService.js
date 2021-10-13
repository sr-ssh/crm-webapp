
import axios from 'axios';
import { SERVER_URL } from '../config';
import { authHeader } from '../helpers';
import { handleResponse, handleError } from '../helpers'

let baseRoute = SERVER_URL;

export const leadService = {
    addLead,
    getLeads,
    uploadExcel,
    editLeadStatus
};


function addLead(lead) {
    console.log("into leadService");

    const requestOptions = {
        headers: authHeader()
    };

    return axios
        .post(`${baseRoute}/lead`, lead, { headers: requestOptions.headers })
        .then(res => {
            console.log("res.user >> ");
            console.log(res.data);
            handleResponse(res)
            return res.data
        })
        .catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                handleError(error.response.status)
            }
        });
}


function getLeads() {
    console.log("into leadService");

    const requestOptions = {
        headers: authHeader()
    };

    return axios
        .get(`${baseRoute}/lead`, requestOptions)
        .then(res => {
            console.log("res.user >> "); console.log(res.data.data);
            handleResponse(res)
            return res.data
        })
        .catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                handleError(error.response.status)
            }
        });
}

function uploadExcel(params) {
    console.log("into leadService");


    const requestOptions = {
        headers: authHeader()
    };

    return axios
        .post(`${baseRoute}/lead/excel`, params, { headers: { ...requestOptions.headers, 'Content-Type': 'multipart/form-data' } })
        .then(res => {
            console.log("res.user >> ");
            console.log(res.data);
            return handleResponse(res)
        })
        .catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                handleError(error.response.status)
            }
        });
}

function editLeadStatus(params) {
    console.log("into leadService");


    const requestOptions = {
        headers: authHeader()
    };

    return axios
        .put(`${baseRoute}/lead`, params, { headers: requestOptions.headers })
        .then(res => {
            console.log("res.user >> ");
            console.log(res.data);
            return handleResponse(res)
        })
        .catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                handleError(error.response.status)
            }
        });
}
