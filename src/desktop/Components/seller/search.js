import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
//import { DatePicker } from "jalali-react-datepicker";
import DatePicker from "react-multi-date-picker";
import moment from "jalali-moment";
import persianJs from "persianjs/persian.min";

// Actions
import { orderActions } from "../../../actions";
// Icons
import closeIcon from "../../assets/images/close.svg";

export const SellerSearch = (props) => {
  const [filters, setFilters] = useState({ status: props.status || " " });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.name == "customerMobile")
      e.target.value = persianJs(e.target.value).toEnglishNumber().toString();
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const formHandler = (e) => {
    e.preventDefault();
    dispatch(orderActions.getOrders(filters));
    props.onHide(false);
  };

  const submitCalendar = (value, name) => {
    let date = `${value.year}/${value.month.number}/${value.day}`;
    date = moment
      .from(date, "fa", "YYYY/MM/DD")
      .locale("en")
      .format("YYYY-MM-DD");
    setFilters({ ...filters, [name]: date });
  };
  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      backdrop="static"
      centered
      className="mx-3 modal--search--seller"
    >
      <Modal.Body className="search-seller px-4 permission-card applications-text-gray">
        <Button
          className="border-0 customer-modal-close"
          type="button"
          style={{ left: "-13px" }}
          onClick={(e) => props.onHide(false)}
        >
          <img
            className="d-flex m-auto customer-modal-close-svg--desktop"
            src={closeIcon}
            alt="close-btn"
          />
        </Button>
        <Form onSubmit={formHandler}>
          <Row className="mt-2">
            <Col className="col-12 order-filter-input">
              <Form.Group>
                <Form.Label className="pe-2">نام مجموعه</Form.Label>
                <Form.Control
                  className="order-input notes-round"
                  type="text"
                  name="customerName"
                  value={filters.customerName}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="my-4">
            <Col className="col-6  order-filter-input">
              <Form.Group>
                <Form.Label className="pe-2">تلفن</Form.Label>
                <Form.Control
                  className="order-input notes-round"
                  type="tel"
                  name="customerMobile"
                  value={filters.customerMobile}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col className="col-6  order-filter-input">
              <Form.Group>
                <Form.Label className="pe-2">همراه</Form.Label>
                <Form.Control
                  className="order-input notes-round"
                  type="tel"
                  name="customerMobile"
                  value={filters.customerMobile}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="my-2 justify-content-between">
          <Col className="col-12  order-filter-input">
              <Form.Group>
                <Form.Label className="pe-2">آدرس</Form.Label>
                <Form.Control
                  className="order-input notes-round"
                  style={{height : "85px"}}
                  type="text"
                  name="customerMobile"
                  value={filters.customerMobile}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="px-2 mt-5">
            <Button className="fw-bold btn-dark-blue notes-round border-0 w-100 mt-3 py-3" type="submit">
              جست و جو
            </Button>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
