import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Spinner,
  Dropdown,
} from "react-bootstrap";
import "react-multi-date-picker/styles/layouts/mobile.css";
import persianJs from "persianjs/persian.min";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import moment from "jalali-moment";

// Actions
import { alertActions } from "../../../actions/alertActions";
import { orderActions, customerActions } from "../../../actions";

// Components
import { Header } from "../base/header2";
import { Basket } from "./basket";
import { AddNotesModal } from "./addNotesModal";
import { ModalContinueProcessesAddOrder } from "./modalContinueProcesses";
import { SupportAddOrder } from "../support/supportAddOrder";
import { AddReminder } from "../reminder/addReminder";

// Assets
import downloadIcon from "../../assets/images/download.svg";
import addIcon from "../../assets/images/order/add-blue.svg";
import closeDatePickerIcon from "../../assets/images/order/closeDatePicker.svg";
import lowPriorityIcon from "./../../assets/images/order/priority/low.svg";
import mediumPriorityIcon from "./../../assets/images/order/priority/medium.svg";
import highPriorityIcon from "./../../assets/images/order/priority/high.svg";
import spinnerIcon from "./../../assets/images/sppiner.svg";
import reminderIcon from "./../../assets/images/reminder.svg";

import { PriorityDropdown } from "./priorityDropdown";

