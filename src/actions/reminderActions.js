import { reminderConstants } from '../constants';
import { reminderService } from '../services';
import { alertActions } from './alertActions';

export const reminderActions = {
    getReminders
};

function getReminders() {
    return dispatch => {
        dispatch(request(reminderConstants.GET_REMINDERS_REQUEST))
        reminderService.getReminders()
            .then(
                res => {
                    console.log("user into reminderActions");
                    if (res === undefined) {
                        dispatch(alertActions.error('ارتباط با سرور برقرار نیست'));
                        dispatch(failure(reminderConstants.GET_REMINDERS_FAILURE, "ارتباط با سرور برقرار نیست"))
                    } else if (res.success) {
                        console.log("*********reminders received**********")
                        console.log(res)
                        dispatch(success(reminderConstants.GET_REMINDERS_SUCCESS, res.data));
                    } else if (res.success === false) {
                        dispatch(alertActions.error(res.message));
                        dispatch(failure(reminderConstants.GET_REMINDERS_FAILURE, res.message.toString()));
                    }

                    setTimeout(() => {
                        dispatch(alertActions.clear());
                    }, 1500);

                },
                error => {
                    dispatch(failure(reminderConstants.GET_REMINDERS_FAILURE, error.toString()));
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