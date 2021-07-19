
import axios from 'axios';
import { SERVER_URL } from '../config';
import { authHeader, history } from '../helpers';
import { handleResponse, handleError } from '../helpers'

let baseRoute = SERVER_URL;

export const employeeService = {
    getEmployees,
    addEmployee,
    editEmployee,
    getPermissions,
    deleteEmployee,
    getApplications,
    editApplication,
    addApplication
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

        if((localStorage.getItem('type') == 2) && (localStorage.getItem('applicationStatus') == 1) && (res.data.data.application == 2)){
            localStorage.clear()
            history.push('/')
        }
            

        localStorage.removeItem('permissions')
        localStorage.removeItem('type')
        localStorage.removeItem('applicationStatus')
        localStorage.removeItem('applicationId')
        localStorage.removeItem('employer')
        
        localStorage.setItem('permissions', JSON.stringify(res.data.data.permission));
        localStorage.setItem('type', JSON.stringify(res.data.data.type));
        
        if(res.data.data.type === 2){
            localStorage.setItem('applicationStatus', JSON.stringify(res.data.data.application));
            localStorage.setItem('applicationId', JSON.stringify(res.data.data.applicationId));
            if(res.data.data.application !== 3)
                localStorage.setItem('employer', JSON.stringify(res.data.data.employer));
        }
            

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


function getApplications() {
    console.log("into employeeService");
    
    const requestOptions = {
        headers: authHeader()
    };
    
    return axios
        .get(`${baseRoute}/employee/application`, requestOptions)
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

function addApplication(application) {
    console.log("into employeeService");
    
    const requestOptions = {
        headers: authHeader()
    };
    
    return axios
        .post(`${baseRoute}/employee/application`, application, {headers: requestOptions.headers})
        .then(res => {
            console.log("res.user >> "); console.log(res.data);
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

function editApplication(application) {
    console.log("into employeeService");
    
    const requestOptions = {
        headers: authHeader()
    };
    
    return axios
        .put(`${baseRoute}/employee/application`, application, {headers: requestOptions.headers})
        .then(res => {
            console.log("res.user >> "); console.log(res.data);
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