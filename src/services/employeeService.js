
import axios from 'axios';
import { SERVER_URL } from '../config';
import { authHeader } from '../helpers';
import { handleResponse, handleError } from '../helpers'

let baseRoute = SERVER_URL;

export const employeeService = {
    getEmployees,
    addEmployee,
    editEmployee,
    getPermissions,
    deleteEmployee
};


function getEmployees() {
    console.log("into employeeService");

    const requestOptions = {
        headers: authHeader()
    };
    
    return axios
        .get(`${baseRoute}/employee`, requestOptions)
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

function addEmployee(employee) {
    console.log("into employeeService");

    const requestOptions = {
        headers: authHeader()
    };

    return axios
        .post(`${baseRoute}/employee`, employee,{headers: requestOptions.headers} )
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

function editEmployee(employee) {
    console.log("into employeeService");

    const requestOptions = {
        headers: authHeader()
    };

    return axios
        .put(`${baseRoute}/employee`, employee,{headers: requestOptions.headers} )
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

function deleteEmployee(employee) {
    console.log("into employeeService");
    
    const requestOptions = {
        headers: authHeader()
    };

    return axios
        .delete(`${baseRoute}/employee`, { data: employee, headers: requestOptions.headers })
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

function getPermissions() {
console.log("into employeeService");

const requestOptions = {
    headers: authHeader()
};

return axios
    .get(`${baseRoute}/employee/permission`, requestOptions)
    .then(res => {
        console.log("res.user >> "); console.log(res.data.data);
        localStorage.setItem('permissions', JSON.stringify(res.data.data.permission));
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