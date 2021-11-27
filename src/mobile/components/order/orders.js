import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Container, Alert, Spinner } from "react-bootstrap";
// Actions
import { orderActions } from "../../../actions";
// Components
import { Header } from "../base/serachHeader";
import { OrderSearch } from "./search";
import { Order } from "./order";
import { Delivery } from "./delivery";
import { CancelOrder } from "./cancelOrder";
import { UploadDocuments } from "./uploadDoc";
import { ShowDocuments } from "./showDoc";
import { CircularProgress } from "@material-ui/core";

export const Orders = (props) => {
  let alertMessage = useSelector((state) => state.alert.message);
  let alerType = useSelector((state) => state.alert.type);
  const [modalShow, setModalShow] = useState(false);
  const [deliveryShow, setDeliveryShow] = useState(false);
  const [cancelOrderShow, setCancelOrderShow] = useState(false);
  const [activeOrder, setActiveOrder] = useState({});
  const [order, setOrder] = useState("");
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.getOrders.orders);
  let orderLoading = useSelector((state) => state.getOrders.loading);
  const [uploadModalShow, setUploadModalShow] = useState(false);
  const [showDocModalShow, setShowDocModalShow] = useState(false);
  const refOrder = useRef(null);

  // let { err: cancelErr, loading: cancelLoading } = useSelector(state => state.cancelProductOrder)

  useEffect(() => {
    if (orderLoading == false && refOrder && refOrder.current != null) {
      refOrder.current.scrollIntoView();
    }
    return () => {
      window.history.replaceState({}, document.title);
    };
  }, [orderLoading, refOrder]);

  useEffect(() => {
    ~!cancelOrderShow && dispatch(orderActions.getOrders({ status: "" }));
  }, [dispatch, cancelOrderShow]);

  return (
    <div className="product-page orders ">
      <Header
        className="noPrint"
        title="سفارش ها"
        modalShow={modalShow}
        setModalShow={setModalShow}
      />
      <Container className="m-auto">
        {orderLoading && (
          <Container
            className="d-flex justify-content-center align-items-center"
            style={{ height: "85vh" }}
          >
            <Row className="d-flex justify-content-center">
              <Col className="col-12 d-flex justify-content-center ">
                <CircularProgress />
              </Col>
            </Row>
          </Container>
        )}
        {!orderLoading && orders.length === 0 ? (
          <Row className="justify-content-center align-items-center no-result-filter">
            <Col className="col-8 text-center">هیج نتیجه ای یافت نشد!</Col>
          </Row>
        ) : null}
        {!orderLoading && orders && orders.length > 0
          ? orders.map((orderr, index) => (
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
                orderRef={refOrder}
                refKey={
                  props.history.location.state &&
                  props.history.location.state.id
                }
              />
            ))
          : null}

        <OrderSearch show={modalShow} onHide={() => setModalShow(false)} />
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
          onHide={() => setUploadModalShow(false)}
          order={activeOrder}
        />
        {activeOrder.id && (
          <ShowDocuments
            show={showDocModalShow}
            onHide={() => setShowDocModalShow(false)}
            order={activeOrder.id}
            UploadModalShow={() => setUploadModalShow(true)}
          />
        )}
      </Container>
    </div>
  );
};
