import { settingConstants } from '../constants'

const initialState = { loading: false }

export function getShareLinkConfig(state = initialState, action) {
    switch (action.type) {
        case settingConstants.GET_SHARE_LINK_SETTING_REQUEST:
            return {
                ...state,
                loading: true
            }
        case settingConstants.GET_SHARE_LINK_SETTING_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.data
            }
        case settingConstants.GET_SHARE_LINK_SETTING_FAILURE:
            return {
                error: action.error,
                loading: false,
            }
        default:
            return state
    }
}

export function editShareLinkConfig(state = initialState, action) {
    switch (action.type) {
        case settingConstants.EDIT_SHARE_LINK_SETTING_REQUEST:
            return {
                ...state,
                loading: true
            }
        case settingConstants.EDIT_SHARE_LINK_SETTING_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.data
            }
        case settingConstants.EDIT_SHARE_LINK_SETTING_FAILURE:
            return {
                error: action.error,
                loading: false,
            }
        default:
            return state
    }
}