export const AddOrder = (props) => {
  const [validated, setValidated] = useState(false);
  const [mobileValidated, setMobileValidated] = useState(false);
  const [nameValidated, setNameValidated] = useState(false);
  const [modalContinueProcesses, setModalContinueProcesses] = useState(false);
  const [order, insertOrder] = useState([]);
  const [customer, setCustomer] = useState({
    mobile: "",
    family: "",
    company: "",
    duration: "",
    reminder: "",
    address: "",
    guestMobile: "",
  });
  const [seller, setSeller] = useState({ mobile: "", family: "" });
  const [totalPrice, insertPrice] = useState("0");
  const [selectedItem, setItem] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState([]);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const dispatch = useDispatch();
  let { loading: getCustomerLoading, customer: oldCustomer } = useSelector(
    (state) => state.getCustomer
  );
  let addOrderLoading = useSelector((state) => state.addOrder.loading);
  const [dialogSupport, setDialogSupport] = useState(false);
  let addOrder = useSelector((state) => state.addOrder);
  const refDatePicker = useRef();
  console.log(oldCustomer);
  const [dimStatus, setDimStatus] = useState(false);
  const [priSselectedItem, setPrioItem] = useState("");
  const [addReminderModal, setAddReminderModal] = useState(false);
  const [reminderInfo, setReminderInfo] = useState();

  const handleDropdown = (n, name) => {
    setCustomer({ ...customer, priority: n });
    setPrioItem(name);
  };

  const submitCalendar = (value, name) => {
    let date = `${value.year}/${value.month.number}/${value.day} ${value.hour}:${value.minute}`;
    setCustomer({
      ...customer,
      duration: new Date(
        moment.from(date, "fa", "YYYY/M/D HH:mm").format("YYYY-MM-D HH:mm:ss")
      ).toISOString(),
    });
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

    let value = e.target.value;
    let name = e.target.name;
    let id = e.target.id;

    if (name === "mobile" || name === "guestMobile") {
      value = value ? persianJs(value).toEnglishNumber().toString() : undefined;
    }
    if (name === "family") {
      value = nameHandler(value);
    }
    if (id === "seller") {
      setSeller({ ...seller, [name]: value });
    } else {
      setCustomer({ ...customer, [name]: value });
    }
  };
  useEffect(() => {
    if (customer.mobile == undefined || customer.mobile == "") {
      return;
    }
    const patt = /^((09)|(۰۹))[0123456789۰۱۲۳۴۵۶۷۸۹]{9}$/;
    let res = patt.test(customer.mobile);
    if (res) {
      setCustomer({ ...customer, guestMobile: customer.mobile });
    }
  }, [customer.mobile]);

  let formHandler = (e) => {
    e.preventDefault();
    if (order.length && customer.family && customer.mobile) {
      dispatch(orderActions.addOrder(order, customer, seller, notes, 0 , { ...reminderInfo }));
    } else {
      if (customer.mobile && customer.family && !order.length)
        dispatch(alertActions.error("لیست سفارشات خالی است"));
      setTimeout(() => {
        dispatch(alertActions.clear());
      }, 1500);
      console.log("empty order can not be sent");
      setValidated(true);
    }
  };
  function clearInputes() {
    setCustomer({
      mobile: "",
      address: "",
      family: "",
      reminder: "",
      duration: "",
      company: "",
      lastAddress: "",
      guestMobile: "",
      priority: 0,
    });
    setSeller({
      mobile: "",
      family: "",
    });
    insertOrder([]);
    setNotes([]);
    insertPrice("0");
    setItem("");
    setQuantity(1);
    oldCustomer = null;
    setPrioItem("");
    setReminderInfo()
  }
  let noteHandler = (e) => {
    if (notes.length > 0) {
      dispatch(alertActions.error("بیشتر از یک یادداشت مجاز نیست"));
      setTimeout(() => {
        dispatch(alertActions.clear());
      }, 1100);
    } else setShowNotesModal(true);
  };

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
      setCustomer({ ...customer, ...props.location.state });
    }
  }, []);

  useEffect(() => {
    if (
      getCustomerLoading == false &&
      oldCustomer?.status !== false &&
      oldCustomer &&
      (Object.keys(oldCustomer?.customer).length > 0 ||
        Object.keys(oldCustomer?.seller).length > 0)
    ) {
      if (
        oldCustomer.customer &&
        Object.keys(oldCustomer.customer).length > 0
      ) {
        setCustomer({
          ...customer,
          family: oldCustomer.customer.family,
          address: oldCustomer.customer.lastAddress,
          company: oldCustomer.customer.company,
        });
      }
      if (oldCustomer.seller && Object.keys(oldCustomer.seller).length > 0) {
        setSeller({
          ...seller,
          family: oldCustomer.seller.family,
          mobile: oldCustomer.seller.mobile,
        });
      }
    }
  }, [getCustomerLoading]);

  return (
    <div className="order-page">
      <Header title="ثبت سفارش" backLink="/dashboard" />
      <Container fluid className="pt-3 px-3 m-0">
        <Form onSubmit={formHandler} noValidate>
          <Row
            className="mx-0 p-0 order-inputs"
            style={{ marginBottom: "-34px" }}
          >
            <Col className="p-0 col-5 add-order-input">
              <Form.Group className="p--relative">
                <Form.Label className="pe-2">شماره مشتری</Form.Label>
                <Form.Control
                  className="order-input"
                  type="tel"
                  inputMode="tel"
                  pattern="[0-9]*"
                  name="mobile"
                  isInvalid={
                    (!customer.mobile && validated) || (mobileValidated && true)
                  }
                  isValid={
                    (customer.mobile && validated) ||
                    (mobileValidated && customer.mobile && true)
                  }
                  onChange={handleChange}
                  value={customer.mobile}
                  required
                />
                {getCustomerLoading ? (
                  <Spinner
                    as="div"
                    variant="primary"
                    animation="border"
                    size="sm"
                    className="add-order-download-btn-loading"
                  />
                ) : (
                  <img
                    src={downloadIcon}
                    className="add-order-download-btn p-1"
                    onClick={(e) => handleOldCustomer(e)}
                    height="33vh"
                    width="50vw"
                    alt="down-icon"
                  />
                )}
              </Form.Group>
            </Col>

            <Col className="p-0 col-5 me-auto add-order-input">
              <Form.Group>
                <Form.Label className="pe-2">شماره همراه مشتری</Form.Label>
                <Form.Control
                  className="order-input"
                  type="tel"
                  inputMode="tel"
                  pattern="[0-9]*"
                  name="guestMobile"
                  onChange={handleChange}
                  value={customer.guestMobile}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="m-0 p-0 mt-5 order-inputs">
            <Col className="p-0 col-5 add-order-input">
              <Form.Group>
                <Form.Label className="pe-2">نام مشتری</Form.Label>
                <Form.Control
                  className="order-input"
                  type="text"
                  name="family"
                  onChange={handleChange}
                  isInvalid={
                    (!customer.family && validated) || (nameValidated && true)
                  }
                  isValid={
                    (customer.family && validated) ||
                    (nameValidated && customer.family && true)
                  }
                  value={customer.family}
                  required
                />
              </Form.Group>
            </Col>
            <Col className="p-0 col-5 me-auto add-order-input">
              <Form.Group controlId="birthday">
                <Form.Label className="pe-2">نام مجموعه</Form.Label>
                <Form.Control
                  className="order-input"
                  type="text"
                  name="company"
                  onChange={handleChange}
                  value={customer.company}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="m-0 p-0 mt-3 order-inputs">
            <Col className="p-0 col-5 add-order-input">
              <Form.Group controlId="seller">
                <Form.Label className="pe-2">شماره فروشنده</Form.Label>
                <Form.Control
                  className="order-input"
                  type="tel"
                  inputMode="tel"
                  pattern="[0-9]*"
                  name="mobile"
                  onChange={handleChange}
                  value={seller.mobile}
                />
              </Form.Group>
            </Col>
            <Col className="p-0 col-5 me-auto add-order-input">
              <Form.Group controlId="seller">
                <Form.Label className="pe-2">نام فروشنده</Form.Label>
                <Form.Control
                  className="order-input"
                  type="text"
                  name="family"
                  onChange={handleChange}
                  value={seller.family}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="m-0 p-0 mt-3 order-inputs">
            <Col className="p-0 add-order-input">
              <Form.Group controlId="address">
                <Form.Label className="pe-2">آدرس</Form.Label>
                <Form.Control
                  className="order-input"
                  as="textarea"
                  rows="5"
                  name="address"
                  onChange={handleChange}
                  value={customer.address}
                  style={{ height: "auto" }}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="m-0 mt-4 basketContainer">
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
          <Row>
            <Col className="mt-3 col-6">
              <Button
                className="d-flex flex-row w-100 align-items-center justify-content-center btn--add--note--desktop--addOrder notes-round"
                onClick={noteHandler}
              >
                {notes.length > 0 ? (
                  <span className="me-1 fw-bold ms-3">{notes[0].text}</span>
                ) : (
                  <>
                    <img
                      className="pe-2 me-2"
                      src={addIcon}
                      height="25px"
                      alt="edit-icon"
                    />

                    <span className="pe-1 fw-bold ps-3">
                      <>اضافه یادداشت</>
                    </span>
                  </>
                )}
              </Button>
            </Col>
            <Col className="mt-3 col-6">
              <Button
                className="d-flex flex-row w-100 align-items-center justify-content-center btn--add--note--desktop--addOrder notes-round"
                onClick={() => setAddReminderModal(true)}
              >
                {reminderInfo && Object.keys(reminderInfo).length > 0 ? (
                  <span className="m-0 px-2 my-1 fw-bold text--reminder--description--addOrder">
                    {reminderInfo.description}
                  </span>
                ) : (
                  <>
                    <img
                      className="me-3"
                      src={reminderIcon}
                      height="25px"
                      alt="edit-icon"
                    />
                    <span className="me-1 fw-bold ms-3">یادآوری</span>
                  </>
                )}
              </Button>
            </Col>
          </Row>
          <Row className="m-0 align-items-center flex-row col-12">
            <Row className="m-0 px-0 align-self-center flex-row col-6">
              <Col className="m-0 p-0 mt-3 order-inputs align-self-center">
                <Form.Group className="p--relative" controlId="duration">
                  <Form.Label className="pe-1">
                    تاریخ استفاده<span className="fs-8 me-1">(آماده سازی)</span>
                  </Form.Label>
                  {/* <Form.Control
                  className="order-input me-2"
                  type="date"
                  min="0"
                  name="duration"
                  onChange={handleChange}
                  isInvalid={false}
                  isValid={false}
                  value={customer.duration}
                  required
                /> */}
                  <DatePicker
                    format="MM/DD/YYYY HH:mm:ss"
                    inputClass="pick--date--order--input"
                    ref={refDatePicker}
                    plugins={[<TimePicker position="bottom" hideSeconds />]}
                    calendar="persian"
                    locale="fa"
                    editable={false}
                    animation
                    minDate={new Date()}
                    calendarPosition="bottom-right"
                    value={customer.duration}
                    onChange={(value) => submitCalendar(value, "duration")}
                  />
                  <img
                    src={closeDatePickerIcon}
                    className="m-0 p-0 cursor-pointer bin--order-icon"
                    onClick={(e) => setCustomer({ ...customer, duration: "" })}
                    height="20px"
                    alt="down-icon"
                  />
                </Form.Group>
              </Col>
              {/* <Col className=" mt-3 order-inputs">
              <Form.Group controlId="reminder">
                <Form.Label className="pe-1">تاریخ یادآوری</Form.Label>
                <Form.Control
                  className="text-center order-input"
                  type="number"
                  name="reminder"
                  min="0"
                  onChange={handleChange}
                  isInvalid={false}
                  isValid={false}
                  value={customer.reminder}
                />
                <span className="reminder-span">روز دیگر</span>
              </Form.Group>
            </Col> */}
            </Row>
            <PriorityDropdown
              priSselectedItem={priSselectedItem}
              customer={customer}
              setDimStatus={setDimStatus}
              dimStatus={dimStatus}
              handleDropdown={handleDropdown}
            />
          </Row>

          <Row className="m-0 mt-4 justify-content-center w-100">
            {addOrderLoading ? (
              <Button
                className="fw-bold order--btn order-submit border-0 w-100"
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
                />
                در حال ثبت ...
              </Button>
            ) : (
              <>
                <Col className="col-7 m-0 p-0 ps-1">
                  <Button
                    className="fw-bold order--btn border-0 w-100"
                    size="lg"
                    type="submit"
                    block
                    onClick={formHandler}
                  >
                    ثبت
                  </Button>
                </Col>
                <Col className="col-5 m-0 p-0 pe-1">
                  <Button
                    className="order--btn border-0 w-100 btn-secondary order--sale--opportunity"
                    id="saleOpprotunity"
                    size="lg"
                    type="button"
                    block
                    onClick={(e) => setDialogSupport(true)}
                  >
                    پشتیبانی
                  </Button>
                </Col>
              </>
            )}
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
        customer={customer}
        notes={notes}
        clearInputes={clearInputes}
      />
      <SupportAddOrder
        open={dialogSupport}
        handleClose={() => setDialogSupport(false)}
      />
      <AddReminder
        show={addReminderModal}
        onHide={() => setAddReminderModal(false)}
        isIndividualState={true}
        setIndividualState={(date, description) =>
          setReminderInfo({
            date: date,
            description: description,
          })
        }
        individualState={reminderInfo}
      />
    </div>
  );
};
