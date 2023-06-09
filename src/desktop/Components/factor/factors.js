import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Container, Spinner } from "react-bootstrap";

// Actions
import { receiptActions } from "../../../actions";
// Components
import { FactorSearch } from "./search";
import { Factor } from "./factor";
import { CancelFactor } from "./cancelFactor";
import { Header } from "../base/header";

export const Factors = (props) => {
  let alertMessage = useSelector((state) => state.alert.message);
  let alerType = useSelector((state) => state.alert.type);
  const [modalShow, setModalShow] = useState(false);
  const [cancelFactorShow, setCancelFactorShow] = useState(false);
  const [activeFactor, setActiveFactor] = useState({});

  const [order, setOrder] = useState("");
  const dispatch = useDispatch();

  const sideBar = useSelector((state) => state.sideBar);
  let { receipts, loading } = useSelector((state) => state.getReceipts);

  // let { err: cancelErr, loading: cancelLoading } = useSelector(state => state.cancelProductOrder)

  const refFactor = useRef(null);

  useEffect(() => {
    !cancelFactorShow && dispatch(receiptActions.getReceipts());
  }, [dispatch, cancelFactorShow]);

  useEffect(() => {
    if (
      loading == false &&
      receipts &&
      receipts.length > 0 &&
      props.location.state != null &&
      refFactor.current != null
    ) {
      refFactor.current.scrollIntoView();
    }
  }, [props.location.state, loading]);


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
          {loading ? (
            <Col className="col-3 mt-5 m-auto d-block align-self-center w-100 mb-4 ">
              <Spinner className="m-auto d-block" animation="border" />
            </Col>
          ) : null}
          {receipts.length === 0 && !loading ? (
            <Row className="justify-content-center align-items-center no-result-filter">
              <Col className="col-8 text-center">هیج نتیجه ای یافت نشد!</Col>
            </Row>
          ) : null}

          {receipts.length > 0
            ? receipts.map((factors, index) => (
                <Factor
                  key={index}
                  refFactor={refFactor}
                  keyRef={props.location?.state?.id}
                  factor={factors}
                  setCancelFactorShow={setCancelFactorShow}
                  setActiveFactor={setActiveFactor}
                />
              ))
            : null}

          <FactorSearch
            show={modalShow}
            onHide={() => {
              setModalShow(false);
            }}
          />
          <CancelFactor
            status="1"
            show={cancelFactorShow}
            onHide={() => setCancelFactorShow(false)}
            factor={activeFactor}
          />
        </Container>
      </div>
    </>
  );
};
