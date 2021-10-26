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
  Card,
} from "react-bootstrap";
import moment from "jalali-moment";
import "react-multi-date-picker/styles/layouts/mobile.css";
import persianJs from "persianjs/persian.min";
import { history } from "../../../helpers";
// Actions
import { orderActions, customerActions } from "../../../actions";

//icons
import editIcon from "../../assets/images/Products/edit.svg";

//components
import { EditField } from "./editField.js";

export const EmployeeAccount = ({ user }) => {
  const [editModalShow, setEditModalShow] = useState(false);
  const [input, setInput] = useState("");
  const [name, setName] = useState("");

  const edit = (value, name) => {
    setInput(value);
    setName(name);
    setEditModalShow(true);
    console.log(input);
  };

  return (
    <>
      {user && console.log(user.employer)}
      <Card.Text className="pt-1 pe-3">
        <Row className="ms-0 align-items-center">
          <Col xs={3}>نام :</Col>
          <Col className="pe-0">
            <span className="fw-bold">
              {user.family && persianJs(user.family).englishNumber().toString()}
            </span>
          </Col>
          <Col
            className="text-start my-0"
            onClick={() => edit(user.family, "family")}
          >
            <img className="" src={editIcon} height="34px" alt="edit-icon" />
          </Col>
        </Row>
      </Card.Text>

      <Card.Text className="pt-1 pe-3">
        <Row className="ms-0 align-items-center">
          <Col xs={3}>موبایل :</Col>
          <Col className="pe-0">
            <span className="fw-bold">
              {user.mobile && persianJs(user.mobile).englishNumber().toString()}
            </span>
          </Col>
        </Row>
      </Card.Text>

      <Card.Text className="pt-1 pe-3">
        <Row className="ms-0 align-items-center">
          <Col xs={3}>ایمیل :</Col>
          <Col className="pe-0">
            <span className="fw-bold">{user.email}</span>
          </Col>
        </Row>
      </Card.Text>

      <Card.Text className="pt-1 pe-3">
        <Row className="ms-0 align-items-center">
          <Col xs={3}>آدرس :</Col>
          <Col xs={6} className="pe-0">
            <span className="fw-bold">
              {user.address &&
                persianJs(user.address).englishNumber().toString()}
            </span>
          </Col>
          <Col
            className="text-start my-0"
            onClick={() => {
              edit(user.address, "address");
            }}
          >
            <img className="" src={editIcon} height="34px" alt="edit-icon" />
          </Col>
        </Row>
      </Card.Text>

      <Card.Text className="pt-1 pe-3">
        <Row className="ms-0 align-items-center">
          <Col xs={3}>نوع :</Col>
          <Col className="pe-0">
            <span className="fw-bold">کارمند</span>
          </Col>
        </Row>
      </Card.Text>

      <Card.Text className="pt-1 pe-3">
        <Row className="ms-0 align-items-center">
          <Col xs={3} className="fs-6">sip :</Col>
          <Col className="pe-0">
            <span className="fw-bold">
              {user.voipNumber &&
                persianJs(user.voipNumber).englishNumber().toString()}
            </span>
          </Col>
        </Row>
      </Card.Text>

      <Row className="ms-2 orders mx-0">
        <Card className="background-blue border-0 customer-round">
          <Card.Body className="ps-0 lh-lg py-3 pe-1">
            <Row className="ms-0 align-items-center">
              <Col xs={4}>نام کارفرما:</Col>
              <Col className="pe-0">
                <span className="fw-bold">
                  {user.employer && user.employer.family}
                </span>
              </Col>
            </Row>
            <Row className="ms-0 align-items-center mt-2">
              <Col xs={4}>نام شرکت:</Col>
              <Col className="pe-0">
                <span className="fw-bold">
                  {user.employer && user.employer.company}
                </span>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Row>

      <EditField
        show={editModalShow}
        onHide={() => {
          setEditModalShow(false);
          setInput("");
          history.go(0);
        }}
        input={input}
        name={name}
      />
    </>
  );
};
