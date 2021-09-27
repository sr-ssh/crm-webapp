import { sideBarConstants } from '../constants'

const initialState = { open: false }

export function sideBar(state = initialState, action) {
    switch (action.type) {
        case sideBarConstants.SIDE_BAR_OPEN:
            return {
                open: true
            }
        case sideBarConstants.SIDE_BAR_CLOSE:
            return {
                open: false
            }
        default:
            return state;
    }
}