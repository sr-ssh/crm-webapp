import React, { useEffect, useState } from "react";
import { Modal, Row, Col, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
// Actions
import { orderActions } from "../../../actions/orderActions";
// Icons
import closeIcon from "../../assets/images/close.svg";

export const Delivery = (props) => {
  const [deliveryMobile, setDeliveryMobile] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    e.preventDefault();
    setDeliveryMobile({ ...deliveryMobile, [e.target.id]: e.target.value });
  };

  const formHandler = (e) => {
    e.preventDefault();
    // dispatch(orderActions.sendDeliverySms(deliveryMobile));
    // props.onHide(true);
    dispatch(orderActions.editPriority({orderId: "618cd0068a6eb5e63801bd6e", priority: 1}))
  };

  useEffect(() => {
    setDeliveryMobile({ orderId: props.order });
  }, [setDeliveryMobile, props.order]);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="mx-3 order-serach-modal"
    >
      <Modal.Body className="add-product px-4">
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
          <Row className="mt-3">
            <Col className="order-filter-input">
              <Form.Group controlId="mobile">
                <Form.Label className="pe-3">
                  شماره موبایل را وارد کنید:
                </Form.Label>
                <Form.Control
                  className="order-input"
                  type="number"
                  name="mobile"
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Button
            className="fw-bold order-submit btn-dark-blue border-0 w-100 mt-4 notes-round"
            size="lg"
            type="submit"
            block
          >
            ثبت
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
