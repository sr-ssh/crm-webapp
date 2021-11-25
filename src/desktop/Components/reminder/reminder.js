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
    for (const x in param) {
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
    <Card className="m-0 mt-3 mx-3 bg-light reminderCard border-0 lh-lg col-4">
      <Card.Body className="rounded-3 text-gray d-flex justify-content-between flex-column ">
        <Row className="p-0 m-0 w-100 d-flex justify-content-center ">
          <Row className="d-flex justify-content-between align-items-center w-100 p-0">
            <Col>
              <span>{titleReminder(reminder)}</span>
              <span className="px-2">/</span>
              <span>{reminder.title}</span>
            </Col>
            <Col className="text-start col-4">
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
            <Col xs={3} className="ps-0">
              <Card.Text className="pt-1">توضیحات :</Card.Text>
            </Col>
            <Col className="pe-0">
              <Card.Text className="pt-1">
                <span>{reminder.description}</span>
              </Card.Text>
            </Col>
          </Row>
        </Row>
        <Row className="m-0 w-100 d-flex justify-content-end mt-3 ">
          <Col xs={7} className="px-0">
            <Button
              className="fw-bold order--btn order-submit--desktop border-0 w-100  d-flex justify-content-center align-items-center p-0"
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
          </Col>
        </Row>
        {/* <Row className="p-0 ps-2 m-0 ">
                    <Card className="background-blue border-0 customer-round">
                        <Card.Body className="pe-0 ps-0">
                            <Row >
                                <Col>
                                    <Card.Text>
                                        <span>{reminder.customer?.family}</span>
                                    </Card.Text>
                                </Col>
                                <Col dir="ltr">
                                    <Card.Text>
                                        موبایل: <span>{reminder.customer?.mobile && persianJs(reminder.customer?.mobile).englishNumber().toString()}</span>
                                    </Card.Text>
                                </Col>
                            </Row>
                            <Row className="flex-nowrap mt-2 ">
                                <Col>
                                    <Card.Text>
                                        تاریخ تولد :
                                    </Card.Text>
                                </Col>
                                <Col dir="ltr">
                                    <Card.Text>
                                        <span dir="rtl">{reminder.customer?.birthday && persianJs(moment.from(reminder.customer?.birthday, 'YYYY/MM/DD').locale('fa').format('DD MMMM YYYY')).englishNumber().toString()}</span>
                                    </Card.Text>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Row>
                <Row className="mt-2">
                    <Card.Text className="text-bold">
                        سبد خرید
                    </Card.Text>
                </Row>

                <Row className="m-0 p-0 ps-2">

                    <Table borderless size="sm">
                        <thead>
                            <tr>
                                <th>سفارش</th>
                                <th>قیمت (تومان)</th>
                                <th>تعداد</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                reminder.order.products.length
                                    ? reminder.order.products.map(item => {
                                        return (
                                            <tr key={item._id}>
                                                <td>{item.name && persianJs(item.name).englishNumber().toString()}</td>
                                                <td>{(item.quantity * item.sellingPrice) && persianJs(item.quantity * item.sellingPrice).englishNumber().toString()} </td>
                                                <td>{item.quantity && persianJs(item.quantity).englishNumber().toString()}</td>
                                            </tr>
                                        )
                                    })

                                    : null
                            }
                            <tr className="border-top-blue">
                                <td>جمع کل:</td>
                                <td className="fs-6">{(getTotalPrice(reminder.order.products)) && persianJs(getTotalPrice(reminder.order.products)).englishNumber().toString()} </td>
                                <td></td>
                                <td></td>
                            </tr>

                        </tbody>
                    </Table>
                </Row>
                <Row className="px-2 text-start ">
                    <Col>
                        <Button className="btn-success reminder-sms-button py-1 border-0 mb-3" type="submit">
                            sms
                        </Button>
                    </Col>
                </Row> */}
      </Card.Body>
    </Card>
  );
};
