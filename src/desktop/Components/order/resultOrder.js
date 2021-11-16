import React, { useState } from "react";
import {
  Modal,
  Row,
  Col,
  Form,
  Button,
  Dropdown,
  Alert,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

// Form Validator
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Actions
import { orderActions } from "../../../actions";
// Icons
import closeIcon from "../../assets/images/close.svg";
// import cancelIcon from '../../assets/images/order/cancel.svg'
// import submitIcon from './../../assets/images/order/submit.svg'
import DoneRoundedIcon from "@material-ui/icons/DoneRounded";

// Components
import { CircularProgress } from "@material-ui/core";

// Validation Schema Form
const validationSchema = yup.object().shape({
  failureReasons: yup.string().required(),
});

export const ResultOrder = (props) => {
  const dispatch = useDispatch();
  const [failureReason, setfailureReason] = useState(false);
  const [dimStatus, setDimStatus] = useState(false);
  const { loading: getFailureReasonsLoading, data: getFailureReasonsData } =
    useSelector((state) => state.getFailureReasons);

  const {
    register,
    setValue,
    getValues,
    reset,
    watch,
    trigger,
    formState: { errors },
  } = useForm({
    mode: "all",
    criteriaMode: "all",
    resolver: yupResolver(validationSchema),
  });

  let failure = async () => {
    let result = await trigger();
    if (result == false) {
      return;
    }
    let paramsForm = getValues();
    let isReasonExist = getFailureReasonsData.filter(
      (item, index) => item.text.trim() == paramsForm.failureReasons.trim()
    );
    let param = {
      orderId: props.order.id,
      unsuccessfulReason: {
        text: paramsForm.failureReasons,
        id:
          isReasonExist.length > 0
            ? isReasonExist[0].id
            : getFailureReasonsData.length + 1,
      },
    };
    dispatch(orderActions.failSaleOpportunity(param));
    setTimeout(() => {
      dispatch(orderActions.getOrders({ status: 3 }));
      props.onHide(false);
    }, 1500);
  };

  let successful = () => {
    dispatch(orderActions.editOrderStatus(props.order.id, "0"));
    setTimeout(() => {
      dispatch(orderActions.getOrders({ status: 3 }));
      props.onHide(false);
    }, 1500);
  };

  let getFailureReasons = () => {
    dispatch(orderActions.getFailureReasons());
  };

  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className={` mx-3 modal--result--Order  ${
        failureReason ? "modal--result--Order--failure" : null
      } `}
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
        {failureReason ? (
          <Row className="h-100 d-flex flex-column justify-content-center align-items-center ">
            <Col className="add-order-input--desktop d-flex justify-content-center align-items-end ">
              <Form.Group className="p--relative w-100">
                <Form.Label className="me-3">
                  به چه دلیل
                  <span className="text--failure--result--order">
                    موفق نبود؟
                  </span>
                </Form.Label>
                <Form.Control
                  className="input--failur--result--order"
                  type="text"
                  {...register("failureReasons")}
                  isInvalid={errors?.failureReasons ? true : false}
                  isValid={
                    Object.keys(errors).length != 0 &&
                    errors?.failureReasons == undefined &&
                    true
                  }
                />
                <Dropdown
                  onToggle={(e) => setDimStatus(!dimStatus)}
                  onClick={(e) => getFailureReasons()}
                >
                  <Dropdown.Toggle className="btn--more--faile--reason"></Dropdown.Toggle>
                  <Dropdown.Menu
                    className={` ${dimStatus ? "dim" : ""} ${
                      getFailureReasonsLoading ||
                      (getFailureReasonsLoading == false &&
                        getFailureReasonsData.length < 1)
                        ? "d-flex justify-content-center align-items-center"
                        : null
                    } dropdownProductMenu dropdownFailureReasonsMenu`}
                  >
                    {getFailureReasonsLoading ? (
                      <CircularProgress className="my-2" size="25px" />
                    ) : null}
                    {getFailureReasonsLoading == false &&
                    getFailureReasonsData.length < 1 ? (
                      <span className="fs-7">هنوز دلیلی اضافه نشده !</span>
                    ) : null}

                    {getFailureReasonsLoading == false &&
                    getFailureReasonsData &&
                    getFailureReasonsData.length > 0
                      ? getFailureReasonsData.map((item, index) => {
                          return (
                            <Col key={index}>
                              {index ? <Dropdown.Divider /> : null}
                              <Dropdown.Item
                                onClick={() => {
                                  setValue("failureReasons", item.text, {
                                    shouldValidate: true,
                                  });
                                }}
                              >
                                <Row>
                                  <Col className="text-end pe-1">
                                    {item.text}
                                  </Col>
                                </Row>
                              </Dropdown.Item>
                            </Col>
                          );
                        })
                      : null}
                  </Dropdown.Menu>
                </Dropdown>
              </Form.Group>
            </Col>
            <Col className="m-0 p-0 d-flex justify-content-center align-items-end mb-2">
              <Button
                className="fw-bold order--btn order-submit--desktop border-0 w-100 notes-round"
                size="lg"
                type="submit"
                block
                onClick={() => failure()}
              >
                ثبت
              </Button>
            </Col>
          </Row>
        ) : (
          <Row className="h-100 d-flex flex-column justify-content-center align-items-center ">
            <Col className="d-flex justify-content-center align-items-end ">
              <Button
                className="fw-bold order-submit border-0 w-75 text-light fs-6 btn--result--order btn--result--order--success "
                onClick={(e) => {
                  successful();
                }}
                size="lg"
                block
              >
                <DoneRoundedIcon className="ms-3" />
                <span>موفق بود</span>
              </Button>
            </Col>
            <Col className="d-flex justify-content-center ">
              <Button
                className="fw-bold order-submit border-0 text-light w-75  fs-6 btn--result--order btn--result--order--danger "
                size="lg"
                onClick={(e) => {
                  setfailureReason(true);
                  // failure();
                }}
                type="submit"
                block
              >
                <img
                  className="ms-3 customer-modal-close-svg--desktop"
                  src={closeIcon}
                  alt="close-btn"
                />
                <span>موفق نبود</span>
              </Button>
            </Col>
          </Row>
        )}
      </Modal.Body>
    </Modal>
  );
};
