import { customerConstants } from '../constants';
import { customerService } from '../services';
import { alertActions } from './alertActions';

export const customerActions = {
    getCustomers,
    getCustomer
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
        console.log(mobile);
        // customerService.getCustomer(mobile)
        //     .then(
        //         res => {
        //             if (res === undefined)
        //                 dispatch(alertActions.error('ارتباط با سرور برقرار نیست'));
        //             else if (res.success) {
        //                 console.log("user into customerAction");
        //                 dispatch(success(res.data));
        //             }

        //             setTimeout(() => {
        //                 dispatch(alertActions.clear());
        //             }, 1500);
        //         },
        //         error => {
        //             dispatch(failure(error.toString()));
        //             console.log("occure error");
        //             console.log(error.toString());
        //             dispatch(alertActions.error(error.toString()));
        //         }
        //     );
    };

    function request() { console.log("into request"); return { type: customerConstants.GET_CUSTOMER_REQUEST } }
    function success(customer) { console.log("into success"); return { type: customerConstants.GET_CUSTOMER_SUCCESS, customer } }
    function failure(error) { return { type: customerConstants.GET_CUSTOMER_FAILURE, error } }
}
