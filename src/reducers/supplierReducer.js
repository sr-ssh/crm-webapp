import { supplierConstants } from '../constants'

const initialState = {
    suppliers: [],
    loading: false
}


export function getSuppliers(state = initialState, action) {

    switch (action.type) {
        case supplierConstants.GET_SUPPLIERS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case supplierConstants.GET_SUPPLIERS_SUCCESS:
            return {
                ...state,
                suppliers: action.customers,
                loading: false
            }
        case supplierConstants.GET_SUPPLIERS_FAILURE:
            return {
                loading: false
            }
        default:
            return state;
    }
}

export function getSupplier(state = initialState, action) {
    switch (action.type) {
        case supplierConstants.GET_SUPPLIER_REQUEST:
            return {
                loading: true,
            }
        case supplierConstants.GET_SUPPLIER_SUCCESS:
            return {
                loading: false,
                supplier: action.customer,
            }
        case supplierConstants.GET_SUPPLIER_FAILURE:
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
        case supplierConstants.GET_EXCEL_CUSTOMERS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case supplierConstants.GET_EXCEL_CUSTOMERS_SUCCESS:
            return {
                ...state,
                data: action.data,
                loading: false
            }
        case supplierConstants.GET_EXCEL_CUSTOMERS_FAILURE:
            return {
                ...state,
                error: action.error,
                loading: false
            }
        default:
            return state;
    }
}