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
    editProductOrder,
    orderDetails,
    getShareLinkOrder,
    confirmFinancial,
    uploadDoc,
    showDoc,
    editSaleOpportunitySellerStatus,
    orderSupport,
    addTrackingCode,
    orderSupportClear
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
                    }else if (res.success === false) {
                        console.log("product order changed")
                        dispatch(failure(orderConstants.EDIT_ORDER_STATUS_FAILURE, res.message));
                        dispatch(alertActions.error(res.message));
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

function editProductOrder(params) {
    return dispatch => {
        dispatch(request(orderConstants.EDIT_PRODUCT_ORDER_REQUEST))
        orderService.editProductOrder(params)
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
function addOrder(products, customer, seller, notes, force = 0) {
    return dispatch => {
        dispatch(request())
        orderService.addOrder(products, customer, seller, notes , force)
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
                        if((res.dialogTrigger == undefined) || (res.dialogTrigger !== true))
                            dispatch(alertActions.error(res.message));
                        dispatch(failure(res))
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



function orderDetails(params) {
    return dispatch => {
        dispatch(request(orderConstants.GET_ORDER_DETAILS_REQUEST))
        orderService.orderDetails(params)
            .then(
                res => {
                    if (res === undefined) {
                        dispatch(alertActions.error('ارتباط با سرور برقرار نیست'));
                        dispatch(failure(orderConstants.GET_ORDER_DETAILS_FAILURE))
                    }
                    else if (res.success) {
                        console.log("order Details receive")
                        dispatch(success(orderConstants.GET_ORDER_DETAILS_SUCCESS, res.data));
                        // dispatch(alertActions.success(res.message));
                    }
                    else if (res.success == false) {
                        console.log("order Details receive")
                        dispatch(alertActions.error(res.message));
                        dispatch(failure(orderConstants.GET_ORDER_DETAILS_FAILURE, res.message))
                    }
                },
                error => {
                    dispatch(failure(orderConstants.GET_ORDER_DETAILS_FAILURE, error.toString()));
                    console.log("occure error");
                    console.log(error.toString());
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

}


function getShareLinkOrder(params) {
    return dispatch => {
        dispatch(request(orderConstants.GET_ORDER_SHARE_LINK_REQUEST))
        orderService.getShareLinkOrder(params)
            .then(
                res => {
                    if (res === undefined) {
                        dispatch(alertActions.error('ارتباط با سرور برقرار نیست'));
                        dispatch(failure(orderConstants.GET_ORDER_SHARE_LINK_FAILURE, 'ارتباط با سرور برقرار نیست'))
                    }
                    else if (res.success) {
                        console.log("order share link receive", res)
                        dispatch(success(orderConstants.GET_ORDER_SHARE_LINK_SUCCESS, res));
                    } else if (res.success == false) {
                        dispatch(failure(orderConstants.GET_ORDER_SHARE_LINK_FAILURE, res.message))
                        dispatch(alertActions.error(res.message));
                    }
                },
                error => {
                    dispatch(failure(orderConstants.GET_ORDER_SHARE_LINK_FAILURE, error.toString()));
                    console.log("occure error");
                    console.log(error.toString());
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

}

function confirmFinancial(orderId) {
    return dispatch => {
        dispatch(request(orderConstants.CONFIRM_FINANCIAL_ORDER_REQUEST))
        orderService.confirmFinancial(orderId)
            .then(
                res => {
                    if (res === undefined) {
                        dispatch(alertActions.error('ارتباط با سرور برقرار نیست'));
                        dispatch(failure(orderConstants.CONFIRM_FINANCIAL_ORDER_FAILURE, 'ارتباط با سرور برقرار نیست'))
                    }
                    else if (res.success) {
                        console.log("order financial confirmed")
                        dispatch(success(orderConstants.CONFIRM_FINANCIAL_ORDER_SUCCESS, res.data));
                    } else if (res.success == false) {
                        dispatch(failure(orderConstants.CONFIRM_FINANCIAL_ORDER_FAILURE, res.message))
                        dispatch(alertActions.error(res.message));
                    }
                },
                error => {
                    dispatch(failure(orderConstants.CONFIRM_FINANCIAL_ORDER_FAILURE, error.toString()));
                    console.log("occure error");
                    console.log(error.toString());
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

}


function uploadDoc(orderId) {
    return dispatch => {
        dispatch(request(orderConstants.UPLOAD_DOC_REQUEST))
        orderService.uploadDoc(orderId)
            .then(
                res => {
                    console.log(res)
                    if (res === undefined) {
                        dispatch(alertActions.error('ارتباط با سرور برقرار نیست'));
                        dispatch(failure(orderConstants.UPLOAD_DOC_FAILURE, 'ارتباط با سرور برقرار نیست'))
                    }
                    else if (res.success) {
                        console.log("order financial confirmed")
                        dispatch(success(orderConstants.UPLOAD_DOC_SUCCESS, res.data));
                        dispatch(alertActions.success(res.message));
                        setTimeout(() => {
                            dispatch(alertActions.clear());
                        }, 1500);
                    } else if (res.success == false) {
                        dispatch(failure(orderConstants.UPLOAD_DOC_FAILURE, res.message))
                        dispatch(alertActions.error(res.message));
                    }
                    
                    
                },
                error => {
                    dispatch(failure(orderConstants.UPLOAD_DOC_FAILURE, error.toString()));
                    console.log("occure error");
                    console.log(error.toString());
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };
}

function showDoc(orderId) {
    return dispatch => {
        dispatch(request(orderConstants.SHOW_DOC_REQUEST))
        orderService.showDoc(orderId)
            .then(
                res => {
                    if (res === undefined) {
                        dispatch(alertActions.error('ارتباط با سرور برقرار نیست'));
                        dispatch(failure(orderConstants.SHOW_DOC_FAILURE, 'ارتباط با سرور برقرار نیست'))
                    }
                    else if (res.success) {
                        console.log("order financial confirmed")
                        dispatch(success(orderConstants.SHOW_DOC_SUCCESS, res.data));
                    } else if (res.success == false) {
                        dispatch(failure(orderConstants.SHOW_DOC_FAILURE, res.message))
                        dispatch(alertActions.error(res.message));
                    }
                },
                error => {
                    dispatch(failure(orderConstants.SHOW_DOC_FAILURE, error.toString()));
                    console.log("occure error");
                    console.log(error.toString());
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };
}

function editSaleOpportunitySellerStatus(orderId) {
    return dispatch => {
        dispatch(request(orderConstants.CONFIRM_FINANCIAL_ORDER_REQUEST))
        orderService.editSaleOpportunitySellerStatus(orderId)
            .then(
                res => {
                    if (res === undefined) {
                        dispatch(alertActions.error('ارتباط با سرور برقرار نیست'));
                        dispatch(failure(orderConstants.CONFIRM_FINANCIAL_ORDER_FAILURE, 'ارتباط با سرور برقرار نیست'))
                    }
                    else if (res.success) {
                        console.log("order financial confirmed")
                        dispatch(success(orderConstants.CONFIRM_FINANCIAL_ORDER_SUCCESS, res.data));
                    } else if (res.success == false) {
                        dispatch(failure(orderConstants.CONFIRM_FINANCIAL_ORDER_FAILURE, res.message))
                        dispatch(alertActions.error(res.message));
                    }
                },
                error => {
                    dispatch(failure(orderConstants.CONFIRM_FINANCIAL_ORDER_FAILURE, error.toString()));
                    console.log("occure error");
                    console.log(error.toString());
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

}

function orderSupport(params) {
    return dispatch => {
        dispatch(request(orderConstants.GET_SUPPORT_ORDER_REQUEST))
        orderService.orderSupport(params)
            .then(
                res => {
                    if (res === undefined) {
                        dispatch(alertActions.error('ارتباط با سرور برقرار نیست'));
                        dispatch(failure(orderConstants.GET_SUPPORT_ORDER_FAILURE, 'ارتباط با سرور برقرار نیست'))
                    }
                    else if (res.success) {
                        console.log("order financial confirmed")
                        dispatch(success(orderConstants.GET_SUPPORT_ORDER_SUCCESS, res.data));
                    } else if (res.success == false) {
                        dispatch(failure(orderConstants.GET_SUPPORT_ORDER_FAILURE, res.message))
                        dispatch(alertActions.error(res.message));
                    }
                },
                error => {
                    dispatch(failure(orderConstants.GET_SUPPORT_ORDER_FAILURE, error.toString()));
                    console.log("occure error");
                    console.log(error.toString());
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

}


function orderSupportClear() {
    return dispatch => {
        dispatch(request(orderConstants.CLEAR_SUPPORT_ORDER))
    };
}

function addTrackingCode(params) {
    return dispatch => {
        dispatch(request(orderConstants.ADD_ORDER_TRACKING_CODE_REQUEST))
        orderService.addTrackingCode(params)
            .then(
                res => {
                    if (res === undefined) {
                        dispatch(alertActions.error('ارتباط با سرور برقرار نیست'));
                        dispatch(failure(orderConstants.GET_SUPPORT_ORDERADD_ORDER_TRACKING_CODE_FAILURE, 'ارتباط با سرور برقرار نیست'))
                    }
                    else if (res.success) {
                        console.log("order TRACKING CODE")
                        dispatch(success(orderConstants.ADD_ORDER_TRACKING_CODE_SUCCESS, res.data));
                        setTimeout(() => {
                            dispatch(clear(orderConstants.ADD_ORDER_TRACKING_CODE_CLEAR ));
                        }, 1500);
                    } else if (res.success == false) {
                        dispatch(failure(orderConstants.ADD_ORDER_TRACKING_CODE_FAILURE, res.message))
                        dispatch(alertActions.error(res.message));
                    }

                    
                },
                error => {
                    dispatch(failure(orderConstants.ADD_ORDER_TRACKING_CODE_FAILURE, error.toString()));
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

function clear(type) {
    return { type: type };
  }