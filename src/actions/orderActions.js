import { orderConstants } from '../constants'
import { history } from '../helpers';
import { orderService } from '../services'
import { alertActions } from './alertActions';

export const orderActions = {
    getOrders,
    addOrder
}

function getOrders(filter) {
    return dispatch => {
        dispatch(request(orderConstants.GET_ORDERS_REQUEST))
        orderService.getOrders(filter)
            .then(
                res => {
                    console.log(res.data)

                    if(res.success){
                        console.log("orders received")
                        dispatch(success(orderConstants.GET_ORDERS_SUCCESS, res.data));
                        dispatch(alertActions.success(res.message));
                        setTimeout(() => {
                            dispatch(alertActions.clear());
                            history.go(0)
                        }, 1500);
                        
                    }else if(res.success === false)
                        dispatch(alertActions.error(ResizeObserver.message));
                    else if(res.success === undefined)
                        dispatch(alertActions.error('ارتباط با سرور برقرار نیست'));
                        
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

function addOrder(products, customer) {
    return dispatch => {
        dispatch(request())
        orderService.addOrder(products, customer)
            .then(
                res => {
                    
                    console.log(res)
                    if(res.success){
                        console.log("order added")
                        dispatch(success(products, customer));
                        dispatch(alertActions.success(res.message));
                        setTimeout(() => {
                            dispatch(alertActions.clear());
                            history.go(0)
                        }, 1500);
                        
                    }else if(res.success === false)
                        dispatch(alertActions.error(ResizeObserver.message));
                    else if(res.success === undefined)
                        dispatch(alertActions.error('ارتباط با سرور برقرار نیست'));
                        
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

function request(type) {
    return { type: type }
}

function success(type, data) {
    return { type: type, data }
}

function failure(type, error) {
    return { type: type, error }
}