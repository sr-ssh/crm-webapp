import { userConstants } from '../constants'

const initialState = {}

export function getUserInfo(state = initialState, action) {
    switch (action.type) {
        case userConstants.USER_INFO_REQUEST:
            return {
                ...state,
                user: {}
            }
        case userConstants.USER_INFO_SUCCESS:
            return {
                ...state,
                user: action.user
            }
        case userConstants.USER_INFO_FAILURE:
            return {
                ...state,
                user: {}
            }
    
        default:
            return state;
    }
}

export function editUserInfo(state = initialState, action) {
    switch (action.type) {
        case userConstants.EDIT_USER_INFO_REQUEST:
            return {
                ...state,
                user: {},
                loading: true
            }
        case userConstants.EDIT_USER_INFO_SUCCESS:
            return {
                ...state,
                user: action.user,
                loading: false
            }
        case userConstants.EDIT_USER_INFO_FAILURE:
            return {
                ...state,
                user: {},
                loading: true
            }
    
        default:
            return state;
    }
}

export function appInfo(state = initialState, action) {
    switch (action.type) {
        case userConstants.APP_INFO_REQUEST:
            return {
                ...state,
                loading : true,
                user: {}
            }
        case userConstants.APP_INFO_SUCCESS:
            return {
                ...state,
                loading : false,
                user: action.user
            }
        case userConstants.APP_INFO_FAILURE:
            return {
                ...state,
                loading : false,
                error: action.error
            }
    
        default:
            return state;
    }
}


export function passwordForgetting(state = {}, action) {
    switch (action.type) {
        case userConstants.PASSWORD_RESET_REQUEST:
            return {
                loading : true,
            }
        case userConstants.PASSWORD_RESET_SUCCESS:
            return {
                loading : false,
                data: action.data
            }
        case userConstants.PASSWORD_RESET_FAILURE:
            return {
                loading : false,
                error: action.error
            }
    
        default:
            return state;
    }
}