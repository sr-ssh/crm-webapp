import { financeConstants } from '../constants'

export function financeSummary(state = {}, action){
    
    switch (action.type) {
        case financeConstants.FINANCE_SUMMARY_REQUEST:
            return{
                loading: true
            }
        case financeConstants.FINANCE_SUMMARY_SUCCESS:
            return{
                data: action.data
            }
        case financeConstants.FINANCE_SUMMARY_FAILURE:
    
            break;
    
        default:
            return state;
    }
}

export function bill(state = {}, action){
    
    switch (action.type) {
        case financeConstants.GET_BILLS_REQUEST:
            return{
                loading: true
            }
        case financeConstants.GET_BILLS_SUCCESS:
            return{
                items: action.data
            }
        case financeConstants.GET_BILLS_FAILURE:
    
            break;

        case financeConstants.ADD_BILLS_REQUEST:
            return{
                loading: true
            }
        case financeConstants.ADD_BILLS_SUCCESS:
            return state;
        case financeConstants.ADD_BILLS_FAILURE:
    
            break;
    
        default:
            return state;
    }
}
