import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import persianJs from "persianjs/persian.min";

// Icons
import closeIcon from "../../assets/images/close.svg";
import { sellerActions } from "../../../actions";

export const SellerSearch = (props) => {
  const { filters, setFilters } = props;
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
    props.show && props.setFilters({ company: "", phone: "", mobile: "", address: ""})
  }, [props.show])


  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="mx-3 order-serach-modal"
    >
      <Modal.Body className="order-filter-body">
        <Button
          className="border-0 customer-modal-close"
          type="button"
          onClick={(e) => props.onHide(false)}
        >
          <img
            className="d-flex m-auto customer-modal-close-svg"
            src={closeIcon}
            alt="close-btn"
          />
        </Button>
        <Form onSubmit={formHandler}>
          <Row>
            <Col className="col-12 order-filter-input">
              <Form.Group>
                <Form.Label className="pe-2">نام مجموعه</Form.Label>
                <Form.Control
                  className="order-input h-100"
                  type="text"
                  name="company"
                  value={filters.company}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="my-2 mt-3">
            <Col className="col-6  order-filter-input">
              <Form.Group>
                <Form.Label className="pe-2">تلفن</Form.Label>
                <Form.Control
                  className="order-input h-100"
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
                  className="order-input h-100"
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

          <Row className="my-2 mt-3">
            <Col className="col-12 order-filter-input">
              <Form.Group>
                <Form.Label className="pe-2">آدرس</Form.Label>
                <Form.Control
                  className="border-0 radius-10 h-100"
                  as="textarea"
                  rows="3"
                  name="address"
                  value={filters.address}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="px-2 mt-2">
            <Button
              className="fw-bold receipt--btn--mobile border-0 w-100 mt-4 h-100 fs-6-sm py-3"
              size="lg"
              type="submit"
              block
            >
              جست و جو
            </Button>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
