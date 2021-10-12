import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Row, Col, Form, Button, Spinner, Alert } from "react-bootstrap";

// Actions
import { orderActions } from "../../../actions";

export const ModalContinueProcessesAddOrder = (props) => {
  const dispatch = useDispatch();
  let addOrderLoading = useSelector((state) => state.addOrder.loading);
  let addOrder = useSelector((state) => state.addOrder);

  const editHandler = (e) => {
      debugger;
    dispatch(orderActions.addOrder(props.order , props.customer ,  props.notes, 3 , 1 ))
    setTimeout(() => {
      props.onHide(false);
    }, 700);
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      className="mx-3 order-serach-modal"
    >
      <Modal.Body className="add-product px-4">
        <Row>
          <Col className="text-center">
            <span className="">کالا های زیر در انبار موجود نیستند.</span>
          </Col>
        </Row>
        <Row>
          {addOrder?.error?.data.map((item) => {
            return (
              <Col className="text-center">
                <span className="">{item.name}</span>
                <span className="">{item.amount}</span>
              </Col>
            );
          })}
        </Row>
        <Form className="d-flex justify-content-around">
          <Button
            className="fw-bold order-submit border-0 w-25 mt-4 text-light"
            onClick={(e) => props.onHide(false)}
            size="lg"
            block
          >
            لغو عملیات
          </Button>
          {addOrderLoading ? (
            <Button
              className="fw-bold order-submit border-0 w-50 mt-4"
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
              در حال ثبت ...
            </Button>
          ) : (
            <Button
              className="fw-bold order-submit border-0 bg-danger text-light w-25 mt-4"
              size="lg"
              onClick={(e) => editHandler(e)}
              type="submit"
              block
            >
              ادامه عملیات
            </Button>
          )}
        </Form>
      </Modal.Body>
    </Modal>
  );
};
