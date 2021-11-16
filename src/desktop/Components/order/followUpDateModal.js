import React, { useState, useRef } from "react";
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

// Validation Schema Form
const validationSchema = yup.object().shape({
  trackingTime: yup.date().min(new Date()) ,
});

export const FollowUpDateModal = (props) => {
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

  const refDatePicker = useRef();
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const submitCalendar = (value, name) => {
    let date = `${value.year}/${value.month.number}/${value.day} ${value.hour}:${value.minute}`;
    setValue(
      "trackingTime",
      new Date(
        moment.from(date, "fa", "YYYY/M/D HH:mm").format("YYYY-MM-D HH:mm:ss")
      ).toISOString()
    );
  };
console.log(watch("trackingTime"))

  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className={` mx-3 follow--up--date--modal `}
    >
      {/*  ${
          failureReason ? "modal--result--Order--failure" : null
        } */}
      <Modal.Body className="add-product px-4">
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
        <Row className="h-100 d-flex flex-column justify-content-center align-items-center ">
          <Col className=" add-order-input--desktop d-flex justify-content-center align-items-end ">
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
                //   plugins={[<TimePicker position="bottom" hideSeconds />]}
                  calendar="persian"
                  locale="fa"
                  editable={false}
                  animation
                  minDate={new Date()}
                  calendarPosition="top"
                  //   fixMainPosition="top"
                  //   value={getValues("duration")}
                    onChange={(value) =>
                      submitCalendar(value, "duration")
                    }
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
          </Col>
          <Col className="m-0 p-0 d-flex justify-content-center align-items-end mb-2">
            <Button
              className="fw-bold order--btn order-submit--desktop border-0 w-100 "
              size="lg"
              type="submit"
              block
              //   onClick={() => failure()}
            >
              ثبت
            </Button>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};
