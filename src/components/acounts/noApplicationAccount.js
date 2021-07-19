import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { orderActions, customerActions  } from '../../actions';
import { Container , Form , Button , Row , Col, Alert, Spinner, Card } from 'react-bootstrap';
import moment from 'jalali-moment';
import "react-multi-date-picker/styles/layouts/mobile.css"
import persianJs from 'persianjs/persian.min';
import { history } from '../../helpers';

//icons
import editIcon from '../../assets/images/Products/edit.svg'
import cancelIcon from '../../assets/images/Products/pluss.svg';
import plusIcon from './../../assets/images/main/plus-employer.svg'


//components
import { EditField } from './editField.js'
import { AddEmployer } from '../main/addEmployer';


export const NoApplicationAccount = ({user}) => {

    const [editModalShow, setEditModalShow] = useState(false)
    const [input, setInput] = useState('')
    const [name, setName] = useState('')
    const [modalShow, setModalShow] = useState(false)


    const edit = (value, name) => {
        setInput(value)
        setName(name)
        setEditModalShow(true); 
        console.log(input)
    }

    return (
        <>
        {user && console.log(user.employer)}
        <Card.Text className="pt-1 pe-3">
            <Row className="ms-0 align-items-center">
                <Col xs={3}>
                    نام : 
                </Col>
                <Col className="pe-0">
                    <span className="fw-bold">{user.family && persianJs(user.family).englishNumber().toString()}</span>
                </Col>
                <Col className="text-start my-0" onClick={() => edit(user.family, 'family')}>
                    <img className="" src={editIcon} height="34px" alt="edit-icon" />
                </Col>
            </Row>
        </Card.Text>

        <Card.Text className="pt-1 pe-3">
            <Row className="ms-0 align-items-center">
                <Col xs={3}>
                    موبایل :        
                </Col>
                <Col className="pe-0">
                    <span className="fw-bold">{user.mobile && persianJs(user.mobile).englishNumber().toString()}</span>
                </Col>
            </Row>
        </Card.Text>

        <Card.Text className="pt-1 pe-3">
            <Row className="ms-0 align-items-center">
                <Col xs={3}>
                    ایمیل :  
                </Col>
                <Col className="pe-0">
                    <span className="fw-bold">{user.email}</span>
                </Col>
            </Row>
        </Card.Text>

        
        <Card.Text className="pt-1 pe-3">
            <Row className="ms-0 align-items-center">
                <Col xs={3}>
                    آدرس : 
                </Col>
                <Col xs={6} className="pe-0">
                    <span className="fw-bold">{user.address && persianJs(user.address).englishNumber().toString()}</span>
                </Col>
                <Col className="text-start my-0" onClick={() => {edit(user.address, 'address')}}>
                    <img className="" src={editIcon} height="34px" alt="edit-icon" />
                </Col>
            </Row>
        </Card.Text>

        <Card.Text className="pt-1 pe-3">
            <Row className="ms-0 align-items-center">
                <Col xs={3}>
                    نوع : 
                </Col>
                <Col className="pe-0">
                    <span className="fw-bold">کارمند</span>
                </Col>
            </Row>
            
        </Card.Text>
        <Row className="my-2 mt-4 pe-0 justify-content-center">
            <Col xs={11} className="pe-0 mt-3">
                <Button  className="no-product-main-button w-100 me-auto d-block p-2 px-0"  type="submit"  onClick={e  => setModalShow(true)}>
                    <Row>
                        <Col xs={3} className="ms-0 me-4 pe-4"><img src={plusIcon} alt="add-order-icon"  width="30px"/></Col>
                        <Col className="fs-6 me-0 text-end pt-1 pe-2">ارسال درخواست</Col>
                    </Row>
                </Button>
            </Col>
        </Row>
        <AddEmployer show={modalShow} onHide={() => setModalShow(false)} />   
        
        <EditField show={editModalShow} onHide={() => {setEditModalShow(false); setInput(''); history.go(0)}} input={input} name={name} />
        </>
    )
}
