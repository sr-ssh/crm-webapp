import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Form, Button, Row, Col, Spinner } from "react-bootstrap";
import "react-multi-date-picker/styles/layouts/mobile.css";
import persianJs from "persianjs/persian.min";

// Actions
import { sellerActions } from "../../../actions";

// Components
import { Header } from "../base/header2";

// Assets
import downloadIcon from "../../assets/images/download.svg";
import deleteIcon from "../../assets/images/seller/delete.svg";

export const AddSeller = (props) => {
  const [validated, setValidated] = useState(false);
  const [mobileValidated, setMobileValidated] = useState(false);
  const [nameValidated, setNameValidated] = useState(false);
  const [phoneValidated, setPhoneValidated] = useState(false);
  const [seller, setSeller] = useState({
    phone: "",
    mobile: "",
    family: "",
    company: "",
    cardNumber: "",
    description: "",
    address: "",
  });
  const dispatch = useDispatch();
  let oldSeller = useSelector((state) => state.getSeller.data);
  let { loading } = useSelector((state) => state.getSeller);
  let addSellerLoading = useSelector((state) => state.addSeller.loading);

  let mobileHandler = (value) => {
    const number = value;
    // const patt = /^(09)(\d{9})/m;
    // patt.test(number) &&
    let res = number.length === 11;
    if (res) {
      setMobileValidated(false);
      return value;
    } else return undefined;
  };
  let nameHandler = (value) => {
    const name = value;
    const patt = /^[آ-یa-zA-Z ]+$/;
    let res = patt.test(name);
    if (res) {
      setNameValidated(false);
      return value;
    } else return undefined;
  };

  let handelOldSeller = (e) => {
    e.preventDefault();
    if (seller.mobile) dispatch(sellerActions.getSeller(seller.mobile));
    else setMobileValidated(true);
  };

  let handleChange = (e) => {
    e.preventDefault();
    let value = e.target.value;
    let name = e.target.name;
    if (name === "mobile") {
      value = value
        ? mobileHandler(persianJs(value).toEnglishNumber().toString())
        : undefined;
    }
    if (name === "family") {
      value = nameHandler(value);
    }
    setSeller({ ...seller, [name]: value });
  };

  let formHandler = (e) => {
    e.preventDefault();
    if (
      seller.family &&
      seller.mobile &&
      seller.phone &&
      seller.address &&
      seller.cardNumber &&
      seller.company
    ) {
      dispatch(sellerActions.addSeller(seller));
    } else {
      setValidated(true);
    }
  };

  function clearInputs() {
    setSeller({
      phone: "",
      mobile: "",
      family: "",
      company: "",
      cardNumber: "",
      description: "",
      address: "",
    });
    oldSeller = null;
  }

  useEffect(() => {
    if (oldSeller?.mobile)
      setSeller({
        ...seller,
        ...oldSeller,
      });
  }, [oldSeller]);

  useEffect(() => {
    addSellerLoading == false && clearInputs();
  }, [addSellerLoading]);

  useEffect(() => {
    if (props.location?.state?.mobile) {
      setSeller({ ...seller, ...props.location.state });
    }
  }, []);

  return (
    <div className="order-page">
      <Header title="ثبت فروشنده" backLink="/dashboard" />
      <Container fluid className="pt-3 px-3 m-0">
        <Form fluid onSubmit={formHandler} noValidate>
          <Row className="m-0 p-0 mt-2 order-inputs">
            <Col className="p-0 col-5 add-order-input">
              <Form.Group className="p--relative">
                <Form.Label className="pe-2">تلفن</Form.Label>
                <Form.Control
                  className="order-input"
                  type="tel"
                  inputMode="tel"
                  pattern="[0-9 ۰-۹]*"
                  name="phone"
                  onChange={handleChange}
                  isInvalid={
                    (!seller.phone && validated) || (phoneValidated && true)
                  }
                  isValid={
                    (seller.phone && validated) ||
                    (phoneValidated && seller.phone && true)
                  }
                  value={seller.phone}
                  required
                />
                <img
                  src={deleteIcon}
                  className="m-0 p-0 remove--btn--mobile"
                  onClick={(e) => setSeller({...seller, phone: ""})}
                  height="20px"
                  alt="delete-icon"
                />
              </Form.Group>
            </Col>
            <Col className="p-0 col-5 me-auto add-order-input">
              <Form.Group>
                <Form.Label className="pe-2">همراه</Form.Label>
                <Form.Control
                  className="order-input"
                  type="tel"
                  inputMode="tel"
                  pattern="[0-9 ۰-۹]*"
                  name="mobile"
                  onChange={handleChange}
                  value={seller.mobile}
                />
                {loading ? (
                  <Spinner
                    className="download--seller--btn--mobile "
                    as="div"
                    variant="primary"
                    animation="border"
                    size="sm"
                  />
                ) : (
                  <img
                    src={downloadIcon}
                    className="m-0 p-0 download--seller--btn--mobile"
                    onClick={(e) => handelOldSeller(e)}
                    height="25px"
                    alt="down-icon"
                  />
                )}
              </Form.Group>
            </Col>
          </Row>

          <Row className="m-0 p-0 mt-3 order-inputs">
            <Col className="p-0 col-5 add-order-input">
              <Form.Group>
                <Form.Label className="pe-2">نام فروشنده</Form.Label>
                <Form.Control
                  className="order-input"
                  type="text"
                  name="family"
                  onChange={handleChange}
                  isInvalid={
                    (!seller.family && validated) || (nameValidated && true)
                  }
                  isValid={
                    (seller.family && validated) ||
                    (nameValidated && seller.family && true)
                  }
                  value={seller.family}
                  required
                />
              </Form.Group>
            </Col>
            <Col className="p-0 col-5 me-auto add-order-input">
              <Form.Group>
                <Form.Label className="pe-2">نام مجموعه</Form.Label>
                <Form.Control
                  className="order-input"
                  type="text"
                  name="company"
                  onChange={handleChange}
                  value={seller.company}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="m-0 p-0 mt-3 order-inputs">
            <Col className="p-0 add-order-input">
              <Form.Group>
                <Form.Label className="pe-2">شماره کارت</Form.Label>
                <Form.Control
                  className="order-input"
                  type="tel"
                  inputMode="tel"
                  pattern="[0-9 ۰-۹]*"
                  name="cardNumber"
                  onChange={handleChange}
                  isInvalid={false}
                  isValid={false}
                  value={seller.cardNumber}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="m-0 p-0 mt-3 order-inputs">
            <Col className="p-0 add-order-input">
              <Form.Group>
                <Form.Label className="pe-2">آدرس</Form.Label>
                <Form.Control
                  className="radius-10 border-0 h-100"
                  as="textarea"
                  rows="3"
                  name="address"
                  onChange={handleChange}
                  isInvalid={false}
                  isValid={false}
                  value={seller.address}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="m-0 p-0 mt-3 order-inputs mb-4">
            <Col className="p-0 add-order-input">
              <Form.Group>
                <Form.Label className="pe-2">توضیحات</Form.Label>
                <Form.Control
                  className="radius-16 border-0 h-100"
                  as="textarea"
                  rows="3"
                  name="description"
                  onChange={handleChange}
                  isInvalid={false}
                  isValid={false}
                  value={seller.description}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row
            className="m-0 p-0 mt-4 justify-content-center"
            style={{
              position: "absolute",
              bottom: "30px",
              right: "13px",
              left: "13px",
            }}
          >
            {addSellerLoading ? (
              <Button
                className="fw-bold order--btn order-submit border-0 w-100"
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
              <>
                <Button
                  className="radius-10 fs-6 py-2 fw-bold backround--dark--blue border-0 mt-4"
                  size="lg"
                  type="submit"
                  block
                  onClick={formHandler}
                >
                  ثبت
                </Button>
              </>
            )}
          </Row>
        </Form>
      </Container>
    </div>
  );
};
