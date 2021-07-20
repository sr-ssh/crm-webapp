import { orderConstants } from '../constants'
import { history } from '../helpers';
import { orderService } from '../services'
import { alertActions } from './alertActions';

export const orderActions = {
    getOrders,
    addOrder,
    editOrderStatus,
    editOrderPrice,
    getSms,
    editSms,
    sendDeliverySms,
    editNewSms
}

function getOrders(filter) {
    return dispatch => {
        dispatch(request(orderConstants.GET_ORDERS_REQUEST))
        orderService.getOrders(filter)
            .then(
                res => {
                    if(res === undefined)
                        dispatch(alertActions.error('ارتباط با سرور برقرار نیست'));
                    else if(res.success){
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
                    if(res === undefined) {
                        dispatch(alertActions.error('ارتباط با سرور برقرار نیست'))
                        dispatch(failure('ارتباط با سرور برقرار نمیباشد'))
                    }
                    else if(res.success) {
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
                    if(res === undefined) {
                        dispatch(alertActions.error('ارتباط با سرور برقرار نیست'))
                        dispatch(failure('ارتباط با سرور برقرار نمیباشد'))
                    }
                    else if(res.success) {
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

function addOrder(products, customer) {
    return dispatch => {
        dispatch(request())
        orderService.addOrder(products, customer)
            .then(
                res => {
                    
                    console.log(res)
                    if(res === undefined) {
                        dispatch(alertActions.error('ارتباط با سرور برقرار نیست'));
                        dispatch(failure('ارتباط با سرور برقرار نیست'))
                    }
                    else if(res.success){
                        console.log("order added")
                        dispatch(success(products, customer));
                        dispatch(alertActions.success(res.message));
                        setTimeout(() => {
                            dispatch(alertActions.clear());
                            //history.go(0)
                        }, 1500);
                        
                    }else if(res.success === false) {
                        dispatch(alertActions.error(ResizeObserver.message));
                        dispatch(failure(ResizeObserver.message))
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
        orderService.editOrderSms(params)
            .then(
                res => {
                    console.log(res)
                    if(res === undefined) {
                        dispatch(alertActions.error('ارتباط با سرور برقرار نیست'));
                        dispatch(failure('ارتباط با سرور برقرار نیست'))
                    }
                    else if(res.success){
                        console.log("order sms edited")
                        dispatch(success());
                        dispatch(alertActions.success(res.message));
                        setTimeout(() => {
                            dispatch(alertActions.clear());
                        }, 1500);
                        
                    }else if(res.success === false) {
                        dispatch(alertActions.error(ResizeObserver.message));
                        dispatch(failure(ResizeObserver.message))
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
    function request(params) { console.log('into request'); return { type: orderConstants.EDIT_ORDER_SMS_REQUEST, params } }
    function success() { console.log("into success"); return { type: orderConstants.EDIT_ORDER_SMS_SUCCESS } }
    function failure(error) {return { type: orderConstants.EDIT_ORDER_SMS_FAILURE, error }}
}

function editNewSms(sms) {
    return {
        type: orderConstants.EDIT_ORDER_SMS,
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
                    if(res === undefined) {
                        dispatch(alertActions.error('ارتباط با سرور برقرار نیست'));
                        dispatch(failure('ارتباط با سرور برقرار نیست'))
                    }
                    else if(res.success){
                        console.log("order added")
                        dispatch(success(res.data.setting.order));
                        
                    }else if(res.success === false) {
                        dispatch(alertActions.error(ResizeObserver.message));
                        dispatch(failure(ResizeObserver.message))
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
    function request() { console.log("into request"); return { type: orderConstants.GET_ORDER_SMS_REQUEST } }
    function success(sms) { console.log("into success"); return { type: orderConstants.GET_ORDER_SMS_SUCCESS, sms } }
    function failure(error) { return { type: orderConstants.GET_ORDER_SMS_FAILURE, error } }
}

function sendDeliverySms(data) {
    return dispatch => {
        dispatch(request(orderConstants.SEND_ORDER_SMS_REQUEST))
        orderService.sendDeliverySms(data)
            .then(
                res => {
                    if(res === undefined)
                        dispatch(alertActions.error('ارتباط با سرور برقرار نیست'));
                    else if(res.success){
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