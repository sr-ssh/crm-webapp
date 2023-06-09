import React from 'react';
import { history } from './helpers';
import { Redirect, Route, Router, Switch } from 'react-router';

import PrivateRoute from './desktop/Components/PrivateRoute';

// Routes
import { Login } from './desktop/Components/login'
import { Determine } from './desktop/Components/determine'
import { Dashboard } from './desktop/Components/main/dashboard'
import { Factor } from './desktop/Components/order/factor/factor'
import { SuccessfulPayment } from './desktop/Components/payment/successfulPayment'
import { UnSuccessfulPayment } from './desktop/Components/payment/unsuccessfulPayment'




import "react-notification-alert/dist/animate.css";
import 'bootstrap/dist/css/bootstrap.css';
import './desktop/assets/styles/baseStyle.css';
import './desktop/assets/styles/formStyle.css';
import './desktop/assets/styles/dashboardStyle.css'
import './desktop/assets/styles/determineStyle.css'
import './desktop/assets/styles/headerStyle.css'
import './desktop/assets/styles/orderStyle.css'
import './desktop/assets/styles/sideBar.css'
import './desktop/assets/styles/settingStyle.css'
import './desktop/assets/styles/notesStyle.css'
import './desktop/assets/styles/factorStyle.css'
import './desktop/assets/styles/receiptStyle.css'
import './desktop/assets/styles/stockStyle.css'
import './desktop/assets/styles/productStyle.css'
import './desktop/assets/styles/employeeStyle.css'
import './desktop/assets/styles/financeStyle.css'
import './desktop/assets/styles/leadStyle.css'
import './desktop/assets/styles/sellerStyle.css'
import './desktop/assets/styles/supportStyle.css'
import './desktop/assets/styles/reminderStyle.css'
import './desktop/assets/styles/paymentStyle.css'





function AppDesktop() {


    return (
        <>
            <Router history={history}>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route path="/register" component={Determine} />
                    <Route path="/order/factor/:orderId/:keyLink" component={Factor} />
                    <Route path="/payment/successful/:orderId/:keyLink" component={SuccessfulPayment} />
                    <Route path="/payment/unsuccessful/:orderId/:keyLink" component={UnSuccessfulPayment} />
                    <Route path="/" render={(props) => <Dashboard {...props} />} />
                    <Redirect from="*" to="/" />
                </Switch>
            </Router>
        </>
    );
}

export default AppDesktop;