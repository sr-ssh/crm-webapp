import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Card,
  Form,
  Col,
  Row,
  Button,
  Dropdown,
  Spinner,
} from "react-bootstrap";
import persianJs from 'persianjs/persian.min';


// Actions
import { settingActions } from "../../../actions";
// Icons
import editIcon from "../../assets/images/setting/edit-blue.svg";
import inactiveEditIcon from "../../assets/images/setting/inactive-edit.svg";
import spinnerIcon from "./../../assets/images/sppiner-blue.svg";

// Components
import CircularProgress from "@material-ui/core/CircularProgress";

export const OrderSetting = () => {
  const dispatch = useDispatch();
  const [configSettingOrder, setConfigSettingOrder] = useState({
    share: {},
    preSms: {},
    postDeliverySms: {},
    postCustomerSms: {},
    reminder: {},
    duration: {}
  });
  const [configSettingLead, setConfigSettingLead] = useState({
    leadCountPerEmployee: "",
  });
  let settingOrder = useSelector((state) => state.getSettingOrder);
  let editsettingOrder = useSelector((state) => state.editSettingOrder);

  let toggleHandler = (e) => {
    let { id, name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setConfigSettingOrder({
        ...configSettingOrder,
        [id]: { ...configSettingOrder[id], status: checked },
      });
    }
    if (type === "textarea") {
      setConfigSettingOrder({
        ...configSettingOrder,
        [name]: { ...configSettingOrder[name], text: value },
      });
    }
    if (name === "share" || name === "reminder" || name === "duration") {
      setConfigSettingOrder({
        ...configSettingOrder,
        [name]: { ...configSettingOrder[name], unitTime: id },
      });
    }
    if (name === "shareText") {
      value = value  ? persianJs(value).toEnglishNumber().toString() : null
      setConfigSettingOrder({
        ...configSettingOrder,
        [id]: { ...configSettingOrder[id], time: value },
      });
    }
    if (id === "leadCountPerEmployee") {
      value = value  ? persianJs(value).toEnglishNumber().toString() : null
      setConfigSettingLead({
        ...configSettingLead,
        [id]: value,
      });
    }
  };

    console.log(configSettingOrder)

  const HandleSubmit = (e) => {
    e.preventDefault();

    if(configSettingLead.leadCountPerEmployee == null || configSettingOrder.share.time == null  ) {return}
    dispatch(
      settingActions.editSettingOrder({
        order: configSettingOrder,
        lead: configSettingLead,
      })
    );
  };
  const getUnitTimeText = (e) => {
    if (e === "M") {
      return "دقیقه";
    } else if (e === "H") {
      return "ساعت";
    } else if (e === "D") {
      return "روز";
    }
  };
  useEffect(() => {
    if (settingOrder.loading == false && settingOrder.data != undefined) {
      setConfigSettingOrder({ ...settingOrder.data.setting.order });
      setConfigSettingLead({ ...settingOrder.data.setting.lead });
    }
  }, [settingOrder]);

  useEffect(() => {
    dispatch(settingActions.getSettingOrder());
  }, [dispatch]);

  return (
    //
    <Container
      fluid
      className={`w-100 d-flex flex-column ${
        settingOrder.loading && "justify-content-center align-items-center"
      } px-4 `}
      style={{ height: settingOrder.loading && "80vh" }}
    >
      {settingOrder.loading ? (
        <CircularProgress />
      ) : (
        <>
          <Row className="m-0 my-3 p-0 w-100">
            <Card className="sms-text-container border-0 notes-round">
              <Card.Body className="d-flex flex-nowrap ">
                <Col
                  className={`col-3 d-flex align-items-center justify-content-start text--input--sms--desktop ${
                    !configSettingOrder.preSms.status &&
                    "inactive--text--input--sms--desktop"
                  }`}
                >
                  <input
                    type="checkbox"
                    id="preSms"
                    name="preSms"
                    className="btn-toggle-status-setting--sms"
                    onChange={toggleHandler}
                    checked={configSettingOrder.preSms.status}
                  />
                  <span>پیامک ثبت سفارش</span>
                </Col>
                <Col className="col-8 pe-2">
                  <Form.Control
                    as="textarea"
                    name="preSms"
                    className={`textarea--setting--desktop ${
                      !configSettingOrder.preSms.status &&
                      "inactive--textarea--setting--desktop"
                    } `}
                    onChange={toggleHandler}
                    defaultValue={configSettingOrder.preSms.text}
                  />
                </Col>
                <Col className="col-1 d-flex align-items-center justify-content-center pe-5 me-1">
                  <img
                    src={
                      configSettingOrder.preSms.status
                        ? editIcon
                        : inactiveEditIcon
                    }
                    height="35px"
                    alt="edit-icon"
                    style={{ cursor: "pointer" }}
                  />
                </Col>
              </Card.Body>
            </Card>
          </Row>
          <Row className="m-0 p-0 my-3  w-100">
            <Card className="sms-text-container border-0 notes-round">
              <Card.Body className="d-flex flex-nowrap ">
                <Col
                  className={`col-3 d-flex align-items-center justify-content-start text--input--sms--desktop ${
                    !configSettingOrder.postDeliverySms.status &&
                    "inactive--text--input--sms--desktop"
                  }`}
                >
                  <input
                    type="checkbox"
                    id="postDeliverySms"
                    name="postDeliverySms"
                    className="btn-toggle-status-setting--sms"
                    onChange={toggleHandler}
                    checked={configSettingOrder.postDeliverySms.status}
                  />
                  <span>پیامک پیک</span>
                </Col>
                <Col className="col-8 pe-2">
                  <Form.Control
                    as="textarea"
                    name="postDeliverySms"
                    className={`textarea--setting--desktop ${
                      !configSettingOrder.postDeliverySms.status &&
                      "inactive--textarea--setting--desktop"
                    }`}
                    onChange={toggleHandler}
                    defaultValue={configSettingOrder.postDeliverySms.text}
                  />
                </Col>
                <Col className="col-1 d-flex align-items-center justify-content-center pe-5 me-1">
                  <img
                    src={
                      configSettingOrder.postDeliverySms.status
                        ? editIcon
                        : inactiveEditIcon
                    }
                    height="35px"
                    alt="edit-icon"
                    style={{ cursor: "pointer" }}
                  />
                </Col>
              </Card.Body>
            </Card>
          </Row>
          <Row className="m-0 p-0 my-3  w-100">
            <Card className="sms-text-container border-0 notes-round">
              <Card.Body className="d-flex flex-nowrap ">
                <Col
                  className={`col-3 d-flex align-items-center justify-content-start text--input--sms--desktop ${
                    !configSettingOrder.postCustomerSms.status &&
                    "inactive--text--input--sms--desktop"
                  }`}
                >
                  <input
                    type="checkbox"
                    id="postCustomerSms"
                    name="postCustomerSms"
                    className="btn-toggle-status-setting--sms"
                    onChange={toggleHandler}
                    checked={configSettingOrder.postCustomerSms.status}
                  />
                  <span>پیامک ارسال محصول</span>
                </Col>
                <Col className="col-8 pe-2">
                  <Form.Control
                    as="textarea"
                    name="postCustomerSms"
                    className={`textarea--setting--desktop ${
                      !configSettingOrder.postCustomerSms.status &&
                      "inactive--textarea--setting--desktop"
                    }`}
                    onChange={toggleHandler}
                    defaultValue={configSettingOrder.postCustomerSms.text}
                  />
                </Col>
                <Col className="col-1 d-flex align-items-center justify-content-center pe-5 me-1">
                  <img
                    src={
                      configSettingOrder.postCustomerSms.status
                        ? editIcon
                        : inactiveEditIcon
                    }
                    height="35px"
                    alt="edit-icon"
                    style={{ cursor: "pointer" }}
                  />
                </Col>
              </Card.Body>
            </Card>
          </Row>
          <Form.Group>
          <Row className="mx-0 my-3">
              <Col className="col-5 order-setting-field-label align-self-center">
               هر کارمند مجوز دارد چه تعداد سر نخ قبول کند ؟
              </Col>
              <Col className="p-0 col-4 d-flex align-items-center justify-content-start">
                <Form.Group
                  controlId="leadCountPerEmployee"
                  className={` form-grp--setting--desktop me-0 ${configSettingLead.leadCountPerEmployee == null ? "border border-danger" : null }`} 
                >
                  <Form.Control
                    type="tel" 
                    name="leadCountPerEmployee"
                    className="order-setting-field--desktop m-auto"
                    onChange={toggleHandler}
                    required
                    defaultValue={configSettingLead?.leadCountPerEmployee}
                  />
                   <span className="ms-3">
                  عدد
                  </span>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mx-0 my-3">
              <Col className="col-3 order-setting-field-label align-self-center">
                تموم شدن وقت اشتراک گذاری بعد از
              </Col>
              <Col className="p-0 col-2" style={{ width: "15%" }}>
                <Dropdown className="text-center w-100">
                  <Dropdown.Toggle
                    className="w-100 px-1 d-flex align-items-center dropdown--btn--sms--setting"
                    id="share"
                  >
                    <span className="me-2 fw-bold">
                      {getUnitTimeText(configSettingOrder.share.unitTime)}
                    </span>
                    <img
                      className="ms-1 me-auto"
                      src={spinnerIcon}
                      height="20px"
                      alt="spinner-icon"
                    />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item name="share" id="M" onClick={toggleHandler}>
                      دقیقه
                    </Dropdown.Item>
                    <Dropdown.Item name="share" id="H" onClick={toggleHandler}>
                      ساعت
                    </Dropdown.Item>
                    <Dropdown.Item name="share" id="D" onClick={toggleHandler}>
                      روز
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col className="p-0 col-4 d-flex align-items-center justify-content-start">
                <Form.Group
                  controlId="defaultReminder"
                  className={` form-grp--setting--desktop ${configSettingOrder.share.time == null ? "border border-danger" : null  }`}
                >
                  <Form.Control
                   type="tel" 
                    name="shareText"
                    id="share"
                    className="order-setting-field--desktop m-auto"
                    onChange={toggleHandler}
                    required
                    defaultValue={configSettingOrder.share.time}
                  />
                  <span className="ms-3">
                    {getUnitTimeText(configSettingOrder.share.unitTime)}
                  </span>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mx-0 my-3">
              <Col className="col-3 order-setting-field-label align-self-center">
                مقدار پیش فرض یادآوری
              </Col>
              <Col className="p-0 col-2" style={{ width: "15%" }}>
                <Dropdown className="text-center w-100 ">
                  <Dropdown.Toggle
                    className="w-100 px-1 d-flex align-items-center dropdown--btn--sms--setting"
                    id="dropdown-basic"
                  >
                    <span className="me-2 fw-bold">
                      {getUnitTimeText(configSettingOrder.reminder.unitTime)}
                    </span>
                    <img
                      className="ms-1 me-auto"
                      src={spinnerIcon}
                      height="20px"
                      alt="spinner-icon"
                    />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      name="reminder"
                      id="M"
                      onClick={toggleHandler}
                    >
                      دقیقه
                    </Dropdown.Item>
                    <Dropdown.Item
                      name="reminder"
                      id="H"
                      onClick={toggleHandler}
                    >
                      ساعت
                    </Dropdown.Item>
                    <Dropdown.Item
                      name="reminder"
                      id="D"
                      onClick={toggleHandler}
                    >
                      روز
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col className="p-0 col-4 d-flex align-items-center justify-content-start">
                <Form.Group
                  controlId="defaultReminder"
                  className=" form-grp--setting--desktop"
                >
                  <Form.Control
                    type="number"
                    name="shareText"
                    id="reminder"
                    className="order-setting-field--desktop m-auto"
                    onChange={toggleHandler}
                    min="1"
                    defaultValue={configSettingOrder.reminder.time}
                  />
                  <span className="ms-3">
                    {getUnitTimeText(configSettingOrder.reminder.unitTime)}
                  </span>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mx-0 my-3">
              <Col className="col-3 order-setting-field-label align-self-center">
                مقدار پیش فرض آماده سازی
              </Col>
              <Col className="p-0 col-2" style={{ width: "15%" }}>
                <Dropdown className="text-center w-100">
                  <Dropdown.Toggle
                    className="w-100 px-1 d-flex align-items-center dropdown--btn--sms--setting"
                    id="dropdown-basic"
                  >
                    <span className="me-2 fw-bold">
                      {getUnitTimeText(configSettingOrder.duration.unitTime)}
                    </span>
                    <img
                      className="ms-1 me-auto"
                      src={spinnerIcon}
                      height="20px"
                      alt="spinner-icon"
                    />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      name="duration"
                      id="M"
                      onClick={toggleHandler}
                    >
                      دقیقه
                    </Dropdown.Item>
                    <Dropdown.Item
                      name="duration"
                      id="H"
                      onClick={toggleHandler}
                    >
                      ساعت
                    </Dropdown.Item>
                    <Dropdown.Item
                      name="duration"
                      id="D"
                      onClick={toggleHandler}
                    >
                      روز
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col className="p-0 col-4 d-flex align-items-center justify-content-start">
                <Form.Group
                  controlId="defaultReminder"
                  className=" form-grp--setting--desktop"
                >
                  <Form.Control
                    type="number"
                    name="shareText"
                    id="duration"
                    className="order-setting-field--desktop m-auto"
                    onChange={toggleHandler}
                    min="1"
                    defaultValue={configSettingOrder.duration.time}
                  />
                  <span className="ms-3">
                    {getUnitTimeText(configSettingOrder.duration.unitTime)}
                  </span>
                </Form.Group>
              </Col>
            </Row>

            
          </Form.Group>
          <Row className="m-0 p-0 w-100 mb-3">
            <Col className="m-0 p-0 col-12">
              <Button
                variant="primary"
                type="submit"
                className="w-100 m-0 p-0 py-2 mt-5 btn-dark-blue notes-round"
                onClick={HandleSubmit}
                disabled={editsettingOrder.loading}
              >
                {editsettingOrder.loading ? (
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    variant="light"
                    aria-hidden="true"
                  />
                ) : (
                  <> ثبت </>
                )}
              </Button>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};
