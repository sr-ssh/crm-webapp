import { receiptConstants } from '../constants'

const initialState = {
    receipt: [],
    orders: [],
    loading: false
}

export function getOrders(state = initialState, action) {
    switch (action.type) {
        case receiptConstants.GET_ORDERS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case receiptConstants.GET_ORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.data
            }
        case receiptConstants.GET_ORDERS_FAILURE:
            return {
                err: action.error
            }
        default:
            return state
    }
}

export function editOrderStatus(state = initialState, action) {
    switch (action.type) {
        case receiptConstants.EDIT_ORDER_STATUS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case receiptConstants.EDIT_ORDER_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
            }
        case receiptConstants.EDIT_ORDER_STATUS_FAILURE:
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
        case receiptConstants.EDIT_ORDER_PRICE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case receiptConstants.EDIT_ORDER_PRICE_SUCCESS:
            return {
                ...state,
                loading: false,
            }
        case receiptConstants.EDIT_ORDER_PRICE_FAILURE:
            return {
                err: action.err,
                loading: false
            }
        default:
            return state
    }
}


export function editOrderQuantity(state = initialState, action) {
    switch (action.type) {
        case receiptConstants.EDIT_ORDER_QUANTITY_REQUEST:
            return {
                ...state,
                loading: true
            }
        case receiptConstants.EDIT_ORDER_QUANTITY_SUCCESS:
            return {
                ...state,
                loading: false,
            }
        case receiptConstants.EDIT_ORDER_QUANTITY_FAILURE:
            return {
                err: action.err,
                loading: false
            }
        default:
            return state
    }
}


export function editProducOrder(state = initialState, action) {
    switch (action.type) {
        case receiptConstants.EDIT_PRODUCT_ORDER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case receiptConstants.EDIT_PRODUCT_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
            }
        case receiptConstants.EDIT_PRODUCT_ORDER_FAILURE:
            return {
                err: action.err,
                loading: false
            }
        default:
            return state
    }
}



export function cancelProductOrder(state = initialState, action) {
    switch (action.type) {
        case receiptConstants.CANCEL_PRODUCT_ORDER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case receiptConstants.CANCEL_PRODUCT_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
            }
        case receiptConstants.CANCEL_PRODUCT_ORDER_FAILURE:
            return {
                err: action.err,
                loading: false
            }
        default:
            return state
    }
}


export function addReceipt(state = initialState, action) {
    switch (action.type) {
        case receiptConstants.ADD_RECEIPT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case receiptConstants.ADD_RECEIPT_SUCCESS:
            return {
                ...state,
                loading: false,
                receipt: action.order
            }
        case receiptConstants.ADD_RECEIPT_FAILURE:
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
        case receiptConstants.GET_SETTING_SMS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case receiptConstants.GET_SETTING_SMS_SUCCESS:
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
        case receiptConstants.GET_SETTING_SMS_FAILURE:
            return {
                err: action.err,
                loading: false
            }
        case receiptConstants.EDIT_SETTING_SMS:
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
        case receiptConstants.EDIT_SETTING_SMS_REQUEST:
            return {
                ...state,
                params: action.params,
                loading: true
            }
        case receiptConstants.EDIT_SETTING_SMS_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.message
            }
        case receiptConstants.EDIT_SETTING_SMS_FAILURE:
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
        case receiptConstants.EDIT_SETTING_SMS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case receiptConstants.EDIT_SETTING_SMS_SUCCESS:
            return {
                ...state,
                loading: false,
            }
        case receiptConstants.EDIT_SETTING_SMS_FAILURE:
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
        case receiptConstants.ADD_ORDER_FILTER:
            return {
                filter: action.filter
            }
        default:
            return state;
    }
}


export function orderDetails(state = { loading: true }, action) {
    switch (action.type) {
        case receiptConstants.GET_ORDER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case receiptConstants.GET_ORDER_DETAILS_SUCCESS:
            return {
                ...state,
                data: action.data,
                loading: false,
            }
        case receiptConstants.GET_ORDER_DETAILS_FAILURE:
            return {
                error: action.error,
                loading: false
            }
        default:
            return state
    }
}


export function getShareLinkOrder(state = {}, action) {
    switch (action.type) {
        case receiptConstants.GET_ORDER_SHARE_LINK_REQUEST:
            return {
                ...state,
                loading: true
            }
        case receiptConstants.GET_ORDER_SHARE_LINK_SUCCESS:
            return {
                ...state,
                data: action.data,
                loading: false,
            }
        case receiptConstants.GET_ORDER_SHARE_LINK_FAILURE:
            return {
                error: action.error,
                loading: false
            }
        default:
            return state
    }
}
export function confirmFinancial(state = {}, action) {
    switch (action.type) {
        case receiptConstants.CONFIRM_FINANCIAL_ORDER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case receiptConstants.CONFIRM_FINANCIAL_ORDER_SUCCESS:
            return {
                ...state,
                data: action.data,
                loading: false,
            }
        case receiptConstants.CONFIRM_FINANCIAL_ORDER_FAILURE:
            return {
                error: action.error,
                loading: false
            }
        default:
            return state
    }
}