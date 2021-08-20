import { reminderConstants } from '../constants'

const initialState = {
    reminders: []
}

export function getReminders(state = initialState, action) {
    switch (action.type) {
        case reminderConstants.GET_REMINDERS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case reminderConstants.GET_REMINDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                reminders: action.data
            }
        case reminderConstants.GET_REMINDERS_FAILURE:
            return {
                err: action.error,
                loading: false,
            }
        default:
            return state
    }
}