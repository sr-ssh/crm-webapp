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
      if (paramsForm[x] == "") {
        delete paramsForm[x];
      }
    }
    debugger
    dispatch(
      orderActions.getOrders({
        ordersStatus: props.status || "0",
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

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="mx-3 order-serach-modal--medium"
    >
      <Modal.Body className="order-filter-body">
        <Button
          className="border-0 customer-modal-close--desktop"
          type="button"
          onClick={handleClose}
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
                <DatePicker
                  {...register("startDate")}
                  format="MM/DD/YYYY"
                  inputClass="search-input"
                  // className="rmdp-mobile"
                  calendar="persian"
                  locale="fa"
                  // value={
                  //   filters.startDate &&
                  //   filters.startDate !== "1900-01-01T05:42:13.845Z" &&
                  //   moment(filters.startDate, "YYYY-MM-DD")
                  //     .locale("fa")
                  //     .format("YYYY/MM/DD")
                  // }
                  calendarPosition="auto-right"
                  editable={false}
                  animation
                  onChange={(value) => submitCalendar(value, "startDate")}
                />
              </Form.Group>
            </Col>
            <Col className="col-6 order-filter-input">
              <Form.Group className="me-2">
                <Form.Label className="pe-2">تا</Form.Label>
                <DatePicker
                  {...register("endDate")}
                  format="MM/DD/YYYY"
                  inputClass="search-input"
                  // className="rmdp-mobile"
                  calendar="persian"
                  locale="fa"
                  // value={
                  //   filters.endDate &&
                  //   filters.endDate !== "1900-01-01T05:42:13.845Z" &&
                  //   moment(filters.endDate, "YYYY-MM-DD")
                  //     .locale("fa")
                  //     .format("YYYY/MM/DD")
                  // }
                  calendarPosition="auto-right"
                  editable={false}
                  animation
                  onChange={(value) => submitCalendar(value, "endDate")}
                />
              </Form.Group>
            </Col>
          </Row>
          {props.status && props.status == 3 && (
            <Row className="my-3 justify-content-between">
              <Col className="col-6 order-filter-input">
                <Form.Group className="ms-2">
                  <Form.Label className="pe-2">تاریخ پیگیری از</Form.Label>
                  <DatePicker
                    {...register("startTrackingTime")}
                    format="MM/DD/YYYY"
                    inputClass="search-input"
                    // className="rmdp-mobile"
                    calendar="persian"
                    locale="fa"
                    // value={
                    //   filters.startTrackingTime &&
                    //   filters.startTrackingTime !== "1900-01-01T05:42:13.845Z" &&
                    //   moment(filters.startTrackingTime, "YYYY-MM-DD")
                    //     .locale("fa")
                    //     .format("YYYY/MM/DD")
                    // }
                    calendarPosition="auto-right"
                    editable={false}
                    animation
                    onChange={(value) =>
                      submitCalendar(value, "startTrackingTime")
                    }
                  />
                </Form.Group>
              </Col>
              <Col className="col-6 order-filter-input">
                <Form.Group className="me-2">
                  <Form.Label className="pe-2">تا</Form.Label>
                  <DatePicker
                    {...register("startTrackingTime")}
                    format="MM/DD/YYYY"
                    inputClass="search-input"
                    // className="rmdp-mobile"
                    calendar="persian"
                    locale="fa"
                    // value={
                    //   filters.endTrackingTime &&
                    //   filters.endTrackingTime !== "1900-01-01T05:42:13.845Z" &&
                    //   moment(filters.endTrackingTime, "YYYY-MM-DD")
                    //     .locale("fa")
                    //     .format("YYYY/MM/DD")
                    // }
                    calendarPosition="auto-right"
                    editable={false}
                    animation
                    onChange={(value) =>
                      submitCalendar(value, "endTrackingTime")
                    }
                  />
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
