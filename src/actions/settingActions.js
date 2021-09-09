import { settingConstants } from '../constants'
import { history } from '../helpers';
import { settingService } from '../services'
import { alertActions } from './alertActions';

export const settingActions = {
    getShareLinkConfig,
    editShareLinkConfig
}

function getShareLinkConfig() {
    return dispatch => {
        dispatch(request(settingConstants.GET_SHARE_LINK_SETTING_REQUEST))
        settingService.getShareLink()
            .then(
                res => {
                    if (res === undefined) {
                        dispatch(alertActions.error('ارتباط با سرور برقرار نیست'));
                        dispatch(failure(settingConstants.GET_SHARE_LINK_SETTING_FAILURE, 'ارتباط با سرور برقرار نیست'))
                    }
                    else if (res.success) {
                        console.log("share Link Config received")
                        dispatch(success(settingConstants.GET_SHARE_LINK_SETTING_SUCCESS, res.data.share));
                    }

                    setTimeout(() => {
                        dispatch(alertActions.clear());
                    }, 1500);
                },
                error => {
                    dispatch(failure(settingConstants.GET_SHARE_LINK_SETTING_FAILURE, error.toString()))
                    console.log("occure error");
                    console.log(error.toString());
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

}

function editShareLinkConfig(params) {
    return dispatch => {
        dispatch(request(settingConstants.EDIT_SHARE_LINK_SETTING_REQUEST))
        settingService.editShareLink(params)
            .then(
                res => {
                    if (res === undefined) {
                        dispatch(alertActions.error('ارتباط با سرور برقرار نیست'));
                        dispatch(failure(settingConstants.EDIT_SHARE_LINK_SETTING_FAILURE, 'ارتباط با سرور برقرار نیست'))
                    }
                    else if (res.success) {
                        console.log("share Link Config received")
                        dispatch(alertActions.success(res.message));
                        dispatch(success(settingConstants.EDIT_SHARE_LINK_SETTING_SUCCESS, res.message));
                    }

                    setTimeout(() => {
                        dispatch(alertActions.clear());
                    }, 1500);
                },
                error => {
                    dispatch(failure(settingConstants.EDIT_SHARE_LINK_SETTING_FAILURE, error.toString()))
                    console.log("occure error");
                    console.log(error.toString());
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

}


function request(type) {
    return { type: type }
}

function success(type, data) {
    return { type: type, data }
}

function failure(type, error) {
    return { type: type, error }
}