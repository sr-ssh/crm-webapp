import React from 'react';
import { Row, Col, Card, Nav } from 'react-bootstrap';
import { useLocation, NavLink } from "react-router-dom";
import { SideBarItem } from './sideBarItem'
import { List, Typography, Link } from '@material-ui/core';
import { useDispatch } from 'react-redux';




// Actions
import { userActions, sideBarActions } from '../../../actions'

// Icons
import logo from '../../assets/images/crm.svg'
import exitIcon from '../../assets/images/drawer/exit.svg'
import accountIcon from '../../assets/images/drawer/account.svg'
import settingIcon from '../../assets/images/drawer/setting.svg'
import closeSideBarIcon from '../../assets/images/close-menu.svg'




export const SideBar = ({ routes,setShowLogout }) => {

    const location = useLocation();
    let user_type = JSON.parse(localStorage.getItem('type'));
    const dispatch = useDispatch()


    return (
        <>
            <div className="sidebar noPrint">

                <Row className="m-0 p-0 py-3 d-flex flex-row logo--sidebar--desktop">
                    <Col className="d-flex justify-content-center">
                        <img className=" noPrint" height="50px" src={logo} alt="crmx-logo" />
                    </Col>
                    <Col className=" ps-0 d-flex justify-content-end">
                        <img height="50px" className="noPrint" src={closeSideBarIcon} alt="icon-close-menu" onClick={() => dispatch(sideBarActions.sideBar(2))} />
                    </Col>
                </Row>
                <List
                    style={{ marginTop: "75px", marginBottom: "60px" }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    className="flex-column "
                >
                    {routes.map((prop, key) => {
                        return (
                            <SideBarItem key={key} route={prop} />
                        );
                    })}

                </List>
                <Row className="m-0 p-0 d-flex justify-content-center align-items-center mt-auto dashboardIcons--desktop noPrint">
                    <Col className=" col-4">
                        <Col onClick={e => setShowLogout(true)}>
                            <img className="m-auto d-block exit--icon--desktop noPrint" src={exitIcon} height="40px" alt="exit-icon" />
                        </Col>
                    </Col>
                    {
                        user_type === 1 &&
                        <Col className=" col-4">
                            <NavLink to="/setting"><img className="m-auto d-block noPrint" src={settingIcon} height="40px" alt="setting-icon" /></NavLink>
                        </Col>
                    }
                    <Col xs={4} sm={4} md={4} lg={4} className=" col-4">
                        <NavLink to="/account"><img className="m-auto d-block noPrint" src={accountIcon} height="40px" alt="acount-icon" /></NavLink>
                    </Col>
                </Row>


            </div>


        </>
    )
}