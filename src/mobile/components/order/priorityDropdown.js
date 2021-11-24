import React, { useState, useEffect, useRef } from "react";
import {
  Form,
  Row,
  Col,
  Dropdown,
} from "react-bootstrap";
import "react-multi-date-picker/styles/layouts/mobile.css";
import lowPriorityIcon from "./../../assets/images/order/priority/low.svg";
import mediumPriorityIcon from "./../../assets/images/order/priority/medium.svg";
import highPriorityIcon from "./../../assets/images/order/priority/high.svg";
import spinnerIcon from "./../../assets/images/sppiner.svg";

export const PriorityDropdown = (props) => {
  let { priSselectedItem, customer, setDimStatus, dimStatus, handleDropdown } =
    props;

  return (
    <Row className="m-0 px-0 align-self-center flex-row col-6">
      <Col
        className="d-flex flex-row align-items-center justify-content-start ps-0 mt-3"
        style={{ height: "fit-content" }} 
      >
        <Col className="basket-flex--desktop m-0  order-inputs w-75 justify-content-start">
          <Form.Group>
            <Form.Label className="pe-1">
              اولویت
            </Form.Label>
            <Dropdown
              className="order-input"
              onToggle={(e) => setDimStatus(!dimStatus)}
            >
              <Dropdown.Toggle
                className="radius-16 d-flex justify-content-center align-items-center priority-drop"
              >
                <Row className="text-end pe-2 order-filter-input">
                  <Col xs={4}>
                    {priSselectedItem !== "" ? (
                      <span>{priSselectedItem}</span>
                    ) : (
                      <span>هیچکدام</span>
                    )}
                  </Col>
                  <Col>
                    {customer.priority ? (
                      <img
                        className="me-auto"
                        src={
                          customer.priority === 1
                            ? lowPriorityIcon
                            : customer.priority === 2
                            ? mediumPriorityIcon
                            : customer.priority === 3
                            ? highPriorityIcon
                            : ""
                        }
                        height="20px"
                        alt="spinner-icon"
                      />
                    ) : null}
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
                className={`${dimStatus ? "dim" : ""}`}
                style={{ width: "70%" }}
              >
                <Dropdown.Item onClick={() => handleDropdown(0, "هیچکدام")}>
                  <Col className="text-end pe-1 order-filter-input">
                    هیچکدام
                  </Col>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={() => handleDropdown(1, "کم")}>
                  <Row className="text-end pe-2 order-filter-input">
                    <Col xs={3}>کم</Col>
                    <Col>
                      <img
                        className="me-auto"
                        src={lowPriorityIcon}
                        height="20px"
                        alt="spinner-icon"
                      />
                    </Col>
                  </Row>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={() => handleDropdown(2, "متوسط")}>
                  <Row className="text-end pe-2 order-filter-input">
                    <Col xs={3}>متوسط</Col>
                    <Col>
                      <img
                        className="me-auto"
                        src={mediumPriorityIcon}
                        height="20px"
                        alt="spinner-icon"
                      />
                    </Col>
                  </Row>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={() => handleDropdown(3, "زیاد")}>
                  <Row className="text-end pe-2 order-filter-input">
                    <Col xs={3}>زیاد</Col>
                    <Col>
                      <img
                        className="me-auto"
                        src={highPriorityIcon}
                        height="20px"
                        alt="spinner-icon"
                      />
                    </Col>
                  </Row>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group>
        </Col>
      </Col>
    </Row>
  );
};
