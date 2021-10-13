import { leadConstants } from '../constants'

const initialState = {
    loading: false,
    leads: []
}


export function addLead(state = {}, action) {
    switch (action.type) {
        case leadConstants.ADD_LEAD_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case leadConstants.ADD_LEAD_SUCCESS:
            return {
                ...state,
                loading: false,
                lead: action.data
            }
        case leadConstants.ADD_LEAD_FAILURE:
            return {
                err: action.error,
                loading: false
            }
        default:
            return state;
    }

}

export function getLeads(state = {}, action) {
    switch (action.type) {
        case leadConstants.GET_LEADS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case leadConstants.GET_LEADS_SUCCESS:
            return {
                ...state,
                loading: false,
                leads: action.data
            }
        case leadConstants.GET_LEADS_FAILURE:
            return {
                err: action.error,
                loading: false
            }
        default:
            return state;
    }

}