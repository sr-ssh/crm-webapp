import { notesConstants } from '../constants';
import { notesService } from '../services';
import { alertActions } from './alertActions';


export const notesActions = {
    getNotes
};

function getNotes(orderId) {
    return dispatch => {

        dispatch(request(notesConstants.GET_NOTES_REQUEST));
        notesService.getNotes(orderId)
            .then(
                res => {
                    if (res === undefined) {
                        dispatch(alertActions.error('ارتباط با سرور برقرار نیست'));
                        dispatch(failure(notesConstants.GET_NOTES_FAILURE, 'ارتباط با سرور برقرار نیست'));
                    } else if (res.success) {
                        console.log("user into notesActions");
                        dispatch(success(notesConstants.GET_NOTES_SUCCESS, res.data));
                    } else if (res.success === false) {
                        console.log("user into notesActions");
                        dispatch(failure(notesConstants.GET_NOTES_FAILURE, res.data));
                    }

                    setTimeout(() => {
                        dispatch(alertActions.clear());
                    }, 1500);
                },
                error => {
                    dispatch(failure(notesConstants.GET_NOTES_FAILURE, error.toString()));
                    console.log("occure error");
                    console.log(error.toString());
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };
}

// function addNotes() {
//     return dispatch => {
//         dispatch(request(financeConstants.GET_BILLS_REQUEST));

//         financeService.getBills()
//             .then(
//                 bills => {
//                     console.log(bills)
//                     console.log("user into financeAction");
//                     dispatch(success(financeConstants.GET_BILLS_SUCCESS, bills));
//                     console.log("got the bills")
//                     dispatch(alertActions.success('هزینه های جاری با موفقیت ارسال شدند'));
//                 },
//                 error => {
//                     dispatch(failure(financeConstants.GET_BILLS_FAILURE, error.toString()));
//                     console.log("occure error");
//                     console.log(error.toString());
//                     dispatch(alertActions.error(error.toString()));
//                 }
//             );
//     };
// }

// function editStatusNotes(bill) {
//     return dispatch => {
//         dispatch(request(financeConstants.ADD_BILLS_REQUEST));

//         financeService.addBill(bill)
//             .then(
//                 data => {
//                     console.log("user into financeAction");
//                     dispatch(success(financeConstants.ADD_BILLS_SUCCESS, data));
//                     console.log("added the bill")
//                     dispatch(alertActions.success('هزینه وارد شده با موفقیت اضافه شد'));
//                     history.go(0)
//                 },
//                 error => {
//                     dispatch(failure(financeConstants.ADD_BILLS_FAILURE, error.toString()));
//                     console.log("occure error");
//                     console.log(error.toString());
//                     dispatch(alertActions.error(error.toString()));
//                 }
//             );
//     };

// }

function request(type) {
    return { type: type }
}

function success(type, data) {
    return { type: type, data }
}

function failure(type, error) {
    return { type: type, error }
}