import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Form, Button, Row, Col, Spinner } from "react-bootstrap";
import "react-multi-date-picker/styles/layouts/mobile.css";
import persianJs from "persianjs/persian.min";

// Actions
import { alertActions } from "../../../actions/alertActions";
import { orderActions, customerActions } from "../../../actions";

// Components
import { Header } from "../base/header2";

// Assets
import downloadIcon from "../../assets/images/download.svg";
import addIcon from "../../assets/images/order/add.svg";

export const AddSeller = (props) => {
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
  });
  const [totalPrice, insertPrice] = useState("0");
  const [selectedItem, setItem] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState([]);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const dispatch = useDispatch();
  let oldCustomer = useSelector((state) => state.getCustomer.customer);
  let { loading } = useSelector((state) => state.getCustomer);
  let addOrderLoading = useSelector((state) => state.addOrder.loading);
  let addOrder = useSelector((state) => state.addOrder);

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
    let value = e.target.value;
    let name = e.target.name;
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

  let formHandler = (e) => {
    e.preventDefault();
    if (order.length && customer.family && customer.mobile) {
      if (e.target.id === "saleOpprotunity")
        dispatch(orderActions.addOrder(order, customer, notes, 3, 0));
      else {
        dispatch(orderActions.addOrder(order, customer, notes));
      }
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
      setCustomer({ ...customer, ...props.location.state });
    }
  }, []);

  return (
    <div className="order-page">
      <Header title="ثبت فروشنده" backLink="/dashboard" />
      <Container fluid className="pt-3 px-3 m-0">
        <Form onSubmit={formHandler} noValidate>
          <Row className="m-0 p-0 mt-2 order-inputs">
            <Col className="p-0 col-5 add-order-input">
              <Form.Group>
                <Form.Label className="pe-2">تلفن</Form.Label>
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
                <Form.Label className="pe-2">همراه</Form.Label>

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

          <Row className="m-0 p-0 mt-2 order-inputs">
            <Col className="p-0 col-5 add-order-input">
              <Form.Group>
                <Form.Label className="pe-2">نام فروشنده</Form.Label>
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


          <Row className="m-0 p-0 mt-2 order-inputs">
            <Col className="p-0 add-order-input">
              <Form.Group controlId="address">
                <Form.Label className="pe-2">شماره کارت</Form.Label>
                <Form.Control
                  className="order-input"
                  type="text"
                  name="address"
                  onChange={handleChange}
                  isInvalid={false}
                  isValid={false}
                  value={customer.address}
                />
              </Form.Group>
            </Col>
          </Row>

           
          <Row className="m-0 p-0 mt-2 order-inputs">
            <Col className="p-0 add-order-input">
              <Form.Group controlId="address">
                <Form.Label className="pe-2">آدرس</Form.Label>
                <Form.Control
                  className="radius-10 border-0 h-100"
                  as="textarea"
                  rows="3"
                  onChange={handleChange}
                  isInvalid={false}
                  isValid={false}
                  value={customer.address}
                />
              </Form.Group>
            </Col>
          </Row>


          <Row className="m-0 p-0 mt-2 order-inputs">
            <Col className="p-0 add-order-input">
              <Form.Group controlId="address">
                <Form.Label className="pe-2">توضیحات</Form.Label>
                <Form.Control
                  className="radius-16 border-0 h-100"
                  as="textarea"
                  rows="3"
                  name="address"
                  onChange={handleChange}
                  isInvalid={false}
                  isValid={false}
                  value={customer.address}
                />
              </Form.Group>
            </Col>
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
              <Button
                className="radius-10 fs-6 py-2 fw-bold backround--dark--blue border-0 w-100 mt-4"
                size="lg"
                type="submit"
                block
                onClick={formHandler}
              >
                ثبت
              </Button>
              </>
            )}
          </Row>
          {/* {
                        alertMessage &&
                        <>
                            <div className="modal-backdrop show"></div>
                            <Row className="justify-content-center text-center ">
                                <Alert variant={alerType}>
                                    {alertMessage}
                                </Alert>
                            </Row>
                        </>
                    } */}
        </Form>
      </Container>
    </div>
  );
};
