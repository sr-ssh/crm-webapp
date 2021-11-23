import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import persianJs from "persianjs/persian.min";

// Actions
import { userActions } from "../../../actions";

// Helpers
import { CountDownFunc, history } from "../../../helpers";

// Form Validator
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Icons
import logo from "../../assets/images/crm-dark.svg";
import phoneIcon from "../../assets/images/phone-dark-blue.svg";
import passwordLogo from "../../assets/images/password.svg";
import keyIcon from "../../assets/images/passwordd.svg";
import notSeenIcon from "../../assets/images/Not-seen.svg";
import beSeenIcon from "../../assets/images/be-seen.svg";

const validationSchema = yup.object().shape({
  phoneNumber: yup.string().required(),
  authCode: yup.string().required(),
  newPassword: yup.string().required(),
  repeatNewPassword: yup.string().required(),
});

export const ResetPassword = ({
  forgotPassword,
  setForgotPassword,
  triggerSendCode,
  ...props
}) => {
  const {
    register,
    setValue,
    getValues,
    setError,
    watch,
    trigger,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    criteriaMode: "all",
    resolver: yupResolver(validationSchema),
  });
  let { message: alertMessage, type: alertType } = useSelector(
    (state) => state.alert
  );
  let { loading: resetPasswordLoading, data: resetPasswordData } = useSelector(
    (state) => state.passwordForgetting
  );
  const [showPassword, setShowPassword] = useState(false);
  const [isCountDown, setCountDown] = useState(false);
  const dispatch = useDispatch();
  let { loading: verificationCodeLoading } = useSelector(
    (state) => state.verificationCode
  );

  let handleShowPassword = () => {
    setShowPassword(true);
    setTimeout(() => {
      setShowPassword(false);
    }, 3000);
  };

  let authCodeHandler = async () => {
    const result = await trigger("phoneNumber", { shouldFocus: true });
    if (result == false) {
      return;
    }
    let paramsFormPhoneNumber = getValues("phoneNumber");
    let endDate = localStorage.getItem("end_date");
    let regEx = /^[۰۱۲۳۴۵۶۷۸۹0123456789]{11}$/;
    let res = regEx.test(paramsFormPhoneNumber);
    if (endDate == null && res) {
      dispatch(
        userActions.verificationCode(
          persianJs(paramsFormPhoneNumber).toEnglishNumber().toString()
        )
      );
    } else if (res == false) {
      setError("phoneNumber", { type: "focus" });
    } else if (endDate != null) {
      isCodeHaveBeenSent(paramsFormPhoneNumber);
    }
  };
  let formHandler = async (e) => {
    e.preventDefault();
    let result = await trigger();
    if (result == true) {
      let paramsForm = getValues();

      if (paramsForm.newPassword != paramsForm.repeatNewPassword) {
        return setError("repeatNewPassword", { type: "focus" });
      }
      dispatch(
        userActions.passwordForgetting({
          password: persianJs(paramsForm.newPassword).toEnglishNumber().toString(),
          mobile: persianJs(paramsForm.phoneNumber).toEnglishNumber().toString(),
          code: persianJs(paramsForm.authCode).toEnglishNumber().toString()
        })
      );
    }
  };

  useEffect(() => {
    if (
      resetPasswordLoading == false &&
      resetPasswordData.success == true &&
      resetPasswordData.data.status == undefined
    ) {
      localStorage.removeItem("end_date");
      history.push("/dashboard");
    }
  }, [resetPasswordLoading]);

  useEffect(() => {
    if (
      props.history.location.state &&
      props.history.location.state.status == true &&
      props.history.location.state.phone != null
    ) {
      let endDate = localStorage.getItem("end_date");
      setValue("phoneNumber", props.history.location.state.phone, {
        shouldValidate: true,
      });
      if (endDate == null) {
        dispatch(
          userActions.verificationCode(props.history.location.state.phone)
        );
      }
    }
  }, [props.history.location.state]);

  useEffect(() => {
    <CountDownFunc
      delay={90000}
      setCountDown={() => setCountDown(false)}
      isCountDown={isCountDown}
      force={true}
    />;
  }, []);

  let isCodeHaveBeenSent = (paramsFormPhoneNumber) => {
    let endDate = localStorage.getItem("end_date");
    if (
      (paramsFormPhoneNumber != undefined &&
        paramsFormPhoneNumber.length == 11) ||
      (verificationCodeLoading == false && endDate == null)
    ) {
      let paramsFormPhoneNumber = getValues("phoneNumber");
      setCountDown(true);
    }
  };
  useEffect(() => {
    isCodeHaveBeenSent();
  }, [verificationCodeLoading]);

  return (
    <div className="factors--page">
      <Container fluid className="p-0 d-flex flex-column">
        {alertMessage && (
          <>
            <div className="modal-backdrop show"></div>
            <Row className="justify-content-center text-center ">
              <Alert variant={alertType}>{alertMessage}</Alert>
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
        <Row className="ms-0 loginForm--mobile mt-2">
          <Form
            className="d-flex flex-column justify-content-center align-items-center w-100 "
            noValidate
          >
            <Row className="w-100 d-flex flex-column justify-content-center align-items-center">
              <Col
                className="d-flex justify-content-center align-items-center"
                style={{ width: "80%" }}
              >
                <Form.Group controlId="mobileOrEmail">
                  <Form.Label>
                    <Image src={phoneIcon} width="17px" className="mx-2" />
                    موبایل
                  </Form.Label>
                  <Form.Control
                    className="order-input login-input"
                    type="text"
                    {...register("phoneNumber")}
                    isInvalid={errors?.phoneNumber ? true : false}
                    isValid={
                      Object.keys(errors).length != 0 &&
                      errors?.phoneNumber == undefined &&
                      true
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="w-100 d-flex flex-column justify-content-center align-items-center mt-3">
              <Col
                className="col--login--desktop d-flex justify-content-center align-items-end"
                style={{ width: "80%" }}
              >
                <Form.Group
                  style={{ display: "flex", alignItems: "end", width: "237px" }}
                >
                  <Col className="col-9 ps-1">
                    <Form.Group controlId="mobileOrEmail">
                      <Col className="mb-2">
                        <Image src={keyIcon} width="15px" className="mx-2" />
                        <Form.Label className="d-inline">کد تایید</Form.Label>
                      </Col>
                      <Form.Control
                        className="order-input login-input"
                        type="text"
                        {...register("authCode")}
                        isInvalid={errors.authCode ? true : false}
                        isValid={
                          Object.keys(errors).length != 0 &&
                          errors?.authCode == undefined &&
                          true
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Button
                      className="login--btn--mobile login--btn--desktop--disabled  w-100 p-0"
                      onClick={authCodeHandler}
                      disabled={isCountDown ? true : false}
                    >
                      {isCountDown ? (
                        <CountDownFunc
                          delay={90000}
                          setCountDown={() => setCountDown(false)}
                          isCountDown={isCountDown}
                          force={false}
                        />
                      ) : verificationCodeLoading ? (
                        <Spinner animation="border" size="sm" />
                      ) : (
                        <span className="text--sendCode--resetPassword">
                          ارسال کد
                        </span>
                      )}
                    </Button>
                  </Col>
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
                    رمز عبور جدید
                  </Form.Label>
                  <img
                    src={showPassword ? beSeenIcon : notSeenIcon}
                    alt={showPassword ? "beSeen-Icon" : "notSeen-Icon"}
                    onClick={(e) => handleShowPassword()}
                    height="25px"
                    className="eye-button--login--mobile"
                  />
                  <Form.Control
                    className="order-input login-input"
                    type={`${showPassword ? "text" : "password"}`}
                    {...register("newPassword")}
                    isInvalid={errors?.newPassword ? true : false}
                    isValid={
                      Object.keys(errors).length != 0 &&
                      errors?.newPassword == undefined &&
                      true
                    }
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
                    تکرار رمز عبور جدید
                  </Form.Label>
                  <Form.Control
                    className="order-input login-input"
                    type={`${showPassword ? "text" : "password"}`}
                    {...register("repeatNewPassword")}
                    isInvalid={
                      (errors?.repeatNewPassword ? true : false) ||
                      getValues("newPassword") != getValues("repeatNewPassword")
                    }
                    isValid={
                      Object.keys(errors).length != 0 &&
                      errors?.repeatNewPassword == undefined &&
                      true
                    }
                  />
                  <Form.Control.Feedback className="me-2" type="invalid">
                    رمز عبور یکسان نیست!
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row className="w-100 d-flex flex-column justify-content-center align-items-center mt-3">
              <Col className="col--btn--login--mobile mt-3">
                {resetPasswordLoading ? (
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
                    onClick={(e) => formHandler(e)}
                  >
                    ورود
                  </Button>
                )}
              </Col>
            </Row>
            <Row className="w-100 mt-4 d-flex flex-column justify-content-center align-items-center">
              <Col className="col--btn--login--desktop">
                <Button
                  onClick={() => {
                    props.history.push("/");
                  }}
                  className=" register--login--btn--desktop w-100 me-auto d-block text-nowrap"
                  type="submit"
                >
                  برگشت به صفحه ورود به پنل
                </Button>
              </Col>
            </Row>
          </Form>
        </Row>
      </Container>
    </div>
  );
};
