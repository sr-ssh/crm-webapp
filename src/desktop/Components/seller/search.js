import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import persianJs from "persianjs/persian.min";

// Actions
import { sellerActions } from "../../../actions";
// Icons
import closeIcon from "../../assets/images/close.svg";

export const SellerSearch = (props) => {
  const [filters, setFilters] = useState({ status: props.status || " " });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    console.log("handlechange", e.target);

    let value =
      e.target.value && persianJs(e.target.value).toEnglishNumber().toString();
    setFilters({ ...filters, [e.target.name]: value });

    console.log(filters);
  };

  const formHandler = (e) => {
    e.preventDefault();
    dispatch(sellerActions.getSellers(filters));
    props.onHide(false);
  };

  useEffect(() => {
    props.show &&
      props.setFilters({ company: "", phone: "", mobile: "", address: "" });
  }, [props.show]);

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
                  name="company"
                  value={filters.company}
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
                  inputMode="tel"
                  pattern="[0-9]*"
                  name="phone"
                  value={filters.phone}
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
                  inputMode="tel"
                  pattern="[0-9]*"
                  name="mobile"
                  value={filters.mobile}
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
                  style={{ height: "85px" }}
                  type="text"
                  name="address"
                  value={filters.address}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="px-2 mt-5">
            <Button
              className="fw-bold btn-dark-blue notes-round border-0 w-100 mt-3 py-3"
              type="submit"
            >
              جست و جو
            </Button>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
