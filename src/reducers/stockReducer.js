import { stockConstants } from '../constants'

const initialState = {
    loading: false,
    stock: []
}

export function getStock(state = initialState, action) {
    switch (action.type) {
        case stockConstants.GET_STOCK_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case stockConstants.GET_STOCK_SUCCESS:
            return {
                ...state,
                loading: false,
                stock: action.product
            }
        case stockConstants.GET_STOCK_FAILURE:
            return {
                err: action.err
            }
        default:
            return state;
    }

}

export function addStock(state = {}, action) {
    switch (action.type) {
        case stockConstants.ADD_STOCK_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case stockConstants.ADD_STOCK_SUCCESS:
            return {
                ...state,
                loading: false,
                stock: action.data
            }
        case stockConstants.ADD_STOCK_FAILURE:
            return {
                err: action.error,
                loading: false
            }
        default:
            return state;
    }

}

export function editStock(state = {}, action) {
    switch (action.type) {
        case stockConstants.EDIT_STOCK_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case stockConstants.EDIT_STOCK_SUCCESS:
            return {
                ...state,
                loading: false,
                stock: action.data
            }
        case stockConstants.EDIT_STOCK_FAILURE:
            return {
                err: action.error
            }
        default:
            return state;
    }
}


export function getExcelProducts(state = initialState, action) {
    switch (action.type) {
        case stockConstants.GET_EXCEL_STOCKS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case stockConstants.GET_EXCEL_STOCKS_SUCCESS:
            return {
                ...state,
                loading: false,
                product: action.product
            }
        case stockConstants.GET_EXCEL_STOCKS_FAILURE:
            return {
                ...state,
                err: action.err,
                loading: false,
            }
        default:
            return state;
    }

}