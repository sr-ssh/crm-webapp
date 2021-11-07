import React from "react";
import moment from "jalali-moment";
import { Card, Row, Col } from "react-bootstrap";
import persianJs from "persianjs/persian.min";
import commaNumber from "comma-number";

export const Seller = ({ seller }) => {
  return (
    <Card className="m-auto mt-3 bg-light productCard border-0 lh-lg pb-2">
      <Card.Body className="pb-0 ps-0 text-gray">
        <Row className="p-0 ps-3 m-0">
          <Card className="background-blue border-0 customer-round">
            <Card.Body className="py-2 px-0">
              <Row>
                <Col className="col-5 ps-0 ms-0">
                  <Card.Text>ثبت شده توسط :</Card.Text>
                </Col>
                <Col dir="ltr" className="col-7">
                  <Card.Text>
                    <span>{seller.marketer.family}</span>
                  </Card.Text>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Row>
        <Row className="pe-2">
          <Row className="mt-2">
            <Col>
              <Card.Text>تلفن:</Card.Text>
            </Col>
            <Col dir="ltr">
              <Card.Text>
                <span>
                  {seller.phone &&
                    persianJs(seller.phone).englishNumber().toString()}
                </span>
              </Card.Text>
            </Col>
          </Row>

          <Row className="mt-2">
            <Col>
              <Card.Text>همراه:</Card.Text>
            </Col>
            <Col dir="ltr">
              <Card.Text>
                <span>
                  {seller.mobile &&
                    persianJs(seller.mobile).englishNumber().toString()}
                </span>
              </Card.Text>
            </Col>
          </Row>
        
          <Row className="mt-2">
            <Col>
              <Card.Text>نام فروشنده:</Card.Text>
            </Col>
            <Col dir="ltr">
              <Card.Text>
                <span>
                  {seller.family
                    }
                </span>
              </Card.Text>
            </Col>
          </Row>

          <Row className="mt-2">
            <Col>
              <Card.Text>نام مجموعه:</Card.Text>
            </Col>
            <Col dir="ltr">
              <Card.Text>
                <span>
                  {seller.company
                    }
                </span>
              </Card.Text>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col>
              <Card.Text>شماره کارت:</Card.Text>
            </Col>
            <Col dir="ltr">
              <Card.Text>
                <span>
                {seller.cardNumber &&
                    persianJs(seller.cardNumber).englishNumber().toString()}
                </span>
              </Card.Text>
            </Col>
          </Row>

          <Row className="mt-2">
            <Col>
              <Card.Text>آدرس:</Card.Text>
            </Col>
            <Col dir="ltr">
              <Card.Text>
                <span>
                {seller.address &&
                    persianJs(seller.address).englishNumber().toString()}
                </span>
              </Card.Text>
            </Col>
          </Row>
        
        </Row>
      </Card.Body>
    </Card>
  );
};
