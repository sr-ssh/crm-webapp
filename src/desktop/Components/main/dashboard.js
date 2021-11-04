import React, { useEffect, useRef, useState } from 'react';
import { Redirect, Switch } from "react-router-dom";
import { useDispatch } from 'react-redux';

import PrivateRoute from '../PrivateRoute';
import NotificationAlert from "react-notification-alert";
import { useSelector } from 'react-redux';

// Actions
import { userActions } from '../../../actions'


// Routes
import { Main } from './main'
import { AddOrder } from '../order/addOrder'
import { SaleOpprotunity } from '../order/saleOpprotunity';
import { Orders } from '../order/orders';
import { Reminders } from '../reminder/reminders';
import { Products } from '../products/products';
import { Finance } from '../finance/finance';
import { Customers } from '../customers/customers';
import { Employees } from '../employee/employees';
import Bills from '../finance/bills';
import { Applications } from '../employee/applications';
import { Account } from '../acounts/account';
import { Setting } from '../setting/setting'
import { AddFactor } from '../factor/addFactor';
import { Factors } from '../factor/factors';
import { Suppliers } from '../suppliers/suppliers';
import { Stock } from '../stock/stock';
import { Leads } from '../leads/leads';
import { socket } from '../../../helpers/socketIo';

// Componens 
import { NotificationCallIncoming } from '../notificationView/notifCallIncoming'

export const Dashboard = (props) => {


    const dispatch = useDispatch()
    let alert = useSelector(state => state.alert);

    const mainPanel = useRef(null);
    const notificationAlertRef = useRef(null);
    const [incomCall , setIncomCall] = useState(false);
    const [incomCallMessage , setIncomCallMessage] = useState({});


    

    useEffect(() => {
        let options = {};
        options = {
            place: "tl",
            message: (
                <div>
                    <div>
                        {alert.message}
                    </div>
                </div>
            ),
            zIndex: 9999,
            type: alert.type,
            closeButton: false,
            autoDismiss: 5
        };
        if (alert.message?.length > 0 && alert.message && alert.type)
            notificationAlertRef.current.notificationAlert(options);
    }, [alert]);




    useEffect(() => {

        socket.on("connect", data => {
            console.log("_________________connect_________________", socket.id)
            console.log(data)
            console.log(socket)
        }); 

        socket.on("push", data => {
            setIncomCall(true)
            setIncomCallMessage(data.message)
            console.log("pushhhhhhhhhhhh", data.message)
            console.log("pushhhhhhhhhhhh", data)
        
        }); 

    }, [])

    useEffect(() => {
        dispatch(userActions.appInfo());
    }, [])

    console.log(1)



    return (
        <>
            <NotificationCallIncoming
            incomCall={incomCall}
            setIncomCall={setIncomCall}
            incomCallMessage={incomCallMessage}
            setIncomCallMessage={setIncomCallMessage}
            />
            <div className="wrapper">
                <div className="content">
                    <NotificationAlert ref={notificationAlertRef} />
                    <Switch>
                        <PrivateRoute path="/dashboard" component={Main} ></PrivateRoute>
                        <PrivateRoute path="/order/add" component={AddOrder} ></PrivateRoute>
                        <PrivateRoute path="/saleopprotunity" component={SaleOpprotunity} ></PrivateRoute>
                        <PrivateRoute path="/orders" component={Orders}></PrivateRoute>
                        <PrivateRoute path="/reminders" component={Reminders} ></PrivateRoute>
                        <PrivateRoute path="/products" component={Products}></PrivateRoute>
                        <PrivateRoute exact path="/finance" component={Finance}></PrivateRoute>
                        <PrivateRoute path="/finance/bills" component={Bills} ></PrivateRoute>
                        <PrivateRoute path="/customers" component={Customers} ></PrivateRoute>
                        <PrivateRoute exact path="/employees" component={Employees} ></PrivateRoute>
                        <PrivateRoute path="/employees/add" component={Applications} ></PrivateRoute>
                        {/* <PrivateRoute path="/discounts" component={Discounts} ></PrivateRoute> */}
                        <PrivateRoute path="/account" component={Account} ></PrivateRoute>
                        <PrivateRoute path="/setting" component={Setting} ></PrivateRoute>
                        <PrivateRoute path="/factor/add" component={AddFactor} ></PrivateRoute>
                        <PrivateRoute path="/factor" component={Factors} ></PrivateRoute>
                        <PrivateRoute path="/needs" component={AddOrder} ></PrivateRoute>
                        <PrivateRoute path="/suppliers" component={Suppliers} ></PrivateRoute>
                        <PrivateRoute path="/stock" component={Stock} ></PrivateRoute>
                        <PrivateRoute path="/lead" component={Leads} ></PrivateRoute>

                        <Redirect from="*" to="/" />
                    </Switch >
                </div >
            </div >

        </>
    )
}
