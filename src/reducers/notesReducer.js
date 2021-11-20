import { notesConstants } from '../constants'

const initialState = {
    notes: [],
    loading: false
}

export function getNotes(state = initialState, action) {
    switch (action.type) {
        case notesConstants.GET_NOTES_REQUEST:
            return {
                ...state,
                loading: true
            }
        case notesConstants.GET_NOTES_SUCCESS:
            return {
                ...state,
                loading: false,
                notes: action.data
            }
        case notesConstants.GET_NOTES_FAILURE:
            return {
                ...state,
                err: action.error,
                loading: false
            }

        default:
            return state;
    }
}


export function addNotes(state = initialState, action) {
    switch (action.type) {
        case notesConstants.ADD_NOTES_REQUEST:
            return {
                loading: true
            }
        case notesConstants.ADD_NOTES_SUCCESS:
            return {
                ...state,
                loading: false,
                notes: action.data
            }
        case notesConstants.ADD_NOTES_FAILURE:
            return {
                ...state,
                err: action.error,
                loading: false
            }

        default:
            return state;
    }
}


export function editStatusNotes(state = initialState, action) {
    switch (action.type) {
        case notesConstants.EDIT_NOTES_STATUS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case notesConstants.EDIT_NOTES_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                notes: action.data
            }
        case notesConstants.EDIT_NOTES_STATUS_FAILURE:
            return {
                ...state,
                err: action.error,
                loading: false
            }

        default:
            return state;
    }
}