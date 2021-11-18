import React, { useState, useRef, useEffect } from "react";
import {
  Modal,
  Row,
  Col,
  Form,
  Button,
  Dropdown,
  Alert,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
// Actions
import { reminderActions } from "../../../actions";
// Form Validator
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// Date Picker Components
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";

import moment from "jalali-moment";
import persianJs from "persianjs/persian.min";
// Icons
import closeIcon from "../../assets/images/close.svg";
import followUpDateBlueIcon from "../../assets/images/order/follow-up-date-blue.svg";
// Components
import { CircularProgress } from "@material-ui/core";

// Validation Schema Form
const validationSchema = yup.object().shape({
  // .min(new Date())
  date: yup.date(),
  name: yup.string().required(),
  description: yup.string(),
});

export const AddReminder = ({ isPersonal, isCallBack = false, ...props }) => {
  const {
    register,
    setValue,
    getValues,
    reset,
    watch,
    trigger,
    formState: { errors },
  } = useForm({
    mode: "all",
    criteriaMode: "all",
    resolver: yupResolver(validationSchema),
  });
  const dispatch = useDispatch();

  const refDatePicker = useRef();

  const { loading: addReminderLoading, data: addReminderData } = useSelector(
    (state) => state.addReminder
  );

  const submitCalendar = (value) => {
    let date = `${value.year}/${value.month.number}/${value.day} ${value.hour}:${value.minute}`;
    setValue(
      "date",
      new Date(
        moment.from(date, "fa", "YYYY/M/D HH:mm").format("YYYY-MM-D HH:mm:ss")
      ).toISOString()
    );
  };
  let formHandler = async () => {
    let result = await trigger();
    if (result == false) {
      return;
    }
    let paramsForm = getValues();
    let param = {
      name: paramsForm.name,
      description: paramsForm.description,
      date: paramsForm.date,
    };
    if (isPersonal == true) {
      param.typeReminder = 0;
    } else if (isPersonal == false) {
      param.typeReminder = props.aditional.typeReminder;
      param.referenceId = props.aditional.referenceId;
    }

    dispatch(reminderActions.addReminder(param));
  };

  useEffect(() => {
    if (addReminderLoading == false && addReminderData.success) {
      if (isCallBack) {
        props.dispatchCallBack();
      }
      props.onHide(false);
    }
  }, [addReminderLoading]);

  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className={` mx-3 follow--up--date--modal `}
    >
      <Modal.Body className="add-product px-4">
        <Button
          className="border-0 customer-modal-close--desktop"
          type="button"
          onClick={() => {
            reset({
              name: null ,
              description: null,
              date: null
            });
            props.onHide(false);
          }}
        >
          <img
            className="d-flex m-auto customer-modal-close-svg--desktop"
            src={closeIcon}
            alt="close-btn"
          />
        </Button>
        <Row className="h-100 d-flex flex-column justify-content-center align-items-center ">
          {/* <Col className=" add-order-input--desktop d-flex justify-content-center align-items-end ">
            <Form.Group className="p--relative" style={{ width: "65%" }}>
              <Form.Label className="pb-3 " style={{ fontSize: "15px" }}>
                تاریخ پیگیری بعدی
              </Form.Label>
              <Col className="m-0 p-0 col-12 d-flex align-items-center justify-content-between notes-round date--picker--desktop--addOrder">
                <DatePicker
                  format="DD/MMMM/YYYY"
                  inputClass="pick--date--order--input"
                  {...register("trackingTime")}
                  ref={refDatePicker}
                  calendar="persian"
                  locale="fa"
                  editable={false}
                  animation
                  minDate={new Date().setDate(new Date().getDate() + 1)}
                  calendarPosition="top"
                  onChange={(value) => submitCalendar(value, "duration")}
                  className=""
                />
                <Col className="m-0 p-0 col-2 d-flex align-items-center justify-content-end">
                  <img
                    src={followUpDateBlueIcon}
                    className="m-0 p-0  cursor-pointer"
                    onClick={(e) => {
                      isDatePickerOpen
                        ? refDatePicker.current.closeCalendar()
                        : refDatePicker.current.openCalendar();
                      setIsDatePickerOpen(!isDatePickerOpen);
                    }}
                    height="30px"
                    className="ps-2 cursor-pointer"
                    alt="down-icon"
                  />
                </Col>
              </Col>
            </Form.Group>
          </Col> */}

          <Form.Group>
            <Form.Label className="me-3">نام</Form.Label>
            <Form.Control
              className="order-input notes-round"
              type="text"
              name="name"
              {...register("name")}
              isInvalid={errors?.name ? true : false}
              isValid={
                Object.keys(errors).length != 0 &&
                errors?.name == undefined &&
                true
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="me-3">توضیحات</Form.Label>
            <Form.Control
              className="order-input notes-round"
              type="text"
              name="description"
              {...register("description")}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="me-3">تاریخ یادآور</Form.Label>
            <DatePicker
              format="DD/MMMM/YYYY"
              inputClass="pick--date--order--input"
              {...register("date")}
              ref={refDatePicker}
              calendar="persian"
              locale="fa"
              editable={false}
              animation
              // minDate={new Date().setDate(new Date().getDate() + 1)}
              calendarPosition="top"
              onChange={(value) => submitCalendar(value)}
              className=""
            />
          </Form.Group>

          <Col className="m-0 p-0 d-flex justify-content-center align-items-end mb-2">
            {addReminderLoading ? (
              <Button
                className="fw-bold order--btn order-submit--desktop border-0 w-100  d-flex justify-content-center align-items-center"
                size="lg"
                type="submit"
                disabled
              >
                <CircularProgress className="text-light" size="25px" />
                <span className="me-3"> در حال ثبت ...</span>
              </Button>
            ) : (
              <Button
                className="fw-bold order--btn order-submit--desktop border-0 w-100 "
                size="lg"
                type="submit"
                block
                onClick={() => formHandler()}
              >
                ثبت
              </Button>
            )}
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};
