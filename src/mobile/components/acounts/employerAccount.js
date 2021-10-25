import React, { useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import persianJs from "persianjs/persian.min";
import { history } from "../../../helpers";

//icons
import editIcon from "../../assets/images/Products/edit.svg";

//components
import { EditField } from "./editField.js";
import { EditEmployerAccount } from "./editEmployerAccount";

export const EmployerAccount = ({ user }) => {
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
      <Card.Text className="pt-0">
        <Row className="ms-0 d-flex align-items-center justify-content-start px-2">
          <Card className="backgound--light--blue border-0 radius-10">
            <Card.Body className="py-2">
              <Row>
                <Col xs={3}>نام :</Col>
                <Col dir="ltr" className="pe-0">
                  <span className="fw-bold">
                    {user.family &&
                      persianJs(user.family).englishNumber().toString()}
                  </span>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Row>
      </Card.Text>
      <Col className="px-2">
        <Card.Text className="pt-0">
          <Row className="ms-0 align-items-center">
            <Col xs={3}>موبایل :</Col>
            <Col dir="ltr" className="pe-0">
              <span className="fw-bold">
                {user.mobile &&
                  persianJs(user.mobile).englishNumber().toString()}
              </span>
            </Col>
          </Row>
        </Card.Text>

        <Card.Text className="pt-0">
          <Row className="ms-0 align-items-center">
            <Col xs={3}>کدملی :</Col>
            <Col dir="ltr" className="pe-0">
              <span className="fw-bold">
                {user.nationalIDCode &&
                  persianJs(user.nationalIDCode).englishNumber().toString()}
              </span>
            </Col>
          </Row>
        </Card.Text>
        <Card.Text className="pt-0">
          <Row className="ms-0 align-items-center">
            <Col xs={3}>ایمیل :</Col>
            <Col dir="ltr" className="pe-0">
              <span className="fw-bold">{user.email}</span>
            </Col>
          </Row>
        </Card.Text>

        <Card.Text className="pt-0">
          <Row className="ms-0 align-items-center">
            <Col xs={4}>نام شرکت :</Col>
            <Col dir="ltr" className="pe-0">
              <span className="fw-bold">
                {user.company &&
                  persianJs(user.company).englishNumber().toString()}
              </span>
            </Col>
          </Row>
        </Card.Text>

        <Card.Text className="pt-0">
          <Row className="ms-0 align-items-center">
            <Col xs={4}>آدرس شرکت :</Col>
            <Col dir="ltr" className="pe-0">
              <span className="fw-bold">
                {user.address &&
                  persianJs(user.address).englishNumber().toString()}
              </span>
            </Col>
          </Row>
        </Card.Text>

        <Card.Text className="pt-0">
          <Row className="ms-0 align-items-center">
            <Col xs={3}>نوع :</Col>
            <Col dir="ltr" className="pe-0">
              <span className="fw-bold">کارفرما</span>
            </Col>
          </Row>
        </Card.Text>

        <Card.Text className="pt-0">
          <Row className="ms-0 align-items-center">
            <Col xs={5}>شناسه ملی شرکت :</Col>
            <Col dir="ltr" className="pe-0">
              <span className="fw-bold">
                {user.nationalCode &&
                  persianJs(user.nationalCode).englishNumber().toString()}
              </span>
            </Col>
          </Row>
        </Card.Text>

        <Card.Text className="pt-0">
          <Row className="ms-0 align-items-center">
            <Col xs={4}>کد اقتصادی :</Col>
            <Col dir="ltr" className="pe-0">
              <span className="fw-bold">
                {user.financialCode &&
                  persianJs(user.financialCode).englishNumber().toString()}
              </span>
            </Col>
          </Row>
        </Card.Text>

        <Card.Text className="pt-0">
          <Row className="ms-0 align-items-center">
            <Col xs={4}>کد پستی :</Col>
            <Col dir="ltr" className="pe-0">
              <span className="fw-bold">
                {user.postalCode &&
                  persianJs(user.postalCode).englishNumber().toString()}
              </span>
            </Col>
          </Row>
        </Card.Text>

        <Card.Text className="pt-0">
          <Row className="ms-0 align-items-center">
            <Col xs={4}>شماره ثبت :</Col>
            <Col dir="ltr" className="pe-0">
              <span className="fw-bold">
                {user.registerNo &&
                  persianJs(user.registerNo).englishNumber().toString()}
              </span>
            </Col>
          </Row>
        </Card.Text>

        {user.voipNumbers?.map((item, index) => (
          <Card.Text className="pt-0">
            <Row className="ms-0 align-items-center">
              <Col xs={4}>خط تلفن {index + 1} :</Col>
              <Col dir="ltr" className="pe-0">
                <span className="fw-bold">
                  {item &&
                    persianJs(item).englishNumber().toString()}
                </span>
              </Col>
            </Row>
          </Card.Text>
        ))}
      </Col>

      <Col className="text-start mt-3" onClick={() => setEditModalShow(true)}>
        <img className="" src={editIcon} height="34px" alt="edit-icon" />
      </Col>

      <EditEmployerAccount
        show={editModalShow}
        onHide={() => {
          setEditModalShow(false);
        }}
        user={user}
      />
    </>
  );
};
