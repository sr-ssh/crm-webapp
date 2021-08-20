import React from 'react';
import { Navbar, Nav, Col, Row } from 'react-bootstrap';

import backIcon from './../../assets/images/back.svg'
import { history } from '../../../helpers'

export const Header = ({ title, setState }) => {

    let handleClick = (e) => {
        e.preventDefault()
        return title === 'تنظیمات' ? history.push('./.dashboard') : setState('تنظیمات')
    }

    return (
        <>
            <Navbar variant="dark" sticky="top" className="py-2 my-nav" >
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="align-items-center justify-content-center w-100">
                        <Navbar.Text className="fs-6 header-title text-light">{title}</Navbar.Text>
                        <Nav.Link onClick={(e) => handleClick(e)} className="p-2 me-auto"><img src={backIcon} className="me-auto d-block" height="30px" alt="back-icon" /></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}