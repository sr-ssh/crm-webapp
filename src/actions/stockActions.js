import { stockConstants } from '../constants';
import { stockService } from '../services';
import { alertActions } from './alertActions';

export const stockActions = {
    getStock,
    addStock,
    editStock,
    getExcelProducts
};

function getStock() {
    return dispatch => {
        dispatch(request())
        stockService.getStock()
            .then(
                res => {

                    if (res === undefined)
                        dispatch(alertActions.error('ارتباط با سرور برقرار نیست'));
                    else if (res.success) {
                        console.log("STOCK received")
                        dispatch(success(res.data));
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
    };

    function request() { console.log("into request"); return { type: stockConstants.GET_STOCK_REQUEST } }
    function success(product) { console.log("into success"); return { type: stockConstants.GET_STOCK_SUCCESS, product } }
    function failure(error) { return { type: stockConstants.GET_STOCK_FAILURE, error } }
}

function addStock(product) {
    return dispatch => {
        dispatch(request(stockConstants.ADD_STOCK_REQUEST))
        stockService.addStock(product)
            .then(
                res => {
                    console.log(res)

                    if (res === undefined) {
                        dispatch(alertActions.error('ارتباط با سرور برقرار نیست.محصول شما ثبت نشد'));
                        dispatch(failure(stockConstants.ADD_STOCK_FAILURE, 'ارتباط با سرور برقرار نیست.محصول شما ثبت نشد'));
                    }
                    else if (res.success) {
                        console.log("stock added")
                        dispatch(success(stockConstants.ADD_STOCK_SUCCESS, product));
                        dispatch(alertActions.success(res.message));
                        //history.go(0)

                    } else if (res.success === false) {
                        dispatch(failure(stockConstants.ADD_STOCK_FAILURE, product));
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
                    dispatch(alertActions.error(stockConstants.ADD_STOCK_FAILURE, error.toString()));
                }
            );
    }

}

function editStock(product) {
    return dispatch => {
        dispatch(request(stockConstants.EDIT_STOCK_REQUEST))
        stockService.editStock(product)
            .then(
                res => {

                    console.log(res)

                    if (res === undefined)
                        dispatch(alertActions.error('ارتباط با سرور برقرار نیست.مجصول شما ویرایش نشد'));
                    else if (res.success) {
                        console.log("stock edited")
                        dispatch(success(stockConstants.EDIT_STOCK_SUCCESS, product));
                        dispatch(alertActions.success(res.message));
                        //history.go(0)
                    } else if (res.success === false)
                        dispatch(alertActions.error(res.message));

                    setTimeout(() => {
                        dispatch(alertActions.clear());
                    }, 1500);
                },
                error => {
                    dispatch(failure(error.toString()));
                    console.log("occure error");
                    console.log(error.toString());
                    dispatch(alertActions.error(stockConstants.EDIT_STOCK_FAILURE, error.toString()));
                }
            );
    }

}



function getExcelProducts() {
    return dispatch => {
        dispatch(request());
        stockService.getExcelProducts()
            .then(
                res => {
                    console.log("Excel Products received")
                    dispatch(success(res));
                },
                error => {
                    dispatch(failure(error.toString()));
                    console.log("occure error");
                    console.log(error.toString());
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { console.log("into request"); return { type: stockConstants.GET_EXCEL_STOCKS_REQUEST } }
    function success(product) { console.log("into success"); return { type: stockConstants.GET_EXCEL_STOCKS_SUCCESS, product } }
    function failure(error) { return { type: stockConstants.GET_EXCEL_STOCKS_FAILURE, error } }
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