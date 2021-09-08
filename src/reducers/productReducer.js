import { productConstants } from '../constants'

const initialState = {
    loading: false,
    product: []
}

export function getProducts(state = initialState, action) {
    switch (action.type) {
        case productConstants.GET_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case productConstants.GET_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                product: action.product
            }
        case productConstants.GET_PRODUCT_FAILURE:
            return {
                err: action.err
            }
        default:
            return state;
    }

}

export function addProduct(state = {}, action) {
    switch (action.type) {
        case productConstants.ADD_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case productConstants.ADD_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                product: action.data
            }
        case productConstants.ADD_PRODUCT_FAILURE:
            return {
                err: action.error,
                loading: false
            }
        default:
            return state;
    }

}

export function editProduct(state = {}, action) {
    switch (action.type) {
        case productConstants.EDIT_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case productConstants.EDIT_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                product: action.data
            }
        case productConstants.EDIT_PRODUCT_FAILURE:
            return {
                err: action.error
            }
        default:
            return state;
    }
}


export function getExcelProducts(state = initialState, action) {
    switch (action.type) {
        case productConstants.GET_EXCEL_PRODUCTS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case productConstants.GET_EXCEL_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                product: action.product
            }
        case productConstants.GET_EXCEL_PRODUCTS_FAILURE:
            return {
                ...state,
                err: action.err,
                loading: false,
            }
        default:
            return state;
    }

}