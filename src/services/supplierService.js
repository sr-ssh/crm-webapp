
import axios from 'axios';
import { SERVER_URL } from '../config';
import { authHeader } from '../helpers';

let baseRoute = SERVER_URL + '/supplier';

export const supplierService = {
    getSuppliers,
    getSupplier,
    getExcelSuppliers
};


function getSuppliers(filter = {}) {
    console.log("into SupplierService");
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

    const requestOptions = {
        headers: authHeader()
    };

    return axios
        .get(`${baseRoute}/${encodeURI(filter.family)}/${encodeURI(filter.mobile)}/${encodeURI(filter.createdAtFrom)}/${encodeURI(filter.createdAtTo)}/${encodeURI(filter.lastBuyFrom)}/${encodeURI(filter.lastBuyTo)}/${encodeURI(filter.orderFrom)}/${encodeURI(filter.orderTo)}`, requestOptions)
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

function getSupplier(mobile) {
    console.log("into supplierService");
    const requestOptions = {
        headers: authHeader()
    };
    return axios
        .get(`${baseRoute}/${mobile}`, requestOptions)
        .then(res => {
            console.log("res.supplier >> "); console.log(res.data.data);
            return res.data
        })
        .catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
            }
        });

}


function getExcelSuppliers(filter = {}) {
    console.log("into customerService (getExcelSuppliers)");

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

    let headers = authHeader()
    let filename = "ExcelSuppliers.xlsx";


    return axios({
        url: `${baseRoute}/excel/${encodeURI(filter.family)}/${encodeURI(filter.mobile)}/${encodeURI(filter.createdAtFrom)}/${encodeURI(filter.createdAtTo)}/${encodeURI(filter.lastBuyFrom)}/${encodeURI(filter.lastBuyTo)}/${encodeURI(filter.orderFrom)}/${encodeURI(filter.orderTo)}`, headers,
        method: `GET`,
        responseType: `blob` // important

    }).then(res => {
        console.log("res.supplier >> "); console.log(res);
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