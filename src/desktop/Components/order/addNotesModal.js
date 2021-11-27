import React, { useEffect } from "react";
import { Modal, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
//Assets
import closeIcon from "../../assets/images/close.svg";

// Actions
import { notesActions, orderActions } from "../../../actions";

// Form Validator
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  noteText: yup.string().required(),
});

export const AddNotesModal = ({filter , ...props}) => {
  const {
    register,
    getValues,
    formState: { errors },
    trigger,
  } = useForm({
    mode: "all",
    criteriaMode: "all",
    resolver: yupResolver(validationSchema),
  });

  const { loading: addNotesLoading, notes: addNoteData } = useSelector(
    (state) => state.addNotes
  );

  const dispatch = useDispatch();
  const formHandler = async (e) => {
    e.preventDefault();
    let result = await trigger();
    if (result == false) {
      return;
    }
    let params = getValues();
    const now = new Date().toISOString();

    if (props.permission == true) {
      dispatch(
        notesActions.addNotes({
          orderId: props.orderId,
          notes: [{ text: params.noteText, createdAt: now }],
        })
      );
    } else {
      props.setNotes((prevNotesState) => [
        ...prevNotesState,
        { text: params.noteText, createdAt: now },
      ]);
      props.onHide(false);
    }
  };

  useEffect(() => {
    if (
      props.permission == true &&
      addNotesLoading == false &&
      addNoteData.success == true
    ) {
      dispatch(orderActions.getOrders({ status: props.status || "0" , ...filter }));
      props.onHide(false);
    }
  }, [addNotesLoading]);

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
        {props.show && (
          <Form onSubmit={formHandler}>
            <Row className="mt-3">
              <Col className="order-filter-input">
                <Form.Group controlId="noteText">
                  <Form.Label className="pe-3">اضافه یادداشت</Form.Label>
                  <Form.Control
                    as="textarea"
                    className="notes--input"
                    {...register("noteText")}
                    isInvalid={errors?.noteText ? true : false}
                    isValid={
                      Object.keys(errors).length != 0 &&
                      errors?.noteText == undefined &&
                      true
                    }
                    style={{ height: "100px" }}
                  />
                </Form.Group>
              </Col>
            </Row>
            {addNotesLoading ? (
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
                className="fw-bold order-submit btn-dark-blue border-0 w-100 mt-4 notes-round"
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
