import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Card,
  Table,
  Row,
  Col,
  Spinner,
  Button,
} from "react-bootstrap";

//icons
import deliveryIcon from "./../../assets/images/order/delivery1.svg";
import printIcon from "./../../assets/images/order/print.svg";
import submitIcon from "./../../assets/images/order/submit.svg";
import editIcon from "../../assets/images/Products/edit.svg";
import deleteIcon from "../../assets/images/delete.svg";
import editeOrderIcon from "../../assets/images/order/edit-order-list.svg";
// import addNoteIcon from '../../assets/images/order/add-note-white.svg'
import noteListIcon from "../../assets/images/order/note-list-white.svg";
import SearchIcon from "@material-ui/icons/Search";

// Actions

import { orderActions } from "../../../actions";

//components
import { Order } from "./order";
import { Delivery } from "./delivery";
import { RecordOrder } from "./recordOrder";
import { OrderSearch } from "./search";
import { Header } from "../base/header";
import { CancelOrder } from "./cancelOrder";
import { UploadDocuments } from "./uploadDoc";
import { ShowDocuments } from "./showDoc";
import { FreeSaleOpportunity } from "./freeSaleOpportunity";

export const SaleOpprotunity = () => {
  const [recordOrderShow, setRecordOrderShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);
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
  let orderLoading = useSelector((state) => state.getOrders.loading);
  const sideBar = useSelector((state) => state.sideBar);

  useEffect(() => {
    !recordOrderShow && dispatch(orderActions.getOrders({ status: 3 }));
  }, [dispatch, recordOrderShow]);

  useEffect(() => {
    dispatch(orderActions.getOrders({ status: 3 }));
  }, [refresh]);

  console.log(orders);

  return (
    <>
      <Header
        isBTNSearch={true}
        searchModalShow={() => setModalShow(true)}
        isBTNRequest={false}
      />

      <div
        className="product-page orders w-100 margin--top--header mb-5"
        style={{ paddingRight: sideBar.open ? "250px" : 0 }}
      >
        <Container
          fluid
          className="m-0 mt-5 w-100 d-flex justify-content-center flex-wrap "
        >
          {/* {
                        orderLoading &&
                        <Col className="col-3 mt-5 m-auto d-block align-self-center w-100 mb-4 ">
                            <Spinner className="m-auto d-block" animation="border" />
                        </Col>
                    } */}
          {orders.length === 0 && !orderLoading ? (
            <Row className="justify-content-center align-items-center no-result-filter">
              <Col className="col-8 text-center">هیج نتیجه ای یافت نشد!</Col>
            </Row>
          ) : null}

          {orders.length > 0
            ? orders.map((order, index) => {
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
                      status={3}
                      cancelOrderShow={cancelOrderShow}
                      setCancelOrderShow={setCancelOrderShow}
                      setUploadModalShow={setUploadModalShow}
                      setCustomerInfoShow={setCustomerInfoShow}
                      uploadModalShow={uploadModalShow}
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

          <OrderSearch
            show={modalShow}
            onHide={() => setModalShow(false)}
            status={3}
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
