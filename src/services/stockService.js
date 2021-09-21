
import axios from 'axios';
import { SERVER_URL } from '../config';
import { authHeader } from '../helpers';
import { handleResponse, handleError } from '../helpers'

let baseRoute = SERVER_URL + '/stock';

export const stockService = {
    getStock,
    addStockt,
    editStock,
    getExcelProducts
};


function getStock() {
    console.log("into productService");

    const requestOptions = {
        headers: authHeader()
    };

    return axios
        .get(`${baseRoute}`, requestOptions)
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


function addStockt(product) {
    console.log("into productService");

    if (!product.description)
        product.description = " "

    const requestOptions = {
        headers: authHeader()
    };

    return axios
        .post(`${baseRoute}`, product, { headers: requestOptions.headers })
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

function editStock(product) {
    console.log("into productService");

    if (!product.description)
        product.description = " "

    const requestOptions = {
        headers: authHeader()
    };

    return axios
        .put(`${baseRoute}`, product, { headers: requestOptions.headers })
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


function getExcelProducts() {
    console.log("into productService");

    let headers = authHeader()
    let filename = "ExcelProducts.xlsx";

    return axios({
        url: `${baseRoute}/product/excel`, headers,
        method: `GET`,
        responseType: `blob` // important

    }).then(res => {
        console.log("res.products >> "); console.log(res);
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
    }).catch(function (error) {
        if (error.response) {
            console.log(error.response.data);
            handleError(error.response.status)
        }
    });
}
