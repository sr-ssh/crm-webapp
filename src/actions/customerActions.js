import { customerConstants } from '../constants';
import { customerService } from '../services';
import { alertActions } from './alertActions';

export const customerActions = {
    getCustomers,
    getCustomer,
    getExcelCustomers,
    addCustomerformalInfo
};

function getCustomers(filter) {
    return dispatch => {
        dispatch(request());

        customerService.getCustomers(filter)
            .then(
                res => {
                    console.log("got the customers")

                    if (res === undefined)
                        dispatch(alertActions.error('ارتباط با سرور برقرار نیست'));
                    else if (res.success) {
                        console.log("user into customerAction");
                        dispatch(success(res.data));
                    }

                    setTimeout(() => {
                        dispatch(alertActions.clear());
                    }, 1500);
                },
                error => {
                    dispatch(failure(error.toString()));
                    console.log("occure error");
                    console.log(error.toString());
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { console.log("into request"); return { type: customerConstants.GET_CUSTOMERS_REQUEST } }
    function success(customers) { console.log("into success"); return { type: customerConstants.GET_CUSTOMERS_SUCCESS, customers } }
    function failure(error) { return { type: customerConstants.GET_CUSTOMERS_FAILURE, error } }
}

function getCustomer(mobile) {
    return dispatch => {
        dispatch(request(mobile));
        customerService.getCustomer(mobile)
            .then(
                res => {
                    console.log(res);
                    if (res === undefined) {
                        dispatch(alertActions.error('ارتباط با سرور برقرار نیست'));
                        dispatch(failure('ارتباط با سرور برقرار نیست'))
                    }
                    else if (res.success) {
                        console.log("user into customerAction");
                        dispatch(success(res.data));
                    } else if (res.success === false) {
                        dispatch(alertActions.error(res.message));
                        dispatch(failure(res.message))
                    }

                    setTimeout(() => {
                        dispatch(alertActions.clear());
                    }, 1500);
                },
                error => {
                    dispatch(failure(error.toString()));
                    console.log("occure error");
                    console.log(error.toString());
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { console.log("into request"); return { type: customerConstants.GET_CUSTOMER_REQUEST } }
    function success(customer) { console.log("into success"); return { type: customerConstants.GET_CUSTOMER_SUCCESS, customer } }
    function failure(error) { return { type: customerConstants.GET_CUSTOMER_FAILURE, error } }
}



function getExcelCustomers(filter) {
    return dispatch => {
        dispatch(request());

        customerService.getExcelCustomers(filter)
            .then(
                res => {
                    console.log("got the excel customers")
                    dispatch(success(res));
                },
                error => {
                    dispatch(failure(error.toString()));
                    console.log("occure error");
                    console.log(error.toString());
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { console.log("into request"); return { type: customerConstants.GET_EXCEL_CUSTOMERS_REQUEST } }
    function success(data) { console.log("into success"); return { type: customerConstants.GET_EXCEL_CUSTOMERS_SUCCESS, data } }
    function failure(error) { return { type: customerConstants.GET_EXCEL_CUSTOMERS_FAILURE, error } }
}


function addCustomerformalInfo(orderId) {
    return dispatch => {
        dispatch(request(customerConstants.ADD_CUSTOMER_INFO_REQUEST))
        customerService.addCustomerformalInfo(orderId)
            .then(
                res => {
                    if (res === undefined) {
                        dispatch(alertActions.error('ارتباط با سرور برقرار نیست'));
                        dispatch(failure(customerConstants.ADD_CUSTOMER_INFO_FAILURE, 'ارتباط با سرور برقرار نیست'))
                    }
                    else if (res.success) {
                        console.log("order financial confirmed")
                        dispatch(success(customerConstants.ADD_CUSTOMER_INFO_SUCCESS, res.data));
                    } else if (res.success == false) {
                        dispatch(failure(customerConstants.ADD_CUSTOMER_INFO_FAILURE, res.message))
                        dispatch(alertActions.error(res.message));
                    }
                },
                error => {
                    dispatch(failure(customerConstants.ADD_CUSTOMER_INFO_FAILURE, error.toString()));
                    console.log("occure error");
                    console.log(error.toString());
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };
}
function request(type) {
    return { type: type }
}

function success(type, data) {
    return { type: type, data }
}

function failure(type, error) {
    return { type: type, error }
}
