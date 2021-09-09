import { settingConstants } from '../constants'

const initialState = {}

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