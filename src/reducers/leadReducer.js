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