import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Container, Row, Col, Spinner } from "react-bootstrap";
// Actions
import { receiptActions } from "../../../actions";

// Components
import { Header } from "../base/serachHeader";
import { FactorSearch } from "./search";
import { Factor } from "./factor";
import { CancelFactor } from "./cancelFactor";

export const Factors = (props) => {
  const dispatch = useDispatch();
  const refFactor = useRef(null);

  const [modalShow, setModalShow] = useState(false);
  const [cancelFactorShow, setCancelFactorShow] = useState(false);
  const [activeFactor, setActiveFactor] = useState({});

  let { receipts, loading } = useSelector((state) => state.getReceipts);

  useEffect(() => {
    !cancelFactorShow && dispatch(receiptActions.getReceipts());
  }, [dispatch, cancelFactorShow]);

  useEffect(() => {
    if (loading == false && refFactor && refFactor.current != null) {
      refFactor.current.scrollIntoView();
    }
    return () => {
      window.history.replaceState({}, document.title);
    };
  }, [loading, refFactor]);

  return (
    <div className="product-page ">
      <Header
        className="noPrint"
        title="فاکتور ها "
        modalShow={modalShow}
        setModalShow={setModalShow}
      />
      <Container fluid>
        {loading ? (
          <Row>
            <Col className="col-3 mt-2 m-auto ">
              <Spinner className="m-auto d-block" animation="border" />
            </Col>
          </Row>
        ) : null}
        {receipts.length === 0 && !loading ? (
          <Row className="justify-content-center align-items-center no-result-filter">
            <Col className="col-8 text-center">هیج نتیجه ای یافت نشد!</Col>
          </Row>
        ) : null}

        {receipts.length > 0
          ? receipts.map((factores, index) => (
              <Factor
                key={index}
                factor={factores}
                setCancelFactorShow={setCancelFactorShow}
                setActiveFactor={setActiveFactor}
                factorRef={refFactor}
                refKey={
                  props.history.location.state &&
                  props.history.location.state.id
                }
              />
            ))
          : null}

        <FactorSearch show={modalShow} onHide={() => setModalShow(false)} />
        <CancelFactor
          status="1"
          show={cancelFactorShow}
          onHide={() => setCancelFactorShow(false)}
          factor={activeFactor}
        />
      </Container>
    </div>
  );
};
