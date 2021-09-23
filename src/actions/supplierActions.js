import { supplierConstants } from '../constants';
import { supplierService } from '../services';
import { alertActions } from './alertActions';

export const supplierActions = {
    getSuppliers,
    getSupplier,
    getExcelSuppliers
};

function getSuppliers(filter) {
    return dispatch => {
        dispatch(request());

        supplierService.getSuppliers(filter)
            .then(
                res => {
                    console.log("got the Suppliers")

                    if (res === undefined)
                        dispatch(alertActions.error('ارتباط با سرور برقرار نیست'));
                    else if (res.success) {
                        console.log("user into SupplierAction");
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

    function request() { console.log("into request"); return { type: supplierConstants.GET_SUPPLIERS_REQUEST } }
    function success(customers) { console.log("into success"); return { type: supplierConstants.GET_SUPPLIERS_SUCCESS, customers } }
    function failure(error) { return { type: supplierConstants.GET_SUPPLIERS_FAILURE, error } }
}

function getSupplier(mobile) {
    return dispatch => {
        dispatch(request(mobile));
        supplierService.getSupplier(mobile)
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

    function request() { console.log("into request"); return { type: supplierConstants.GET_SUPPLIER_REQUEST } }
    function success(customer) { console.log("into success"); return { type: supplierConstants.GET_SUPPLIER_SUCCESS, customer } }
    function failure(error) { return { type: supplierConstants.GET_SUPPLIER_FAILURE, error } }
}



function getExcelSuppliers(filter) {
    return dispatch => {
        dispatch(request());

        supplierService.getExcelSuppliers(filter)
            .then(
                res => {
                    console.log("got the excel suppliers")
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

    function request() { console.log("into request"); return { type: supplierConstants.GET_EXCEL_SUPPLIERS_REQUEST } }
    function success(data) { console.log("into success"); return { type: supplierConstants.GET_EXCEL_SUPPLIERS_SUCCESS, data } }
    function failure(error) { return { type: supplierConstants.GET_EXCEL_SUPPLIERS_FAILURE, error } }
}
