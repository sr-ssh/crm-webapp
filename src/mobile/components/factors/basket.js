import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  Dropdown,
  Button,
  Table,
  Row,
  Col,
  FormControl,
  Form,
} from "react-bootstrap";
import persianJs from "persianjs/persian.min";

// Actions
import { stockActions } from "../../../actions";

//icons
import deleteIcon from "./../../assets/images/delete.svg";
import spinnerIcon from "./../../assets/images/sppiner.svg";
import plusIcon from "./../../assets/images/plus.svg";

export const Basket = ({
  order,
  insertOrder,
  totalPrice,
  insertPrice,
  selectedItem,
  setItem,
  quantity,
  setQuantity,
}) => {
  const [dimStatus, setDimStatus] = useState(false);
  const [quantityOrder, setQuantityOrder] = useState(false);
  const stock = useSelector((state) => state.getStock.stock);
  const dispatch = useDispatch();

  let newOrder = (e) => {
    e.preventDefault();
    let product = stock.find((item) => item.name === selectedItem);
    if (!product || quantityOrder) return;

    let newOrder = {
      _id: product._id,
      name: product.name,
      quantity: parseInt(quantity),
      price: 0,
    };
    const isOrderPresent = order.some((item) => item._id === product._id);
    if (isOrderPresent) {
      const updatedOrder = order.map((item) => {
        if (item._id === product._id) {
          return { ...item, quantity: item.quantity + parseInt(quantity) };
        }
        return item;
      });
      insertOrder(updatedOrder);
    } else {
      insertOrder((prevOrderState) => [...prevOrderState, newOrder]);
    }
  };

  let addPrice = (e, itemName) => {
    e.preventDefault();
    let value = persianJs(e.target.value).toEnglishNumber().toString();
    let product = stock.find((item) => item.name === itemName);

    const updatedOrder = order.map((item) => {
      if (item._id === product._id) {
        return { ...item, price: value };
      }
      return item;
    });
    insertOrder(updatedOrder);
    setTotalPrice();
  };

  let setTotalPrice = () => {
    let total = 0;
    order.map(
      (st) =>
        (total = parseInt(total) + parseInt(st.quantity) * parseInt(st.price))
    );
    return total;
  };

  let removeOrder = (e, product) => {
    e.preventDefault();
    insertPrice(
      totalPrice - parseInt(product.quantity) * parseInt(product.price)
    );
    let updatedOrder = order.filter((item) => item._id !== product._id);
    insertOrder(updatedOrder);
  };

  let productHandler = (e) => {
    e.preventDefault();
    dispatch(stockActions.getStock());
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
    <>
      <Row>
        <Card className="border-0 p-3 pt-2  basketContainer">
          <Card.Body className="p-0 basket-flex">
            <Row className="ps-1">
              <Col className="col-5 px-0">
                <Dropdown
                  onToggle={(e) => setDimStatus(!dimStatus)}
                  onClick={(e) => productHandler(e)}
                >
                  <Dropdown.Toggle className="d-flex">
                    {selectedItem.length ? (
                      <span>{selectedItem}</span>
                    ) : (
                      <span>مواد خام</span>
                    )}
                    <img
                      className="me-auto"
                      src={spinnerIcon}
                      height="20px"
                      alt="spinner-icon"
                    />
                  </Dropdown.Toggle>
                  <Dropdown.Menu
                    className={`${dimStatus ? "dim" : ""} dropdownProductMenu`}
                  >
                    {stock
                      ? stock.map((item, index) => {
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
                                    <Col className="text-end pe-1">
                                      {item.name}
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
              <Col className="col-4 pe-2 ps-0">
                <FormControl
                  value={Number.isInteger(quantity) ? "" : quantity}
                  onChange={(e) => quantityOrderHandler(e)}
                  className={`order-input text-center ${
                    quantityOrder ? "border border-danger" : null
                  }`}
                  type="tel"
                  inputMode="tel"
                  pattern="[0-9]*"
                  name="duration"
                  style={{ maxHeight: "35px" }}
                  placeholder="تعداد"
                />
              </Col>
              <Col className="col-3 p-0 text-center pe-2">
                <Button
                  className="border-10 w-100 receipt-add-btn border-0"
                  onClick={(e) => newOrder(e)}
                  type="button"
                  style={{ maxHeight: "35px" }}
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
                      <th className="fw-bold">
                        <Col style={{ width: "32vw" }}>فاکتور</Col>
                      </th>
                      <th className="fw-bold">
                        <Col style={{ width: "27vw", paddingRight: "4px" }}>
                          قیمت (تومان)
                        </Col>
                      </th>
                      <th className="fw-bold">تعداد</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.length
                      ? order.map((item) => {
                          return (
                            <tr key={item.name}>
                              <td>
                                {item.name &&
                                  persianJs(item.name)
                                    .englishNumber()
                                    .toString()}
                              </td>
                              <td
                                className="text-center"
                                style={{ paddingRight: "0" }}
                              >
                                <Form.Group
                                  className="add-order-input text-center"
                                  style={{ width: "27vw" }}
                                >
                                  <Form.Control
                                    className="order-input"
                                    type="tel"
                                    inputMode="tel"
                                    pattern="[0-9]*"
                                    name="mobile"
                                    onChange={(e) => addPrice(e, item.name)}
                                    required
                                  />
                                </Form.Group>
                              </td>
                              <td className="pe-3">
                                {item.quantity &&
                                  persianJs(item.quantity)
                                    .englishNumber()
                                    .toString()}
                              </td>
                              <td onClick={(e) => removeOrder(e, item)}>
                                <img
                                  src={deleteIcon}
                                  className="d-block me-auto"
                                  alt="delete-icon"
                                />
                              </td>
                            </tr>
                          );
                        })
                      : null}
                  </tbody>
                </Table>
              </div>
              <Row className="border-top-dark-blue pt-2 mt-auto px-0 mx-0">
                <Col className="col-5 px-2">
                  <span className="fs-7 fw-bold">جمع کل :</span>
                </Col>
                <Col className="px-1">
                  {setTotalPrice() &&
                    persianJs(setTotalPrice()).englishNumber().toString()}
                </Col>
              </Row>
            </Row>
          </Card.Body>
        </Card>
      </Row>
    </>
  );
};
