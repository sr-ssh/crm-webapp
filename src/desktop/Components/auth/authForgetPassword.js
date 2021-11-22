import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col, Spinner, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

// Actions
import { userActions } from "../../../actions";

// Helpers
import { CountDownFunc, history } from "../../../helpers";

// Form Validator
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Icons
import phoneIcon from "../../assets/images/phone.svg";
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

export const AuthForgetPassword = ({
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
  const [seePassword, setSeePassword] = useState(false);
  const [isCountDown, setCountDown] = useState(false);
  const dispatch = useDispatch();
  let { loading: resetPasswordLoading, data: resetPasswordData } = useSelector(
    (state) => state.passwordForgetting
  );
  let { loading: verificationCodeLoading } = useSelector(
    (state) => state.verificationCode
  );

  let handleShowPassword = () => {
    setSeePassword(true);
    setTimeout(() => {
      setSeePassword(false);
    }, 3000);
  };

  let authCodeHandler = async () => {
    const result = await trigger("phoneNumber", { shouldFocus: true });
    if (result == false) {
      return;
    }
    let paramsFormPhoneNumber = getValues("phoneNumber");
    let endDate = localStorage.getItem("end_date");
    if (endDate == null) {
      dispatch(userActions.verificationCode(paramsFormPhoneNumber));
    }
    setCountDown(true);
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
          password: paramsForm.newPassword,
          mobile: paramsForm.phoneNumber,
          code: paramsForm.authCode,
        })
      );
    }
  };

  useEffect(() => {
    if (
      forgotPassword == true &&
      resetPasswordLoading == false &&
      resetPasswordData.status == true &&
      resetPasswordData.data.status == undefined
    ) {
      localStorage.removeItem("end_date");
      history.push("/dashboard");
    }
  }, [resetPasswordLoading]);

  useEffect(() => {
    if (
      forgotPassword == true &&
      triggerSendCode.status == true &&
      triggerSendCode.phone != null
    ) {
      let endDate = localStorage.getItem("end_date");
      setValue("phoneNumber", triggerSendCode.phone, {
        shouldValidate: true,
      });
      if (endDate == null) {
        dispatch(userActions.verificationCode(triggerSendCode.phone));
      }
      setCountDown(true);
    }
  }, [forgotPassword]);

  useEffect(() => {
    <CountDownFunc
      delay={90000}
      setCountDown={() => setCountDown(false)}
      isCountDown={isCountDown}
      force={true}
    />;
  }, []);

  return (
    <Row className="d-flex justify-content-center ">
      <Col className="col-5 m-4 mt-0 px-0 d-flex flex-column justify-content-center align-items-center login--form ">
        <Form
          className="d-flex flex-column justify-content-center align-items-center w-100 mt-2"
          noValidate
        >
          <Row className="w-100 d-flex flex-column justify-content-center align-items-center">
            <Col className="col--login--desktop">
              <Form.Group controlId="mobileOrEmail">
                <Col className="mb-2">
                  <Image src={phoneIcon} width="20px" className="mx-2" />
                  <Form.Label className="d-inline">موبایل</Form.Label>
                </Col>
                <Form.Control
                  className="order-input login-input w-100  input--login--desktop"
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
          <Row className="w-100 d-flex flex-column justify-content-center align-items-center mt-4">
            <Col className="col--login--desktop d-flex align-items-end">
              <Col className="col-9 ps-3">
                <Form.Group controlId="mobileOrEmail">
                  <Col className="mb-2">
                    <Image src={keyIcon} width="20px" className="mx-2" />
                    <Form.Label className="d-inline">کد تایید</Form.Label>
                  </Col>
                  <Form.Control
                    className="order-input login-input w-100  input--login--desktop"
                    type="text"
                    {...register("authCode")}
                    isInvalid={errors?.authCode ? true : false}
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
                  className="login--btn--desktop login--btn--desktop--disabled  w-100"
                  style={{ height: "35px" }}
                  onClick={authCodeHandler}
                  disabled={isCountDown ? true : false}
                  // disabled={true}
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
                    "ارسال"
                  )}
                </Button>
              </Col>
            </Col>
          </Row>
          <Row className="w-100 d-flex flex-column justify-content-center mt-3 align-items-center">
            <Col className="col--login--desktop">
              <Form.Group className="inputWithButton " controlId="password">
                <Col className="mb-2">
                  <Image src={passwordLogo} width="20px" className="mx-2" />
                  <Form.Label className="d-inline">رمز عبور جدید</Form.Label>
                </Col>
                <img
                  src={seePassword ? beSeenIcon : notSeenIcon}
                  onClick={(e) => handleShowPassword()}
                  alt={seePassword ? "beSeen-Icon" : "notSeen-Icon"}
                  height="25px"
                  className="eye-button"
                />
                <Form.Control
                  className="order-input eye-input input--login--desktop"
                  type={`${seePassword ? "text" : "password"}`}
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
            <Col className="col--login--desktop">
              <Form.Group className="inputWithButton " controlId="password">
                <Col className="mb-2">
                  <Image src={passwordLogo} width="20px" className="mx-2" />
                  <Form.Label className="d-inline">
                    تکرار رمز عبور جدید
                  </Form.Label>
                </Col>
                <Form.Control
                  className="order-input eye-input input--login--desktop"
                  type={`${seePassword ? "text" : "password"}`}
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
          <Row className="w-100 d-flex flex-column justify-content-center align-items-center">
            <Col className="col--btn--login--desktop mt-5">
              {resetPasswordLoading ? (
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
                  onClick={(e) => formHandler(e)}
                >
                  ورود
                </Button>
              )}
            </Col>
          </Row>
          <Row className="w-100 mt-5 d-flex flex-column justify-content-center align-items-center">
            <Col className="col--btn--login--desktop">
              <Button
                onClick={() => setForgotPassword(false)}
                className="register--login--btn--desktop w-100 text-nowrap "
                type="submit"
              >
                برگشت به صفحه ورود به پنل
              </Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};
