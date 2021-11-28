import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Row,
  Col,
  Alert,
  Form,
  Spinner,
  Card,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import persianJs from "persianjs/persian.min";
// Actions
import { employeeActions } from "../../../actions/employeeActions";
// Helpers
import { translate } from "../../../helpers";
// Icons
import closeIcon from "../../assets/images/close.svg";

export const EditEmployee = (props) => {
  const [validated, setValidated] = useState(false);
  const dispatch = useDispatch();
  let [newPermission, setNewPermission] = useState(props.employee.permission);
  const [voipNo, setVoipNo] = useState({ voipNo: props.employee?.voipNumber });
  let editEmployeeLoading = useSelector((state) => state.editEmployee.loading);

  const handleChange = (e) => {
    let { name, type, value, checked } = e.target;
    if (type == "checkbox") {
      setNewPermission({ ...newPermission, [name]: checked });
    } else setVoipNo({ voipNo: value });
  };

  const formHandler = (e) => {
    e.preventDefault();
    let employee = {
      permissions: newPermission,
      _id: props.employee._id,
      voipNo: voipNo.voipNo,
    };
    dispatch(employeeActions.editEmployee(employee));
    setTimeout(() => {
      props.onHide(false);
      setNewPermission(null);
      dispatch(employeeActions.getEmployees());
    }, 1500);
  };

  useEffect(() => {
    if (props.show) {
      setNewPermission(props.employee.permission);
      setVoipNo({
        voipNo: props.employee?.voipNumber ? props.employee?.voipNumber : null,
      });
    }
  }, [props.show]);

  return (
    <Modal
      {...props}
      // size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      backdrop="static"
      centered
      className="modal--edit--employee"
    >
      <Modal.Body
        className="add-product px-4 permission-card applications-text-gray"
        style={{ width: "800px" }}
      >
        <Button
          className="border-0 customer-modal-close"
          style={{ left: "-13px" }}
          type="button"
          onClick={(e) => {
            props.onHide(false);
            setNewPermission(null);
          }}
        >
          <img
            className="d-flex m-auto customer-modal-close-svg"
            src={closeIcon}
            alt="close-btn"
          />
        </Button>
        <Form onSubmit={formHandler} noValidate validated={validated}>
          <Row className="m-0 p-0 ">
            <Col>
              نام :<span className="me-2">{props.employee.family}</span>
            </Col>
            <Col>
              موبایل:
              <span className="me-2">
                {props.show &&
                  persianJs(props.employee.mobile).englishNumber().toString()}
              </span>
            </Col>
          </Row>
          <Row className="m-0 p-0 mt-3">
            <Col xs={6} className="p-0 ps-4">
              <Card className="border-0 bg-transparent text-light">
                <Form.Label className="pe-3 fs-6">sip</Form.Label>
                <Form.Control
                  className="order-input py-2"
                  type="number"
                  name="voipNumber"
                  defaultValue={props.employee?.voipNumber}
                  onChange={handleChange}
                />
              </Card>
            </Col>
          </Row>
          <Card className="m-auto mt-3 productCard border-0 lh-lg pb-2">
            <Card.Body className="pb-0 ps-0 emplyees-text-gray">
              <Row className="m-0 p-0 d-flex align-items-center ">
                <Col xs={12} className="p-0 ">
                  <Card.Text className="employees--p--gray--desktop ">
                    سطح دسترسی:
                  </Card.Text>
                </Col>
                {props.show &&
                  newPermission &&
                  Object.keys(newPermission).map((key, index) => {
                    if (key == "getDiscounts") return;
                    return (
                      <Col
                        xs={4}
                        className="p-0 pe-1 mt-2 employees-text-permission--desktop d-flex  align-items-center "
                      >
                        <label className={`mb-0 p-0 option--time--filter--groupe ${!newPermission[key] ? 'border-red' : null}`}>
                          <input
                            type="checkbox"
                            name={key}
                            id={`${index}`}
                            onChange={handleChange}
                            defaultChecked={newPermission[key]}
                          />
                          <span>
                            <p className="p-0 m-0 fs-6">{translate(key)}</p>
                          </span>
                        </label>
                      </Col>
                    );
                  })}
              </Row>
            </Card.Body>
          </Card>
          {editEmployeeLoading ? (
            <Button
              className="fw-bold order-submit border-0 w-100 mt-3"
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
              className="fw-bold btn-dark-blue notes-round border-0 w-100 mt-3"
              size="lg"
              type="submit"
              block
            >
              ثبت
            </Button>
          )}
        </Form>
      </Modal.Body>
    </Modal>
  );
};
