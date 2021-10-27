import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Dropdown, Button, Table, Row, Col, Form } from "react-bootstrap";
import persianJs from "persianjs/persian.min";

// Actions
import { stockActions } from "../../../actions/stockActions";

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
  price,
  setPrice,
}) => {
  const [dimStatus, setDimStatus] = useState(false);
  const [quantityOrder, setQuantityOrder] = useState(false);
  const [priceOrder, setPriceOrder] = useState(false);
  const stock = useSelector((state) => state.getStock.stock);
  const dispatch = useDispatch();

  let newOrder = (e) => {
    e.preventDefault();
    let product = stock.find((item) => item.name === selectedItem);
    if (!product || quantityOrder || priceOrder) return;

    insertPrice(parseInt(totalPrice) + parseInt(quantity) * parseInt(price));
    let newOrder = {
      _id: product._id,
      name: product.name,
      quantity: parseInt(quantity),
      price: price,
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
  let priceOrderHandler = (e) => {
    let value = e.target.value
      ? persianJs(e.target.value).toEnglishNumber().toString()
      : null;

    if (value == "") {
      setPriceOrder(true);
    } else {
      setPriceOrder(false);
      setPrice(value || 1);
    }
  };

  return (
    <>
      <Row>
        <Card className="border-0 p-3 pt-2  basketContainer reciept--basket--card">
          <Card.Body className="mt-2 mx-3 p-0 basket-flex--desktop">
            <Form.Label className="me-2">سبد خرید</Form.Label>
            <Row className="justify-content-evenly">
              <Col className="col-6 p-0 m-0">
                <Dropdown
                  onToggle={(e) => setDimStatus(!dimStatus)}
                  onClick={(e) => productHandler(e)}
                >
                  <Dropdown.Toggle className=" px-1 d-flex align-items-center">
                    {selectedItem.length ? (
                      <span className="me-2">{selectedItem}</span>
                    ) : (
                      <span className="me-2 fw-bold">مواد خام</span>
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
                                    setPrice(0);
                                  }}
                                >
                                  <Row>
                                    <Col className="text-end pe-1">
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
              <Col className="col-3 p-0 m-0 px-3 d-flex justify-content-center ps-1">
                <Form.Control
                  placeholder="قیمت"
                  value={Number.isInteger(price) ? "" : price}
                  onChange={(e) => priceOrderHandler(e)}
                  className={`order-input--desktop text-center ${
                    priceOrder ? "border border-danger" : null
                  }`}
                  type="tel"
                  inputMode="tel"
                  pattern="[0-9]*"
                  name="price"
                  style={{ maxHeight: "40px" }}
                ></Form.Control>
              </Col>
              <Col className="col-2 p-0 m-0 px-3 d-flex justify-content-center">
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
                  name="quantity"
                  style={{ maxHeight: "40px" }}
                ></Form.Control>
              </Col>
              <Col className="m-0 p-0 text-center products-add-btn ">
                <Button
                  className="products-add--desktop border-0 py-1 w-100  "
                  onClick={(e) => newOrder(e)}
                  type="button"
                >
                  <img
                    className="d-flex m-auto "
                    src={plusIcon}
                    alt="add-button"
                  />
                </Button>
              </Col>
            </Row>

            <Row className="pt-2">
              <div className="table-wrapper-scroll-y my-custom-scrollbar--desktop px-1">
                <Table className="lh-lg" borderless size="sm">
                  <thead>
                    <tr>
                      <th className="fw-bold col-6">فاکتور</th>
                      <th className="fw-bold">قیمت (تومان)</th>
                      <th className="fw-bold">تعداد</th>
                      <th className="col-1"></th>
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
                              <td className="">
                                {item.price &&
                                  persianJs(item.price)
                                    .englishNumber()
                                    .toString()}
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
              <Row className="border-top-blue pt-2 mt-auto">
                <Col className="col-5">
                  <span className="">جمع کل</span>
                </Col>
                <Col className="px-1">
                  {totalPrice &&
                    persianJs(totalPrice).englishNumber().toString()}
                </Col>
              </Row>
            </Row>
          </Card.Body>
        </Card>
      </Row>
    </>
  );
};
