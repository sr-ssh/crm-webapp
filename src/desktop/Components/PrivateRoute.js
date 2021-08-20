import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isPermitted } from '../../helpers/permission';


function PrivateRoute({ component: Component, roles, ...rest }) {
    return (
        <Route {...rest} render={props => {
            let user = JSON.parse(localStorage.getItem('user'));
            if (!(user && user.idToken) || !isPermitted(props.location.pathname)) {
                // not logged in so redirect to login page with the return url
                return <Redirect to={{ pathname: '/', state: { from: props.location } }} />
            }
            // logged in so return component
            return <Component {...props} />
        }} />
    );
}

export default PrivateRoute;