import React from "react";
import { Card, Button, Row, Col, Container, Spinner } from "react-bootstrap";
import moment from "jalali-moment";
import persianJs from "persianjs/persian.min";
// Helpers
import { history } from "../../../helpers";

export const Reminder = ({ reminder, ...props }) => {
  let handleBtnRedirect = (e, param) => {
    e.preventDefault();
    for (const x in param) {
      switch (x) {
        case "factorReference":
          history.push("/factor", { id: reminder.factorReference });
          break;
        case "orderReference":
          if (reminder.orderReference.status == 0) {
            history.push("/orders", { id: reminder.orderReference._id });
          }
          if (reminder.orderReference.status == 3) {
            history.push("/saleopprotunity", {
              id: reminder.orderReference._id,
            });
          }
          break;
        case "leadReference":
          history.push("/lead", { id: reminder.leadReference });
          break;
        default:
          break;
      }
    }
  };
  let titleReminder = (param) => {
    for (let x in param) {
      switch (x) {
        case "factorReference":
          return "فاکتور";

        case "orderReference":
          if (reminder.orderReference.status == 0) {
            return "سفارش";
          }
          if (reminder.orderReference.status == 3) {
            return "فرصت فروش";
          }
          break;
        case "leadReference":
          return "سر نخ";
        default:
          break;
      }
    }
  };
  return (
    <Card className="m-0 my-3   bg-light reminderCard--mobile  border-0 lh-lg col-12">
      <Card.Body className="rounded-3 p-1 pt-3  text-gray d-flex justify-content-between flex-column ">
        <Row className="p-0 m-0 w-100 d-flex justify-content-center ">
          <Row className="d-flex justify-content-between align-items-center w-100 p-0">
            <Col className="ps-0">
              <span>{titleReminder(reminder) || "شخصی"}</span>
              <span className="px-2">/</span>
              <span>{reminder.title}</span>
            </Col>
            <Col className="text-start col-5">
              <span className="ps-2">
                {reminder.date &&
                  persianJs(
                    moment
                      .from(reminder.date, "YYYY/MM/DD")
                      .locale("fa")
                      .format("DD MMMM YYYY")
                  )
                    .englishNumber()
                    .toString()}
              </span>
            </Col>
          </Row>
          <Row className="mt-3 p-0">
            <Col style={{ width: "90px", flex: "0 0 auto" }} className="ps-0">
              <Card.Text className="pt-1">توضیحات :</Card.Text>
            </Col>
            <Col className="pe-0">
              <Card.Text className="pt-1">
                <span>{reminder.description}</span>
              </Card.Text>
            </Col>
          </Row>
        </Row>
        <Row className="m-0 w-100 d-flex justify-content-end mt-3 mb-2 ps-2 ">
          <Col className="px-0 col-auto">
            {titleReminder(reminder) ? (
              <Button
                className="fw-bold order--btn order-submit--desktop border-0 w-100  d-flex justify-content-center align-items-center p-0 px-3"
                style={{ height: "30px" }}
                size="lg"
                type="submit"
                block
                onClick={(e) => handleBtnRedirect(e, reminder)}
              >
                رفتن به
                <> </>
                {titleReminder(reminder)}
              </Button>
            ) : null}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
