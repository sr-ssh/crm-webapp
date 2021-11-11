import React, { useState, useEffect, useRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Form, Button, Row, Col, Spinner } from "react-bootstrap";
// Date Picker Components
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";

import moment from "jalali-moment";
import persianJs from "persianjs/persian.min";

// Form Validator
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Actions
import { alertActions } from "../../../actions/alertActions";
import { orderActions, customerActions } from "../../../actions";

// Components
import { Basket } from "./basket";
import { AddNotesModal } from "./addNotesModal";
import { Header } from "../base/header";
import { ModalContinueProcessesAddOrder } from "./modalContinueProcesses";
import { SupportAddOrder } from "../support/supportAddOrder";

// Assets
import downloadIcon from "../../assets/images/download.svg";
import addIcon from "../../assets/images/order/add.svg";
import closeDatePickerIcon from "../../assets/images/order/closeDatePicker.svg";

// Validation Schema Form
const validationSchema = yup.object().shape({
  customer: yup.object({
    family: yup.string().required(),
    phoneNumber: yup.string().required().min(1),
    company: yup.string(),
  }),
  seller: yup.object({
    family: yup.string(),
    mobile: yup.string(),
  }),
  address: yup.string(),
  mobile: yup.string(),
  duration: yup.date(),
  reminder: yup.string(),
});

