import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Container, Spinner } from "react-bootstrap";

// Actions
import { orderActions } from "../../../actions";
// Components
import { OrderSearch } from "./search";
import { Order } from "./order";
import { Delivery } from "./delivery";
import { CancelOrder } from "./cancelOrder";
import { Header } from "../base/header";
import { UploadDocuments } from "./uploadDoc";
import { ShowDocuments } from "./showDoc";

export const Orders = (props) => {
  const refOrder = useRef(null);
  let alertMessage = useSelector((state) => state.alert.message);
  let alerType = useSelector((state) => state.alert.type);
  const [modalShow, setModalShow] = useState(false);
  const [deliveryShow, setDeliveryShow] = useState(false);
  const [cancelOrderShow, setCancelOrderShow] = useState(false);
  const [activeOrder, setActiveOrder] = useState({});
  const [order, setOrder] = useState("");
  const [uploadModalShow, setUploadModalShow] = useState(false);
  const [showDocModalShow, setShowDocModalShow] = useState(false);
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.getOrders.orders);
  let orderLoading = useSelector((state) => state.getOrders.loading);
  const sideBar = useSelector((state) => state.sideBar);

  // let { err: cancelErr, loading: cancelLoading } = useSelector(state => state.cancelProductOrder)

  useEffect(() => {
    !cancelOrderShow && dispatch(orderActions.getOrders({ status: " " }));
  }, [dispatch, cancelOrderShow]);


  useEffect(() => {
    window.history.scrollRestoration = 'manual'
  }, []);

  useEffect(() => {
    if (orderLoading == false && refOrder && refOrder.current != null) {
      refOrder.current.scrollIntoView();
    }
    return () => {
      window.history.replaceState({}, document.title);
    };
  }, [orderLoading, refOrder]);


  return (
    <>
      <Header
        isBTNSearch={true}
        searchModalShow={() => setModalShow(true)}
        isBTNRequest={false}
      />
      <div
        className="product-page orders w-100 margin--top--header"
        style={{ paddingRight: sideBar.open ? "250px" : 0 }}
      >
        <Container
          fluid
          className="m-0  mt-5 w-100 d-flex justify-content-center flex-wrap mb-5 "
        >
          {/* {
                        orderLoading ?
                            <Col className="col-3 mt-5 m-auto d-block align-self-center w-100 mb-4 ">
                                <Spinner className="m-auto d-block" animation="border" />
                            </Col>
                            : null

                    } */}
          {orders.length === 0 && !orderLoading ? (
            <Row className="justify-content-center align-items-center no-result-filter">
              <Col className="col-8 text-center">هیج نتیجه ای یافت نشد!</Col>
            </Row>
          ) : null}

          {orders.length > 0
            ? orders.map((order, index) => (
                <Order
                  key={index}
                  order={order}
                  deliveryShow={deliveryShow}
                  setDeliveryShow={setDeliveryShow}
                  cancelOrderShow={cancelOrderShow}
                  setCancelOrderShow={setCancelOrderShow}
                  setActiveOrder={setActiveOrder}
                  setOrder={setOrder}
                  setUploadModalShow={setUploadModalShow}
                  uploadModalShow={uploadModalShow}
                  setShowDocModalShow={setShowDocModalShow}
                  refFactor={refOrder}
                  keyRef={props.location?.state?.id}
                />
              ))
            : null}

          <OrderSearch
            show={modalShow}
            onHide={() => {
              setModalShow(false);
            }}
          />
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
    </>
  );
};
