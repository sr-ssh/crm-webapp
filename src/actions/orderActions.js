import { orderConstants } from '../constants'
import { history } from '../helpers';
import { orderService } from '../services'
import { alertActions } from './alertActions';

export const orderActions = {
    getOrders,
    addOrder,
    editOrderStatus,
    editOrderPrice,
    editOrderQuantity,
    getSms,
    editSms,
    sendDeliverySms,
    editNewSms,
    cancelProductOrder,
    editProductOrder
}

function getOrders(filter) {
    return dispatch => {
        dispatch(request(orderConstants.GET_ORDERS_REQUEST))
        orderService.getOrders(filter)
            .then(
                res => {
                    if (res === undefined)
                        dispatch(alertActions.error('ارتباط با سرور برقرار نیست'));
                    else if (res.success) {
                        console.log("orders received")
                        dispatch(success(orderConstants.GET_ORDERS_SUCCESS, res.data));
                    }

                    setTimeout(() => {
                        dispatch(alertActions.clear());
                    }, 1500);
                },
                error => {
                    dispatch(failure(orderConstants.GET_ORDERS_FAILURE, error.toString()));
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
        orderService.editOrderStatus(orderId, status)
            .then(
                res => {
                    if (res === undefined) {
                        dispatch(alertActions.error('ارتباط با سرور برقرار نیست'))
                        dispatch(failure('ارتباط با سرور برقرار نمیباشد'))
                    }
                    else if (res.success) {
                        console.log("order status changed")
                        dispatch(success(orderConstants.EDIT_ORDER_STATUS_SUCCESS))
                        dispatch(alertActions.success(res.message));
                    }

                    setTimeout(() => {
                        dispatch(alertActions.clear());
                    }, 1500);
                },
                error => {
                    dispatch(failure(orderConstants.EDIT_ORDER_STATUS_FAILURE, error.toString()));
                    console.log("occure error");
                    console.log(error.toString());
                    dispatch(alertActions.error(error.toString()));
                }
            );

    }

    function request() { console.log("into request"); return { type: orderConstants.EDIT_ORDER_STATUS_REQUEST } }
    function success() { console.log("into success"); return { type: orderConstants.EDIT_ORDER_STATUS_SUCCESS } }
    function failure(error) { return { type: orderConstants.EDIT_ORDER_STATUS_FAILURE, error } }
}


function editOrderPrice(orderId, productId, status) {
    return dispatch => {
        dispatch(request(orderConstants.EDIT_ORDER_PRICE_REQUEST))
        orderService.editOrderPrice(orderId, productId, status)
            .then(
                res => {
                    if (res === undefined) {
                        dispatch(alertActions.error('ارتباط با سرور برقرار نیست'))
                        dispatch(failure('ارتباط با سرور برقرار نمیباشد'))
                    }
                    else if (res.success) {
                        console.log("order status changed")
                        dispatch(success(orderConstants.EDIT_ORDER_PRICE_SUCCESS, res.data))
                        dispatch(alertActions.success(res.message));
                    }

                    setTimeout(() => {
                        dispatch(alertActions.clear());
                    }, 1500);
                },
                error => {
                    dispatch(failure(orderConstants.EDIT_ORDER_PRICE_FAILURE, error.toString()));
                    console.log("occure error");
                    console.log(error.toString());
                    dispatch(alertActions.error(error.toString()));
                }
            );

    }
}
function editOrderQuantity(orderId, productId, status) {
    return dispatch => {
        dispatch(request(orderConstants.EDIT_ORDER_QUANTITY_REQUEST))
        orderService.editOrderQuantity(orderId, productId, status)
            .then(
                res => {
                    if (res === undefined) {
                        dispatch(alertActions.error('ارتباط با سرور برقرار نیست'))
                        dispatch(failure('ارتباط با سرور برقرار نمیباشد'))
                    }
                    else if (res.success) {
                        console.log("order status changed")
                        dispatch(success(orderConstants.EDIT_ORDER_QUANTITY_SUCCESS, res.data))
                        dispatch(alertActions.success(res.message));
                    }

                    setTimeout(() => {
                        dispatch(alertActions.clear());
                    }, 1500);
                },
                error => {
                    dispatch(failure(orderConstants.EDIT_ORDER_QUANTITY_FAILURE, error.toString()));
                    console.log("occure error");
                    console.log(error.toString());
                    dispatch(alertActions.error(error.toString()));
                }
            );

    }
}

function editProductOrder({ orderId, products, address }) {
    return dispatch => {
        dispatch(request(orderConstants.EDIT_PRODUCT_ORDER_REQUEST))
        orderService.editProductOrder(orderId, products, address)
            .then(
                res => {
                    if (res === undefined) {
                        dispatch(alertActions.error('ارتباط با سرور برقرار نیست'))
                        dispatch(failure('ارتباط با سرور برقرار نمیباشد'))
                    }
                    else if (res.success) {
                        console.log("order status changed")
                        dispatch(success(orderConstants.EDIT_PRODUCT_ORDER_SUCCESS, res.data))
                        dispatch(alertActions.success(res.message));
                    }

                    setTimeout(() => {
                        dispatch(alertActions.clear());
                    }, 1500);
                },
                error => {
                    dispatch(failure(orderConstants.EDIT_PRODUCT_ORDER_FAILURE, error.toString()));
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
        dispatch(request(orderConstants.CANCEL_PRODUCT_ORDER_REQUEST))
        orderService.cancelProductOrder(orderId, productId)
            .then(
                res => {
                    if (res === undefined) {
                        dispatch(alertActions.error('ارتباط با سرور برقرار نیست'))
                        dispatch(failure('ارتباط با سرور برقرار نمیباشد'))
                    }
                    else if (res.success) {
                        console.log("product order changed")
                        dispatch(success(orderConstants.CANCEL_PRODUCT_ORDER_SUCCESS, res.data))
                        dispatch(alertActions.success(res.message));
                    } else if (res.success === false) {
                        console.log("product order changed")
                        dispatch(failure(orderConstants.CANCEL_PRODUCT_ORDER_FAILURE, res.message));
                        dispatch(alertActions.error(res.message));
                    }


                },
                error => {
                    dispatch(failure(orderConstants.CANCEL_PRODUCT_ORDER_FAILURE, error.toString()));
                    console.log("occure error");
                    console.log(error.toString());
                    dispatch(alertActions.error(error.toString()));
                }
            );

    }
}
function addOrder(products, customer) {
    return dispatch => {
        dispatch(request())
        orderService.addOrder(products, customer)
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

    function request() { console.log("into request"); return { type: orderConstants.ADD_ORDER_REQUEST } }
    function success(order) { console.log("into success"); return { type: orderConstants.ADD_ORDER_SUCCESS, order } }
    function failure(error) { return { type: orderConstants.ADD_ORDER_FAILURE, error } }
}

function editSms(params) {
    return dispatch => {
        dispatch(request(params))
        Object.values(params).map(item =>
            orderService.editOrderSms(item)
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
    function request(params) { console.log('into request'); return { type: orderConstants.EDIT_SETTING_SMS_REQUEST, params } }
    function success() { console.log("into success"); return { type: orderConstants.EDIT_SETTING_SMS_SUCCESS } }
    function failure(error) { return { type: orderConstants.EDIT_SETTING_SMS_FAILURE, error } }
}

function editNewSms(sms) {
    return {
        type: orderConstants.EDIT_SETTING_SMS,
        sms
    }
}

function getSms() {
    return dispatch => {
        dispatch(request())
        orderService.getOrderSms()
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
    function request() { console.log("into request"); return { type: orderConstants.GET_SETTING_SMS_REQUEST } }
    function success(sms) { console.log("into success"); return { type: orderConstants.GET_SETTING_SMS_SUCCESS, sms } }
    function failure(error) { return { type: orderConstants.GET_SETTING_SMS_FAILURE, error } }
}

function sendDeliverySms(data) {
    return dispatch => {
        dispatch(request(orderConstants.SEND_ORDER_SMS_REQUEST))
        orderService.sendDeliverySms(data)
            .then(
                res => {
                    if (res === undefined)
                        dispatch(alertActions.error('ارتباط با سرور برقرار نیست'));
                    else if (res.success) {
                        console.log("sms sent")
                        dispatch(success(orderConstants.SEND_ORDER_SMS_SUCCESS, res.data));
                        dispatch(alertActions.success(res.message));
                    }

                    setTimeout(() => {
                        dispatch(alertActions.clear());
                    }, 1500);
                },
                error => {
                    dispatch(failure(orderConstants.SEND_ORDER_SMS_FAILURE, error.toString()));
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