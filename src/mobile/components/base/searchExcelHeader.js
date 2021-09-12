import React from 'react';
import { Navbar , Nav } from 'react-bootstrap';

import backIcon from './../../assets/images/back.svg'
import searchIcon from './../../assets/images/search-dark-blue.svg'
import excelIcon from './../../assets/images/excel.svg'

export const Header = ({title, getExcel, setModalShow}) => {
    return(
        <>
        <Navbar variant="dark" sticky="top" className="py-2 my-nav noPrint" >
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="align-items-center w-100">
                    <Nav.Link className="pe-3 p-0" onClick={() => setModalShow(true)}><img src={searchIcon} height="36px" alt="plus-icon" className="noPrint" /></Nav.Link> 
                    <Nav.Link className="pe-3 ms-3" onClick={() => getExcel()}><img src={excelIcon} height="28px" alt="plus-icon" className="noPrint" /></Nav.Link>   
                    <Navbar.Text className="me-4 fs-6 fw-normal text-light noPrint">{title}</Navbar.Text>
                    <Nav.Link href="/dashboard" className="me-auto ps-4"><img src={backIcon} height="28px" alt="back-icon" /></Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        </>
    )
}