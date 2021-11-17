import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Row, Col, Modal, Card, Spinner, Form } from "react-bootstrap";

// Actions
import { orderActions } from "../../../actions";

// Icons
import closeIcon from "../../assets/images/close.svg";
import registerDateIcon from "./../../assets/images/order/sort/Registered-date.svg";
import trackingDateIcon from "./../../assets/images/order/sort/Follow-up-date.svg";
import priorityIcon from "./../../assets/images/order/sort/attention.svg";

export const Sort = (props) => {
  let [check1, setCheck1] = useState(false);
  let [check2, setCheck2] = useState(false);
  let [check3, setCheck3] = useState(false);

  const [priority, setPriority] = useState(
    useSelector((state) => state.editPriority.data)
  );
  const loading = useSelector((state) => state.editPriority.loading);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    console.log("handlechange", e.target);

    if (e.target.id === "active1") {
      props.setSort(1);
      setCheck1(true);
      setCheck2(false);
      setCheck3(false);
    } else if (e.target.id === "active2") {
      setPriority(2);
      setCheck1(false);
      setCheck2(true);
      setCheck3(false);
    } else if (e.target.id === "active3") {
      setPriority(3);
      setCheck1(false);
      setCheck2(false);
      setCheck3(true);
    } else {
      setPriority(0);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(
      orderActions.editPriority({ orderId: props.order.id, priority: priority })
    );
    setTimeout(() => {
      dispatch(orderActions.getOrders({ status: 3 }));
      props.onHide(false);
    }, 1500);
  };

  useEffect(() => {
    setCheck1(false);
    setCheck2(false);
    setCheck3(false);
  }, [props.order, props.show]);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      className="mx-3 order-serach-modal--medium"
    >
      <Modal.Body
        className="add-product px-4"
      >
        <Button
          className="border-0 customer-modal-close--desktop"
          type="button"
          onClick={(e) => {
            props.onHide(false);
          }}
        >
          <img
            className="d-flex m-auto customer-modal-close-svg--desktop"
            src={closeIcon}
            alt="close-btn"
          />
        </Button>
        <Card
          className="m-auto mt-2 mb-0 bg-light productCard lh-lg "
          style={{ maxHeight: "70vh" }}
        >
          <Card.Body
            className="card--body--show--doc--mobile p-3 px-4 mx-4 rounded-3 fs-5
              "
          >
            <Row className="fw-bold">
              مرتب سازی بر اساس
            </Row>
            <Form>
              <Col className="my-3 justify-content-center">
                <Row>
                  <Form.Group className="mt-1" onChange={handleChange}>
                    <Row>
                      <Col xs={1}>
                        <Form.Check.Input
                          name="activity"
                          id="active1"
                          defaultChecked={check1}
                          inline
                          type="radio"
                        />
                      </Col>
                      <Col xs={1}>
                        <img
                          src={registerDateIcon}
                          height="25px"
                          alt="low-priority-icon"
                        />
                      </Col>
                      <Col>
                        <Form.Check.Label
                          htmlFor="active1"
                          inline
                          className="me-1"
                        >
                          تاریخ ثبت
                        </Form.Check.Label>
                      </Col>
                    </Row>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group className="mt-1" onChange={handleChange}>
                    <Row>
                      <Col xs={1}>
                        <Form.Check.Input
                          name="activity"
                          id="active2"
                          defaultChecked={check2}
                          inline
                          type="radio"
                        />
                      </Col>
                      <Col xs={1}>
                        <img
                          src={trackingDateIcon}
                          height="25px"
                          alt="low-priority-icon"
                        />
                      </Col>
                      <Col>
                        <Form.Check.Label
                          htmlFor="active2"
                          inline
                          className="me-1"
                        >
                          تاریخ پیگیری
                        </Form.Check.Label>
                      </Col>
                    </Row>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group className="mt-1" onChange={handleChange}>
                    <Row>
                      <Col xs={1}>
                        <Form.Check.Input
                          name="activity"
                          id="active3"
                          defaultChecked={check3}
                          inline
                          type="radio"
                        />
                      </Col>
                      <Col xs={1}>
                        <img
                          src={priorityIcon}
                          height="25px"
                          alt="low-priority-icon"
                        />
                      </Col>
                      <Col xs={3}>
                        <Form.Check.Label
                          htmlFor="active3"
                          inline
                          className="me-1"
                        >
                          الویت
                        </Form.Check.Label>
                      </Col>
                    </Row>
                  </Form.Group>
                </Row>
              </Col>
            </Form>
          </Card.Body>
        </Card>
        {loading ? (
          <Button
            className="fw-bold order-submit btn-dark-blue border-0 w-100 mt-3"
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
            className="fw-bold order-submit btn-dark-blue border-0 w-100 mt-3 notes-round"
            size="lg"
            type="submit"
            block
            onClick={handleClick}
          >
            ثبت
          </Button>
        )}
      </Modal.Body>
    </Modal>
  );
};
