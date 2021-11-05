import { sellerConstants } from "../constants";
import { sellerService } from "../services";
import { alertActions } from "./alertActions";

export const sellerActions = {
  addSeller,
};

function request(type) {
  return { type: type };
}

function success(type, data) {
  return { type: type, data };
}

function failure(type, error) {
  return { type: type, error };
}

function clear(type) {
  return { type: type };
}

function addSeller(params) {
  return (dispatch) => {
    dispatch(request(sellerConstants.ADD_SELLER_REQUEST));
    sellerService.addSeller(params).then(
      (res) => {
        debugger;
        if (res === undefined) {
          dispatch(
            failure(
              sellerConstants.ADD_SELLER_FAILURE,
              "ارتباط با سرور برقرار نیست"
            )
          );
          dispatch(alertActions.error("ارتباط با سرور برقرار نیست"));
        } else if (res.success) {
          console.log("seller added");
          dispatch(success(sellerConstants.ADD_SELLER_SUCCESS, res.data));
          dispatch(alertActions.success(res.data.message));
        } else if (res.success == false) {
          console.log("seller didn't added");
          dispatch(
            failure(
              sellerConstants.ADD_SELLER_FAILURE,
              res.data.message.toString()
            )
          );
          dispatch(alertActions.error(res.data.message));
        }

        setTimeout(() => {
          dispatch(alertActions.clear());
        }, 1500);
      },
      (error) => {
        console.log("occure error");
        console.log(error.toString());
        dispatch(failure(sellerConstants.ADD_SELLER_FAILURE, error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
}
