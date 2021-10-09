import React from 'react';
import { Navbar, Nav, Col } from 'react-bootstrap';
import { history } from '../../../helpers/history'

import backIcon from './../../assets/images/back.svg'
import searchIcon from './../../assets/images/search-dark-blue.svg'
import excelIcon from './../../assets/images/excel.svg'

export const Header = ({ title, getExcel, setModalShow, userPermission }) => {

    let userType = JSON.parse(localStorage.getItem('type'));

    return (
        <>
            <Navbar variant="dark" sticky="top" className="py-2 my-nav noPrint" >
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="align-items-center w-100 d-flex justify-content-between">
                        <Col className="d-flex flex-grow-0 ">

                            <Nav.Link className="pe-3 p-0 d-flex justify-content-center align-items-center " onClick={() => setModalShow(true)}><img src={searchIcon} height="36px" alt="plus-icon" className="noPrint" /></Nav.Link>
                            {(userType == 2 && !userPermission) ? null :
                                <Nav.Link className="ps-0" onClick={() => getExcel()}><img src={excelIcon} height="28px" alt="plus-icon" className="noPrint" /></Nav.Link>
                            }
                        </Col>

                        <Navbar.Text className="fs-6 fw-normal text-light noPrint">{title}</Navbar.Text>
                        <Nav.Link onClick={() => history.push('/dashboard')} className=" ps-4"><img src={backIcon} height="28px" alt="back-icon" /></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}