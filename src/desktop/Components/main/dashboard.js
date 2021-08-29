import React, { useEffect, useRef, useState } from 'react';
import { Redirect, Switch } from "react-router-dom";
import { useDispatch } from 'react-redux';

import { Container, Row, Nav, Navbar, Dropdown, Form, Col, FormControl, Image } from 'react-bootstrap';
import PrivateRoute from '../PrivateRoute';
import NotificationAlert from "react-notification-alert";
import { useSelector } from 'react-redux';
import { Typography, Breadcrumbs, Link, Button, Backdrop } from '@material-ui/core';


// Actions
import { employeeActions } from '../../../actions/employeeActions';
import { userActions } from '../../../actions/userActions'


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
import { Discounts } from '../discounts/discounts';
import Bills from '../finance/bills';
import { Applications } from '../employee/applications';
import { Account } from '../acounts/account';
import { Setting } from '../setting/setting'


// Components
import { SideBar } from './sideBar'
import routes from "../../routes";
import { Header } from '../base/header'
// Icons 


export const Dashboard = (props) => {


    const dispatch = useDispatch()
    let alert = useSelector(state => state.alert);

    const mainPanel = useRef(null);
    const notificationAlertRef = useRef(null);

    useEffect(() => {
        dispatch(employeeActions.getPermissions())
        dispatch(userActions.getUserInfo())
    }, [dispatch])

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

    let breadcrumbs = routes.filter(item => props.location.pathname.includes(item.path))

    return (
        <>
            <div className="wrapper">
                <Header history={props} />
                <div className="sidebar--desktop">
                    <SideBar routes={routes} />
                </div>
                <div className="content">
                    <NotificationAlert ref={notificationAlertRef} />
                    {breadcrumbs[0]?.path !== "/dashboard" ?
                        <Container className="mt-3 mx-4 px-4 mb-4 d-flex flex-row justify-content-between align-content-between">
                            <Row>
                                <Row>
                                    <Col>
                                        <Typography variant="h5" color="textPrimary" className="fw-bold ff-iranSans" paragraph>{breadcrumbs[0]?.name}</Typography>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Breadcrumbs aria-label="breadcrumb" >
                                            <Link color="inherit" href="/" className="ff-iranSans" underline="none" >
                                                خانه
                                            </Link>
                                            <Typography color="textPrimary" className="ff-iranSans">{breadcrumbs[0]?.name}</Typography>
                                            {
                                                breadcrumbs[0]?.children?.length > 0 ?
                                                    breadcrumbs[0]?.children.map(item => {
                                                        if (item.path === props.location.pathname)
                                                            return <Typography color="textPrimary" className="ff-iranSans">{item.name}</Typography>
                                                    })
                                                    : null
                                            }
                                        </Breadcrumbs>
                                    </Col>
                                </Row>
                            </Row>
                        </Container>
                        : null
                    }
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
                        <PrivateRoute path="/employees" component={Employees} ></PrivateRoute>
                        {/* <PrivateRoute path="/employee/add" component={Applications} ></PrivateRoute> */}
                        {/* <PrivateRoute path="/discounts" component={Discounts} ></PrivateRoute> */}
                        <PrivateRoute path="/account" component={Account} ></PrivateRoute>
                        <PrivateRoute path="/setting" component={Setting} ></PrivateRoute>
                        <Redirect from="*" to="/" />
                    </Switch>
                </div>
            </div>

        </>
    )
}
