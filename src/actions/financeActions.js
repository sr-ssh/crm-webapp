import { financeConstants } from '../constants';
import { financeService } from '../services';
import { alertActions } from './alertActions';
import { history } from '../helpers';

export const financeActions = {
    getFinanceSummary,
    getBills,
    addBill
};

function getFinanceSummary() {
    return dispatch => {
        dispatch(request(financeConstants.FINANCE_SUMMARY_REQUEST));

        financeService.getFinanceSummary()
            .then(
                res => {

                    if (res === undefined)
                        dispatch(alertActions.error('ارتباط با سرور برقرار نیست'));
                    else if (res.success) {
                        console.log("user into financeAction");
                        dispatch(success(financeConstants.FINANCE_SUMMARY_SUCCESS, res.data));
                    }

                    setTimeout(() => {
                        dispatch(alertActions.clear());
                    }, 1500);
                },
                error => {
                    dispatch(failure(financeConstants.FINANCE_SUMMARY_FAILURE, error.toString()));
                    console.log("occure error");
                    console.log(error.toString());
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };
}

function getBills() {
    return dispatch => {
        dispatch(request(financeConstants.GET_BILLS_REQUEST));

        financeService.getBills()
            .then(
                bills => {
                    console.log(bills)
                    console.log("user into financeAction");
                    dispatch(success(financeConstants.GET_BILLS_SUCCESS, bills));
                    console.log("got the bills")
                    // dispatch(alertActions.success('هزینه های جاری با موفقیت ارسال شدند'));
                },
                error => {
                    dispatch(failure(financeConstants.GET_BILLS_FAILURE, error.toString()));
                    console.log("occure error");
                    console.log(error.toString());
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };
}

function addBill(bill) {
    return dispatch => {
        dispatch(request(financeConstants.ADD_BILLS_REQUEST));

        financeService.addBill(bill)
            .then(
                data => {
                    console.log("user into financeAction");
                    dispatch(success(financeConstants.ADD_BILLS_SUCCESS, data));
                    console.log("added the bill")
                    dispatch(alertActions.success('هزینه وارد شده با موفقیت اضافه شد'));
                    history.go(0)
                },
                error => {
                    dispatch(failure(financeConstants.ADD_BILLS_FAILURE, error.toString()));
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