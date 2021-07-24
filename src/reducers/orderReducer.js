import { orderConstants } from '../constants'

const initialState = {
    order: [],
    orders: [],
    loading: false
}

export function getOrders(state = initialState, action) {
    switch (action.type) {
        case orderConstants.GET_ORDERS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case orderConstants.GET_ORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.data
            }
        case orderConstants.GET_ORDERS_FAILURE:
            return {
                err: action.error
            }
        default:
            return state
    }
}

export function editOrderStatus(state = initialState, action) {
    switch (action.type) {
        case orderConstants.EDIT_ORDER_STATUS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case orderConstants.EDIT_ORDER_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
            }
        case orderConstants.EDIT_ORDER_STATUS_FAILURE:
            return {
                err: action.err,
                loading: false
            }
        default:
            return state
    }
}

export function editOrderPrice(state = initialState, action) {
    switch (action.type) {
        case orderConstants.EDIT_ORDER_PRICE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case orderConstants.EDIT_ORDER_PRICE_SUCCESS:
            return {
                ...state,
                loading: false,
            }
        case orderConstants.EDIT_ORDER_PRICE_FAILURE:
            return {
                err: action.err,
                loading: false
            }
        default:
            return state
    }
}

export function addOrder(state = initialState, action) {
    switch (action.type) {
        case orderConstants.ADD_ORDER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case orderConstants.ADD_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                order: action.order
            }
        case orderConstants.ADD_ORDER_FAILURE:
            return {
                err: action.err,
                loading: false
            }
        default:
            return state
    }
}

export function getOrderSms(state = initialState, action) {
    switch (action.type) {
        case orderConstants.GET_ORDER_SMS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case orderConstants.GET_ORDER_SMS_SUCCESS:
            const SMSTypes = {
                preSms: 1,
                postDeliverySms: 2,
                postCustomerSms: 3
            }
            Object.keys(action.sms).map((keyitem) => {
                action.sms.[keyitem].type = SMSTypes.[keyitem]
            })

            return {
                ...state,
                loading: false,
                sms: action.sms
            }
        case orderConstants.GET_ORDER_SMS_FAILURE:
            return {
                err: action.err,
                loading: false
            }
        case orderConstants.EDIT_ORDER_SMS:
            return {
                ...state,
                loading: false,
                sms: action.sms
            }
        default:
            return state
    }
}

export function editOrderSms(state = initialState, action) {
    switch (action.type) {
        case orderConstants.EDIT_ORDER_SMS_REQUEST:
            return {
                ...state,
                params: action.params,
                loading: true
            }
        case orderConstants.EDIT_ORDER_SMS_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.message
            }
        case orderConstants.EDIT_ORDER_SMS_FAILURE:
            return {
                err: action.err,
                loading: false
            }
        default:
            return state
    }
}

export function deliverySms(state = initialState, action) {
    switch (action.type) {
        case orderConstants.EDIT_ORDER_SMS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case orderConstants.EDIT_ORDER_SMS_SUCCESS:
            return {
                ...state,
                loading: false,
            }
        case orderConstants.EDIT_ORDER_SMS_FAILURE:
            return {
                err: action.err,
                loading: false
            }
        default:
            return state
    }
}

export function setOrdersFilter(state = {}, action) {

    switch (action.type) {
        case orderConstants.ADD_ORDER_FILTER:
            return {
                filter: action.filter
            }
        default:
            return state;
    }
}