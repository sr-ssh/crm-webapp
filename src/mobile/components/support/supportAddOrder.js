import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import persianJs from "persianjs/persian.min";

// Form Validator
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

// UI Library
import { Dialog } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Row, Col, Form, Button, Dropdown } from "react-bootstrap";

// Components
import { Header } from "../base/header4";
import { Order } from "../order/order";
import { CircularProgress } from "@material-ui/core";
import { UploadDocuments } from "../order/uploadDoc";
import { ShowDocuments } from "../order/showDoc";
import { CancelOrder } from "../order/cancelOrder";
import { Delivery } from "../order/delivery";
import { FreeSaleOpportunity } from "../order/freeSaleOpportunity";

// Icons
import deleteIcon from "./../../assets/images/seller/delete.svg";
import SearchIcon from "@material-ui/icons/Search";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

// Actions
import { orderActions } from "../../../actions";

const useStyles = makeStyles((theme) => ({
  supportDialog_root: {
    height: "auto",
    backgroundColor: "transparent",
  },
  backIcon: {
    transform: "rotate(180deg)",
    position: "absolute",
    backgroundColor: "#fff",
    right: "10px",
    top: "12px",
    fontSize: "3rem",
    borderRadius: "50%",
    cursor: "pointer",
  },
}));

const validationSchema = yup.object().shape({
  value: yup.string().required(),
});

