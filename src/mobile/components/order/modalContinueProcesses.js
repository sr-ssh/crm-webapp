import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Row, Col, Form, Button, Spinner, Alert } from "react-bootstrap";

// Actions
import { orderActions } from "../../../actions";
// Icons
import closeIcon from '../../assets/images/close.svg'

export const ModalContinueProcessesAddOrder = (props) => {
  const dispatch = useDispatch();
  let addOrderLoading = useSelector((state) => state.addOrder.loading);
  let addOrder = useSelector((state) => state.addOrder);

  const editHandler = (e) => {
    e.preventDefault();
    dispatch(orderActions.addOrder(props.order , props.customer ,  props.notes, 3 , 1 ))
    setTimeout(() => {
      props.onHide(false);
      props.clearInputes()
    }, 700);
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      className="mx-3 px-2 order-serach-modal"
    >
      <Modal.Body className="add-product px-4">
      <Button className="border-0 customer-modal-close--desktop" type="button" onClick={e => props.onHide(false)}>
                    <img className="d-flex m-auto customer-modal-close-svg--desktop" src={closeIcon} alt="close-btn" />
      </Button>
        <Row>
          <Col className="text-center">
          <span className="">موجودی موارد زیر اتمام یافته است. آیا از ادامه دادن مطمئن هستید؟</span>
           
          </Col>
        </Row>
        <Row className="mt-3 bg-light notes-round d-flex justify-content-center align-items-center px-3 "   > 

          {addOrder?.error?.data?.map((item , index) => {
            return (
              <Col className="m-0 p-0 text-center flex-grow-0 text-nowrap my-2">
               <span className="fw-bold">{item.name}</span>
                <span className="">{item.amount}</span>
                { addOrder?.error?.data.length-1 === index  ? null :<span className="mx-2">.</span> }
              </Col>
            );
          })}
        </Row>
        <Form className="d-flex justify-content-around">
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
          ) : (<Button
            className="fw-bold order-submit border-0 w-50 mt-4 text-light ms-5 btn--success--desktop"
            onClick={(e) => editHandler(e)}
            size="lg"
            block
          >
            بله
          </Button>
          )}
        
            <Button
              className="fw-bold order-submit border-0  text-light w-50 mt-4 me-5 btn--danger--desktop" 
              size="lg"
            onClick={(e) =>{ e.preventDefault();props.onHide(false)} }
              type="submit"
              block
            >
              خیر
            </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
