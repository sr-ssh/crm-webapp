import { receiptConstants } from '../constants'

const initialState = {
    receipts: [],
    orders: [],
    loading: false
}

export function getReceipts(state = initialState, action) {
    switch (action.type) {
        case receiptConstants.GET_RECEIPTS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case receiptConstants.GET_RECEIPTS_SUCCESS:
            return {
                ...state,
                loading: false,
                receipts: action.data
            }
        case receiptConstants.GET_RECEIPTS_FAILURE:
            return {
                err: action.error,
                loading: false
            }
        default:
            return state
    }
}

export function editReceiptStatus(state = {}, action) {
    switch (action.type) {
        case receiptConstants.EDIT_RECEIPT_STATUS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case receiptConstants.EDIT_RECEIPT_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
            }
        case receiptConstants.EDIT_RECEIPT_STATUS_FAILURE:
            return {
                err: action.err,
                loading: false
            }
        default:
            return state
    }
}

export function editReceipt(state = {}, action) {
    switch (action.type) {
        case receiptConstants.EDIT_RECEIPT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case receiptConstants.EDIT_RECEIPT_SUCCESS:
            return {
                ...state,
                loading: false,
            }
        case receiptConstants.EDIT_RECEIPT_FAILURE:
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

export function confirmShop(state = {}, action) {
    switch (action.type) {
        case receiptConstants.CONFIRM_FINANCIAL_RECEIPT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case receiptConstants.CONFIRM_FINANCIAL_RECEIPT_SUCCESS:
            return {
                ...state,
                data: action.data,
                loading: false,
            }
        case receiptConstants.CONFIRM_FINANCIAL_RECEIPT_FAILURE:
            return {
                error: action.error,
                loading: false
            }
        default:
            return state
    }
}

export function editReceiptNoteStatus(state = {}, action) {
    switch (action.type) {
        case receiptConstants.EDIT_RECEIPT_NOTE_STATUS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case receiptConstants.EDIT_RECEIPT_NOTE_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
            }
        case receiptConstants.EDIT_RECEIPT_NOTE_STATUS_FAILURE:
            return {
                err: action.err,
                loading: false
            }
        default:
            return state
    }
}