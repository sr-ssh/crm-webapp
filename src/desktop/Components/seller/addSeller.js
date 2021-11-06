import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Form, Button, Row, Col, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import persianJs from "persianjs/persian.min";
import * as yup from "yup";

// Actions
import { sellerActions } from "../../../actions";

// Components
import { Header } from "../base/header";
import { CircularProgress } from "@material-ui/core";

// Icons
import deleteIcon from "./../../assets/images/delete.svg";
import downloadIcon from "../../assets/images/download.svg";

const validationSchema = yup.object().shape({
  phone: yup.number().required().positive().integer(),
  mobile: yup.string().length(11).required(),
  family: yup.string().required(),
  company: yup.string().required(),
  // cardNumber: yup.string().length(16).required(),
  address: yup.string().required(),
});

export const AddSeller = () => {
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

  const [sellerInfo, setSellerInfo] = useState({});
  const sideBar = useSelector((state) => state.sideBar);
  const { loading: addSellerLoading, data: addSellerData } = useSelector(
    (state) => state.addSeller
  );
  const { loading: getOldSellerLoading, data: oldSeller } = useSelector(
    (state) => state.getSeller
  );

  useEffect(() => {
    // if(getOldSellerLoading == false && oldSeller == undefined){
    //   reset()
    //   setSellerInfo({})
    // }
    if(getOldSellerLoading == false && oldSeller &&  Object.keys(oldSeller).length > 0 ){
      setSellerInfo({
        ...sellerInfo,
        cardNumber: cc_format(oldSeller.cardNumber.toString()),
      })
      setValue('phone', oldSeller.phone , { shouldValidate: true })
      setValue('family', oldSeller.family, { shouldValidate: true })
      setValue('company', oldSeller.company, { shouldValidate: true })
      setValue('address', oldSeller.address, { shouldValidate: true })
      setValue('description', oldSeller.description)
    }
  
  }, [getOldSellerLoading])


  const formHandler = async (e) => {
    e.preventDefault();
    let values;
    const result = await trigger();
    if (result) {
      values = getValues();
    } else {
      return;
    }
    if (sellerInfo.cardNumber == null) {
      return;
    }
    let params = { ...values, ...sellerInfo };
    for (let x in params) {
      if (x == "phone" || x == "mobile" || x == "cardNumber") {
        params[x] = params[x].replaceAll(/\s/g, "");
        params[x] = persianJs(params[x]).toEnglishNumber().toString();
      }
    }
    dispatch(sellerActions.addSeller(params));
  };

  function checkDigit(event) {
    var code = event.which ? event.which : event.keyCode;
    if ((code < 48 || code > 57) && code > 31) {
      return false;
    }
    return true;
  }
  function cc_format(value) {
    var v = value.replace(/\s+/g, "").replace(/[^۱۲۳۴۵۶۷۸۹۰0-9]/gi, "");
    var matches = v.match(/[۱۲۳۴۵۶۷۸۹۰0-9]{4,16}/g);
    var match = (matches && matches[0]) || "";
    var parts = [];
    for (var i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return persianJs(parts.join(" ")).toEnglishNumber().toString();
    } else {
      return value;
    }
  }
  let handelOldSeller = async (e) => {
    e.preventDefault();
    const result = await trigger("mobile");
    let sellerMobile;

    if (result == false) {
      return;
    } else sellerMobile = getValues("mobile");
    if (sellerMobile) dispatch(sellerActions.getSeller(sellerMobile));  
  };

  return (
    <>
      <Header isBTNSearch={false} isBTNRequest={false} />
      <div
        className="order-page--desktop margin--top--header "
        style={{ paddingRight: sideBar.open ? "250px" : 0 }}
      >
        <Container fluid className="pt-3 px-3 m-0">
          <Form
            onSubmit={formHandler}
            className="d-flex flex-column align-items-center"
          >
            <Row
              className="d-flex flex-column"
              style={{ width: "80%", height: "85vh" }}
            >
              <Row className="col-12 m-0 p-0 mt-2 order-inputs d-flex flex-row justify-content-between align-items-center px-3">
                <Col className="col-4 add-order-input--desktop pe-0">
                  <Form.Group className="p--relative">
                    <Form.Label className="me-3">تلفن</Form.Label>
                    <Form.Control
                      className="order-input radius-16"
                      type="tel"
                      // name="phone"
                      {...register("phone")}
                      isInvalid={errors?.phone ? true : false}
                      isValid={
                        Object.keys(errors).length != 0 &&
                        errors.phone == undefined &&
                        true
                      }
                    />
                    <img
                      src={deleteIcon}
                      className="m-0 p-0  spinner--download--btn--desktop"
                      onClick={() => setValue("phone", null)}
                      height="25px"
                      alt="down-icon"
                    />
                  </Form.Group>
                </Col>
                <Col className="col-4 add-order-input--desktop">
                  <Form.Group className="p--relative">
                    <Form.Label className="me-3">همراه</Form.Label>
                    <Form.Control
                      className="order-input radius-16"
                      type="tel"
                      // name="mobile"
                      {...register("mobile")}
                      isInvalid={errors?.mobile ? true : false}
                      isValid={
                        Object.keys(errors).length != 0 &&
                        errors.mobile == undefined &&
                        true
                      }
                    />
                    {getOldSellerLoading ? (
                      <Spinner
                        className="spinner--download--btn--desktop "
                        as="div"
                        variant="primary"
                        animation="border"
                        size="sm"
                      />
                    ) : (
                    <img
                      src={downloadIcon}
                      className="m-0 p-0  spinner--download--btn--desktop"
                      onClick={handelOldSeller}
                      height="25px"
                      alt="down-icon"
                    />
                  )}
                  </Form.Group>
                </Col>
                <Col className="col-4 add-order-input--desktop ps-0">
                  <Form.Group controlId="birthday">
                    <Form.Label className="me-3">نام فروشنده</Form.Label>
                    <Form.Control
                      className="order-input radius-16"
                      type="text"
                      // name="family"
                      {...register("family")}
                      isInvalid={errors?.family ? true : false}
                      isValid={
                        Object.keys(errors).length != 0 &&
                        errors.family == undefined &&
                        true
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="col-12 m-0 p-0 mt-5 order-inputs d-flex flex-row justify-content-between align-items-center px-3">
                <Col className="col-4 add-order-input--desktop pe-0">
                  <Form.Group className="p--relative">
                    <Form.Label className="me-3">نام مجموعه</Form.Label>
                    <Form.Control
                      className="order-input radius-16"
                      type="text"
                      // name="company"
                      {...register("company")}
                      isInvalid={errors?.company ? true : false}
                      isValid={
                        Object.keys(errors).length != 0 &&
                        errors.company == undefined &&
                        true
                      }
                    />
                  </Form.Group>
                </Col>

                <Col className="col-8 add-order-input--desktop ps-0">
                  <Form.Group controlId="birthday">
                    <Form.Label className="me-3">شماره کارت</Form.Label>
                    <Form.Control
                      className="order-input radius-16"
                      type="tel"
                      autoComplete="false"
                      name="cardNumber"
                      isInvalid={
                        sellerInfo.cardNumber == "" ||
                        (sellerInfo.cardNumber != undefined &&
                          sellerInfo.cardNumber != "" &&
                          sellerInfo.cardNumber.length < 19)
                      }
                      isValid={
                        Object.keys(sellerInfo).length != 0 &&
                        sellerInfo.cardNumber != null &&
                        sellerInfo.cardNumber != "" &&
                        sellerInfo.cardNumber.length == 19 &&
                        true
                      }
                      onKeyPress={(e) => {
                        return checkDigit;
                      }}
                      onChange={(e) =>
                        setSellerInfo({
                          ...sellerInfo,
                          cardNumber: cc_format(e.target.value),
                        })
                      }
                      value={sellerInfo.cardNumber}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="col-12 m-0 pt-4 mt-4 order-inputs px-3">
                <Col className="p-0 add-order-input mx-0 px-0">
                  <Form.Group controlId="address">
                    <Form.Label className="me-3">آدرس</Form.Label>
                    <Form.Control
                      style={{ maxHeight: "45px", height: "45px" }}
                      className="order-input radius-16 py-2"
                      type="text"
                      // name="address"
                      {...register("address")}
                      isInvalid={errors?.address ? true : false}
                      isValid={
                        Object.keys(errors).length != 0 &&
                        errors.address == undefined &&
                        true
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="col-12 m-0 pt-4 mt-4 order-inputs px-3">
                <Col className="p-0 add-order-input mx-0 px-0">
                  <Form.Group controlId="address">
                    <Form.Label className="me-3">توضیحات</Form.Label>
                    <Form.Control
                      style={{ maxHeight: "45px", height: "45px" }}
                      className="order-input radius-16 py-2"
                      type="text"
                      name="description"
                      {...register("description")}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="m-0 mt-auto pt-auto  w-100">
                {addSellerLoading ? (
                  <Button
                    className="fw-bold receipt--btn border-0 w-100 fs-6 d-flex justify-content-center align-items-center"
                    size="lg"
                    type="submit"
                    disabled
                  >
                    <CircularProgress className="text-light" size="25px" />
                    <span className="me-3"> در حال ثبت ...</span>
                  </Button>
                ) : (
                  <>
                    <Col className="col-12 m-0 p-0 ps-1">
                      <Button
                        className="fw-bold receipt--btn border-0 w-100 fs-6"
                        size="lg"
                        type="submit"
                        block
                      >
                        ثبت
                      </Button>
                    </Col>
                  </>
                )}
              </Row>
            </Row>
          </Form>
        </Container>
      </div>
    </>
  );
};
