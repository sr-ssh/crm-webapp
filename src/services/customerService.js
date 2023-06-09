
import axios from 'axios';
import { SERVER_URL } from '../config';
import { authHeader } from '../helpers';
import { handleResponse, handleError } from '../helpers'

let baseRoute = SERVER_URL;

export const customerService = {
    getCustomers,
    getCustomer,
    getExcelCustomers,
    addCustomerformalInfo
};


function getCustomers(filter = {}) {
    console.log("into customerService");
    console.log(filter)

    if (!filter.family)
        filter.family = " "
    if (!filter.mobile)
        filter.mobile = "0"
    if (!filter.createdAtFrom)
        filter.createdAtFrom = "1900-01-01T05:42:13.845Z"
    if (!filter.createdAtTo)
        filter.createdAtTo = "1900-01-01T05:42:13.845Z"
    if (!filter.lastBuyFrom)
        filter.lastBuyFrom = "1900-01-01T05:42:13.845Z"
    if (!filter.lastBuyTo)
        filter.lastBuyTo = "1900-01-01T05:42:13.845Z"
    if (!filter.orderFrom)
        filter.orderFrom = "0"
    if (!filter.orderTo)
        filter.orderTo = "0"
    if (!filter.totalFrom)
        filter.totalFrom = "0"
    if (!filter.totalTo)
        filter.totalTo = "0"
    if (filter.orderStatus !== 0 && filter.orderStatus !== 1 && filter.orderStatus !== 2)
        filter.orderStatus = 2

    console.log(filter)

    const requestOptions = {
        headers: authHeader()
    };

    return axios
        .get(`${baseRoute}/customer/list/${encodeURI(filter.family)}/${encodeURI(filter.mobile)}/${encodeURI(filter.createdAtFrom)}/${encodeURI(filter.createdAtTo)}/${encodeURI(filter.lastBuyFrom)}/${encodeURI(filter.lastBuyTo)}/${encodeURI(filter.orderFrom)}/${encodeURI(filter.orderTo)}/${encodeURI(filter.totalFrom)}/${encodeURI(filter.totalTo)}/${encodeURI(filter.orderStatus)}`, requestOptions)
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

function getCustomer(mobile) {
    console.log("into customerService");
    const requestOptions = {
        headers: authHeader()
    };
    return axios
        .get(`${baseRoute}/customer/${mobile}`, requestOptions)
        .then(res => {
            console.log("res.customer >> "); console.log(res.data.data);
            return res.data
        })
        .catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
            }
        });

}


function getExcelCustomers(filter = {}) {
    console.log("into customerService (getExcelCustomers)");

    if (!filter.family)
        filter.family = " "
    if (!filter.mobile)
        filter.mobile = "0"
    if (!filter.createdAtFrom)
        filter.createdAtFrom = "1900-01-01T05:42:13.845Z"
    if (!filter.createdAtTo)
        filter.createdAtTo = "1900-01-01T05:42:13.845Z"
    if (!filter.lastBuyFrom)
        filter.lastBuyFrom = "1900-01-01T05:42:13.845Z"
    if (!filter.lastBuyTo)
        filter.lastBuyTo = "1900-01-01T05:42:13.845Z"
    if (!filter.orderFrom)
        filter.orderFrom = "0"
    if (!filter.orderTo)
        filter.orderTo = "0"
    if (!filter.totalFrom)
        filter.totalFrom = "0"
    if (!filter.totalTo)
        filter.totalTo = "0"


    let headers = authHeader()
    let filename = "ExcelCustomers.xlsx";


    return axios({
        url: `${baseRoute}/customer/excel/${encodeURI(filter.family)}/${encodeURI(filter.mobile)}/${encodeURI(filter.createdAtFrom)}/${encodeURI(filter.createdAtTo)}/${encodeURI(filter.lastBuyFrom)}/${encodeURI(filter.lastBuyTo)}/${encodeURI(filter.orderFrom)}/${encodeURI(filter.orderTo)}/${encodeURI(filter.totalFrom)}/${encodeURI(filter.totalTo)}`, headers,
        method: `GET`,
        responseType: `blob` // important

    }).then(res => {
        console.log("res.customers >> "); console.log(res);
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();

    }).catch(function (error) {

        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
        }
    });
}


function addCustomerformalInfo(data) {
    console.log('into orderService (addCustomerformalInfo)')

    const requestOptions = {
        headers: authHeader(),
        body: data
    }

    return axios
        .post(`${baseRoute}/customer/formalinfo`, requestOptions.body, requestOptions.headers)
        .then(res => {
            console.log('res >>')
            console.log(res)
            return res.data
        })
        .catch(error => {
            if (error.response) {
                console.log(error.response.data)
                handleError(error.response.status)
            }
        })
}