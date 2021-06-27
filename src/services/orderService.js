import axios from 'axios';
import { SERVER_URL } from '../config';
import { authHeader } from '../helpers';
import { handleResponse, handleError } from '../helpers'

let baseRoute = SERVER_URL;

axios.interceptors.request.use(request => {
    console.log('Starting Request', request)
    return request
  })

export const orderService = {
    getOrders,
    addOrder
};

function getOrders(filter = {}) {
    console.log("into orderService");

    if(filter.customerName === "")
        filter.customerName = " "
    if(filter.customerMobile === "")
        filter.customerMobile = "0" 
    if(filter.startDate === "")
        filter.startDate = "1900-01-01T05:42:13.845Z"
    if(filter.endDate === "")
        filter.endDate = "1900-01-01T05:42:13.845Z"

    let { 
            customerName = ' ', 
            customerMobile = '0', 
            startDate = "1900-01-01T05:42:13.845Z", 
            endDate = "1900-01-01T05:42:13.845Z" 
        } = filter
    
    const requestOptions = {
        headers: authHeader()
    };
    return axios
        .get(`${baseRoute}/order/${encodeURI(customerName)}/${customerMobile}/${startDate}/${endDate}`, requestOptions )
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

function addOrder(products, customer) {
    console.log("into orderService");

    let reminder ;
    if(!customer.birthday)
        customer.birthday = "1900-01-01T05:42:13.845Z";
    if(!customer.reminder)
        reminder = -1;
    else reminder = customer.reminder

    const requestOptions = {
        headers: authHeader(),
        body: {products, customer, reminder}
    };

    return axios
        .post(`${baseRoute}/order`,requestOptions.body ,{headers: requestOptions.headers} )
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