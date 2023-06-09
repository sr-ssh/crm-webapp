import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Alert,
  Spinner,
} from "react-bootstrap";
import "react-multi-date-picker/styles/layouts/mobile.css";
import persianJs from "persianjs/persian.min";

// Actions
import { alertActions } from "../../../actions/alertActions";
import { receiptActions, supplierActions } from "../../../actions";

// Components
import { Header } from "../base/header2";
import { Basket } from "./basket";
import { AddNotesModal } from "./addNotesModal";
// Assets
import downloadIcon from "../../assets/images/download.svg";
import addIcon from "../../assets/images/order/add.svg";

export const AddFactor = () => {
  let alertMessage = useSelector((state) => state.alert.message);
  let alerType = useSelector((state) => state.alert.type);

  const [validated, setValidated] = useState(false);
  const [mobileValidated, setMobileValidated] = useState(false);
  const [nameValidated, setNameValidated] = useState(false);
  const [order, insertOrder] = useState([]);
  const [customer, setCustomer] = useState({ birthday: "" });
  const [totalPrice, insertPrice] = useState("0");
  const [selectedItem, setItem] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState([]);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const dispatch = useDispatch();
  let oldCustomer = useSelector((state) => state.getSupplier.supplier);
  let { loading } = useSelector((state) => state.getCustomer);
  let addOrderLoading = useSelector((state) => state.addOrder.loading);

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
    if (customer.mobile) dispatch(supplierActions.getSupplier(customer.mobile));
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

  const clearInputs = () => {
    setCustomer({
      mobile: "",
      address: "",
      family: "",
      reminder: "",
      duration: "",
      company: "",
    });
    insertOrder([]);
    setNotes([]);
    insertPrice("0");
    setItem("");
    setQuantity(1);
    oldCustomer = null;
  };

  let formHandler = (e) => {
    e.preventDefault();
    if (order.length && customer.family && customer.mobile) {
      dispatch(receiptActions.addReceipt(order, customer, notes[0]));
      setCustomer({
        mobile: "",
        address: "",
        family: "",
        reminder: "",
        duration: "",
        company: "",
      });
      insertOrder([]);
      setNotes([]);
      insertPrice("0");
      setItem("");
      setQuantity(1);
      oldCustomer = null;
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
  let noteHandler = (e) => {
    if (notes.length > 0) {
      dispatch(alertActions.error("بیشتر از یک یادداشت مجاز نیست"));
      setTimeout(() => {
        dispatch(alertActions.clear());
      }, 1100);
    } else setShowNotesModal(true);
  };

  useEffect(() => {
    if (oldCustomer?.mobile) setCustomer({ ...customer, ...oldCustomer });
  }, [oldCustomer]);

  useEffect(() => {
    if (addOrderLoading === false) clearInputs();
  }, [addOrderLoading]);

  return (
    <div className="order-page">
      <Header title="ثبت فاکتور" backLink="/dashboard" />
      <Container fluid className="pt-3 px-3 m-0">
        <Form onSubmit={formHandler} noValidate>
          <Row className="m-0 p-0 order-inputs">
            <Col className="p-0 col-5 add-order-input">
              <Form.Group>
                <Form.Label className="pe-2">موبایل</Form.Label>
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
                {loading ? (
                  <Spinner
                    className="spinner--download--btn--mobile "
                    as="div"
                    variant="primary"
                    animation="border"
                    size="sm"
                  />
                ) : (
                  <img
                    src={downloadIcon}
                    className="m-0 p-0 spinner--download--btn--mobile"
                    onClick={(e) => handleOldCustomer(e)}
                    height="25px"
                    alt="down-icon"
                  />
                )}
              </Form.Group>
            </Col>
            <Col className="p-0 col-5 me-auto add-order-input">
              <Form.Group controlId="birthday">
                <Form.Label className="pe-2">نام شرکت</Form.Label>
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
          <Row
            className="m-0 p-0 mt-0 order-inputs"
            style={{ position: "relative", top: "-2vh" }}
          >
            <Col className="p-0 add-order-input">
              <Form.Group controlId="address">
                <Form.Label className="pe-2">آدرس</Form.Label>
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
          <Row className="m-0 p-0 mt-0 order-inputs">
            <Col className="p-0 add-order-input">
              <Form.Group>
                <Form.Label className="pe-2">نام</Form.Label>
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
          </Row>
          <Row className="m-0 mt-3 basketContainer">
            <Col>
              <Form.Label className="pe-0">سبد خرید</Form.Label>
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
            <Col className="mt-3 w-100">
              <Button
                className="d-flex flex-row w-100 align-items-center btn--add--note"
                onClick={noteHandler}
              >
                <Col xs={1}>
                  <img
                    className="me-3"
                    src={addIcon}
                    height="25px"
                    alt="edit-icon"
                  />
                </Col>
                <Col>
                  <span className="me-1 fw-bold ms-3 text-center fs-6">
                    {notes.length > 0 ? notes[0].text : <>یادداشت</>}
                  </span>
                </Col>
              </Button>
            </Col>
          </Row>

          <Row className="m-0 mt-2 justify-content-center w-100">
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
                <Col className="col-12 m-0 p-0 mb-3">
                  <Button
                    className="fw-bold receipt--btn--mobile border-0 w-100 fs-6"
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
          </Row>
          {alertMessage && (
            <>
              <div className="modal-backdrop show"></div>
              <Row className="justify-content-center text-center ">
                <Alert variant={alerType}>{alertMessage}</Alert>
              </Row>
            </>
          )}
        </Form>
      </Container>
      <AddNotesModal
        show={showNotesModal}
        onHide={() => {
          setShowNotesModal(false);
        }}
        setNotes={setNotes}
      />
    </div>
  );
};
