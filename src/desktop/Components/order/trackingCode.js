import React, { useEffect, useState } from "react";
import { Modal, Row, Col, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import persianJs from "persianjs/persian.min";

// Actions
import { orderActions } from "../../../actions/orderActions";

// Icons
import closeIcon from "../../assets/images/close.svg";

// Form Validator
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Components
import { CircularProgress } from "@material-ui/core";

const validationSchema = yup.object().shape({
  trackingCode: yup.string().required(),
});

export const TrackingCodeModal = ({filter , ...props}) => {
  const { loading: addTrackingCodeLoading, data: addTrackingCodeData } =
    useSelector((state) => state.addTrackingCode);
  const dispatch = useDispatch();
  const {
    register,
    setValue,
    trigger,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    mode: "all",
    criteriaMode: "all",
    resolver: yupResolver(validationSchema),
  });
  const formHandler = async (e) => {
    e.preventDefault();
    let result = await trigger();
    if (result == false) {
      return;
    }
    let params = getValues();
    params.trackingCode = persianJs(params.trackingCode)
      .toEnglishNumber()
      .toString();

    dispatch(
      orderActions.addTrackingCode({
        orderId: props.order.id,
        customerId: props.order.customer._id,
        trackingCode: params.trackingCode,
      })
    );
  };

  useEffect(() => {
    if (
      addTrackingCodeLoading == false &&
      addTrackingCodeData &&
      addTrackingCodeData.status == true
    ) {
      dispatch(orderActions.getOrders({ status: 3 , filter }));
      setValue("trackingCode", null);
      props.onHide(false);
    }
  }, [addTrackingCodeLoading]);

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
                  {...register("trackingCode")}
                  isInvalid={errors?.trackingCode ? true : false}
                  isValid={
                    Object.keys(errors).length != 0 &&
                    errors?.trackingCode == undefined &&
                    true
                  }
                />
              </Form.Group>
            </Col>
          </Row>
          {addTrackingCodeLoading ? (
            <Button
              className="fw-bold receipt--btn border-0 w-100 fs-6 d-flex justify-content-center align-items-center mt-5"
              size="lg"
              type="submit"
              disabled
            >
              <CircularProgress className="text-light" size="25px" />
              <span className="me-3"> در حال ثبت ...</span>
            </Button>
          ) : (
            <Button
              className="fw-bold order--btn order-submit--desktop border-0 w-100 notes-round mt-5"
              size="lg"
              type="submit"
              block
              onClick={formHandler}
            >
              ثبت
            </Button>
          )}
        </Form>
      </Modal.Body>
    </Modal>
  );
};
