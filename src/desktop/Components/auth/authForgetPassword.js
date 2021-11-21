import React, { useEffect } from "react";
import { Form, Button, Row, Col, Spinner, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";


// Actions 
import { userActions } from "../../../actions";


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
    reset,
    watch,
    formState: { errors },
  } = useForm({
    mode: "all",
    criteriaMode: "all",
    resolver: yupResolver(validationSchema),
  });
  const dispatch = useDispatch();


  useEffect(() => {
    if (
      forgotPassword == true &&
      triggerSendCode.status == true &&
      triggerSendCode.phone != null
    ) {
      setValue("phoneNumber", triggerSendCode.phone, {
        shouldValidate: true,
      });
      dispatch(userActions.verificationCode(triggerSendCode.phone));
    }
  }, [forgotPassword]);
  return (
    <Row className="d-flex justify-content-center ">
      <Col className="col-5 m-4 mt-0 px-0 d-flex flex-column justify-content-center align-items-center login--form ">
        <Form
          className="d-flex flex-column justify-content-center align-items-center w-100 mt-2"
          noValidate
          // onSubmit={formHandeler}
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
                  // onChange={handleChange}
                  // isValid={
                  //   inputs.mobileOrEmail != false && validated && true
                  // }
                  // isInvalid={!inputs.mobileOrEmail && validated && true}
                  required
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
                    //   onChange={handleChange}
                    //   isValid={
                    //     inputs.mobileOrEmail != false && validated && true
                    //   }
                    //   isInvalid={!inputs.mobileOrEmail && validated && true}
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Button
                  className="login--btn--desktop w-100"
                  style={{ height: "35px" }}
                  //   onClick={codeHandler}
                >
                  {/* {verificationCode.loading ? ( 
                 <Spinner animation="border" size="sm" /> 
             ) : ( */}
                  ارسال
                  {/* )} */}
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
                {/* <img
                    src={showPassword ? beSeenIcon : notSeenIcon}
                    onClick={(e) => setShowPassword(!showPassword)}
                    height="25px"
                    className="eye-button"
                  /> */}
                <Form.Control
                  className="order-input eye-input input--login--desktop"
                  // type={`${showPassword ? "text" : "password"}`}
                  // onChange={handleChange}
                  // required
                  // isValid={inputs.password.length > 3 && validated && true}
                  // isInvalid={
                  //   inputs.password.length <= 3 && validated && true
                  // }
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
                {/* <img
                    src={showPassword ? beSeenIcon : notSeenIcon}
                    onClick={(e) => setShowPassword(!showPassword)}
                    height="25px"
                    className="eye-button"
                  /> */}
                <Form.Control
                  className="order-input eye-input input--login--desktop"
                  // type={`${showPassword ? "text" : "password"}`}
                  // onChange={handleChange}
                  // required
                  // isValid={inputs.password.length > 3 && validated && true}
                  // isInvalid={
                  //   inputs.password.length <= 3 && validated && true
                  // }
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="w-100 d-flex flex-column justify-content-center align-items-center">
            <Col className="col--btn--login--desktop mt-5">
              {/* {loggingInLoading ? (
                  <Button
                    className=" login--btn--desktop w-100 me-auto d-block"
                    type="submit"
                    disabled
                  >
                    <Spinner animation="border" size="sm" />
                  </Button>
                ) : (
                */}
              <Button
                className=" login--btn--desktop w-100 me-auto d-block"
                type="submit"
              >
                ورود
              </Button>
              {/*} )} */}
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