export const AddOrder = (props) => {
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
  const [validated, setValidated] = useState(false);
  const [mobileValidated, setMobileValidated] = useState(false);
  const [nameValidated, setNameValidated] = useState(false);
  const [order, insertOrder] = useState([]);
  const [customer, setCustomer] = useState({});
  const [totalPrice, insertPrice] = useState("0");
  const [selectedItem, setItem] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState([]);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [modalContinueProcesses, setModalContinueProcesses] = useState(false);
  const [dialogSuppot, setDialogSuppot] = useState(false);

  const dispatch = useDispatch();
  let oldCustomer = useSelector((state) => state.getCustomer.customer);
  let { loading } = useSelector((state) => state.getCustomer);
  let addOrderLoading = useSelector((state) => state.addOrder.loading);
  let addOrder = useSelector((state) => state.addOrder);
  const sideBar = useSelector((state) => state.sideBar);
  let mobileHandler = (value) => {
    const number = value;
    // const patt = /^(09)(\d{9})/m;
    // patt.test(number) &&
    let res = number.length === 11;
    if (res) {
      setMobileValidated(false);
      return value;
    } else return undefined;
  };
  let nameHandler = (value) => {
    const name = value;
    const patt = /^[آ-یa-zA-Z ]+$/;
    let res = patt.test(name);
    if (res) {
      setNameValidated(false);
      return value;
    } else return undefined;
  };
  let handleOldCustomer = (e) => {
    e.preventDefault();
    if (customer.mobile) dispatch(customerActions.getCustomer(customer.mobile));
    else setMobileValidated(true);
  };

  let handleChange = (e) => {
    e.preventDefault();
    let { value, id, type, name } = e.target;

    if (name === "mobile") {
      value = value
        ? mobileHandler(persianJs(value).toEnglishNumber().toString())
        : undefined;
    }
    if (name === "family") {
      value = nameHandler(value);
    }
    setCustomer({ ...customer, [name]: value });
  };

  let formHandler = async (e) => {
    e.preventDefault();
    let values = getValues();
    if (values.customer.phoneNumber == "" || values.customer.family == "") {
      return;
    } else if (order.length < 1) {
      dispatch(alertActions.error("لیست سفارشات خالی است"));
      setTimeout(() => {
        dispatch(alertActions.clear());
      }, 1500);
      return;
    }
    for (let x in values) {
      if (x == "customer") {
        values[x].phoneNumber = values[x].phoneNumber.replaceAll(/\s/g, "");
        values[x].mobile = persianJs(values[x].phoneNumber)
          .toEnglishNumber()
          .toString();
        delete values[x].phoneNumber;
      } else if (x == "seller") {
        values[x].mobile = values[x].mobile.replaceAll(/\s/g, "");
        values[x].mobile = values[x].mobile
          ? persianJs(values[x].mobile).toEnglishNumber().toString()
          : "";
      } else if (x == "mobile" || x == "reminder") {
        values[x] = values[x].replaceAll(/\s/g, "");
        values[x] = values[x]
          ? persianJs(values[x]).toEnglishNumber().toString()
          : "";
      }
    }

    dispatch(
      orderActions.addOrder(
        order,
        {
          ...values.customer,
          duration: "",
          reminder: values.reminder,
          address: values.address,
          guestMobile: values.mobile,
        },
        values.seller,
        notes,
        0
      )
    );
  };
  let noteHandler = (e) => {
    if (notes.length > 0) {
      dispatch(alertActions.error("بیشتر از یک یادداشت مجاز نیست"));
      setTimeout(() => {
        dispatch(alertActions.clear());
      }, 1100);
    } else setShowNotesModal(true);
  };

  function clearInputes() {
    reset();
    setCustomer({
      mobile: "",
      address: "",
      family: "",
      reminder: "",
      duration: "",
      company: "",
      lastAddress: "",
    });
    insertOrder([]);
    setNotes([]);
    insertPrice("0");
    setItem("");
    setQuantity(1);
    oldCustomer = null;
  }

  useEffect(() => {
    if (oldCustomer?.mobile)
      setCustomer({
        ...customer,
        ...oldCustomer,
        address: oldCustomer.lastAddress,
      });
  }, [oldCustomer]);

  useEffect(() => {
    if (addOrderLoading == false && addOrder.error?.dialogTrigger == true) {
      setModalContinueProcesses(true);
    } else if (
      addOrderLoading == false &&
      addOrder.error?.dialogTrigger == undefined
    ) {
      clearInputes();
    }
  }, [addOrderLoading]);

  useEffect(() => {
    if (props.location?.state?.mobile) {
      setValue("customer.phoneNumber", props.location.state?.mobile, {
        shouldValidate: true,
      });
      if (props.location?.state.family != "") {
        setValue("customer.family", props.location.state?.family, {
          shouldValidate: true,
        });
      }
    }
  }, []);

  const submitCalendar = (value, name) => {
    let date = `${value.year}/${value.month.number}/${value.day} ${value.hour}:${value.minute}`;
    setValue(
      "duration",
      new Date(
        moment.from(date, "fa", "YYYY/M/D HH:mm").format("YYYY-MM-D HH:mm:ss")
      ).toISOString()
    );
  };

  useMemo(() => {
    let phoneNumberCustomer = watch("customer.phoneNumber");
    let regEx = /^[۰۱۲۳۴۵۶۷۸۹0123456789]{11}$/;
    let res = regEx.test(phoneNumberCustomer);
    if (res) {
      setValue("mobile", phoneNumberCustomer, {
        shouldValidate: true,
      });
    }
  }, [watch("customer.phoneNumber")]);

  return (
    <>
      <Header isBTNSearch={false} isBTNRequest={false} />
      <div
        className="order-page--desktop margin--top--header "
        style={{ paddingRight: sideBar.open ? "250px" : 0 }}
      >
        <Container fluid className="pt-3 px-3 m-0">
          <Form
            onSubmit={formHandler}
            noValidate
            className="d-flex flex-column align-items-center"
          >
            <Row className="d-flex flex-column mb-3" style={{ width: "90%" }}>
              <Row className="col-12 m-0 p-0 mt-2 order-inputs d-flex flex-row justify-content-between align-items-center">
                <Col className="col-3 add-order-input--desktop">
                  <Form.Group className="p--relative">
                    <Form.Label className="me-3">شماره مشتری</Form.Label>
                    <Form.Control
                      className="order-input notes-round"
                      type="tel"
                      {...register("customer.phoneNumber")}
                      inputMode="tel"
                      isInvalid={errors?.customer?.phoneNumber ? true : false}
                      isValid={
                        Object.keys(errors).length != 0 &&
                        errors?.customer?.phoneNumber == undefined &&
                        true
                      }
                    />
                    {loading ? (
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
                    )}
                  </Form.Group>
                </Col>
                <Col className=" col-3 add-order-input--desktop">
                  <Form.Group>
                    <Form.Label className="me-3 text-nowrap">
                      شماره همراه مشتری
                    </Form.Label>
                    <Form.Control
                      className="order-input notes-round"
                      type="tel"
                      {...register("mobile")}
                    />
                  </Form.Group>
                </Col>
                <Col className=" col-3  add-order-input--desktop">
                  <Form.Group>
                    <Form.Label className="me-3">نام مشتری </Form.Label>
                    <Form.Control
                      className="order-input notes-round"
                      type="text"
                      id="customer"
                      name="family"
                      {...register("customer.family")}
                      isInvalid={errors?.customer?.family ? true : false}
                      isValid={
                        Object.keys(errors).length != 0 &&
                        errors?.customer?.family == undefined &&
                        true
                      }
                    />
                  </Form.Group>
                </Col>
                <Col className=" col-3 add-order-input--desktop">
                  <Form.Group>
                    <Form.Label className="me-3">نام مجموعه</Form.Label>
                    <Form.Control
                      className="order-input notes-round"
                      type="text"
                      id="customer"
                      name="company"
                      {...register("customer.company")}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="col-12 m-0 p-0 mt-5 order-inputs d-flex flex-row  align-items-center">
                <Col className=" col-3 add-order-input--desktop">
                  <Form.Group>
                    <Form.Label className="me-3">شماره فروشنده</Form.Label>
                    <Form.Control
                      className="order-input notes-round"
                      type="text"
                      id="seller"
                      name="mobile"
                      {...register("seller.mobile")}
                    />
                  </Form.Group>
                </Col>
                <Col className=" col-3  add-order-input--desktop">
                  <Form.Group>
                    <Form.Label className="me-3">نام فروشنده</Form.Label>
                    <Form.Control
                      className="order-input notes-round"
                      type="text"
                      id="seller"
                      name="family"
                      {...register("seller.family")}
                    />
                  </Form.Group>
                </Col>
                <Col className="col-6  add-order-input--desktop">
                  <Form.Group>
                    <Form.Label className="me-3">آدرس</Form.Label>
                    <Form.Control
                      className="order-input notes-round"
                      type="text"
                      name="address"
                      {...register("address")}
                      onChange={handleChange}
                      isInvalid={false}
                      isValid={false}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="col-12 m-0 mt-5 basketContainer">
                {/* <Form.Label className="me-2 mt-1">سبد خرید</Form.Label> */}
                <Col>
                  <Basket
                    order={order}
                    insertOrder={insertOrder}
                    totalPrice={totalPrice}
                    insertPrice={insertPrice}
                    selectedItem={selectedItem}
                    setItem={setItem}
                    quantity={quantity}
                    setQuantity={setQuantity}
                  />
                </Col>
              </Row>
              <Row className="m-0 p-0 mt-4">
                <Col className="mt-3 w-100">
                  <Button
                    className={`d-flex flex-row w-100 align-items-center justify-content-center btn--add--note--desktop--addOrder notes-round  `}
                    onClick={noteHandler}
                  >
                    {notes.length > 0 ? (
                      <>
                        <span className="me-1 fw-bold ms-3">
                          {notes[0].text}
                        </span>
                      </>
                    ) : (
                      <>
                        <img
                          className="me-3"
                          src={addIcon}
                          height="25px"
                          alt="edit-icon"
                        />
                        <span className="me-1 fw-bold ms-3">اضافه یادداشت</span>
                      </>
                    )}
                  </Button>
                </Col>
              </Row>
              <Row className="m-0 p-0 align-self-start flex-row mt-4">
                <Col
                  className="d-flex flex-row align-items-center"
                  style={{ height: "fit-content" }}
                >
                  <Col className="m-0 col-6 order-inputs">
                    <Form.Group className="p--relative">
                      <Form.Label className="pe-1 text-nowrap">
                        تاریخ استفاده (آماده سازی)
                      </Form.Label>
                      <Col className="m-0 p-0 col-12 d-flex align-items-center bg-light notes-round">
                        <DatePicker
                          format="MM/DD/YYYY HH:mm:ss"
                          inputClass="pick--date--order--input"
                          {...register("duration")}
                          ref={refDatePicker}
                          plugins={[
                            <TimePicker position="bottom" hideSeconds />,
                          ]}
                          calendar="persian"
                          locale="fa"
                          editable={false}
                          animation
                          minDate={new Date()}
                          calendarPosition="bottom-right"
                          value={getValues("duration")}
                          onChange={(value) =>
                            submitCalendar(value, "duration")
                          }
                        />
                        <Col className="m-0 p-0 col-2">
                          <img
                            src={closeDatePickerIcon}
                            className="m-0 p-0  cursor-pointer"
                            onClick={(e) => reset({ duration: null })}
                            height="20px"
                            alt="down-icon"
                          />
                        </Col>
                      </Col>
                    </Form.Group>
                  </Col>
                </Col>
                <Col
                  className="d-flex flex-row align-items-center justify-content-start"
                  style={{ height: "fit-content" }}
                >
                  <Col className="m-0 col-6 order-inputs">
                    <Form.Group>
                      <Form.Label className="pe-1">تاریخ یادآوری</Form.Label>
                      <Form.Control
                        className="text-center order-input notes-round"
                        type="tel"
                        name="reminder"
                        {...register("reminder")}
                      />
                    </Form.Group>
                  </Col>
                  <Col
                    xs={2}
                    className="align-self-center m-0 mt-4 col-2 text-center  order-input"
                  >
                    <span className="fs-7 text-muted fw-bold">روز دیگر</span>
                  </Col>
                </Col>
              </Row>
              <Row className="m-0 mt-4 justify-content-center w-100 pt-4">
                {addOrderLoading ? (
                  <Col className="col-7 m-0 p-0 ps-3">
                    <Button
                      className="fw-bold order--btn order-submit--desktop border-0 w-100 notes-round d-flex justify-content-center align-items-center"
                      size="lg"
                      type="submit"
                      disabled
                    >
                      <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="ms-3"
                      />
                      در حال ثبت ...
                    </Button>
                  </Col>
                ) : (
                  <>
                    <Col className="col-7 m-0 p-0 ps-3">
                      <Button
                        className="fw-bold order--btn order-submit--desktop border-0 w-100 notes-round"
                        size="lg"
                        type="submit"
                        block
                        onClick={formHandler}
                      >
                        ثبت
                      </Button>
                    </Col>
                  </>
                )}
                <Col className="col-5 m-0 p-0 pe-3">
                  <Button
                    className="order--btn border-0 w-100 btn-secondary order--sale--opportunity notes-round"
                    id="saleOpprotunity"
                    size="lg"
                    type="submit"
                    block
                    onClick={(e) => setDialogSuppot(true)}
                  >
                    پشتیبانی
                  </Button>
                </Col>
              </Row>
            </Row>
          </Form>
        </Container>
        <AddNotesModal
          show={showNotesModal}
          onHide={() => {
            setShowNotesModal(false);
          }}
          setNotes={setNotes}
        />
        <ModalContinueProcessesAddOrder
          show={modalContinueProcesses}
          onHide={() => {
            setModalContinueProcesses(false);
          }}
          order={order}
          customer={getValues()}
          notes={notes}
          clearInputes={clearInputes}
        />
        <SupportAddOrder
          open={dialogSuppot}
          handleClose={() => setDialogSuppot(false)}
        />
      </div>
    </>
  );
};
