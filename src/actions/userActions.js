import { userConstants } from '../constants';
import { userService } from '../services';
import { history } from '../helpers';
import { alertActions } from './alertActions';

export const userActions = {
    login,
    register,
    appInfo,
    logout,
    verificationCode,
    getUserInfo,
    editEmployerAccount,
    editAccount
};


function login(mobileOrEmail, password) {
    return dispatch => {
        dispatch(request({ mobileOrEmail }));

        userService.login(mobileOrEmail, password)
            .then(
                user => {
                    console.log("user into userAction");

                    if (user === undefined) {
                        dispatch(alertActions.error('ارتباط با سرور برقرار نیست'));
                        dispatch(failure("ارتباط با سرور برقرار نیست"))
                    }
                    else if (user.success) {
                        console.log("user entered")
                        dispatch(success(user));
                        // dispatch(alertActions.success(user.message));
                        // history.push('/dashboard');
                        history.replace('/dashboard')
                    } else if (user.success === false) {
                        dispatch(alertActions.error(user.message));
                        dispatch(failure(user.message))
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

    function request(user) { console.log("into request"); return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { console.log("into success"); return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function appInfo() {
    return dispatch => {
        userService.appInfo()
            .then(
                res => {
                    console.log("user entered")
                    console.log(res)
                    dispatch(alertActions.success(res));
                },
                error => {
                    console.log("occure error");
                    console.log(error.toString());
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

}

function register(user) {
    return dispatch => {
        dispatch(request({ user }));

        userService.register(user)
            .then(
                user => {
                    console.log("user into userAction");
                    console.log(user)

                    if (user === undefined) {
                        dispatch(alertActions.error('ثبت نام با موفقیت انجام نشد. ارتباط با سرور برقرار نیست'));
                        dispatch(failure('ثبت نام با موفقیت انجام نشد. ارتباط با سرور برقرار نیست'))
                    }
                    else if (user.success) {
                        console.log("user registered")
                        localStorage.setItem('user', JSON.stringify(user.data));
                        dispatch(success(user));
                        dispatch(alertActions.success(user.message));
                        setTimeout(() => {
                            history.push('/home');
                        }, 1500);

                    } else if (user.success === false) {
                        dispatch(alertActions.error(user.message));
                        dispatch(failure(user.message))
                    } else {
                        dispatch(alertActions.error("مشکلی وجود دارد"));
                        dispatch(failure("مشکلی وجود دارد"))
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

    function request(user) { console.log("into request"); return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { console.log("into success"); return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function verificationCode(mobile) {
    return dispatch => {
        dispatch(request(mobile));
        userService.verificationCode(mobile)
            .then(
                res => {
                    console.log("user into userAction");
                    console.log(res)
                    if (res === undefined) {
                        dispatch(alertActions.error('ارتباط با سرور برقرار نیست'));
                        dispatch(failure('ارتباط با سرور برقرار نیست'))
                    }
                    else if (res.success) {
                        console.log("verification code sent")
                        dispatch(success(res));
                        dispatch(alertActions.success(res.message));
                    } else if (res.success === false) {
                        dispatch(alertActions.error(res.message));
                        dispatch(failure(res.message))
                    } else {
                        dispatch(alertActions.error("مشکلی وجود دارد"));
                        dispatch(failure("مشکلی وجود دارد"))
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

    function request(mobile) { console.log("into request"); return { type: userConstants.VERIFICATION_CODE_REQUEST, mobile } }
    function success(mobile) { console.log("into success"); return { type: userConstants.VERIFICATION_CODE_SUCCESS, mobile } }
    function failure(error) { return { type: userConstants.VERIFICATION_CODE_FAILURE, error } }
}

function getUserInfo() {
    return dispatch => {
        dispatch(request())
        userService.userInfo()
            .then(
                res => {
                    console.log('user into userActions')
                    console.log(res)
                    if (res === undefined) {
                        dispatch(alertActions.error('ارتباط با سرور برقرار نیست'));
                        dispatch(failure('ارتباط با سرور برقرار نیست'))
                    }
                    else if (res.success) {
                        console.log("user info received")
                        dispatch(success(res.data));
                    } else if (res.success === false) {
                        dispatch(failure(res.message))
                    } else {
                        dispatch(failure("مشکلی وجود دارد"))
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
            )
    }

    function request() { console.log("into request"); return { type: userConstants.USER_INFO_REQUEST } }
    function success(user) { console.log("into success"); return { type: userConstants.USER_INFO_SUCCESS, user } }
    function failure(error) { console.log("into failure"); return { type: userConstants.USER_INFO_FAILURE, error } }
}


function editEmployerAccount(user) {
    return dispatch => {
        dispatch(request())
        userService.editEmployerAccount(user)
            .then(
                res => {
                    console.log('user into userActions')
                    console.log(res)
                    if (res === undefined) {
                        dispatch(alertActions.error('ارتباط با سرور برقرار نیست'));
                        dispatch(failure('ارتباط با سرور برقرار نیست'))
                    }
                    else if (res.success) {
                        console.log("user info received")
                        dispatch(success(res.data));
                        dispatch(alertActions.success(res.message));
                    } else if (res.success === false) {
                        dispatch(failure(res.message))
                    } else {
                        dispatch(failure("مشکلی وجود دارد"))
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
            )
    }

    function request() { console.log("into request"); return { type: userConstants.EDIT_USER_INFO_REQUEST } }
    function success(user) { console.log("into success"); return { type: userConstants.EDIT_USER_INFO_SUCCESS, user } }
    function failure(error) { console.log("into failure"); return { type: userConstants.EDIT_USER_INFO_FAILURE, error } }
}


function editAccount(user) {
    return dispatch => {
        dispatch(request())
        userService.editAccount(user)
            .then(
                res => {
                    console.log('user into userActions')
                    console.log(res)
                    if (res === undefined) {
                        dispatch(alertActions.error('ارتباط با سرور برقرار نیست'));
                        dispatch(failure('ارتباط با سرور برقرار نیست'))
                    }
                    else if (res.success) {
                        console.log("user info received")
                        dispatch(success(res.data));
                        dispatch(alertActions.success(res.message));
                    } else if (res.success === false) {
                        dispatch(failure(res.message))
                    } else {
                        dispatch(failure("مشکلی وجود دارد"))
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
            )
    }

    function request() { console.log("into request"); return { type: userConstants.EDIT_USER_INFO_REQUEST } }
    function success(user) { console.log("into success"); return { type: userConstants.EDIT_USER_INFO_SUCCESS, user } }
    function failure(error) { console.log("into failure"); return { type: userConstants.EDIT_USER_INFO_FAILURE, error } }
}


function logout() {
    // remove user from local storage to log user out
    localStorage.clear()
    history.push('/')
}
