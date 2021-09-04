import React from 'react';
import { history } from './helpers';
import { Redirect, Route, Router, Switch } from 'react-router';

import PrivateRoute from './desktop/Components/PrivateRoute';

// Routes
import { Login } from './desktop/Components/login'
import { Determine } from './desktop/Components/determine'
import { Dashboard } from './desktop/Components/main/dashboard'




import "react-notification-alert/dist/animate.css";
import 'bootstrap/dist/css/bootstrap.css';
import './desktop/assets/styles/baseStyle.css';
import './desktop/assets/styles/formStyle.css';
import './desktop/assets/styles/dashboardStyle.css'
import './desktop/assets/styles/determineStyle.css'
import './desktop/assets/styles/headerStyle.css'
import './desktop/assets/styles/orderStyle.css'
import './desktop/assets/styles/sideBar.css'







function AppDesktop() {


    return (
        <>
            <Router history={history}>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route path="/register" component={Determine} />
                    <Route path="/" render={(props) => <Dashboard {...props} />} />
                    <Redirect from="*" to="/" />
                </Switch>
            </Router>
        </>
    );
}

export default AppDesktop;