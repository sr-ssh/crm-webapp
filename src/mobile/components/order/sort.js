import React from "react";
import { useDispatch } from "react-redux";
import { Modal, Button, Row, Col } from "react-bootstrap";

// Actions
import { orderActions } from "../../../actions";

// Icons
import registerDateIcon from "./../../assets/images/order/sort/Registered-date.svg";
import trackingDateIcon from "./../../assets/images/order/sort/Follow-up-date.svg";
import priorityIcon from "./../../assets/images/order/sort/attention.svg";

export const Sort = (props) => {
  const dispatch = useDispatch();

  const handleClick = (e, n) => {
    e.preventDefault();
    dispatch(orderActions.getOrders({ status: 3, sort: n }));
    props.onHide(false);
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="mx-3 order-serach-modal sort-modal "
    >
      <Modal.Body className="order-filter-body px-2 fs-6-sm">
        <Button className="border-0 w-100 backgound--white radius-10 align-items-center p-1 box-shadow-light fs-6-sm"
        onClick={e => handleClick(e, 1)}
        >
          <Row className="align-items-center">
            <Col xs={3} className="px-0 pe-3">
              <img
                className=""
                src={registerDateIcon}
                alt="register-btn"
                height="29px"
              />
            </Col>
            <Col className="px-0" style={{ color: "black" }}>
              {" "}
              تاریخ ثبت{" "}
            </Col>
          </Row>
        </Button>
        <Button className="mt-3 w-100 border-0 backgound--white radius-10 align-items-center p-1 box-shadow-light fs-6-sm"
                onClick={e => handleClick(e, 3)}

        >
          <Row className="align-items-center">
            <Col xs={3} className="px-0 pe-3">
              <img
                className=""
                src={trackingDateIcon}
                alt="register-btn"
                height="27px"
              />
            </Col>
            <Col className="px-0" style={{ color: "black" }}>
              تاریخ پیگیری
            </Col>
          </Row>
        </Button>
        <Button className="mt-3 w-100 border-0 backgound--white radius-10 align-items-center p-1 box-shadow-light fs-6-sm"
                onClick={e => handleClick(e, 2)}

        >
          <Row className="align-items-center">
            <Col xs={3} className="px-0 pe-3">
              <img
                className=""
                src={priorityIcon}
                alt="register-btn"
                height="25px"
              />
            </Col>
            <Col className="px-0" style={{ color: "black" }}>
              اولویت
            </Col>
          </Row>
        </Button>
      </Modal.Body>
    </Modal>
  );
};
