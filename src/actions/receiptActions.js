import { receiptConstants } from '../constants'
import { recieptService } from '../services'
import { alertActions } from './alertActions';

export const receiptActions = {
    getOrders,
    addReceipt,
    editOrderStatus,
    editOrderPrice,
    editOrderQuantity,
    getSms,
    editSms,
    sendDeliverySms,
    editNewSms,
    cancelProductOrder,
    editProductOrder,
    orderDetails,
    getShareLinkOrder,
    confirmShop
}

function getOrders(filter) {
    return dispatch => {
        dispatch(request(receiptConstants.GET_ORDERS_REQUEST))
        recieptService.getOrders(filter)
            .then(
                res => {
                    if (res === undefined)
                        dispatch(alertActions.error('ارتباط با سرور برقرار نیست'));
                    else if (res.success) {
                        console.log("orders received")
                        dispatch(success(receiptConstants.GET_ORDERS_SUCCESS, res.data));
                    }

                    setTimeout(() => {
                        dispatch(alertActions.clear());
                    }, 1500);
                },
                error => {
                    dispatch(failure(receiptConstants.GET_ORDERS_FAILURE, error.toString()));
                    console.log("occure error");
                    console.log(error.toString());
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

}

function editOrderStatus(orderId, status) {
    return dispatch => {
        dispatch(request())
        recieptService.editOrderStatus(orderId, status)
            .then(
                res => {
                    if (res === undefined) {
                        dispatch(alertActions.error('ارتباط با سرور برقرار نیست'))
                        dispatch(failure('ارتباط با سرور برقرار نمیباشد'))
                    }
                    else if (res.success) {
                        console.log("order status changed")
                        dispatch(success(receiptConstants.EDIT_ORDER_STATUS_SUCCESS))
                        dispatch(alertActions.success(res.message));
                    }

                    setTimeout(() => {
                        dispatch(alertActions.clear());
                    }, 1500);
                },
                error => {
                    dispatch(failure(receiptConstants.EDIT_ORDER_STATUS_FAILURE, error.toString()));
                    console.log("occure error");
                    console.log(error.toString());
                    dispatch(alertActions.error(error.toString()));
                }
            );

    }

    function request() { console.log("into request"); return { type: receiptConstants.EDIT_ORDER_STATUS_REQUEST } }
    function success() { console.log("into success"); return { type: receiptConstants.EDIT_ORDER_STATUS_SUCCESS } }
    function failure(error) { return { type: receiptConstants.EDIT_ORDER_STATUS_FAILURE, error } }
}


function editOrderPrice(orderId, productId, status) {
    return dispatch => {
        dispatch(request(receiptConstants.EDIT_ORDER_PRICE_REQUEST))
        recieptService.editOrderPrice(orderId, productId, status)
            .then(
                res => {
                    if (res === undefined) {
                        dispatch(alertActions.error('ارتباط با سرور برقرار نیست'))
                        dispatch(failure('ارتباط با سرور برقرار نمیباشد'))
                    }
                    else if (res.success) {
                        console.log("order status changed")
                        dispatch(success(receiptConstants.EDIT_ORDER_PRICE_SUCCESS, res.data))
                        dispatch(alertActions.success(res.message));
                    }

                    setTimeout(() => {
                        dispatch(alertActions.clear());
                    }, 1500);
                },
                error => {
                    dispatch(failure(receiptConstants.EDIT_ORDER_PRICE_FAILURE, error.toString()));
                    console.log("occure error");
                    console.log(error.toString());
                    dispatch(alertActions.error(error.toString()));
                }
            );

    }
}
function editOrderQuantity(orderId, productId, status) {
    return dispatch => {
        dispatch(request(receiptConstants.EDIT_ORDER_QUANTITY_REQUEST))
        recieptService.editOrderQuantity(orderId, productId, status)
            .then(
                res => {
                    if (res === undefined) {
                        dispatch(alertActions.error('ارتباط با سرور برقرار نیست'))
                        dispatch(failure('ارتباط با سرور برقرار نمیباشد'))
                    }
                    else if (res.success) {
                        console.log("order status changed")
                        dispatch(success(receiptConstants.EDIT_ORDER_QUANTITY_SUCCESS, res.data))
                        dispatch(alertActions.success(res.message));
                    }

                    setTimeout(() => {
                        dispatch(alertActions.clear());
                    }, 1500);
                },
                error => {
                    dispatch(failure(receiptConstants.EDIT_ORDER_QUANTITY_FAILURE, error.toString()));
                    console.log("occure error");
                    console.log(error.toString());
                    dispatch(alertActions.error(error.toString()));
                }
            );

    }
}

function editProductOrder({ orderId, products, address }) {
    return dispatch => {
        dispatch(request(receiptConstants.EDIT_PRODUCT_ORDER_REQUEST))
        recieptService.editProductOrder(orderId, products, address)
            .then(
                res => {
                    if (res === undefined) {
                        dispatch(alertActions.error('ارتباط با سرور برقرار نیست'))
                        dispatch(failure('ارتباط با سرور برقرار نمیباشد'))
                    }
                    else if (res.success) {
                        console.log("order status changed")
                        dispatch(success(receiptConstants.EDIT_PRODUCT_ORDER_SUCCESS, res.data))
                        dispatch(alertActions.success(res.message));
                    }

                    setTimeout(() => {
                        dispatch(alertActions.clear());
                    }, 1500);
                },
                error => {
                    dispatch(failure(receiptConstants.EDIT_PRODUCT_ORDER_FAILURE, error.toString()));
                    console.log("occure error");
                    console.log(error.toString());
                    dispatch(alertActions.error(error.toString()));
                }
            );

    }
}


function cancelProductOrder(orderId, productId) {
    console.log("actions");
    return dispatch => {
        dispatch(request(receiptConstants.CANCEL_PRODUCT_ORDER_REQUEST))
        recieptService.cancelProductOrder(orderId, productId)
            .then(
                res => {
                    if (res === undefined) {
                        dispatch(alertActions.error('ارتباط با سرور برقرار نیست'))
                        dispatch(failure('ارتباط با سرور برقرار نمیباشد'))
                    }
                    else if (res.success) {
                        console.log("product order changed")
                        dispatch(success(receiptConstants.CANCEL_PRODUCT_ORDER_SUCCESS, res.data))
                        dispatch(alertActions.success(res.message));
                    } else if (res.success === false) {
                        console.log("product order changed")
                        dispatch(failure(receiptConstants.CANCEL_PRODUCT_ORDER_FAILURE, res.message));
                        dispatch(alertActions.error(res.message));
                    }


                },
                error => {
                    dispatch(failure(receiptConstants.CANCEL_PRODUCT_ORDER_FAILURE, error.toString()));
                    console.log("occure error");
                    console.log(error.toString());
                    dispatch(alertActions.error(error.toString()));
                }
            );

    }
}
function addReceipt(products, customer, notes, status = '') {
    return dispatch => {
        dispatch(request())
        recieptService.addReceipt(products, customer, notes, status)
            .then(
                res => {
                    console.log(res)
                    if (res === undefined) {
                        dispatch(alertActions.error('ارتباط با سرور برقرار نیست'));
                        dispatch(failure('ارتباط با سرور برقرار نیست'))
                    }
                    else if (res.success) {
                        console.log("order added")
                        dispatch(success(products, customer));
                        dispatch(alertActions.success(res.message));
                        setTimeout(() => {
                            dispatch(alertActions.clear());
                            //history.go(0)
                        }, 1500);

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
    }

    function request() { console.log("into request"); return { type: receiptConstants.ADD_RECEIPT_REQUEST } }
    function success(order) { console.log("into success"); return { type: receiptConstants.ADD_RECEIPT_SUCCESS, order } }
    function failure(error) { return { type: receiptConstants.ADD_RECEIPT_FAILURE, error } }
}

function editSms(params) {
    return dispatch => {
        dispatch(request(params))
        Object.values(params).map(item =>
            recieptService.editOrderSms(item)
                .then(
                    res => {
                        console.log(res)
                        if (res === undefined) {
                            dispatch(alertActions.error('ارتباط با سرور برقرار نیست'));
                            dispatch(failure('ارتباط با سرور برقرار نیست'))
                        }
                        else if (res.success) {
                            console.log("order sms edited")
                            dispatch(success());
                            dispatch(alertActions.success(res.message));

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
                )
        )
    }
    function request(params) { console.log('into request'); return { type: receiptConstants.EDIT_SETTING_SMS_REQUEST, params } }
    function success() { console.log("into success"); return { type: receiptConstants.EDIT_SETTING_SMS_SUCCESS } }
    function failure(error) { return { type: receiptConstants.EDIT_SETTING_SMS_FAILURE, error } }
}

function editNewSms(sms) {
    return {
        type: receiptConstants.EDIT_SETTING_SMS,
        sms
    }
}

function getSms() {
    return dispatch => {
        dispatch(request())
        recieptService.getOrderSms()
            .then(
                res => {
                    console.log(res)
                    if (res === undefined) {
                        dispatch(alertActions.error('ارتباط با سرور برقرار نیست'));
                        dispatch(failure('ارتباط با سرور برقرار نیست'))
                    }
                    else if (res.success) {
                        console.log("order added")
                        dispatch(success(res.data.setting.order));

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
            )
    }
    function request() { console.log("into request"); return { type: receiptConstants.GET_SETTING_SMS_REQUEST } }
    function success(sms) { console.log("into success"); return { type: receiptConstants.GET_SETTING_SMS_SUCCESS, sms } }
    function failure(error) { return { type: receiptConstants.GET_SETTING_SMS_FAILURE, error } }
}

function sendDeliverySms(data) {
    return dispatch => {
        dispatch(request(receiptConstants.SEND_ORDER_SMS_REQUEST))
        recieptService.sendDeliverySms(data)
            .then(
                res => {
                    if (res === undefined)
                        dispatch(alertActions.error('ارتباط با سرور برقرار نیست'));
                    else if (res.success) {
                        console.log("sms sent")
                        dispatch(success(receiptConstants.SEND_ORDER_SMS_SUCCESS, res.data));
                        dispatch(alertActions.success(res.message));
                    }

                    setTimeout(() => {
                        dispatch(alertActions.clear());
                    }, 1500);
                },
                error => {
                    dispatch(failure(receiptConstants.SEND_ORDER_SMS_FAILURE, error.toString()));
                    console.log("occure error");
                    console.log(error.toString());
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

}



function orderDetails(params) {
    return dispatch => {
        dispatch(request(receiptConstants.GET_ORDER_DETAILS_REQUEST))
        recieptService.orderDetails(params)
            .then(
                res => {
                    if (res === undefined) {
                        dispatch(alertActions.error('ارتباط با سرور برقرار نیست'));
                        dispatch(failure(receiptConstants.GET_ORDER_DETAILS_FAILURE))
                    }
                    else if (res.success) {
                        console.log("order Details receive")
                        dispatch(success(receiptConstants.GET_ORDER_DETAILS_SUCCESS, res.data));
                        // dispatch(alertActions.success(res.message));
                    }
                    else if (res.success == false) {
                        console.log("order Details receive")
                        dispatch(alertActions.error(res.message));
                        dispatch(failure(receiptConstants.GET_ORDER_DETAILS_FAILURE, res.message))
                    }
                },
                error => {
                    dispatch(failure(receiptConstants.GET_ORDER_DETAILS_FAILURE, error.toString()));
                    console.log("occure error");
                    console.log(error.toString());
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

}


function getShareLinkOrder(orderId) {
    return dispatch => {
        dispatch(request(receiptConstants.GET_ORDER_SHARE_LINK_REQUEST))
        recieptService.getShareLinkOrder(orderId)
            .then(
                res => {
                    if (res === undefined) {
                        dispatch(alertActions.error('ارتباط با سرور برقرار نیست'));
                        dispatch(failure(receiptConstants.GET_ORDER_SHARE_LINK_FAILURE, 'ارتباط با سرور برقرار نیست'))
                    }
                    else if (res.success) {
                        console.log("order share link receive")
                        dispatch(success(receiptConstants.GET_ORDER_SHARE_LINK_SUCCESS, res.data));
                    } else if (res.success == false) {
                        dispatch(failure(receiptConstants.GET_ORDER_SHARE_LINK_FAILURE, res.message))
                        dispatch(alertActions.error(res.message));
                    }
                },
                error => {
                    dispatch(failure(receiptConstants.GET_ORDER_SHARE_LINK_FAILURE, error.toString()));
                    console.log("occure error");
                    console.log(error.toString());
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

}

function confirmShop(orderId) {
    return dispatch => {
        dispatch(request(receiptConstants.CONFIRM_FINANCIAL_RECEIPT_REQUEST))
        recieptService.confirmShop(orderId)
            .then(
                res => {
                    if (res === undefined) {
                        dispatch(alertActions.error('ارتباط با سرور برقرار نیست'));
                        dispatch(failure(receiptConstants.CONFIRM_FINANCIAL_RECEIPT_FAILURE, 'ارتباط با سرور برقرار نیست'))
                    }
                    else if (res.success) {
                        console.log("order financial confirmed")
                        dispatch(success(receiptConstants.CONFIRM_FINANCIAL_RECEIPT_SUCCESS, res.data));
                    } else if (res.success == false) {
                        dispatch(failure(receiptConstants.CONFIRM_FINANCIAL_RECEIPT_FAILURE, res.message))
                        dispatch(alertActions.error(res.message));
                    }
                },
                error => {
                    dispatch(failure(receiptConstants.CONFIRM_FINANCIAL_RECEIPT_FAILURE, error.toString()));
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