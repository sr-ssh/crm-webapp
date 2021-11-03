import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col, Spinner, Image } from 'react-bootstrap';
import persianJs from 'persianjs/persian.min';
import NotificationAlert from "react-notification-alert";

// Actions
import { userActions } from '../../actions/userActions';
// Icons
import logo from './../assets/images/crm.svg'
import userLogo from './../assets/images/user.svg'
import passwordLogo from './../assets/images/password.svg'
import notSeenIcon from '../assets/images/Not-seen.svg'
import beSeenIcon from '../assets/images/be-seen.svg'


export const Login = (props) => {

    let alertMessage = useSelector(state => state.alert.message)
    let alerType = useSelector(state => state.alert.type)
    let loggingInLoading = useSelector(state => state.authentication.loading)
    let alert = useSelector(state => state.alert);
    let isUserEntered = localStorage.getItem("user")
    const notificationAlertRef = useRef(null);

    const [showPassword, setShowPassword] = useState(false)
    const [validated, setValidated] = useState(false);
    const [inputs, setInputs] = useState({ password: '' });
    const { mobileOrEmail, password } = inputs;
    const dispatch = useDispatch()


    const usernameHandler = (value) => {
        let res = value.length > 4
        if (res)
            return value
        else
            return false
    }
    const handleChange = (e) => {
        let { id, value } = e.target;
        if (id === "mobileOrEmail" && value) {
            value = persianJs(value).toEnglishNumber().toString();
            value = usernameHandler(value)
        }
        if (id === "password" && value)
            value = persianJs(value).toEnglishNumber().toString();

        setInputs(inputs => ({ ...inputs, [id]: value }));
    }

    const formHandeler = e => {
        e.preventDefault();

        if (mobileOrEmail && password)
            dispatch(userActions.login(mobileOrEmail, password));
        else
            setValidated(true);
    }


    useEffect(() => {
        if(isUserEntered !== null ){props.history.push('/dashboard'); return }
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

    return (

        <div className="login--page">
            <div className="alert--container">
                <NotificationAlert ref={notificationAlertRef} />
            </div>
            <Row className="headerLogin">
                <Col>
                    <img className="" height="60px" src={logo} alt="" />
                </Col>
            </Row>
            <Row className="d-flex justify-content-center ">
                <Col className="col-6 m-4 px-0 d-flex flex-column justify-content-center align-items-center login--form ">
                    <h1 className="align-self-start me-4 fs-5">ورود به پنل</h1>
                    <h1 className="align-self-start mt-2 me-4 fs-6">مشخصات خود را در زیر وارد کنید</h1>
                    <Form className="d-flex flex-column justify-content-center align-items-center w-100 mt-4" noValidate onSubmit={formHandeler}  >
                        <Row className="w-100 d-flex flex-column justify-content-center align-items-center">
                            <Col className="w-75 ">
                                <Form.Group controlId="mobileOrEmail" >
                                    <Col className="mb-2">
                                        <Image src={userLogo} width="20px" className="mx-2" />
                                        <Form.Label className="d-inline">ایمیل / موبایل</Form.Label>
                                    </Col>
                                    <Form.Control className="order-input login-input w-100 input--login--desktop" type="text"
                                        onChange={handleChange}
                                        isValid={inputs.mobileOrEmail != false && validated && true}
                                        isInvalid={!inputs.mobileOrEmail && validated && true}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="w-100 d-flex flex-column justify-content-center mt-5 align-items-center">
                            <Col className="w-75 ">
                                <Form.Group className="inputWithButton " controlId="password">
                                    <Col className="mb-2">
                                        <Image src={passwordLogo} width="20px" className="mx-2" />
                                        <Form.Label className="d-inline">رمز عبور</Form.Label>
                                    </Col>
                                    <img src={showPassword ? beSeenIcon : notSeenIcon} onClick={(e) => setShowPassword(!showPassword)} height="25px" className="eye-button" />
                                    <Form.Control className="order-input eye-input w-100 input--login--desktop" type={`${showPassword ? "text" : "password"}`}
                                        onChange={handleChange}
                                        required
                                        isValid={inputs.password.length > 3 && validated && true}
                                        isInvalid={inputs.password.length <= 3 && validated && true}
                                    />

                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="w-100 d-flex flex-column justify-content-center mt-1 align-items-center">
                            <Col className="mt-4 w-75 register-link ">
                                <a href="/register">ثبت نام نکرده اید؟</a>
                            </Col>
                        </Row>
                        <Row className="w-100 d-flex flex-column justify-content-center align-items-center">
                            <Col xs={6}>
                                {
                                    loggingInLoading ?
                                        <Button className=" login--btn--desktop w-100 me-auto d-block" type="submit" disabled >
                                            <Spinner animation="border" size="sm" />
                                        </Button>
                                        :
                                        <Button className=" login--btn--desktop w-100 me-auto d-block" type="submit"  >
                                            ورود
                                        </Button>

                                }
                            </Col>
                        </Row>
                    </Form>

                </Col>
            </Row >


        </div >

    );
}