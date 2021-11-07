import React from "react";
import moment from "jalali-moment";
import { Card, Row, Col } from "react-bootstrap";
import persianJs from "persianjs/persian.min";

export const SellersCard = ({ data, ...props }) => {
  function cc_format(value) {
    var v = value.replace(/\s+/g, "").replace(/[^۱۲۳۴۵۶۷۸۹۰0-9]/gi, "");
    var matches = v.match(/[۱۲۳۴۵۶۷۸۹۰0-9]{4,16}/g);
    var match = (matches && matches[0]) || "";
    var parts = [];
    for (var i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return persianJs(parts.join(" ")).toEnglishNumber().toString();
    } else {
      return value;
    }
  }
  return (
    <Card className="m-0 ms-3 mb-3 p-0 bg-light productCard border-0 lh-lg pb-2 flex-grow-0 productCard--dekstop">
      <Card.Body className="pb-0 ps-0 text-gray">
        <Row className="p-0 ps-3 m-0">
          <Card className="bg--light--blue border-0">
            <Card.Body className="py-3 px-0">
              <Row>
                <Col className="col-12 ps-0 ms-0 d-flex ">
                  ثبت شده توسط :{" "}
                  <span className="ms-3 me-auto align-self-end">
                    {data.marketer?.family}
                  </span>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Row>
        <Row className="pe-2">
          <Row className="my-1 py-1">
            <Col>
              <Card.Text>تلفن :</Card.Text>
            </Col>
            <Col dir="ltr">
              <Card.Text>
                <span>
                  {data.mobile &&
                    persianJs(data.mobile).englishNumber().toString()}
                </span>
              </Card.Text>
            </Col>
          </Row>
          <Row className="my-1 py-1">
            <Col>
              <Card.Text>همراه :</Card.Text>
            </Col>
            <Col dir="ltr">
              <Card.Text>
                <span>
                  {data.phone &&
                    persianJs(data.phone).englishNumber().toString()}
                </span>
              </Card.Text>
            </Col>
          </Row>
          <Row className="my-1 py-1">
            <Col>
              <Card.Text>نام فروشنده : </Card.Text>
            </Col>
            <Col dir="ltr">
              <Card.Text>
                <span>{data.family}</span>
              </Card.Text>
            </Col>
          </Row>
          <Row className="my-1 py-1">
            <Col>
              <Card.Text>نام مجموعه : </Card.Text>
            </Col>
            <Col dir="ltr">
              <Card.Text>
                <span>{data.company}</span>
              </Card.Text>
            </Col>
          </Row>
          <Row className="my-1 py-1">
            <Col>
              <Card.Text>شماره کارت</Card.Text>
            </Col>
            <Col dir="ltr">
              <Card.Text>
                <span dir="rtl">
                  {data.cardNumber &&
                    persianJs(cc_format(data.cardNumber.toString()))
                      .englishNumber()
                      .toString()}
                </span>
              </Card.Text>
            </Col>
          </Row>
          <Row className="my-1 py-1">
            <Col>
              <Card.Text>آدرس :</Card.Text>
            </Col>
            <Col dir="ltr">
              <Card.Text>
                <span>{data.address}</span>
              </Card.Text>
            </Col>
          </Row>
          <Row className="my-1 py-1">
            <Col>
              <Card.Text>توضیخات :</Card.Text>
            </Col>
            <Col dir="ltr">
              <Card.Text>
                <span>{data.description}</span>
              </Card.Text>
            </Col>
          </Row>
        </Row>
      </Card.Body>
    </Card>
  );
};
