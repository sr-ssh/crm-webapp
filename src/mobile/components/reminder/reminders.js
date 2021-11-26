import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  Table,
  Row,
  Col,
  Container,
  Button,
  Spinner,
} from "react-bootstrap";
import moment from "jalali-moment";
import persianJs from "persianjs/persian.min";

// Actions
import { reminderActions } from "../../../actions";
// Components
import { Header } from "./../base/header2";
import { Reminder } from "./reminder";
import { CircularProgress } from "@material-ui/core";

export const Reminders = () => {
  let reminders = useSelector((state) => state.getReminders.reminders);
  let reminderLoading = useSelector((state) => state.getReminders.loading);
  const dispatch = useDispatch();

  const getTotalPrice = (order) => {
    let total = 0;
    order.map((item) => {
      total += item.sellingPrice * item.quantity;
    });
    return total;
  };

  useEffect(() => {
    dispatch(reminderActions.getReminders());
  }, [dispatch]);

  return (
    <div className="product-page reminders">
      <Header title="یادآوری" backLink="/dashboard" />
      <Container fluid className="m-0 ">
        {reminderLoading && (
          <Container
            className="m-0 p-0 d-flex justify-content-center align-items-center"
            style={{ height: "80vh" }}
          >
            <Row className="d-flex justify-content-center">
              <Col className="col-12 d-flex justify-content-center ">
                <CircularProgress />
              </Col>
            </Row>
          </Container>
        )}
        {!reminderLoading && reminders.length === 0 && (
          <Container
            className="m-0 p-0 d-flex justify-content-center align-items-center"
            style={{ height: "85vh" }}
          >
            <Row className="d-flex justify-content-center">
              <Col className="col-12 d-flex justify-content-center ">
                هیچ یادآوری موجود نمی باشد!
              </Col>
            </Row>
          </Container>
        )}
        {!reminderLoading && reminders && reminders.length > 0
          ? reminders.map((reminder, index) => (
              <Reminder key={index} reminder={reminder} />
            ))
          : null}
      </Container>
    </div>
  );
};
