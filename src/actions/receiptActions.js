import { receiptConstants } from '../constants'
import { recieptService } from '../services'
import { alertActions } from './alertActions';

export const receiptActions = {
    getReceipts,
    addReceipt,
    editReceiptStatus,
    editReceipt,
    confirmShop,
    editReceiptNoteStatus
}

function getReceipts(filter) {
    return dispatch => {
        dispatch(request(receiptConstants.GET_RECEIPTS_REQUEST))
        recieptService.getReceipts(filter)
            .then(
                res => {
                    if (res === undefined) {
                        dispatch(alertActions.error('ارتباط با سرور برقرار نیست'));
                        dispatch(failure(receiptConstants.GET_RECEIPTS_FAILURE, 'ارتباط با سرور برقرار نیست'));
                    }
                    else if (res.success) {
                        console.log("Receipts received")
                        dispatch(success(receiptConstants.GET_RECEIPTS_SUCCESS, res.data));
                    } else if (res.success === false) {
                        console.log("error >>>> " + res)
                        dispatch(failure(receiptConstants.GET_RECEIPTS_FAILURE, res.message));
                        dispatch(alertActions.error(res.message));
                    }

                    setTimeout(() => {
                        dispatch(alertActions.clear());
                    }, 1500);
                },
                error => {
                    dispatch(failure(receiptConstants.GET_RECEIPTS_FAILURE, error.toString()));
                    console.log("occure error");
                    console.log(error.toString());
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

}

function editReceiptStatus(receiptId, status) {
    return dispatch => {
        dispatch(request())
        recieptService.editReceiptStatus(receiptId, status)
            .then(
                res => {
                    if (res === undefined) {
                        dispatch(alertActions.error('ارتباط با سرور برقرار نیست'))
                        dispatch(failure('ارتباط با سرور برقرار نمیباشد'))
                    }
                    else if (res.success) {
                        console.log("receipt status changed")
                        dispatch(success())
                        dispatch(alertActions.success(res.message));
                    } else if (res.success === false) {
                        console.log("error >>>> " + res)
                        dispatch(failure(res.message))
                        dispatch(alertActions.error(res.message));
                    }

                    setTimeout(() => {
                        dispatch(alertActions.clear());
                    }, 1500);
                },
                error => {
                    dispatch(failure(error.toString()));
                    console.log("occure error");
                    console.log(error.toString());
                    dispatch(alertActions.error(error.toString()));
                }
            );

    }

    function request() { console.log("into request"); return { type: receiptConstants.EDIT_RECEIPT_STATUS_REQUEST } }
    function success() { console.log("into success"); return { type: receiptConstants.EDIT_RECEIPT_STATUS_SUCCESS } }
    function failure(error) { return { type: receiptConstants.EDIT_RECEIPT_STATUS_FAILURE, error } }
}



function editReceipt({ receiptId, stocks, address }) {
    return dispatch => {
        dispatch(request(receiptConstants.EDIT_RECEIPT_REQUEST))
        recieptService.editReceipt(receiptId, stocks, address)
            .then(
                res => {
                    if (res === undefined) {
                        dispatch(alertActions.error('ارتباط با سرور برقرار نیست'))
                        dispatch(failure(receiptConstants.EDIT_RECEIPT_FAILURE, 'ارتباط با سرور برقرار نمیباشد'))
                    }
                    else if (res.success) {
                        console.log("receipt changed")
                        dispatch(success(receiptConstants.EDIT_RECEIPT_SUCCESS, res.data))
                        dispatch(alertActions.success(res.message));
                    } else if (res.success === false) {
                        console.log("error >>>> " + res)
                        dispatch(failure(receiptConstants.EDIT_RECEIPT_FAILURE, res.message))
                        dispatch(alertActions.error(res.message));
                    }

                    setTimeout(() => {
                        dispatch(alertActions.clear());
                    }, 1500);
                },
                error => {
                    dispatch(failure(receiptConstants.EDIT_RECEIPT_FAILURE, error.toString()));
                    console.log("occure error");
                    console.log(error.toString());
                    dispatch(alertActions.error(error.toString()));
                }
            );

    }
}


function addReceipt(products, customer, notes, status = '') {
    return dispatch => {
        dispatch(request())
        recieptService.addReceipt(products, customer, notes, status)
            .then(
                res => {
                    console.log(res)
                    if (res === undefined) {
                        dispatch(alertActions.error('ارتباط با سرور برقرار نیست'));
                        dispatch(failure('ارتباط با سرور برقرار نیست'))
                    }
                    else if (res.success) {
                        console.log("order added")
                        dispatch(success(products, customer));
                        dispatch(alertActions.success(res.message));
                        setTimeout(() => {
                            dispatch(alertActions.clear());
                            //history.go(0)
                        }, 1500);

                    } else if (res.success === false) {
                        dispatch(alertActions.error(res.message));
                        dispatch(failure(res.message))
                    }

                    setTimeout(() => {
                        dispatch(alertActions.clear());
                    }, 1500);
                },
                error => {
                    dispatch(failure(error.toString()));
                    console.log("occure error");
                    console.log(error.toString());
                    dispatch(alertActions.error(error.toString()));
                }
            );
    }

    function request() { console.log("into request"); return { type: receiptConstants.ADD_RECEIPT_REQUEST } }
    function success(order) { console.log("into success"); return { type: receiptConstants.ADD_RECEIPT_SUCCESS, order } }
    function failure(error) { return { type: receiptConstants.ADD_RECEIPT_FAILURE, error } }
}

function confirmShop(receiptId) {
    return dispatch => {
        dispatch(request(receiptConstants.CONFIRM_FINANCIAL_RECEIPT_REQUEST))
        recieptService.confirmShop(receiptId)
            .then(
                res => {
                    if (res === undefined) {
                        dispatch(alertActions.error('ارتباط با سرور برقرار نیست'));
                        dispatch(failure(receiptConstants.CONFIRM_FINANCIAL_RECEIPT_FAILURE, 'ارتباط با سرور برقرار نیست'))
                    }
                    else if (res.success) {
                        console.log("order financial confirmed")
                        dispatch(success(receiptConstants.CONFIRM_FINANCIAL_RECEIPT_SUCCESS, res.data));
                    } else if (res.success == false) {
                        dispatch(failure(receiptConstants.CONFIRM_FINANCIAL_RECEIPT_FAILURE, res.message))
                        dispatch(alertActions.error(res.message));
                    }
                },
                error => {
                    dispatch(failure(receiptConstants.CONFIRM_FINANCIAL_RECEIPT_FAILURE, error.toString()));
                    console.log("occure error");
                    console.log(error.toString());
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

}


function editReceiptNoteStatus(receiptId, status ) {
  return (dispatch) => {
    //   console.log()
    dispatch(request(receiptConstants.EDIT_RECEIPT_NOTE_STATUS_REQUEST));
    recieptService.editReceiptNoteStatus(receiptId, status).then(
      (res) => {
        if (res === undefined) {
          dispatch(alertActions.error("ارتباط با سرور برقرار نیست"));
          dispatch(
            failure(
              receiptConstants.EDIT_RECEIPT_NOTE_STATUS_FAILURE,
              "ارتباط با سرور برقرار نمیباشد"
            )
          );
        } else if (res.success) {
          console.log("receipt changed");
          dispatch(
            success(receiptConstants.EDIT_RECEIPT_NOTE_STATUS_SUCCESS, res.data)
          );
          dispatch(alertActions.success(res.message));
        } else if (res.success === false) {
          console.log("error >>>> " + res);
          dispatch(
            failure(receiptConstants.EDIT_RECEIPT_NOTE_STATUS_FAILURE, res.message)
          );
          dispatch(alertActions.error(res.message));
        }

        setTimeout(() => {
          dispatch(alertActions.clear());
        }, 1500);
      },
      (error) => {
        dispatch(
          failure(receiptConstants.EDIT_RECEIPT_NOTE_STATUS_FAILURE, error.toString())
        );
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