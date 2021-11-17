import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Dropdown,
  Modal,
  Row,
  Col,
  Form,
  Button,
  Table,
  Spinner,
  Alert,
  Card,
} from "react-bootstrap";
import persianJs from "persianjs/persian.min";
import commaNumber from "comma-number";

//Assets
import closeIcon from "../../assets/images/close.svg";
// import deleteIcon from './../../assets/images/delete.svg'
import spinnerIcon from "./../../assets/images/sppiner.svg";
import plusIcon from "./../../assets/images/plus.svg";
import lowPriorityIcon from "./../../assets/images/order/priority/low.svg";
import mediumPriorityIcon from "./../../assets/images/order/priority/medium.svg";
import highPriorityIcon from "./../../assets/images/order/priority/high.svg";

//Actions
import { orderActions, productActions, alertActions } from "../../../actions";

// Componenst
import { EditProduct } from "./editProduct";

export const EditeProductOrder = (props) => {
  const dispatch = useDispatch();
  const [dimStatus, setDimStatus] = useState(false);
  const [selectedItem, setItem] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [quantityOrder, setQuantityOrder] = useState(false);
  const [order, insertOrder] = useState([]);
  const [inputProductValidation, setInputProductValidation] = useState(false);
  const [addressUser, setAddressUser] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [priSselectedItem, setPrioItem] = useState("");
  const [validationInputPrice, setValidationInputPrice] = useState(false);

  const products = useSelector((state) => state.getProducts.product);
  const loader = useSelector((state) => state.editProducOrder.loading);

  let alertMessage = useSelector((state) => state.alert.message);
  let alerType = useSelector((state) => state.alert.type);


  const handleDropdown = (n, name) => {
    setCompanyName({ ...companyName, priority: n });
    setPrioItem(name);
  };

  let productHandler = (e) => {
    e.preventDefault();
    dispatch(productActions.getProducts());
  };
  let newOrder = (e) => {
    e.preventDefault();
    if (selectedItem == "") return setInputProductValidation(true);
    else setInputProductValidation(false);

    let product = products.find((item) => item.name === selectedItem);
    let oldProduct = order.find((item) => item.name === selectedItem);

    if (oldProduct == undefined) {
      let newOrder = {
        _id: product._id,
        name: product.name,
        quantity: parseInt(quantity),
        sellingPrice: product.sellingPrice,
      };
      insertOrder((prevOrderState) => [...prevOrderState, newOrder]);
    } else {
      const updatedOrder = order.map((item) => {
        if (item._id === product._id) {
          return {
            ...item,
            quantity: parseInt(item.quantity) + parseInt(quantity),
          };
        }
        return item;
      });
      insertOrder(updatedOrder);
    }
  };
  let editPriceProduct = (product, value) => {
    if (value == "" || value == "0") {
      setValidationInputPrice(true);
    } else {
      setValidationInputPrice(false);
      let updatedOrder = order.map((item) => {
        if (item._id === product._id) {
          return { ...item, sellingPrice: value };
        }
        return item;
      });
      insertOrder(updatedOrder);
    }
  };

  let removeOrder = (product) => {
    if (order.length == 1) {
      dispatch(alertActions.error("کمتر از یک کالا در سبد خرید مجاز نیست"));
      setTimeout(() => {
        dispatch(alertActions.clear());
      }, 1500);
    } else {
      let updatedOrder = order.filter((item) => item._id !== product._id);
      insertOrder(updatedOrder);
    }
  };

  const getTotalPrice = (order) => {
    let total = 0;
    order?.map((item) => {
      total += item.sellingPrice * item.quantity;
    });
    return total;
  };

  useEffect(() => {
    async function fetchData() {
        await insertOrder(props.order.products);
        await setAddressUser(props.order.address);
        props.order.customer &&
          (await setCompanyName({
            company: props.order.customer.company,
            nationalCard: props.order.customer.nationalCard,
            financialCode: props.order.customer.financialCode,
            registerNo: props.order.customer.registerNo,
            postalCode: props.order.customer.postalCode,
            priority: props.order.priority || 0,
          }));
        let total = 0;
        props.order.products?.map((item) => {
          total += item.sellingPrice * item.quantity;
          return total;
        });
        switch (parseInt(props.order.priority)) {
          case 0:
            setPrioItem("");
            break;
          case 1:
            setPrioItem("کم");
            break;
          case 2:
            setPrioItem("متوسط");
            break;
          case 3:
            setPrioItem("زیاد");
            break;
          default:
            break;
        }
      }
      fetchData();
  }, [props.show]);

  let closeHandler = (e) => {
    props.onHide(false);
    insertOrder([]);
    setQuantity(1);
    setItem("");
  };
  let addressInputHandler = (e) => {
    setAddressUser(e.target.value);
  };
  let companyNameInputHandler = (e) => {
    setCompanyName({ ...companyName, [e.target.name]: e.target.value });
  };
  const formHandler = (e) => {
    e.preventDefault();
    if (order.length > 0) {
      let orders = order.map((item) => {
        return {
          _id: item._id,
          quantity: item.quantity,
          sellingPrice: item.sellingPrice,
        };
      });

      let params = {
        orderId: props.order.id,
        products: orders,
        address: addressUser || "",
      };

      dispatch(orderActions.editProductOrder({ ...params, ...companyName }));

      setTimeout(() => {
        dispatch(orderActions.getOrders({ status: props.status || " " }));
        props.onHide(false);
      }, 1000);
    }
  };
  let quantityOrderHandler = (e) => {
    let value = e.target.value
      ? persianJs(e.target.value).toEnglishNumber().toString()
      : null;
    if (value == "0") {
      setQuantityOrder(true);
    } else {
      setQuantityOrder(false);
      setQuantity(value || 1);
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      backdrop="static"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="w-100 m-0 p-0"
    >
      {alertMessage && (
        <>
          <div className="modal-backdrop show"></div>
          <Row className="justify-content-center text-center ">
            <Alert variant={alerType}>{alertMessage}</Alert>
          </Row>
        </>
      )}
      <Button
        className="border-0 customer-modal-close"
        type="button"
        onClick={closeHandler}
      >
        <img
          className="d-flex m-auto customer-modal-close-svg"
          src={closeIcon}
          alt="close-btn"
        />
      </Button>
      <Modal.Body className="add-product px-3">
        {props.show && (
          <Form onSubmit={formHandler}>
            <Container className="m-0 p-0 mx-auto d-flex flex-column justify-content-between">
              <Row className="m-0 p-0 mt-2">
                <Col className="p-0 ps-3">
                  <Card className="border-0 bg-transparent text-light">
                    <Form.Label className="pe-3">نام شرکت</Form.Label>
                    <Form.Control
                      className="order-input company-input"
                      type="text"
                      defaultValue={props.order.customer.company}
                      onChange={companyNameInputHandler}
                      name="companyName"
                    />
                  </Card>
                </Col>
                <Col className="p-0 pe-3">
                  <Card className="border-0 bg-transparent text-light">
                    <Form.Label className="pe-3">شناسه ملی شرکت</Form.Label>
                    <Form.Control
                      className="order-input company-input"
                      type="text"
                      defaultValue={props.order.customer.nationalCard}
                      onChange={companyNameInputHandler}
                      name="nationalCard"
                    />
                  </Card>
                </Col>
              </Row>

              <Row className="m-0 p-0 mt-2">
                <Col className="p-0 ps-3">
                  <Card className="border-0 bg-transparent text-light">
                    <Form.Label className="pe-3">کداقتصادی</Form.Label>
                    <Form.Control
                      className="order-input company-input"
                      type="text"
                      defaultValue={props.order.customer.financialCode}
                      onChange={companyNameInputHandler}
                      name="financialCode"
                    />
                  </Card>
                </Col>
                <Col className="p-0 pe-3">
                  <Card className="border-0 bg-transparent text-light">
                    <Form.Label className="pe-3">شماره ثبت</Form.Label>
                    <Form.Control
                      className="order-input company-input"
                      type="text"
                      defaultValue={props.order.customer.registerNo}
                      onChange={companyNameInputHandler}
                      name="registerNo"
                    />
                  </Card>
                </Col>
              </Row>

              <Row className="m-0 p-0 mt-2">
                <Col className="p-0 ">
                  <Card className="border-0 bg-transparent text-light">
                    <Form.Label className="pe-3">آدرس</Form.Label>
                    <Form.Control
                      className="order-input address-input"
                      type="text"
                      defaultValue={props.order.address}
                      onChange={addressInputHandler}
                    />
                  </Card>
                </Col>
              </Row>

              <Row className="m-0 p-0 mt-2">
                <Col className="p-0 ps-3">
                  <Card className="border-0 bg-transparent text-light">
                    <Form.Label className="pe-3">کدپستی</Form.Label>
                    <Form.Control
                      className="order-input company-input"
                      type="text"
                      defaultValue={props.order.customer.postalCode}
                      onChange={companyNameInputHandler}
                      name="postalCode"
                    />
                  </Card>
                </Col>
                {props.order.status == 3 && props.order.priority && (
                  <Col className="d-flex pe-3 flex-row align-items-center justify-content-end ms-0 ps-0">
                    <Col className="basket-flex--desktop m-0 col-6 order-inputs w-100 justify-content-end">
                      <Form.Group dir="ltr">
                        <Form.Label dir="rtl" className="pe-1">
                          اولویت
                        </Form.Label>
                        <Dropdown onToggle={(e) => setDimStatus(!dimStatus)}>
                          <Dropdown.Toggle
                            dir="rtl"
                            className="radius-10-im d-flex justify-content-center align-items-center priority-drop h-100 py-2"
                          >
                            <Row className="text-end pe-1 order-filter-input">
                              <Col xs={4}>
                                {priSselectedItem !== "" ? (
                                  <span>{priSselectedItem}</span>
                                ) : (
                                  <span>هیچکدام</span>
                                )}
                              </Col>
                              <Col>
                                {companyName.priority ? (
                                  <img
                                    className="me-auto"
                                    src={
                                      companyName.priority == 1
                                        ? lowPriorityIcon
                                        : companyName.priority == 2
                                        ? mediumPriorityIcon
                                        : companyName.priority == 3
                                        ? highPriorityIcon
                                        : ""
                                    }
                                    height="20px"
                                    alt="spinner-icon"
                                  />
                                ): null}
                              </Col>
                            </Row>

                            <img
                              className="me-auto"
                              src={spinnerIcon}
                              height="20px"
                              alt="spinner-icon"
                            />
                          </Dropdown.Toggle>
                          <Dropdown.Menu
                            className={`w-100 ${dimStatus ? "dim" : ""}`}
                          >
                            <Dropdown.Item
                              onClick={() => handleDropdown(0, "هیچکدام")}
                            >
                              <Col className="text-end pe-1 order-filter-input">
                                هیچکدام
                              </Col>
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item
                              onClick={() => handleDropdown(1, "کم")}
                            >
                              <Row className="text-end pe-2 order-filter-input">
                                <Col>
                                  <img
                                    className="me-auto"
                                    src={lowPriorityIcon}
                                    height="20px"
                                    alt="spinner-icon"
                                  />
                                </Col>
                                <Col xs={3}>کم</Col>
                              </Row>
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item
                              onClick={() => handleDropdown(2, "متوسط")}
                            >
                              <Row className="text-end pe-2 order-filter-input">
                                <Col>
                                  <img
                                    className="me-auto"
                                    src={mediumPriorityIcon}
                                    height="20px"
                                    alt="spinner-icon"
                                  />
                                </Col>
                                <Col xs={3}>متوسط</Col>
                              </Row>
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item
                              onClick={() => handleDropdown(3, "زیاد")}
                            >
                              <Row className="text-end pe-2 order-filter-input">
                                <Col>
                                  <img
                                    className="me-auto"
                                    src={highPriorityIcon}
                                    height="20px"
                                    alt="spinner-icon"
                                  />
                                </Col>
                                <Col xs={3}>زیاد</Col>
                              </Row>
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </Form.Group>
                    </Col>
                  </Col>
                )}
              </Row>

              <Row className="m-0 p-0 mt-4">
                <Card className="border-0 p-3 pt-2  basket--edit--product--container">
                  <Form.Label className="pe-1">سبد خرید</Form.Label>
                  <Card.Body className="p-0 basket-flex">
                    <Row className="d-flex align-content-center justify-content-evenly">
                      <Col className="col-6 pe-0 ps-1">
                        <Dropdown
                          onToggle={(e) => setDimStatus(!dimStatus)}
                          onClick={(e) => productHandler(e)}
                        >
                          <Dropdown.Toggle
                            className={`d-flex align-items-center justify-content-between px-1 py-3 ${
                              inputProductValidation
                                ? "border border-danger"
                                : null
                            } `}
                          >
                            {selectedItem.length ? (
                              <span>{selectedItem}</span>
                            ) : (
                              <span>محصولات</span>
                            )}
                            <img
                              className="me-auto"
                              src={spinnerIcon}
                              height="30px"
                              alt="spinner-icon"
                            />
                          </Dropdown.Toggle>
                          <Dropdown.Menu
                            className={`${
                              dimStatus ? "dim" : ""
                            } dropdownProductMenu`}
                          >
                            {products
                              ? products.map((item, index) => {
                                  return (
                                    item.active && (
                                      <Col key={index}>
                                        {index ? <Dropdown.Divider /> : null}
                                        <Dropdown.Item
                                          onClick={() => {
                                            setItem(item.name);
                                            setQuantity(1);
                                          }}
                                        >
                                          <Row>
                                            <Col className="text-end basket-dropdown-border-left pe-1">
                                              {item.name}
                                            </Col>
                                            <Col>
                                              {item.sellingPrice &&
                                                persianJs(item.sellingPrice)
                                                  .englishNumber()
                                                  .toString()}{" "}
                                            </Col>
                                          </Row>
                                        </Dropdown.Item>
                                      </Col>
                                    )
                                  );
                                })
                              : null}
                          </Dropdown.Menu>
                        </Dropdown>
                      </Col>
                      <Col className="col-3 p-0 m-0  d-flex justify-content-center">
                        <Form.Control
                          placeholder="تعداد"
                          value={Number.isInteger(quantity) ? "" : quantity}
                          onChange={quantityOrderHandler}
                          className={` order-input--desktop text-center ${
                            quantityOrder ? "border border-danger" : null
                          }`}
                          type="tel"
                          inputMode="tel"
                          pattern="[0-9]*"
                          name="duration"
                          style={{ maxHeight: "35px" }}
                        ></Form.Control>
                      </Col>
                      <Col className="col-2 m-0 p-0 px-1 text-center products-add-btn">
                        <Button
                          className="products-add--mobile  p-0 border-0 w-100 py-1"
                          type="button"
                          onClick={(e) => newOrder(e)}
                        >
                          <img
                            className="d-flex m-auto "
                            src={plusIcon}
                            alt="add-button"
                          />
                        </Button>
                      </Col>
                    </Row>

                    <Row className="pt-2 pe-2">
                      <div className="table-wrapper-scroll-y my-custom-scrollbar px-1">
                        <Table className="lh-lg" borderless size="sm">
                          <thead>
                            <tr>
                              <th className="fw-bold col-4">سفارش</th>
                              <th className="fw-bold ">قیمت (تومان)</th>
                              <th className="fw-bold">تعداد</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {order?.length
                              ? order.map((item) => {
                                  return (
                                    <EditProduct
                                      key={item._id}
                                      item={item}
                                      order={order}
                                      removeOrder={() => removeOrder(item)}
                                      validationInputPrice={
                                        validationInputPrice
                                      }
                                      editPriceProduct={(
                                        item,
                                        inputCurrentPriceProduct
                                      ) =>
                                        editPriceProduct(
                                          item,
                                          inputCurrentPriceProduct
                                        )
                                      }
                                    />
                                  );
                                })
                              : null}
                          </tbody>
                        </Table>
                      </div>

                      <Row className="border-top-blue--desktop pt-2 mt-auto align-items-center">
                        <Col className="col-6 m-0 p-0">
                          <span className="">جمع کل :</span>
                        </Col>
                        <Col className="px-1">
                          {getTotalPrice(order) &&
                            persianJs(commaNumber(getTotalPrice(order)))
                              .englishNumber()
                              .toString()}
                        </Col>
                      </Row>
                    </Row>
                  </Card.Body>
                </Card>
              </Row>
              {loader ? (
                <Button
                  className="fw-bold order-submit btn-dark-blue border-0 w-100 mt-4"
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
                  در حال انجام عملیات...
                </Button>
              ) : (
                <Button
                  className="fw-bold order-submit btn-dark-blue border-0 w-100 mt-4 notes-round"
                  size="lg"
                  type="submit"
                  block
                >
                  ثبت
                </Button>
              )}
            </Container>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
};