export const SupportAddOrder = (props) => {
  const classes = useStyles();
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
  const { loading: supportOrderLoading, data: supportOrderData } = useSelector(
    (state) => state.supportOrder
  );
  const sideBar = useSelector((state) => state.sideBar);
  const [filter, setFilter] = useState({ type: 1 });
  const [activeOrder, setActiveOrder] = useState({});
  const [order, setOrder] = useState("");
  const [deliveryShow, setDeliveryShow] = useState(false);
  const [cancelOrderShow, setCancelOrderShow] = useState(false);
  const [uploadModalShow, setUploadModalShow] = useState(false);
  const [showDocModalShow, setShowDocModalShow] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [dimStatus, setDimStatus] = useState(false);
  const [selectedItem, setItem] = useState("");

  const handleClose = () => {
    props.handleClose();
  };

  let formHandler = async (e) => {
    e.preventDefault();
    let result = await trigger();
    if (result == false) {
      return;
    }
    let params = getValues();
    if (filter.type == 1 || filter.type == 4) {
      params.value = persianJs(params.value).toEnglishNumber().toString();
    }
    dispatch(
      orderActions.orderSupport({ type: filter.type, value: params.value })
    );
  };

  const handleDropdown = (n, name) => {
    setFilter({ type: 1 });
    setItem(name);
  };

  useEffect(() => {
    async function fetchData() {
      let result = await trigger();
      if (result == false) {
        return;
      }
      let params = getValues();
      if (filter.type == 1 || filter.type == 4) {
        params.value = persianJs(params.value).toEnglishNumber().toString();
      }
      dispatch(
        orderActions.getOrders({ type: filter.type, value: params.value })
      );
    }
    fetchData();
  }, [refresh]);

  return (
    <Dialog
      fullScreen
      open={props.open}
      onClose={handleClose}
      classes={{ paperFullScreen: classes.supportDialog_root }}
      disableEnforceFocus={true}
    >
      <div
        className="support--order-page--desktop orders w-100"
        style={{ zIndex: 1500 }}
      >
        <Header
          title="پشتیبانی"
          handleBack={() => {
            props.handleClose();
            dispatch(orderActions.orderSupportClear());
            setValue("value", null);
          }}
        />

        <Container
          fluid
          className="px-3 m-0 d-flex justify-content-center align-items-center flex-column  support--order-page--desktop"
        >
          {/* <Row className="mt-2 d-flex justify-content-center">
            <Col className=" pick--type--filter--support">
              <Col className="my-2 mx-2 d-flex align-items-center items-filter-support">
                <input
                  type="checkbox"
                  className="btn-toggle-status-filter--support"
                  onChange={() => setFilter({ type: 1 })}
                  checked={filter.type == 1}
                />
                <span>شماره مشتری</span>
              </Col>
              <Col className="my-2 mx-2 d-flex align-items-center items-filter-support">
                <input
                  type="checkbox"
                  className="btn-toggle-status-filter--support"
                  onChange={() => setFilter({ type: 2 })}
                  checked={filter.type == 2}
                />
                <span>نام مشتری</span>
              </Col>
              <Col className="my-2 mx-2 d-flex align-items-center items-filter-support">
                <input
                  type="checkbox"
                  className="btn-toggle-status-filter--support"
                  onChange={() => setFilter({ type: 3 })}
                  checked={filter.type == 3}
                />
                <span>نام مجموعه</span>
              </Col>
              <Col className="my-2 mx-2 d-flex align-items-center items-filter-support">
                <input
                  type="checkbox"
                  className="btn-toggle-status-filter--support"
                  onChange={() => setFilter({ type: 4 })}
                  checked={filter.type == 4}
                />
                <span>شماره فروشنده</span>
              </Col>
              <Col className="my-2 mx-2 d-flex align-items-center items-filter-support">
                <input
                  type="checkbox"
                  className="btn-toggle-status-filter--support"
                  onChange={() => setFilter({ type: 5 })}
                  checked={filter.type == 5}
                />
                <span>نام فروشنده</span>
              </Col>
            </Col>
          </Row> */}
          <Row className="mt-0 mb-4 d-flex justify-content-center w-100">
            <Col className="pick--type--filter--support justify-content-between py-1 px-1">
              <Col className="col-5 pe-2">
                <Dropdown onToggle={(e) => setDimStatus(!dimStatus)}>
                  <Dropdown.Toggle
                    className={`d-flex order-filter-input border `}
                  >
                    {selectedItem !== "" ? <span>{selectedItem}</span> : null}
                  </Dropdown.Toggle>
                  <Dropdown.Menu
                    className={`${dimStatus ? "dim" : ""} dropdownProductMenu`}
                  >
                    <Dropdown.Item
                      onClick={() => handleDropdown(1, "شماره مشتری")}
                    >
                      <Col className="text-end pe-1 order-filter-input">
                        شماره مشتری
                      </Col>
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={() => handleDropdown(2, "نام مشتری")}>
                      <Col className="text-end pe-1 order-filter-input">
                        نام مشتری
                      </Col>
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={() => handleDropdown(3, "نام مجموعه")}>
                      <Col className="text-end pe-1 order-filter-input">
                        نام مجموعه
                      </Col>
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={() => handleDropdown(4, "شماره فروشنده")}>
                      <Col className="text-end pe-1 order-filter-input">
                        شماره فروشنده
                      </Col>
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={() => handleDropdown(5, "نام فروشنده")}>
                      <Col className="text-end pe-1 order-filter-input">
                        نام فروشنده
                      </Col>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col>
                <Form.Control
                  className="order-input border-0"
                  type="tel"
                  {...register("value")}
                  isInvalid={errors?.value ? true : false}
                  isValid={
                    Object.keys(errors).length != 0 &&
                    errors?.value == undefined &&
                    true
                  }
                  inputMode="tel"
                />
              </Col>
              <Col className="d-flex align-items-center justify-content-end col-3">
                <img
                  src={deleteIcon}
                  className="m-0 p-0 px-2 "
                  onClick={() => setValue("value", null)}
                  height="25px"
                  alt="down-icon"
                />
                <Col style={{ flex: "0 0" }}>
                  {supportOrderLoading ? (
                    <Button
                      className="fw-bold order--btn order-submit--desktop border-0 notes-round p-1 d-flex align-items-center justify-content-center"
                      type="submit"
                      disabled={true}
                    >
                      <CircularProgress
                        className="text-light mx-2"
                        size="25px"
                      />
                    </Button>
                  ) : (
                    <Button
                      className="fw-bold order--btn order-submit--desktop border-0 notes-round p-1 d-flex align-items-center justify-content-center"
                      type="submit"
                      onClick={(e) => formHandler(e)}
                    >
                      <SearchIcon fontSize="medium" className="fs-1" />
                    </Button>
                  )}
                </Col>
              </Col>
            </Col>
          </Row>
          {supportOrderLoading == false &&
            supportOrderData &&
            supportOrderData.length < 1 && (
              <Row className="d-flex justify-content-center">
                <Col className="justify-content-between ">
                  <span>نتیجه ای یافت نشد!</span>
                </Col>
              </Row>
            )}
          <Row
            className="m-0 p-0 sideBar--item--mobile mb-3 "
            style={{ height: "82vh" }}
          >
            {supportOrderLoading == false &&
              supportOrderData &&
              supportOrderData
                .sort(
                  (or1, or2) =>
                    Number(
                      or2.sellers?.some((seller) => seller.active === true)
                    ) -
                    Number(
                      or1.sellers?.some((seller) => seller.active === true)
                    )
                )
                .map((orderr, index) => {
                  return (
                    <Order
                    key={index}
                    order={orderr}
                    deliveryShow={deliveryShow}
                    setDeliveryShow={setDeliveryShow}
                    cancelOrderShow={cancelOrderShow}
                    setCancelOrderShow={setCancelOrderShow}
                    setActiveOrder={setActiveOrder}
                    setOrder={setOrder}
                    setUploadModalShow={setUploadModalShow}
                    setShowDocModalShow={setShowDocModalShow}
                    />
                  );
                })}
          </Row>

          <Delivery
            show={deliveryShow}
            onHide={() => setDeliveryShow(false)}
            order={order}
          />
          <CancelOrder
            status="2"
            show={cancelOrderShow}
            onHide={() => setCancelOrderShow(false)}
            order={activeOrder}
          />
          <UploadDocuments
            show={uploadModalShow}
            onHide={() => {
              setUploadModalShow(false);
            }}
            order={activeOrder}
          />
          {activeOrder.id && (
            <ShowDocuments
              show={showDocModalShow}
              onHide={() => setShowDocModalShow(false)}
              order={activeOrder}
              UploadModalShow={() => setUploadModalShow(true)}
              setActiveOrder={setActiveOrder}
            />
          )}
        </Container>
      </div>
    </Dialog>
  );
};
