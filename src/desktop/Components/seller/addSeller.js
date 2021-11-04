import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Form, Button, Row, Col, Spinner } from "react-bootstrap";

// Components
import { Header } from "../base/header";
import { CircularProgress } from '@material-ui/core';

export const AddSeller = () => {
  const dispatch = useDispatch();
  const sideBar = useSelector((state) => state.sideBar);

  return (
    <>
      <Header isBTNSearch={false} isBTNRequest={false} />
      <div
        className="order-page--desktop margin--top--header "
        style={{ paddingRight: sideBar.open ? "250px" : 0 }}
      >
        <Container fluid className="pt-3 px-3 m-0">
        <Form
            // onSubmit={formHandler}
            noValidate
            className="d-flex flex-column align-items-center"
          >
            <Row
              className="d-flex flex-column"
              style={{ width: "80%" }}
            >
              <Row className="col-12 m-0 p-0 mt-2 order-inputs d-flex flex-row justify-content-between align-items-center px-3">
                <Col className="col-4 add-order-input--desktop pe-0">
                  <Form.Group className="p--relative">
                    <Form.Label className="me-3">تلفن</Form.Label>
                    <Form.Control
                      className="order-input radius-16"
                      type="tel"
                      name="phone"
                    //   isInvalid={
                    //     (!customer.mobile && validated) ||
                    //     (mobileValidated && true)
                    //   }
                    //   isValid={
                    //     (customer.mobile && validated) ||
                    //     (mobileValidated && customer.mobile && true)
                    //   }
                    //   onChange={handleChange}
                    //   value={customer.mobile}
                      required
                    />
                    {/* {loading ? (
                      <Spinner
                        className="spinner--download--btn--desktop "
                        as="div"
                        variant="primary"
                        animation="border"
                        size="sm"
                      />
                    ) : (
                      <img
                        src={downloadIcon}
                        className="m-0 p-0  spinner--download--btn--desktop"
                        // onClick={(e) => handleOldCustomer(e)}
                        height="25px"
                        alt="down-icon"
                      />
                    )} */}
                  </Form.Group>
                </Col>
                <Col className="col-4 add-order-input--desktop">
                  <Form.Group>
                    <Form.Label className="me-3">همراه</Form.Label>
                    <Form.Control
                      className="order-input radius-16"
                      type="tel"
                      name="mobile"
                    //   onChange={handleChange}
                    //   isInvalid={
                    //     (!customer.family && validated) ||
                    //     (nameValidated && true)
                    //   }
                    //   isValid={
                    //     (customer.family && validated) ||
                    //     (nameValidated && customer.family && true)
                    //   }
                    //   value={customer.family}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col className="col-4 add-order-input--desktop ps-0">
                  <Form.Group controlId="birthday">
                    <Form.Label className="me-3">نام فروشنده</Form.Label>
                    <Form.Control
                      className="order-input radius-16"
                      type="text"
                      name="family"
                    //   onChange={handleChange}
                    //   value={customer.company}
                    />
                  </Form.Group>
                </Col>

              </Row>
              <Row className="col-12 m-0 p-0 mt-5 order-inputs d-flex flex-row justify-content-between align-items-center px-3">
                <Col className="col-4 add-order-input--desktop pe-0">
                  <Form.Group className="p--relative">
                    <Form.Label className="me-3">نام مجموعه</Form.Label>
                    <Form.Control
                      className="order-input radius-16"
                      type="text"
                      name="company"
                    //   isInvalid={
                    //     (!customer.mobile && validated) ||
                    //     (mobileValidated && true)
                    //   }
                    //   isValid={
                    //     (customer.mobile && validated) ||
                    //     (mobileValidated && customer.mobile && true)
                    //   }
                    //   onChange={handleChange}
                    //   value={customer.mobile}
                      required
                    />
                    {/* {loading ? (
                      <Spinner
                        className="spinner--download--btn--desktop "
                        as="div"
                        variant="primary"
                        animation="border"
                        size="sm"
                      />
                    ) : (
                      <img
                        src={downloadIcon}
                        className="m-0 p-0  spinner--download--btn--desktop"
                        // onClick={(e) => handleOldCustomer(e)}
                        height="25px"
                        alt="down-icon"
                      />
                    )} */}
                  </Form.Group>
                </Col>
                
                <Col className="col-8 add-order-input--desktop ps-0">
                  <Form.Group controlId="birthday">
                    <Form.Label className="me-3">شماره کارت</Form.Label>
                    <Form.Control
                      className="order-input radius-16"
                      type="tel"
                      name="cardNumber"
                    //   onChange={handleChange}
                    //   value={customer.company}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="col-12 m-0 pt-4 mt-4 order-inputs px-3">
                <Col className="p-0 add-order-input mx-0 px-0">
                  <Form.Group controlId="address">
                    <Form.Label className="me-3">آدرس</Form.Label>
                    <Form.Control
                      style={{ maxHeight: "45px",height: "45px" }}
                      className="order-input radius-16 py-2"
                      type="text"
                      name="address"
                      // onChange={handleChange}
                      isInvalid={false}
                      isValid={false}
                      // value={customer.address}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="col-12 m-0 pt-4 mt-4 order-inputs px-3">
                <Col className="p-0 add-order-input mx-0 px-0">
                  <Form.Group controlId="address">
                    <Form.Label className="me-3">توضیحات</Form.Label>
                    <Form.Control
                      style={{ maxHeight: "45px",height: "45px" }}
                      className="order-input radius-16 py-2"
                      type="text"
                      name="description"
                      // onChange={handleChange}
                      isInvalid={false}
                      isValid={false}
                      // value={customer.address}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="m-0 mt-5 pt-5 justify-content-center w-100">
                {/* {addOrderLoading ? (
                  <Button
                    className="fw-bold receipt--btn border-0 w-100 fs-6 d-flex justify-content-center align-items-center"
                    size="lg"
                    type="submit"
                    disabled
                  >
                   <CircularProgress className="text-light" size="25px"/>
                   <span className="me-3"> در حال ثبت ...</span>
                  </Button>
                 ) : ( */}
                  <>
                    <Col className="col-12 m-0 p-0 ps-1">
                      <Button
                        className="fw-bold receipt--btn border-0 w-100 fs-6"
                        size="lg"
                        type="submit"
                        block
                        // onClick={formHandler}
                      >
                        ثبت
                      </Button>
                    </Col>
                  </>
                {/* )}  */}
              </Row>
              </Row>

          </Form>
        </Container>
      </div>
    </>
  );
};
