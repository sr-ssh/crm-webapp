import React, { useState } from "react";
import { Modal, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
//Assets
import closeIcon from "../../assets/images/close.svg";

// Actions
import { notesActions } from "../../../actions";

export const AddNotesModal = (props) => {
  const [notesText, setNotesText] = useState("");
  const loading = useSelector((state) => state.addNotes.loading) || false;
  const handleChange = (e) => {
    const value = e.target.value;
    setNotesText(value);
  };
  const dispatch = useDispatch();
  const formHandler = (e) => {
    e.preventDefault();
    const now = new Date();
    let createdAt = now.toISOString();
    if (!notesText == "") {
      let notes = {
        text: notesText,
        createdAt: createdAt,
      };
      if (props.permission === true)
        dispatch(notesActions.addNotes(props?.orderId, [notes]));
      else props.setNotes((prevNotesState) => [...prevNotesState, notes]);
      props.onHide(false);
    } else props.onHide(false);
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="px-4"
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
        {props.show && (
          <Form onSubmit={formHandler}>
            <Row className="mt-3">
              <Col className="order-filter-input">
                <Form.Group controlId="notes">
                  <Form.Label className="pe-3">اضافه یادداشت</Form.Label>
                  <Form.Control
                    as="textarea"
                    className="notes--input"
                    onChange={handleChange}
                    style={{ height: "100px" }}
                  />
                </Form.Group>
              </Col>
            </Row>
            {loading ? (
              <Button
                className="fw-bold btn--notes--submit border-0 w-100 mt-4"
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
                className="order-submit btn-dark-blue border-0 w-100 mt-3 notes-round fs-6"
                size="lg"
                type="submit"
                block
              >
                ثبت
              </Button>
            )}
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
};
