import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Alert } from "react-bootstrap";

// Actions

import { orderActions } from "../../../actions";

//components
import { Header } from "../base/header2";
import { Order } from "./order";
import { Delivery } from "./delivery";
import { RecordOrder } from "./recordOrder";
import { UploadDocuments } from "./uploadDoc";
import CircularProgress from "@material-ui/core/CircularProgress";
import { CancelOrder } from "./cancelOrder";
import { FreeSaleOpportunity } from "./freeSaleOpportunity";
import { ShowDocuments } from './showDoc'


export const SaleOpprotunity = () => {
  const [recordOrderShow, setRecordOrderShow] = useState(false);
  const [deliveryShow, setDeliveryShow] = useState(false);
  const [activeOrder, setActiveOrder] = useState({});
  const [order, setOrder] = useState("");
  const [cancelOrderShow, setCancelOrderShow] = useState(false);
  const [uploadModalShow, setUploadModalShow] = useState(false);
  const [customerInfoShow, setCustomerInfoShow] = useState(false);
  const [showDocModalShow, setShowDocModalShow] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const dispatch = useDispatch();

  const orders = useSelector((state) => state.getOrders.orders);
  let alert = useSelector((state) => state.alert);

  let orderLoading = useSelector((state) => state.getOrders.loading);

  useEffect(() => {
    !recordOrderShow && dispatch(orderActions.getOrders({ status: 3 }));
  }, [dispatch, recordOrderShow]);

  useEffect(() => {
    dispatch(orderActions.getOrders({ status: 3 }));
  }, [refresh]);

  return (
    <div className="product-page orders ">
      <Header className="noPrint" title="فرصت فروش" backLink="/" />
      {alert.message && (
        <>
          <div className="modal-backdrop show"></div>
          <Row className="justify-content-center text-center ">
            <Alert variant={alert.type}>{alert.message}</Alert>
          </Row>
        </>
      )}
      {orderLoading && (
        <Container
          className="d-flex justify-content-center align-items-center"
          style={{ height: "90vh", position: "fixed", top: "64px" }}
        >
          <Row className="d-flex justify-content-center">
            <Col className="col-12 d-flex justify-content-center ">
              <CircularProgress />
            </Col>
          </Row>
        </Container>
      )}
      <Container
        className={`m-auto  `}
        style={{ height: "90vh", position: "fixed", top: "64px" }}
      >
        {orders.length === 0 && !orderLoading ? (
          <Row className="justify-content-center align-items-center no-result-filter">
            <Col className="col-8 text-center">هیج نتیجه ای یافت نشد!</Col>
          </Row>
        ) : null}

        <Row
          className="m-0 p-0 w-100 h-100"
          style={{ overflowX: "hidden", overflowY: "scroll" }}
        >
          {!orderLoading && orders.length > 0
            ? orders
                .sort(
                  (or1, or2) =>
                    Number(
                      or2.sellers.some((seller) => seller.active === true)
                    ) -
                    Number(or1.sellers.some((seller) => seller.active === true))
                )
                .map((order, index) => {
                  if (
                    order.sellers.some((seller) => seller.active === true) &&
                    order.status == 3
                  )
                    return (
                      <Order
                        key={index}
                        refresh={refresh}
                        setRefresh={setRefresh}
                        order={order}
                        deliveryShow={deliveryShow}
                        setDeliveryShow={setDeliveryShow}
                        recordOrderShow={recordOrderShow}
                        setRecordOrderShow={setRecordOrderShow}
                        setActiveOrder={setActiveOrder}
                        setOrder={setOrder}
                        cancelOrderShow={cancelOrderShow}
                        setCancelOrderShow={setCancelOrderShow}
                        setUploadModalShow={setUploadModalShow}
                        setCustomerInfoShow={setCustomerInfoShow}
                        setShowDocModalShow={setShowDocModalShow}
                      />
                    );
                  else
                    return (
                      <FreeSaleOpportunity
                        order={order}
                        refresh={refresh}
                        setRefresh={setRefresh}
                      />
                    );
                })
            : null}
        </Row>

        {/* <OrderSearch show={modalShow} onHide={() => setModalShow(false)} /> */}
        <Delivery
          show={deliveryShow}
          onHide={() => setDeliveryShow(false)}
          order={order}
        />
        <RecordOrder
          show={recordOrderShow}
          onHide={() => setRecordOrderShow(false)}
          order={activeOrder}
        />
        <CancelOrder
          status="4"
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
