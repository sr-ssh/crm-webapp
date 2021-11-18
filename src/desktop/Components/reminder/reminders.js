import React, { useEffect, useState } from "react";
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
import { Reminder } from "./reminder";
import { Header } from "../base/headerExcel";
import { CircularProgress } from "@material-ui/core";
import { AddReminder } from "./addReminder";
export const Reminders = () => {
  const [addReminderModal, setAddReminderModal] = useState(false);
  let { loading: reminderLoading, reminders: reminders } = useSelector(
    (state) => state.getReminders
  );
  const sideBar = useSelector((state) => state.sideBar);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reminderActions.getReminders());
  }, []);

  console.log(reminderLoading, reminders);

  return (
    <>
      <Header
        isBTNSearch={false}
        isGetExcel={false}
        isBtnAdd={"یادآوری"}
        btnAdd={() => setAddReminderModal(true)}
      />

      <div
        className="product-page orders margin--top--header"
        style={{ paddingRight: sideBar.open ? "250px" : 0 }}
      >
        <Container
          fluid
          className={` m-0 w-100 flex-wrap  d-flex justify-content-center ${
            reminderLoading && "align-items-center"
          } `}
          style={{ height: reminderLoading && "80vh" }}
        >
          {reminderLoading && <CircularProgress />}
          {!reminderLoading && reminders && reminders.length === 0 ? (
            <Row className="justify-content-center align-items-center no-result-filter">
              <Col className="col-8 text-center">
                هیچ یادآوری موجود نمی باشد!
              </Col>
            </Row>
          ) : null}
          {!reminderLoading && reminders && reminders.length > 0
            ? reminders?.map((reminder, index) => (
                <Reminder key={index} reminder={reminder} />
              ))
            : null}
        </Container>
        <AddReminder
          show={addReminderModal}
          onHide={() => setAddReminderModal(false)}
          isPersonal={true}
          dispatchCallBack={() => dispatch(reminderActions.getReminders())}
        />
      </div>
    </>
  );
};
