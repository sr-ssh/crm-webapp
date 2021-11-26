import React, { useEffect , useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Container
} from "react-bootstrap";

// Actions
import { reminderActions } from "../../../actions";
// Components
import { Header } from "./../base/employeeHeader";
import { Reminder } from "./reminder";
import { CircularProgress } from "@material-ui/core";
import { AddReminder } from "./addReminder";


export const Reminders = () => {
  let reminders = useSelector((state) => state.getReminders.reminders);
  let reminderLoading = useSelector((state) => state.getReminders.loading);
  const dispatch = useDispatch();

  const [addReminderModal, setAddReminderModal] = useState(false);

  useEffect(() => {
    dispatch(reminderActions.getReminders());
  }, []);

  return (
    <div className="product-page reminders">
      <Header title="یادآوری" backLink="/dashboard" setModalShow={()=> setAddReminderModal(true)} />
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
      <AddReminder
          show={addReminderModal}
          onHide={() => setAddReminderModal(false)}
          isPersonal={true}
          isCallBack={true}
          isTitle={true}
          dispatchCallBack={() => dispatch(reminderActions.getReminders())}
        />
    </div>
  );
};
