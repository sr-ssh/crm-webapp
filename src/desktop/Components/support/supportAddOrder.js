import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// UI Library
import { Dialog } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

// Components
import { Header } from "../base/header";
import { SupportCardOrder } from './supportCardOrder'

// Icons
import deleteIcon from "./../../assets/images/delete.svg";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  supportDialog_root: {
    height: "auto",
    backgroundColor: "transparent",
  },
}));

export const SupportAddOrder = (props) => {
  const classes = useStyles();
//   const [open, setOpen] = useState(true);
  const sideBar = useSelector((state) => state.sideBar);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

  const handleClose = () => {
    props.handleClose();
  };

  return (
    // TransitionComponent={Transition}
    <Dialog
      fullScreen
      open={props.open}
      onClose={handleClose}
      classes={{ paperFullScreen: classes.supportDialog_root }}
    >
      {/* <Header isBTNSearch={false} isBTNRequest={false} /> */}
      {/* margin--top--header */}
      <div
        className="order-page--desktop  "
        style={{ zIndex: 1500, paddingRight: sideBar.open ? "250px" : 0 }}
      >
        <Container
          fluid
          className="pt-3 px-3 m-0 d-flex justify-content-center align-items-center flex-column "
        >
          <Row className="mt-2 d-flex justify-content-center">
            <Col className=" pick--type--filter--support">
              <Col className="my-2 mx-2 d-flex align-items-center items-filter-support">
                <input
                  type="checkbox"
                  className="btn-toggle-status-filter--support"
                  // onChange={toggleHandler}
                  // checked={true}
                />
                <span>شماره مشتری</span>
              </Col>
              <Col className="my-2 mx-2 d-flex align-items-center items-filter-support">
                <input
                  type="checkbox"
                  className="btn-toggle-status-filter--support"
                  // onChange={toggleHandler}
                  // checked={true}
                />
                <span>نام مشتری</span>
              </Col>
              <Col className="my-2 mx-2 d-flex align-items-center items-filter-support">
                <input
                  type="checkbox"
                  className="btn-toggle-status-filter--support"
                  // onChange={toggleHandler}
                  // checked={true}
                />
                <span>نام مجموعه</span>
              </Col>
              <Col className="my-2 mx-2 d-flex align-items-center items-filter-support">
                <input
                  type="checkbox"
                  className="btn-toggle-status-filter--support"
                  // onChange={toggleHandler}
                  // checked={true}
                />
                <span>شماره فروشنده</span>
              </Col>
              <Col className="my-2 mx-2 d-flex align-items-center items-filter-support">
                <input
                  type="checkbox"
                  className="btn-toggle-status-filter--support"
                  // onChange={toggleHandler}
                  // checked={true}
                />
                <span>شماره فروشنده</span>
              </Col>
            </Col>
          </Row>
          <Row className="mt-4 d-flex justify-content-center">
            <Col className="pick--type--filter--support justify-content-between py-1 px-1">
              <Col>
                <Form.Control
                  className="order-input border-0"
                  type="tel"
                  //   {...register("customer.phoneNumber")}
                  inputMode="tel"
                />
              </Col>
              <Col className="d-flex align-items-center justify-content-end col-4">
                  <img
                    src={deleteIcon}
                    className="m-0 p-0 px-2 "
                    //   onClick={() => setValue("phone", null)}
                    height="25px"
                    alt="down-icon"
                  />
                <Col style={{flex : "0 0" }}>
                  <Button 
                  className="fw-bold order--btn order-submit--desktop border-0 notes-round p-1 d-flex align-items-center justify-content-center"
                  type="submit"
                  >
                    <SearchIcon fontSize="medium" className="fs-1" />
                  </Button>
                </Col>
              </Col>
            </Col>
          </Row>

          <SupportCardOrder/>
        </Container>
      </div>
    </Dialog>
  );
};
