import { sideBarConstants } from '../constants';

export const sideBarActions = {
    sideBar
};

function sideBar(status) {
    return dispatch => {
        if (status === 1)
            dispatch(open());
        else if (status === 2)
            dispatch(close());
    };
    function open() { return { type: sideBarConstants.SIDE_BAR_OPEN } }
    function close() { return { type: sideBarConstants.SIDE_BAR_CLOSE } }
}