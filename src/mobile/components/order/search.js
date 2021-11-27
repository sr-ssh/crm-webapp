import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
//import { DatePicker } from "jalali-react-datepicker";
import DatePicker from "react-multi-date-picker";
import moment from "jalali-moment";
import persianJs from "persianjs/persian.min";
// Form Validator
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// Actions
import { orderActions } from "../../../actions";
// Icons
import closeIcon from "../../assets/images/close.svg";
import closeDatePickerIcon from "../../assets/images/order/closeDatePicker.svg";

// Components
import { CircularProgress } from "@material-ui/core";

const validationSchema = yup.object().shape({
  mobile: yup.string(),
  customerPhoneNumber: yup.string(),
  customerName: yup.string(),
  customerCompany: yup.string(),
  sellerMobile: yup.string(),
  sellerFamily: yup.string(),
  startDate: yup.date(),
  endDate: yup.date(),
  startTrackingTime: yup.date(),
  endTrackingTime: yup.date(),
});

export const OrderSearch = (props) => {
  const dispatch = useDispatch();
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
  let { loading: orderLoading, orders: orders } = useSelector(
    (state) => state.getOrders
  );

  const formHandler = (e) => {
    e.preventDefault();
    let paramsForm = getValues();
    for (let x in paramsForm) {
      if (x == "mobile" || x == "customerPhoneNumber" || x == "sellerMobile") {
        if (paramsForm[x]) {
          paramsForm[x] = persianJs(paramsForm[x].replaceAll(/\s/g, ""))
            .toEnglishNumber()
            .toString();
        }
      }
      if (paramsForm[x] == "" || paramsForm[x] == null) {
        delete paramsForm[x];
      }
    }
    props.setFilter(paramsForm);
    dispatch(
      orderActions.getOrders({
        status: props.status || "0",
        sort: props.sortOrders || "0",
        ...paramsForm,
      })
    );
  };

  const submitCalendar = (value, name) => {
    let date = `${value.year}/${value.month.number}/${value.day}`;
    setValue(
      name,
      new Date(
        moment.from(date, "fa", "YYYY/MM/DD").locale("en").format("YYYY-MM-DD")
      ).toISOString()
    );
  };

  let handleClose = (e) => {
    e.preventDefault();
    props.onHide(false);
  };

  useEffect(() => {
    if (props.show && orderLoading == false && orders) {
      props.onHide(false);
    }
  }, [orderLoading]);

  console.log(watch());
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="px-2 order-search-modal"
    >
      <Modal.Body className="order-filter-body">
        <Button
          className="border-0 customer-modal-close--desktop"
          type="button"
          onClick={(e) => props.onHide(false)}
        >
          <img
            className="d-flex m-auto customer-modal-close-svg--desktop"
            src={closeIcon}
            alt="close-btn"
          />
        </Button>
        <Form onSubmit={formHandler}>
          <Row>
            <Col className="col-6  order-filter-input">
              <Form.Group>
                <Form.Label className="pe-2">شماره مشتری</Form.Label>
                <Form.Control
                  style={{ width: "94%" }}
                  className="order-input"
                  type="tel"
                  inputMode="tel"
                  {...register("mobile")}
                  // value={filters.custoerMobile}
                />
              </Form.Group>
            </Col>
            <Col className="col-6  order-filter-input">
              <Form.Group>
                <Form.Label className="pe-2">شماره همراه مشتری</Form.Label>
                <Form.Control
                  style={{ width: "94%" }}
                  className="order-input"
                  type="tel"
                  inputMode="tel"
                  {...register("customerPhoneNumber")}
                  // value={filters.customerMobile}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="my-3">
            <Col className="col-6 order-filter-input">
              <Form.Group>
                <Form.Label className="pe-2">نام مشتری</Form.Label>
                <Form.Control
                  style={{ width: "94%" }}
                  className="order-input"
                  type="text"
                  {...register("customerName")}
                  // value={filters.customerName}
                />
              </Form.Group>
            </Col>
            <Col className="col-6  order-filter-input">
              <Form.Group>
                <Form.Label className="pe-2">نام مجموعه</Form.Label>
                <Form.Control
                  style={{ width: "94%" }}
                  className="order-input"
                  type="text"
                  {...register("customerCompany")}
                  // value={filters.company}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="my-3">
            <Col className="col-6  order-filter-input">
              <Form.Group>
                <Form.Label className="pe-2">شماره فروشنده</Form.Label>
                <Form.Control
                  style={{ width: "94%" }}
                  className="order-input"
                  type="tel"
                  inputMode="tel"
                  {...register("sellerMobile")}
                  // value={filters.sellerMobile}
                />
              </Form.Group>
            </Col>
            <Col className="col-6 order-filter-input">
              <Form.Group>
                <Form.Label className="pe-2">نام فروشنده</Form.Label>
                <Form.Control
                  style={{ width: "94%" }}
                  className="order-input"
                  type="text"
                  // value={filters.sellerName}
                  {...register("sellerFamily")}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="my-3 justify-content-between">
            <Col className="col-6 order-filter-input">
              <Form.Group className="ms-2">
                <Form.Label className="pe-2">تاریخ سفارش از</Form.Label>
                <Col className="m-0 p-0 col-12 d-flex align-items-center justify-content-between notes-round date--picker--desktop--addOrder">
                  <DatePicker
                    {...register("startDate")}
                    format="MM/DD/YYYY"
                    inputClass="search-input"
                    // className="rmdp-mobile"
                    calendar="persian"
                    locale="fa"
                    value={getValues("startDate")}
                    calendarPosition="auto-right"
                    editable={false}
                    animation
                    onChange={(value) => submitCalendar(value, "startDate")}
                  />
                  <Col className="m-0 p-0 col-2 d-flex align-items-center justify-content-end">
                    <img
                      src={closeDatePickerIcon}
                      className="m-0 p-0  cursor-pointer"
                      onClick={(e) => {
                        setValue("startDate", null);
                      }}
                      height="20px"
                      className="ps-2"
                      alt="down-icon"
                    />
                  </Col>
                </Col>
              </Form.Group>
            </Col>
            <Col className="col-6 order-filter-input">
              <Form.Group className="me-2">
                <Form.Label className="pe-2">تا</Form.Label>
                <Col className="m-0 p-0 col-12 d-flex align-items-center justify-content-between notes-round date--picker--desktop--addOrder">
                  <DatePicker
                    {...register("endDate")}
                    format="MM/DD/YYYY"
                    inputClass="search-input"
                    // className="rmdp-mobile"
                    calendar="persian"
                    locale="fa"
                    value={getValues("endDate")}
                    calendarPosition="auto-right"
                    editable={false}
                    animation
                    onChange={(value) => submitCalendar(value, "endDate")}
                  />
                  <Col className="m-0 p-0 col-2 d-flex align-items-center justify-content-end">
                    <img
                      src={closeDatePickerIcon}
                      className="m-0 p-0  cursor-pointer"
                      onClick={(e) => {
                        setValue("endDate", null);
                      }}
                      height="20px"
                      className="ps-2"
                      alt="down-icon"
                    />
                  </Col>
                </Col>
              </Form.Group>
            </Col>
          </Row>
          {props.status && props.status == 3 && (
            <Row className="my-3 justify-content-between">
              <Col className="col-6 order-filter-input">
                <Form.Group className="ms-2">
                  <Form.Label className="pe-2">تاریخ پیگیری از</Form.Label>
                  <Col className="m-0 p-0 col-12 d-flex align-items-center justify-content-between notes-round date--picker--desktop--addOrder">
                    <DatePicker
                      {...register("startTrackingTime")}
                      format="MM/DD/YYYY"
                      inputClass="search-input"
                      // className="rmdp-mobile"
                      calendar="persian"
                      locale="fa"
                      value={getValues("startTrackingTime")}
                      calendarPosition="auto-right"
                      editable={false}
                      animation
                      onChange={(value) =>
                        submitCalendar(value, "startTrackingTime")
                      }
                    />
                    <Col className="m-0 p-0 col-2 d-flex align-items-center justify-content-end">
                      <img
                        src={closeDatePickerIcon}
                        className="m-0 p-0  cursor-pointer"
                        onClick={(e) => {
                          setValue("startTrackingTime", null);
                        }}
                        height="20px"
                        className="ps-2"
                        alt="down-icon"
                      />
                    </Col>
                  </Col>
                </Form.Group>
              </Col>
              <Col className="col-6 order-filter-input">
                <Form.Group className="me-2">
                  <Form.Label className="pe-2">تا</Form.Label>
                  <Col className="m-0 p-0 col-12 d-flex align-items-center justify-content-between notes-round date--picker--desktop--addOrder">
                    <DatePicker
                      {...register("endTrackingTime")}
                      format="MM/DD/YYYY"
                      inputClass="search-input"
                      // className="rmdp-mobile"
                      calendar="persian"
                      locale="fa"
                      value={getValues("endTrackingTime")}
                      calendarPosition="auto-right"
                      editable={false}
                      animation
                      onChange={(value) =>
                        submitCalendar(value, "endTrackingTime")
                      }
                    />
                    <Col className="m-0 p-0 col-2 d-flex align-items-center justify-content-end">
                      <img
                        src={closeDatePickerIcon}
                        className="m-0 p-0  cursor-pointer"
                        onClick={(e) => {
                          setValue("endTrackingTime", null);
                        }}
                        height="20px"
                        className="ps-2"
                        alt="down-icon"
                      />
                    </Col>
                  </Col>
                </Form.Group>
              </Col>
            </Row>
          )}
          <Row className="px-2 mt-4">
            {orderLoading ? (
              <Button
                className="fw-bold order-submit btn-dark-blue border-0 w-100 notes-round d-flex align-items-center justify-content-center py-2"
                size="lg"
                type="submit"
                block
                disabled
              >
                <CircularProgress color="#fff" size={29} />
              </Button>
            ) : (
              <Button
                className="fw-bold order-submit btn-dark-blue border-0 w-100 mt-4 notes-round"
                size="lg"
                type="submit"
                block
              >
                جست و جو
              </Button>
            )}
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
