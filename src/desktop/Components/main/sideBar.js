import React from 'react';
import { Row, Col, Card, Nav } from 'react-bootstrap';
import { useLocation, NavLink } from "react-router-dom";
import { SideBarItem } from './sideBarItem'
import { List, Typography, Link } from '@material-ui/core';



// Icons
import logo from '../../assets/images/crm.svg'
import userAvatar from '../../assets/images/user-avatar.jpg'



export const SideBar = ({ routes }) => {

    const location = useLocation();

    return (
        <>
            <div className="sidebar">

                <Row className="m-0 p-0 mt-3 mb-3 d-flex flex-column">
                    <Col className="">
                        <img className="" height="50px" src={logo} alt="" />
                    </Col>
                    <Col className="mt-4 pt-1">
                        <NavLink to="/account" className="nav-link fw-bold text-light">
                            <Card className="card--rounded">
                                <Card.Body className="card--account-info--sidebar px-3 py-3">
                                    <Col className="col-2 img--card--account--info ">
                                        <img className="" height="50px" src={userAvatar} alt="" />
                                    </Col>
                                    <Col className="d-flex flex-column me-2 fs-7 ">
                                        <span className="text-decoration-none">محمد جواد حیدری</span>
                                        <span className="text-decoration-none">مدیر</span>
                                    </Col>
                                </Card.Body>
                            </Card>
                        </NavLink>
                    </Col>
                </Row>
                <List
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    className="flex-column mt-4"
                >
                    {routes.map((prop, key) => {
                        return (
                            <SideBarItem key={key} route={prop} />
                        );
                    })}

                </List>



            </div>


        </>
    )
}