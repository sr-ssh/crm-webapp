import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Spinner, Col, Row, Alert } from "react-bootstrap";

// Components
import { Header } from "../base/header";
import { SellersCard } from "./sellersCard";
import {CircularProgress} from '@material-ui/core';


export const SellersList = () => {
  const dispatch = useDispatch();
  const sideBar = useSelector((state) => state.sideBar);
//   const sideBar = useSelector(state => state.sideBar)


  return (
    <>
      <Header isBTNSearch={false} isBTNRequest={false} />
      <div
        className="product-page orders margin--top--header"
        style={{ paddingRight: sideBar.open ? "250px" : 0 }}
      >
          {/* justify-content-center align-items-center */}
          {/* style={{ height : "85vh"}} */}
        <Container
          fluid
          className="m-0 p-0 w-100 d-flex flex-row flex-wrap mx-4  " 
        >
            <SellersCard/>
          {/* <CircularProgress/> */}
        </Container>
      </div>
    </>
  );
};
