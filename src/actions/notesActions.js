import { notesConstants } from "../constants";
import { notesService } from "../services";
import { alertActions } from "./alertActions";

export const notesActions = {
  getNotes,
  addNotes,
  editStatusNotes,
};

function getNotes(orderId) {
  return (dispatch) => {
    dispatch(request(notesConstants.GET_NOTES_REQUEST));
    notesService.getNotes(orderId).then(
      (res) => {
        if (res === undefined) {
          dispatch(alertActions.error("ارتباط با سرور برقرار نیست"));
          dispatch(
            failure(
              notesConstants.GET_NOTES_FAILURE,
              "ارتباط با سرور برقرار نیست"
            )
          );
        } else if (res.success) {
          console.log("user into notesActions");
          dispatch(success(notesConstants.GET_NOTES_SUCCESS, [res.data]));
        } else if (res.success === false) {
          console.log("user into notesActions");
          dispatch(failure(notesConstants.GET_NOTES_FAILURE, [res.data]));
        }

        setTimeout(() => {
          dispatch(alertActions.clear());
        }, 1500);
      },
      (error) => {
        dispatch(failure(notesConstants.GET_NOTES_FAILURE, error.toString()));
        console.log("occure error");
        console.log(error.toString());
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
}

function addNotes({ orderId, notes }) {
  return (dispatch) => {
    dispatch(request(notesConstants.ADD_NOTES_REQUEST));

    notesService.addNotes({ orderId, notes }).then(
      (res) => {
        if (res === undefined) {
          dispatch(alertActions.error("ارتباط با سرور برقرار نیست"));
          dispatch(
            failure(
              notesConstants.ADD_NOTES_FAILURE,
              "ارتباط با سرور برقرار نیست"
            )
          );
        } else if (res.success) {
          console.log("user into notesActions");
          dispatch(success(notesConstants.ADD_NOTES_SUCCESS, res));
        } else if (res.success === false) {
          console.log("user into notesActions");
          dispatch(alertActions.error(res.message.toString()));
          dispatch(failure(notesConstants.ADD_NOTES_FAILURE, res));
        }
      },
      (error) => {
        dispatch(failure(notesConstants.ADD_NOTES_FAILURE, error.toString()));
        console.log("occure error");
        console.log(error.toString());
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
}

function editStatusNotes(orderId, status) {
  return (dispatch) => {
    dispatch(request(notesConstants.EDIT_NOTES_STATUS_REQUEST));

    notesService.editStatusNotes(orderId, status).then(
      (res) => {
        if (res === undefined) {
          dispatch(alertActions.error("ارتباط با سرور برقرار نیست"));
          dispatch(
            failure(
              notesConstants.EDIT_NOTES_STATUS_FAILURE,
              "ارتباط با سرور برقرار نیست"
            )
          );
        } else if (res.success) {
          console.log("user into notesActions");
          dispatch(success(notesConstants.EDIT_NOTES_STATUS_SUCCESS, res.data));
        } else if (res.success === false) {
          console.log("user into notesActions");
          dispatch(failure(notesConstants.EDIT_NOTES_STATUS_FAILURE, res.data));
        }

        setTimeout(() => {
          dispatch(alertActions.clear());
        }, 1500);
      },
      (error) => {
        dispatch(
          failure(notesConstants.EDIT_NOTES_STATUS_FAILURE, error.toString())
        );
        console.log("occure error");
        console.log(error.toString());
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
}

function request(type) {
  return { type: type };
}

function success(type, data) {
  return { type: type, data };
}

function failure(type, error) {
  return { type: type, error };
}
