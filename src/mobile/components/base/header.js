import React from 'react';
import { Navbar , Nav } from 'react-bootstrap';

import backIcon from './../../assets/images/back.svg'
import plusIcon from './../../assets/images/Products/pluss.svg'

export const Header = ({title}) => {
    return(
        <>
        <Navbar variant="dark" sticky="top" className="py-2 my-nav" >
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="align-items-center w-100">
                    <Nav.Link className="ms-auto pe-4" href="/product/add"><img src={plusIcon} height="40px" alt="plus-icon"  /></Nav.Link>    
                    <Navbar.Text className="fs-6 text-light">{title}</Navbar.Text>
                    <Nav.Link href="/dashboard" className="me-auto ps-4"><img src={backIcon} height="30px" alt="back-icon" /></Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        </>
    )
}