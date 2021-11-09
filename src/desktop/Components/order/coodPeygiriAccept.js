import React, { useEffect, useState } from "react";
import { Modal, Row, Col, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";

// Actions
import { orderActions } from "../../../actions/orderActions";

// Icons
import closeIcon from "../../assets/images/close.svg";

export const CoodPeygiriAccept = (props) => {
  const [trackingCode, setTrackingCode] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    e.preventDefault();
    // setDeliveryMobile({ ...deliveryMobile, [e.target.id]: e.target.value });
  };

  const formHandler = (e) => {
    e.preventDefault();
    console.log(1);
    // dispatch(orderActions.sendDeliverySms(deliveryMobile));
    // props.onHide(true);
  };

  //   useEffect(() => {
  //     setDeliveryMobile({ orderId: props.order });
  //   }, [setDeliveryMobile, props.order]);

  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      size="sm"
      backdrop="static"
      className="mx-3"
    >
      <Modal.Body className="add-product px-4">
        <Button
          className="border-0 customer-modal-close--desktop"
          type="button"
          onClick={(e) => props.onHide(false)}
        >
          <img
            className="d-flex m-auto customer-modal-close-svg--desktop"
            src={closeIcon}
            alt="close-btn"
          />
        </Button>

        <Form onSubmit={formHandler}>
          <Row className="mt-3">
            <Col className="order-filter-input">
              <Form.Group controlId="mobile">
                <Form.Label className="pe-3">کد پیگیری</Form.Label>
                <Form.Control
                  className="text-center order-input notes-round"
                  type="tel"
                  name="trackingCode"
                  defaultValue={trackingCode}
                  onChange={(e) => setTrackingCode(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Button
            className="fw-bold order--btn order-submit--desktop border-0 w-100 notes-round mt-5"
            size="lg"
            type="submit"
            block
            onClick={formHandler}
          >
            ثبت
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
