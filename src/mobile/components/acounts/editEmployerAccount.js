import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Modal,
  Row,
  Col,
  Form,
  Button,
  Spinner,
  Card,
} from "react-bootstrap";
import persianJs from "persianjs/persian.min";

//Assets
import closeIcon from "../../assets/images/close.svg";
import addIcon1 from "../../assets/images/order/add-blue.svg";
import addIcon2 from "./../../assets/images/order/plus.svg";

//Actions
import { userActions } from "../../../actions";

export const EditEmployerAccount = (props) => {
  let { user } = props;
  const [inputs, setInputs] = useState("");
  const [voipNumbers, setVoipNumbers] = useState([]);
  const dispatch = useDispatch();

  const loader = useSelector((state) => state.editProducOrder.loading);

  useEffect(() => {
    user &&
      setInputs({
        family: user.family,
        company: user.company,
        nationalCode: user.nationalCode,
        financialCode: user.financialCode,
        registerNo: user.registerNo,
        postalCode: user.postalCode,
        address: user.address,
        nationalIDCode: user.nationalIDCode,
        voipNumbers: user.voipNumbers,
        voipNumber: user.voipNumber,
      });
  }, [props.show]);

  let closeHandler = (e) => {
    props.onHide(false);
  };

  let companyNameInputHandler = (e, index) => {
    let value = e.target.value && persianJs(e.target.value).toEnglishNumber().toString();
    if (e.target.name === "voipNumbers") {
      inputs.voipNumbers[index] = parseInt(value);
      console.log(inputs);
    } else setInputs({ ...inputs, [e.target.name]: value });
  };

  const formHandler = (e) => {
    e.preventDefault();
    inputs.voipNumbers = inputs.voipNumbers.filter((item) => item !== "" && item !== null);
    dispatch(userActions.editEmployerAccount(inputs));
    setTimeout(() => {
      dispatch(userActions.getUserInfo())
      closeHandler()
    }, 1500);
  };

  return (
    <Modal
      {...props}
      size="lg"
      backdrop="static"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="w-100 m-0 p-0 order-serach-modal"
    >
      <Button
        className="border-0 customer-modal-close--desktop"
        type="button"
        onClick={closeHandler}
      >
        <img
          className="d-flex m-auto customer-modal-close-svg--desktop"
          src={closeIcon}
          alt="close-btn"
        />
      </Button>

      <Modal.Body className="add-product px-3">
        <Form onSubmit={formHandler}>
          <Container className="m-0 p-0 mx-auto d-flex flex-column justify-content-between">
            <Row className="m-0 p-0 mt-2">
              <Col className="p-0 ps-3">
                <Card className="border-0 bg-transparent text-light">
                  <Form.Label className="pe-3">نام</Form.Label>
                  <Form.Control
                    className="order-input company-input"
                    type="text"
                    defaultValue={inputs.family}
                    onChange={companyNameInputHandler}
                    name="family"
                  />
                </Card>
              </Col>

              <Col className="p-0">
                <Card className="border-0 bg-transparent text-light">
                  <Form.Label className="pe-3">کد ملی</Form.Label>
                  <Form.Control
                    className="order-input company-input"
                    type="tel"
                    inputMode="tel"
                    pattern="[0-9 ۰-۹]*"
                    defaultValue={inputs.nationalIDCode}
                    onChange={companyNameInputHandler}
                    name="nationalIDCode"
                  />
                </Card>
              </Col>
            </Row>

            <Row className="m-0 p-0 mt-1">
              <Col className="m-0 p-0 ">
                <Card className="border-0 bg-transparent text-light">
                  <Form.Label className="pe-3">آدرس</Form.Label>
                  <Form.Control
                    className="order-input address-input py-2"
                    type="text"
                    defaultValue={inputs.address}
                    onChange={companyNameInputHandler}
                    name="address"
                  />
                </Card>
              </Col>
            </Row>

            <Row className="m-0 p-0 mt-2">
              <Col className="p-0">
                <Card className="border-0 bg-transparent text-light">
                  <Form.Label className="pe-3">نام شرکت</Form.Label>
                  <Form.Control
                    className="order-input company-input"
                    type="text"
                    defaultValue={inputs.company}
                    onChange={companyNameInputHandler}
                    name="company"
                  />
                </Card>
              </Col>
            </Row>

            <Row className="m-0 p-0 mt-2">
              <Col xs={6} className="p-0 ps-3">
                <Card className="border-0 bg-transparent text-light">
                  <Form.Label className="pe-3">شناسه ملی شرکت</Form.Label>
                  <Form.Control
                    className="order-input company-input"
                    type="tel"
                    inputMode="tel"
                    pattern="[0-9 ۰-۹]*"
                    defaultValue={inputs.nationalCode}
                    onChange={companyNameInputHandler}
                    name="nationalCode"
                  />
                </Card>
              </Col>

              <Col className="p-0 ">
                <Card xs={6} className="border-0 bg-transparent text-light">
                  <Form.Label className="pe-3">کداقتصادی</Form.Label>
                  <Form.Control
                    className="order-input company-input"
                    type="tel"
                    inputMode="tel"
                    pattern="[0-9 ۰-۹]*"
                    defaultValue={inputs.financialCode}
                    onChange={companyNameInputHandler}
                    name="financialCode"
                  />
                </Card>
              </Col>
            </Row>

            <Row className="m-0 p-0 mt-1">
              <Col xs={6} className="p-0 ps-3">
                <Card className="border-0 bg-transparent text-light">
                  <Form.Label className="pe-3">شماره ثبت</Form.Label>
                  <Form.Control
                    className="order-input company-input"
                    type="tel"
                    inputMode="tel"
                    pattern="[0-9 ۰-۹]*"
                    defaultValue={inputs.registerNo}
                    onChange={companyNameInputHandler}
                    name="registerNo"
                  />
                </Card>
              </Col>

              <Col xs={6} className="p-0 ">
                <Card className="border-0 bg-transparent text-light">
                  <Form.Label className="pe-3">کدپستی</Form.Label>
                  <Form.Control
                    className="order-input company-input"
                    type="tel"
                    inputMode="tel"
                    pattern="[0-9 ۰-۹]*"
                    defaultValue={inputs.postalCode}
                    onChange={companyNameInputHandler}
                    name="postalCode"
                  />
                </Card>
              </Col>
            </Row>

            <Row className="m-0 p-0">
              <Col xs={6} className="p-0 ps-3 mt-1">
                <Card className="border-0 bg-transparent text-light">
                  <Form.Label className="pe-3">sip</Form.Label>
                  <Form.Control
                    className="order-input company-input"
                    type="tel"
                    inputMode="tel"
                    pattern="[0-9 ۰-۹]*"
                    defaultValue={inputs.voipNumber}
                    onChange={companyNameInputHandler}
                    name="sip"
                  />
                </Card>
              </Col>
              {inputs.voipNumbers?.map((item, index) => (
                <Col
                  xs={`${
                    index == inputs.voipNumbers.length - 1 &&
                    inputs.voipNumbers?.length
                      ? 4
                      : 6
                  }`}
                  key={index}
                  className={`p-0 mt-1 ${
                    index != inputs.voipNumbers.length - 1
                      ? index % 2
                        ? "ps-3"
                        : ""
                      : "ms-3"
                  } `}
                >
                  <Card className="border-0 bg-transparent text-light">
                    <Form.Label className="pe-3">
                      خط تلفن {index + 1}
                    </Form.Label>
                    <Form.Control
                      className="order-input company-input"
                      type="tel"
                      inputMode="tel"
                      pattern="[0-9 ۰-۹]*"
                      defaultValue={item}
                      onChange={(e) => companyNameInputHandler(e, index)}
                      name="voipNumbers"
                    />
                  </Card>
                </Col>
              ))}

              <Col className="mt-2 mb-0 pb-0 pt-3 w-50 pe-0">
                {!inputs.voipNumbers?.length ? (
                  <Button
                    className={`d-flex flex-row align-items-center btn--add--voip--desktop radius-10`}
                    onClick={() => setVoipNumbers(inputs.voipNumbers?.push(""))}
                  >
                    <img
                      className="me-3"
                      src={addIcon1}
                      height="25px"
                      alt="edit-icon"
                    />
                    <span className="me-1 fw-bold ms-3">اضافه خط تلفن</span>
                  </Button>
                ) : (
                  <Button
                    className={`p-2 d-flex flex-row align-items-center btn--add--voip radius-16 `}
                    onClick={() => setVoipNumbers(inputs.voipNumbers?.push(""))}
                  >
                    <img
                      className=""
                      src={addIcon2}
                      height="25px"
                      alt="edit-icon"
                    />
                  </Button>
                )}
              </Col>
            </Row>

            {loader ? (
              <Button
                className="fw-bold order-submit border-0 w-100 mt-4"
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
                className="fw-bold btn-light-blue notes-round border-0 w-100 mt-4"
                size="lg"
                type="submit"
                block
              >
                ثبت
              </Button>
            )}
          </Container>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
