import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Button,
  Form,
  Row,
  Col,
  Image,
  Alert,
  Spinner,
} from "react-bootstrap";
import persianJs from "persianjs/persian.min";

// Actions
import { userActions } from "../../actions";

// Assets
import logo from "./../assets/images/crm-dark.svg";
import userLogo from "./../assets/images/user.svg";
import passwordLogo from "./../assets/images/password.svg";
import notSeenIcon from "../assets/images/Not-seen.svg";
import beSeenIcon from "../assets/images/be-seen.svg";

export const Login = (props) => {
  let alertMessage = useSelector((state) => state.alert.message);
  let alerType = useSelector((state) => state.alert.type);
  let loggingInLoading = useSelector((state) => state.authentication.loading);
  let isUserEntered = localStorage.getItem("user");

  const [showPassword, setShowPassword] = useState(false);
  const [validated, setValidated] = useState(false);
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

  useEffect(() => {
    if (isUserEntered !== null) {
      props.history.push("/dashboard");
      return;
    }
  }, [dispatch]);

  let handleForgotPassword = (e) => {
    e.preventDefault();
    let regEx = /^[۰۱۲۳۴۵۶۷۸۹0123456789]{11}$/;
    let res = regEx.test(mobileOrEmail);
    if (res) {
      props.history.push("/password/reset" , { status: true, phone: mobileOrEmail } )
    }else{
      props.history.push("/password/reset" , { status: false, phone: null } )
    }
  };

  return (
    <div className="factors--page">
      <Container fluid className="p-0 d-flex flex-column">
        {alertMessage && (
          <>
            <div className="modal-backdrop show"></div>
            <Row className="justify-content-center text-center ">
              <Alert variant={alerType}>{alertMessage}</Alert>
            </Row>
          </>
        )}
        <Row className="p-0 m-0 mt-3 ">
          <Col className=" d-flex justify-content-end">
            <img
              className="ms-3"
              src={logo}
              alt="logo"
              width="110px"
              height="55px"
            />
          </Col>
        </Row>
        <Row className="ms-0 loginForm--mobile">
          <Form
            className="d-flex flex-column justify-content-center align-items-center w-100 "
            noValidate
            onSubmit={formHandeler}
          >
            <Row className="w-100 d-flex flex-column justify-content-center align-items-center">
              <Col
                className="d-flex justify-content-center align-items-center"
                style={{ width: "80%" }}
              >
                <Form.Group controlId="mobileOrEmail">
                  <Form.Label>
                    <Image src={userLogo} width="17px" className="mx-2" />
                    ایمیل / موبایل
                  </Form.Label>
                  <Form.Control
                    className="order-input login-input"
                    type="text"
                    onChange={handleChange}
                    isValid={inputs.mobileOrEmail != false && validated && true}
                    isInvalid={!inputs.mobileOrEmail && validated && true}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="w-100 d-flex flex-column justify-content-center mt-3 align-items-center">
              <Col
                className="d-flex justify-content-center align-items-center"
                style={{ width: "80%" }}
              >
                <Form.Group controlId="password" className="p--relative">
                  <Form.Label className="">
                    <Image src={passwordLogo} width="17px" className="mx-2" />
                    رمز عبور
                  </Form.Label>
                  <img
                    src={showPassword ? beSeenIcon : notSeenIcon}
                    alt={showPassword ? "beSeen-Icon" : "notSeen-Icon"}
                    onClick={(e) => setShowPassword(!showPassword)}
                    height="25px"
                    className="eye-button--login--mobile"
                  />
                  <Form.Control
                     className="order-input login-input"
                    type={`${showPassword ? "text" : "password"}`}
                    onChange={handleChange}
                    required
                    isValid={inputs.password.length > 3 && validated && true}
                    isInvalid={inputs.password.length <= 3 && validated && true}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="w-100 d-flex flex-column justify-content-center mt-4 align-items-center">
              <Col
                className="d-flex  align-items-center  register-link"
                style={{ width: "237px" }}
              >
                <a
                  className="text--dark--blue cursor-pointer"
                  onClick={(e) => handleForgotPassword(e)}
                >
                  فراموشی رمز عبور
                </a>
              </Col>
            </Row>
            <Row className="w-100 d-flex flex-column justify-content-center align-items-center mt-5">
                <Col className="col--btn--login--mobile mt-5">
                  {loggingInLoading ? (
                    <Button
                      className=" login--btn--desktop login--btn--mobile w-100 me-auto d-block"
                      type="submit"
                      disabled
                    >
                      <Spinner animation="border" size="sm" />
                    </Button>
                  ) : (
                    <Button
                      className=" login--btn--desktop login--btn--mobile w-100 me-auto d-block"
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
        </Row>
      </Container>
    </div>
  );
};
