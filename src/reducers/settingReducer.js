import { settingConstants } from '../constants'

const initialState = { loading: true }

export function getSettingOrder(state = initialState, action) {
    switch (action.type) {
        case settingConstants.GET_SETTING_ORDER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case settingConstants.GET_SETTING_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.data
            }
        case settingConstants.GET_SETTING_ORDER_FAILURE:
            return {
                error: action.error,
                loading: false,
            }
        default:
            return state
    }
}