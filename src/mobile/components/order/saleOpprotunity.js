import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Alert } from "react-bootstrap";

// Actions
import { orderActions } from "../../../actions";

//components
import { Header } from "../base/serachHeader";
import { Order } from "./order";
import { Delivery } from "./delivery";
import { RecordOrder } from "./recordOrder";
import { UploadDocuments } from "./uploadDoc";
import CircularProgress from "@material-ui/core/CircularProgress";
import { CancelOrder } from "./cancelOrder";
import { FreeSaleOpportunity } from "./freeSaleOpportunity";
import { ShowDocuments } from "./showDoc";
import { Prioritize } from "./prioritize";
import { OrderSearch } from "./search";
import { Sort } from "./sort";

export const SaleOpprotunity = (props) => {
  const [recordOrderShow, setRecordOrderShow] = useState(false);
  const [deliveryShow, setDeliveryShow] = useState(false);
  const [activeOrder, setActiveOrder] = useState({});
  const [order, setOrder] = useState("");
  const [cancelOrderShow, setCancelOrderShow] = useState(false);
  const [uploadModalShow, setUploadModalShow] = useState(false);
  const [customerInfoShow, setCustomerInfoShow] = useState(false);
  const [showDocModalShow, setShowDocModalShow] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [prioritizeModalShow, setPrioritizeModalShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [sortModalShow, setSortModalShow] = useState(false);
  const refOrder = useRef(null);

  const dispatch = useDispatch();
  const [filter, setFilter] = useState({});

  const orders = useSelector((state) => state.getOrders.orders);
  const sort = useSelector((state) => state.getOrders.sort);
  let alert = useSelector((state) => state.alert);

  let orderLoading = useSelector((state) => state.getOrders.loading);

  // useEffect(() => {
  //   !recordOrderShow && dispatch(orderActions.getOrders({ status: 3 }));
  // }, [dispatch, recordOrderShow]);
  useEffect(() => {
    if (orderLoading == false && refOrder && refOrder.current != null) {
      refOrder.current.scrollIntoView();
    }
    return () => {
      window.history.replaceState({}, document.title);
    };
  }, [orderLoading, refOrder]);

  useEffect(() => {
    dispatch(orderActions.getOrders({ status: 3  }));
  }, [refresh]);

  return (
    <div className="product-page orders ">
      <Header
        className="noPrint"
        title="فرصت فروش"
        modalShow={modalShow}
        setModalShow={setModalShow}
        setSortModalShow={setSortModalShow}
        sort={sort}
        isSort={true}
      />
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
        className={`m-auto mt-3`}
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
          {!orderLoading && orders && orders && orders?.length > 0
            ? orders
                .sort(
                  (or1, or2) =>
                    Number(
                      or2.sellers &&
                        or2.sellers.some((seller) => seller.active === true)
                    ) - or1.sellers &&
                    Number(or1.sellers.some((seller) => seller.active === true))
                )
                .map((order, index) => {
                  if (
                    order.sellers?.some((seller) => seller.active === true) &&
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
                        status={3}
                        cancelOrderShow={cancelOrderShow}
                        setCancelOrderShow={setCancelOrderShow}
                        setUploadModalShow={setUploadModalShow}
                        setCustomerInfoShow={setCustomerInfoShow}
                        setShowDocModalShow={setShowDocModalShow}
                        setPrioritizeModalShow={setPrioritizeModalShow}
                        orderRef={refOrder}
                        refKey={
                          props.history.location.state &&
                          props.history.location.state.id
                        }
                        filter={filter}
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

        <OrderSearch
          show={modalShow}
          onHide={() => setModalShow(false)}
          status={3}
          sortOrders={sort}
          setFilter={setFilter}
        />
        <Sort
          show={sortModalShow}
          onHide={() => setSortModalShow(false)}
          filter={filter}
        />

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
        <Prioritize
          show={prioritizeModalShow}
          onHide={() => {
            setPrioritizeModalShow(false);
          }}
          order={activeOrder}
          filter={filter}
        />
      </Container>
    </div>
  );
};
