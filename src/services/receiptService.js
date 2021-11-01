import axios from 'axios';
import { SERVER_URL } from '../config';
import { authHeader } from '../helpers';
import { handleResponse, handleError } from '../helpers'

let baseRoute = SERVER_URL + '/receipt';

export const recieptService = {
    getReceipts,
    addReceipt,
    editReceiptStatus,
    editReceipt,
    confirmShop,
    editReceiptNoteStatus
};

function getReceipts(filter = {}) {
    console.log("into receiptService");
    if (filter.supplierName === "")
        filter.supplierName = " "
    if (filter.supplierMobile === "")
        filter.supplierMobile = "0"
    if (filter.startDate === "")
        filter.startDate = "1900-01-01T05:42:13.845Z"
    if (filter.endDate === "")
        filter.endDate = "1900-01-01T05:42:13.845Z"
    if (filter.status === "")
        filter.status = " "

    let {
        supplierName = ' ',
        supplierMobile = '0',
        startDate = "1900-01-01T05:42:13.845Z",
        endDate = "1900-01-01T05:42:13.845Z"
    } = filter

    const requestOptions = {
        headers: authHeader()
    };
    return axios
        .get(`${baseRoute}/${encodeURI(supplierName)}/${supplierMobile}/${startDate}/${endDate}`, requestOptions)
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

function editReceiptStatus(receiptId, status) {
    console.log("into receiptService")

    const requestOptions = {
        headers: authHeader(),
        body: { receiptId, status }
    };

    return axios
        .put(`${baseRoute}/status`, requestOptions.body, { headers: requestOptions.headers })
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



function editReceipt(receiptId, stocks, address) {
    console.log("into receiptService")

    const requestOptions = {
        headers: authHeader(),
        body: { receiptId, stocks, address }
    };

    return axios
        .put(`${baseRoute}/edit`, requestOptions.body, { headers: requestOptions.headers })
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



function addReceipt(stock, supplier, note) {
    console.log("into receiptService");

    let address;
    if (!supplier.address)
        address = "";
    else address = supplier.address

    const requestOptions = {
        headers: authHeader(),
        body: { stock, supplier, address, note }
    };

    return axios
        .post(`${baseRoute}/`, requestOptions.body, { headers: requestOptions.headers })
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



function confirmShop(receiptId) {
    console.log('into receiptService (confirmShop)')

    const requestOptions = {
        headers: authHeader(),
        body: receiptId
    }

    return axios
        .post(`${baseRoute}/confirm/shop `, requestOptions.body, { headers: requestOptions.headers })
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


function editReceiptNoteStatus(receiptId, status) {
    console.log("into receiptService")

    const requestOptions = {
        headers: authHeader(),
        body: { receiptId, status }
    };

    return axios
        .put(`${baseRoute}/note/status`, requestOptions.body, { headers: requestOptions.headers })
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
