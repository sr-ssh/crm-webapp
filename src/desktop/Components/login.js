import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col, Spinner, Image } from "react-bootstrap";
import persianJs from "persianjs/persian.min";
import NotificationAlert from "react-notification-alert";

// Actions
import { userActions } from "../../actions/userActions";
// Icons
import logo from "./../assets/images/crm.svg";
import userLogo from "./../assets/images/user.svg";
import passwordLogo from "./../assets/images/password.svg";
import notSeenIcon from "../assets/images/Not-seen.svg";
import beSeenIcon from "../assets/images/be-seen.svg";

// Components
import { AuthForgetPassword } from "./auth/authForgetPassword";

export const Login = (props) => {
  let alertMessage = useSelector((state) => state.alert.message);
  let alerType = useSelector((state) => state.alert.type);
  let loggingInLoading = useSelector((state) => state.authentication.loading);
  let alert = useSelector((state) => state.alert);
  let isUserEntered = localStorage.getItem("user");
  const notificationAlertRef = useRef(null);

  const [showPassword, setShowPassword] = useState(false);
  const [validated, setValidated] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [triggerSendCode, setTriggerSendCode] = useState({
    status: false,
    phone: null,
  });
  const [inputs, setInputs] = useState({ password: "" });
  const { mobileOrEmail, password } = inputs;
  const dispatch = useDispatch();

  const usernameHandler = (value) => {
    let res = value.length > 4;
    if (res) return value;
    else return false;
  };
  const handleChange = (e) => {
    let { id, value } = e.target;
    if (id === "mobileOrEmail" && value) {
      value = persianJs(value).toEnglishNumber().toString();
      value = usernameHandler(value);
    }
    if (id === "password" && value)
      value = persianJs(value).toEnglishNumber().toString();

    setInputs((inputs) => ({ ...inputs, [id]: value }));
  };

  const formHandeler = (e) => {
    e.preventDefault();

    if (mobileOrEmail && password)
      dispatch(userActions.login(mobileOrEmail, password));
    else setValidated(true);
  };

  let handleForgotPassword = () => {
    console.log(mobileOrEmail);
    let regEx = /^[۰۱۲۳۴۵۶۷۸۹0123456789]{11}$/;
    let res = regEx.test(mobileOrEmail);
    if (res) {
      setTriggerSendCode({ status: true, phone: mobileOrEmail });
    }
    setForgotPassword(true);
  };

  useEffect(() => {
    if (isUserEntered !== null) {
      props.history.push("/dashboard");
      return;
    }
  }, [dispatch]);

  useEffect(() => {
    let options = {};
    options = {
      place: "tl",
      message: (
        <div>
          <div>{alert.message}</div>
        </div>
      ),
      zIndex: 9999,
      type: alert.type,
      closeButton: false,
      autoDismiss: 5,
    };
    if (alert.message?.length > 0 && alert.message && alert.type)
      notificationAlertRef.current.notificationAlert(options);
  }, [alert]);

  return (
    <div className="login--page">
      <div className="alert--container">
        <NotificationAlert ref={notificationAlertRef} />
      </div>
      <Row className="headerLogin ps-5 pb-0">
        <Col className=" ps-lg-5 ps-md-3 ms-lg-5 ms-md-3  d-flex justify-content-end ">
          <img className="ms-lg-5 ms-md-3" height="60px" src={logo} alt="" />
        </Col>
      </Row>
      {forgotPassword ? (
        <AuthForgetPassword
          forgotPassword={forgotPassword}
          setForgotPassword={setForgotPassword}
          triggerSendCode={triggerSendCode}
        />
      ) : (
        <Row className="d-flex justify-content-center ">
          <Col className="col-5 m-4 px-0 d-flex flex-column justify-content-center align-items-center login--form ">
            <Form
              className="d-flex flex-column justify-content-center align-items-center w-100 mt-4"
              noValidate
              onSubmit={formHandeler}
            >
              <Row className="w-100 d-flex flex-column justify-content-center align-items-center">
                <Col className="col--login--desktop">
                  <Form.Group controlId="mobileOrEmail">
                    <Col className="mb-2">
                      <Image src={userLogo} width="20px" className="mx-2" />
                      <Form.Label className="d-inline">
                        ایمیل / موبایل
                      </Form.Label>
                    </Col>
                    <Form.Control
                      className="order-input login-input w-100  input--login--desktop"
                      type="text"
                      onChange={handleChange}
                      isValid={
                        inputs.mobileOrEmail != false && validated && true
                      }
                      isInvalid={!inputs.mobileOrEmail && validated && true}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="w-100 d-flex flex-column justify-content-center mt-3 align-items-center">
                <Col className="col--login--desktop">
                  <Form.Group className="inputWithButton " controlId="password">
                    <Col className="mb-2">
                      <Image src={passwordLogo} width="20px" className="mx-2" />
                      <Form.Label className="d-inline">رمز عبور</Form.Label>
                    </Col>
                    <img
                      src={showPassword ? beSeenIcon : notSeenIcon}
                      onClick={(e) => setShowPassword(!showPassword)}
                      height="25px"
                      className="eye-button"
                    />
                    <Form.Control
                      className="order-input eye-input input--login--desktop"
                      type={`${showPassword ? "text" : "password"}`}
                      onChange={handleChange}
                      required
                      isValid={inputs.password.length > 3 && validated && true}
                      isInvalid={
                        inputs.password.length <= 3 && validated && true
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="w-100 d-flex flex-column justify-content-center mt-1 align-items-center">
                <Col className="p-0 mt-4 col--login--desktop register-link ">
                  <a
                    className="pe-3 text--dark--blue cursor-pointer"
                    onClick={(e) => handleForgotPassword()}
                  >
                    فراموشی رمز عبور
                  </a>
                </Col>
              </Row>
              <Row className="w-100 d-flex flex-column justify-content-center align-items-center">
                <Col className="col--btn--login--desktop mt-5">
                  {loggingInLoading ? (
                    <Button
                      className=" login--btn--desktop w-100 me-auto d-block"
                      type="submit"
                      disabled
                    >
                      <Spinner animation="border" size="sm" />
                    </Button>
                  ) : (
                    <Button
                      className=" login--btn--desktop w-100 me-auto d-block"
                      type="submit"
                    >
                      ورود
                    </Button>
                  )}
                </Col>
              </Row>
              <Row className="w-100 mt-5 d-flex flex-column justify-content-center align-items-center">
                <Col className="col--btn--login--desktop">
                  <Button
                    onClick={() => {
                      props.history.push("/register");
                    }}
                    className=" register--login--btn--desktop w-100 me-auto d-block"
                    type="submit"
                  >
                    ثبت نام
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      )}
    </div>
  );
};
