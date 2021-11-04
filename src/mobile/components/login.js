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
import { userActions } from "../../actions/userActions";

// Assets
import logo from "./../assets/images/crm.svg";
import userLogo from "./../assets/images/user.svg";
import passwordLogo from "./../assets/images/password.svg";
import notSeenIcon from "../assets/images/Not-seen.svg";
import beSeenIcon from "../assets/images/be-seen.svg";

export const Login = (props) => {
  let alertMessage = useSelector((state) => state.alert.message);
  let alerType = useSelector((state) => state.alert.type);
  let loggingInLoading = useSelector((state) => state.authentication.loading);
  let isUserEntered = localStorage.getItem("user")


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
      if(isUserEntered !== null ){props.history.push('/dashboard'); return }
  }, [dispatch]);

  return (
    <div className="form-page">
      <div id="triangle-up"></div>

      <Container fluid className="p-0 d-flex flex-column">
        {alertMessage && (
          <>
            <div className="modal-backdrop show"></div>
            <Row className="justify-content-center text-center ">
              <Alert variant={alerType}>{alertMessage}</Alert>
            </Row>
          </>
        )}
        <Row className="p-0 m-0 mzLogo">
          <Col className="">
            <img className="logo" src={logo} alt="logo" width="160px" />
          </Col>
        </Row>
        <Row className="ms-0 loginForm">
          <Col>
            <Form
              className="d-flex flex-column justify-content-center"
              noValidate
              onSubmit={formHandeler}
            >
              <Row className="w-100 me-2 pe-2 order-inputs ">
                <Col>
                  <Form.Group controlId="mobileOrEmail">
                    <Form.Label>
                      <Image src={userLogo} width="17px" className="mx-2" />
                      ایمیل / موبایل
                    </Form.Label>
                    <Form.Control
                      className="order-input login-input"
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

              <Row className="w-100 me-2 mt-4 pe-2 order-inputs ">
                <Col>
                  <Form.Group
                    className="inputWithButton login-input"
                    controlId="password"
                  >
                    <Form.Label className="">
                      <Image src={passwordLogo} width="17px" className="mx-2" />
                      رمز عبور
                    </Form.Label>
                    <img
                      src={showPassword ? beSeenIcon : notSeenIcon}
                      onClick={(e) => setShowPassword(!showPassword)}
                      height="25px"
                      className="eye-button"
                    />
                    <Form.Control
                      className="order-input eye-input"
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
              <Row className="w-100 me-1">
                <Col className="mt-4 register-link">
                  <a href="/register">ثبت نام نکرده اید؟</a>
                </Col>
              </Row>
              <Row className="registerSubmitContainer">
                <Col xs={6} className="me-auto ms-4">
                  <Button
                    className="login-btn w-100 me-auto d-block"
                    type="submit"
                  >
                    {loggingInLoading ? <Spinner animation="border" /> : "ورود"}
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>

      <div id="triangle-down"></div>
    </div>
  );
};
