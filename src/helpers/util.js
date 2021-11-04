
import { userActions } from '../actions';

export function handleError(code) {
    console.log("handle error, code: "); console.log(code);
    if (code == 401 || code === 403 || code === 402) {
        userActions.logout();
        window.location.reload(true);
    }
}

export function handleResponse(response) {
    console.log("((((((((((((((((((((( handleResponse )))))))))))))))))))");
    if (response.status === 200) {
        if (response.data.success) {
            return response.data;
        }
        console.log("success: false", response);
        return response.data
    }
    console.log("errrrroooooorrrrr");
    return { error: "true" }
    // const error = (result && result.message) || response.statusText;
    // return Promise.reject(error);
    // return response;
}


export function camelCase(str) {
    return str.substring(0, 1).toUpperCase() + str.substring(1);
};

