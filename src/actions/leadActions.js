import { leadConstants } from '../constants';
import { history } from '../helpers';
import { leadService } from '../services';
import { alertActions } from './alertActions';

export const leadActions = {
    addLead,
    getLeads,
    uploadExcel,
    editLeadStatus
};

function addLead(lead) {
    return dispatch => {
        dispatch(request(leadConstants.ADD_LEAD_REQUEST))
        leadService.addLead(lead)
            .then(
                res => {
                    console.log(res)

                    if (res === undefined) {
                        dispatch(alertActions.error('ارتباط با سرور برقرار نیست.سرنخ شما ثبت نشد'));
                        dispatch(failure(leadConstants.ADD_LEAD_FAILURE, 'ارتباط با سرور برقرار نیست.سرنخ شما ثبت نشد'));
                    }
                    else if (res.success) {
                        console.log("lead added")
                        dispatch(success(leadConstants.ADD_LEAD_SUCCESS, lead));
                        dispatch(alertActions.success(res.message));

                    } else if (res.success === false) {
                        dispatch(failure(leadConstants.ADD_LEAD_FAILURE, lead));
                        dispatch(alertActions.error(res.message));
                    }


                    setTimeout(() => {
                        dispatch(alertActions.clear());
                    }, 800);
                },
                error => {
                    dispatch(failure(error.toString()));
                    console.log("occure error");
                    console.log(error.toString());
                    dispatch(alertActions.error(leadConstants.ADD_LEAD_FAILURE, error.toString()));
                }
            );
    }

}



function getLeads() {
    return dispatch => {
        dispatch(request(leadConstants.GET_LEADS_REQUEST))
        leadService.getLeads()
            .then(
                res => {
                    console.log(res)

                    if (res === undefined) {
                        dispatch(alertActions.error('ارتباط با سرور برقرار نیست.'));
                        dispatch(failure(leadConstants.GET_LEADS_FAILURE, 'ارتباط با سرور برقرار نیست'));
                    }
                    else if (res.success) {
                        console.log("lead got")
                        dispatch(success(leadConstants.GET_LEADS_SUCCESS, res.data));
                        dispatch(alertActions.success(res.message));

                    } else if (res.success === false) {
                        dispatch(failure(leadConstants.GET_LEADS_FAILURE));
                        dispatch(alertActions.error(res.message));
                    }


                    setTimeout(() => {
                        dispatch(alertActions.clear());
                    }, 800);
                },
                error => {
                    dispatch(failure(error.toString()));
                    console.log("occure error");
                    console.log(error.toString());
                    dispatch(alertActions.error(leadConstants.GET_LEADS_FAILURE, error.toString()));
                }
            );
    }

}

function uploadExcel(param) {
    return dispatch => {
        dispatch(request(leadConstants.UPLOAD_EXCEL_REQUEST));
        leadService.uploadExcel(param)
            .then(
                res => {
                    if (res === undefined) {
                        dispatch(alertActions.error('ارتباط با سرور برقرار نیست'));
                        dispatch(failure(leadConstants.UPLOAD_EXCEL_FAILURE));

                    } else if (res.success) {
                        console.log("Excel Products uploaded")
                        dispatch(success(leadConstants.UPLOAD_EXCEL_SUCCESS, res.message));
                        dispatch(alertActions.success(res.message));
                    } else if (res.success === false) {
                        dispatch(alertActions.error(res.message));
                        dispatch(failure(leadConstants.UPLOAD_EXCEL_FAILURE, res.message));

                    }
                },
                error => {
                    dispatch(failure(leadConstants.UPLOAD_EXCEL_FAILURE, error.toString()));
                    console.log("occure error");
                    console.log(error.toString());
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

}

function editLeadStatus(lead) {
    return dispatch => {
        dispatch(request(leadConstants.EDIT_LEAD_REQUEST))
        leadService.editLeadStatus(lead)
            .then(
                res => {
                    console.log(res)

                    if (res === undefined) {
                        dispatch(alertActions.error('ارتباط با سرور برقرار نیست'));
                        dispatch(failure(leadConstants.EDIT_LEAD_FAILURE, 'ارتباط با سرور برقرار نیست'));
                    }
                    else if (res.success) {
                        console.log("lead added")
                        dispatch(success(leadConstants.EDIT_LEAD_SUCCESS, lead));
                        dispatch(alertActions.success(res.message));

                    } else if (res.success === false) {
                        dispatch(failure(leadConstants.EDIT_LEAD_FAILURE, lead));
                        dispatch(alertActions.error(res.message));
                    }


                    setTimeout(() => {
                        dispatch(alertActions.clear());
                    }, 800);
                },
                error => {
                    dispatch(failure(error.toString()));
                    console.log("occure error");
                    console.log(error.toString());
                    dispatch(alertActions.error(leadConstants.EDIT_LEAD_FAILURE, error.toString()));
                }
            );
    }

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