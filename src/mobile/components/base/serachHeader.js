import React from 'react';
import { Navbar , Nav } from 'react-bootstrap';
import { history } from '../../../helpers/history'

import backIcon from './../../assets/images/back.svg'
import searchIcon from './../../assets/images/search.svg'

export const Header = ({title, modalShow, setModalShow}) => {
    return(
        <>
        <Navbar variant="dark" sticky="top" className="py-2 my-nav noPrint" >
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="align-items-center w-100">
                    <Nav.Link className="ms-auto pe-4" onClick={() => setModalShow(true)}><img src={searchIcon} height="40px" alt="plus-icon" className="noPrint" /></Nav.Link>    
                    <Navbar.Text className="fs-6 fw-normal text-light noPrint">{title}</Navbar.Text>
                    <Nav.Link onClick={() => history.push('/dashboard')} className="me-auto ps-4"><img src={backIcon} height="30px" alt="back-icon" /></Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        </>
    )
}