import React from "react";
import { Card, Table, Row, Col, Container, Spinner } from "react-bootstrap";
import moment from "jalali-moment";
import persianJs from "persianjs/persian.min";
import { Button } from "@material-ui/core";
// Helpers
import { history } from "../../../helpers";

export const Reminder = ({ reminder, ...props }) => {
  const getTotalPrice = (order) => {
    let total = 0;
    order.map((item) => {
      total += item.sellingPrice * item.quantity;
    });
    return total;
  };
  let typeReminder = (param) => {
    let res;
    for (const x in param) {
      // if (Object.hasOwnProperty.call(object, key)) {
      //     const element = object[key];

      // }
      if (x === "factorReference") {
        res = (
          <Button
            onClick={() =>
              history.push("/factor", { id: reminder.factorReference })
            }
          >
            برو به فاکتور
          </Button>
        );
      }
      if (x === "orderReference") {
        if (reminder.orderReference.status == 0) {
          res = (
            <Button
              onClick={() =>
                history.push("/orders", { id: reminder.orderReference._id })
              }
            >
              برو به سفارش
            </Button>
          );
        }
        if (reminder.orderReference.status == 3) {
          res = (
            <Button
              onClick={() =>
                history.push("/saleopprotunity", {
                  id: reminder.orderReference._id,
                })
              }
            >
              برو به فرصت فروش
            </Button>
          );
        }
      }
      if (x === "leadReference") {
        res = (
          <Button
            onClick={() =>
              history.push("/lead", { id: reminder.leadReference })
            }
          >
            برو به سرنخ
          </Button>
        );
      }
    }
    return res;
  };

  return (
    <Card className="m-auto mt-3 bg-light productCard border-0 lh-lg col-3">
      <Card.Body className="pb-0 ps-1 rounded-3 text-gray">
        <span>نام</span> : {reminder.name}
        <br />
        <span>توضیحات</span> : {reminder.description}
        <br />
        <span>تاریخ یادآور</span> : {reminder.date}
        <br />
        <span>تاریخ ایجاد</span> : {reminder.createdAt}
        <br />
        <span>تاریخ آخرین آپدیت</span> : {reminder.updatedAt}
        <br />
        {typeReminder(reminder)}
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
