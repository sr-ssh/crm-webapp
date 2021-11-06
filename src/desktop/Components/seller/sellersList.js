import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Spinner, Col, Row, Alert } from "react-bootstrap";

// Components
import { Header } from "../base/header";
import { SellersCard } from "./sellersCard";
import { CircularProgress } from "@material-ui/core";
import { SellerSearch } from "./search";
// Actions
import { sellerActions } from "../../../actions";

export const SellersList = () => {
  const dispatch = useDispatch();
  const sideBar = useSelector((state) => state.sideBar);
  const [filters, setFilters] = useState({});
  const [modalSearchShow, setModalSearchShow] = useState(false);

  const { loading: getSellersLoading, data: getSellersData } = useSelector(
    (state) => state.getSellers
  );

  useEffect(() => {
    dispatch(sellerActions.getSellers());
  }, []);

  console.log(filters);

  return (
    <>
      <Header
        isBTNSearch={true}
        searchModalShow={() => setModalSearchShow(true)}
        isBTNRequest={false}
      />
      <div
        className="product-page orders margin--top--header"
        style={{ paddingRight: sideBar.open ? "250px" : 0 }}
      >
        <Container
          fluid
          className={`m-0 p-0 w-100 d-flex flex-row flex-wrap mx-4  ${
            getSellersLoading
              ? "justify-content-center align-items-center"
              : null
          } `}
          style={{ height: getSellersLoading ? "85vh" : "" }}
        >
          {getSellersLoading == false && getSellersData.length == 0 && (
            <Container
              fluid
              style={{ height: "85vh" }}
              className="d-flex justify-content-center align-items-center"
            >
              <Row>
                <Col>
                  <h5>نتیجه ای یافت نشد !</h5>
                </Col>
              </Row>
            </Container>
          )}
          {getSellersLoading ? (
            <CircularProgress />
          ) : (
            <>
              {getSellersLoading == false &&
                getSellersData.length > 0 &&
                getSellersData.map((item, index) => (
                  <SellersCard key={index} data={item} />
                ))}
            </>
          )}

          <SellerSearch
            show={modalSearchShow}
            filters={filters}
            setFilters={setFilters}
            onHide={() => {
              setModalSearchShow(false);
            }}
          />
        </Container>
      </div>
    </>
  );
};
