import { userConstants } from '../constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export function authentication(state = initialState, action) {
    //  console.log("action.type"); console.log(action.type);
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            //console.log("action into authentication reducer");   console.log(action);
            return {
                loggingIn: true,
                loading: true,
                user: action.user
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                loading: false,
                user: action.user
            };
        case userConstants.LOGIN_FAILURE:
            return {
                loading: false
            };
        case userConstants.LOGOUT:
            return {};
        default:
            return state
    }
}

export function register(state = initialState, action) {
    //console.log("action.type"); console.log(action.type);
    switch (action.type) {
        case userConstants.REGISTER_REQUEST:
            console.log("action into authentication reducer"); console.log(action);
            return {
                ...state,
                registering: true,
                loading: true,
                user: action.user
            };
        case userConstants.REGISTER_SUCCESS:
            return {
                ...state,
                registering: false,
                loading: false,
                user: action.user
            };
        case userConstants.REGISTER_FAILURE:
            return {
                loading: false
            };
        default:
            return state
    }
}

export function verificationCode(state = initialState, action) {
    //console.log("action.type"); console.log(action.type);
    switch (action.type) {
        case userConstants.VERIFICATION_CODE_REQUEST:
            console.log("action into authentication reducer"); console.log(action);
            return {
                ...state,
                loading: true,
                mobile: action.mobile
            };
        case userConstants.VERIFICATION_CODE_SUCCESS:
            return {
                ...state,
                loading: false,
                mobile: action.mobile
            };
        case userConstants.VERIFICATION_CODE_FAILURE:
            return {
                loading: false
            };
        default:
            return state
    }
}