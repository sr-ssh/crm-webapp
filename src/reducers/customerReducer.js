import { customerConstants } from '../constants'

const initialState = {
    customers: [],
    loading: false
}


export function getCustomers(state = initialState, action) {

    switch (action.type) {
        case customerConstants.GET_CUSTOMERS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case customerConstants.GET_CUSTOMERS_SUCCESS:
            return {
                ...state,
                customers: action.customers,
                loading: false
            }
        case customerConstants.GET_CUSTOMERS_FAILURE:
            return {
                loading: false
            }
        default:
            return state;
    }
}

export function getCustomer(state = initialState, action) {
    switch (action.type) {
        case customerConstants.GET_CUSTOMER_REQUEST:
            return {
                loading: true,
                // success: false
            }
        case customerConstants.GET_CUSTOMER_SUCCESS:
            return {
                loading: false,
                customer: action.customer,
            }
        case customerConstants.GET_CUSTOMER_FAILURE:
            return {
                loading: false,
                customer: action.error,
            }
        default:
            return state;
    }
}


export function getExcelCustomers(state = initialState, action) {

    switch (action.type) {
        case customerConstants.GET_EXCEL_CUSTOMERS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case customerConstants.GET_EXCEL_CUSTOMERS_SUCCESS:
            return {
                ...state,
                data: action.data,
                loading: false
            }
        case customerConstants.GET_EXCEL_CUSTOMERS_FAILURE:
            return {
                ...state,
                error: action.error,
                loading: false
            }
        default:
            return state;
    }
}