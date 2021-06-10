import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ component:Component, ...rest }) {
    return (
        <Route {...rest} render={props => {
            if (!JSON.parse(localStorage.getItem('user'))) {
                // not logged in so redirect to login page with the return url
                return <Redirect to={{ pathname: '/', state: { from: props.location } }} />
            }
            // logged in so return component
            return <Component {...props} />
        }} />
    );
}

export default  PrivateRoute ;