import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Spinner, Col, Row, Alert } from "react-bootstrap";

// Actions
import { sellerActions } from "../../../actions";

// components
import { Header } from "../base/serachHeader";
import { Seller } from "./seller";
import { SellerSearch } from "./search";

export const Sellers = () => {
  let alertMessage = useSelector((state) => state.alert.message);
  let alerType = useSelector((state) => state.alert.type);
  const [filters, setFilters] = useState({ company: "", phone: "", mobile: "", address: ""});

  const [modalShow, setModalShow] = useState(false);
  let sellers = useSelector((state) => state.getSellers.data);
  let loading = useSelector((state) => state.getSellers.loading);
  const userPermissions = useSelector(
    (state) => state.getPermissions.permissions
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(sellerActions.getSellers());
  }, [dispatch]);

  return (
    <>
      <div className="product-page orders">
        <Header
          title="فروشنده ها"
          setModalShow={setModalShow}
          userPermission={userPermissions.excelCustomer}
        />
        <Container fluid className="m-auto mb-3">
          {loading && (
            <Row>
              <Col className="col-3 mt-2 m-auto ">
                <Spinner className="m-auto d-block" animation="border" />
              </Col>
            </Row>
          )}
          {sellers && sellers.length === 0 && !loading ? (
            <Row className="justify-content-center align-items-center no-result-filter">
              <Col className="col-8 text-center">هیج نتیجه ای یافت نشد!</Col>
            </Row>
          ) : null}
          {alertMessage && (
            <>
              <div className="modal-backdrop show"></div>
              <Row className="justify-content-center text-center ">
                <Alert variant={alerType}>{alertMessage}</Alert>
              </Row>
            </>
          )}
          {sellers
            ? sellers.map((seller, index) => (
                <Seller key={index} seller={seller} />
              ))
            : null}
          <SellerSearch
            show={modalShow}
            onHide={() => setModalShow(false)}
            filters={filters}
            setFilters={setFilters}
          />
        </Container>
      </div>
    </>
  );
};
