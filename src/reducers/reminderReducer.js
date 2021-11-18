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

export function addReminder(state = initialState, action) {
    switch (action.type) {
        case reminderConstants.ADD_REMINDER_REQUEST:
            return {
                loading: true
            }
        case reminderConstants.ADD_REMINDER_SUCCESS:
            return {
                ...state,
                loading: false,
                err: null,
                data: action.data
            }
        case reminderConstants.ADD_REMINDER_FAILURE:
            return {
                err: action.error,
                data:null,
                loading: false,
            }
        default:
            return state
    }
}