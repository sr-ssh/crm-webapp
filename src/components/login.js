import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../actions/userActions';

import { Spinner } from 'react-bootstrap'

//css
import logo from './../assets/images/crm.svg'
import userLogo from './../assets/images/user.svg'
import passwordLogo from './../assets/images/password.svg'
import { Container, Button, Form, Row, Col, Image, Alert } from 'react-bootstrap';
import persianJs from 'persianjs/persian.min';



export const Login = () => {

    let alertMessage = useSelector(state => state.alert.message)
    let alerType = useSelector(state => state.alert.type)
    let loggingInLoading = useSelector(state => state.authentication.loading)

    const [validated, setValidated] = useState(false);
    const [inputs, setInputs] = useState({ username: '', password: '' });
    const { mobileOrEmail, password } = inputs;
    const dispatch = useDispatch()

    const handleChange = (e) => {
        let { id, value } = e.target;
        if(id === "mobileOrEmail" && value)
            value = persianJs(value).toEnglishNumber().toString();
        setInputs(inputs => ({ ...inputs, [id]: value }));
    }

    const formHandeler = e => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        }
        
        setValidated(true);
        mobileOrEmail && password && dispatch(userActions.login(mobileOrEmail, password));
    }

    useEffect(() => {
        dispatch(userActions.appInfo())
    }, [dispatch])

    return (
        <div className="order-page">
            <div id="triangle-up"></div>
            <Container fluid className="p-0 d-flex flex-column">
                {
                alertMessage && 
                <>
                <div className="modal-backdrop show"></div>
                    <Row className="justify-content-center text-center ">
                        <Alert variant={alerType}>
                            {alertMessage}
                        </Alert> 
                    </Row>
                </>
                }
                <Row className="p-0 m-0 mzLogo">
                    <Col className="">
                        <img className="logo" src={logo} alt="logo" width="160px"/>
                    </Col>
                </Row>
                <Row className="ms-0 loginForm">
                    <Col>
                        <Form className="d-flex flex-column justify-content-center" noValidate validated={validated} onSubmit={formHandeler} >
                            <Row className="w-100 me-2 pe-2 order-inputs ">
                                <Col >
                                    <Form.Group controlId="mobileOrEmail" >
                                        <Image src={userLogo} width="17px" className="mx-2"/>
                                        <Form.Label>ایمیل / موبایل</Form.Label>
                                        <Form.Control className="order-input login-input" type="text" onChange={handleChange}  required/>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row className="w-100 me-2 mt-4 pe-2 order-inputs ">
                                <Col>
                                    <Form.Group controlId="password">
                                        <Image src={passwordLogo} width="17px" className="mx-2"/>
                                        <Form.Label>رمز عبور</Form.Label>
                                        <Form.Control className="order-input login-input" type="password" onChange={handleChange}  required/>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="w-100 me-1">
                                <Col className="mt-4 register-link">
                                    <a href="/register">ثبت نام نکرده اید؟</a>
                                </Col>
                            </Row>
                            <Row className="registerSubmitContainer">
                                <Col xs={7} className="me-auto ms-4">
                                    <Button className="form-submit w-100 me-auto d-block" type="submit" >{loggingInLoading ? <Spinner animation="border" /> : "ورود"}</Button>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Container>
            
            <div id="triangle-down"></div>
        </div>
    )
}

