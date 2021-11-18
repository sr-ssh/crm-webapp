import React from "react";
import persianJs from "persianjs/persian.min";
import moment from "jalali-moment";
import { Col, Container, Row, Card, Table, Image } from "react-bootstrap";
import commaNumber from "comma-number";

// Icons
import logo from "../../../assets/images/crm-dark-blue.svg";
import { PayButton } from "./payButton";

export const FormalFactor = ({ order }) => {
  let totalPrice = 0;

  return (
    <Container className="m-auto">
      <Row className="align-items-center p-3">
        <Col className="text-bold ">
          {order.status == 3 ? "پیش فاکتور" : "فاکتور"}
        </Col>
        <Col className="text-start">
          <Image src={logo} alt="crm-icon" height="37px" />
        </Col>
      </Row>
      <Card className="rounded-card border-0 mb-2 mt-4">
        <Card.Body className="pb-2 pt-0 px-2 lh-lg">
          <Card.Title className="mb-1">
            <Row className="fw-bold px-1">
              <Col>
                <span className="fs-7 ps-2">نام شرکت:</span>
                <span className="fs-7 text-grey">{order.provider.company}</span>
              </Col>
            </Row>
          </Card.Title>
          <hr className="dark-blue-border mt-0 mb-0" />
          <Row className="fw-bold px-1 fs-8 pt-2">
            <Col>
              <span className="ps-2">تلفن و فکس:</span>
              <span className="text-grey">_</span>
            </Col>
            <Col>
              <span className="ps-2">کد اقتصادی:</span>
              <span className="text-grey">
                {order.provider.financialCode &&
                  persianJs(order.provider.financialCode)
                    .englishNumber()
                    .toString()}
              </span>
            </Col>
          </Row>
          <Row className="fw-bold px-1 fs-8 pt-2">
            <Col>
              <span className="ps-2">نشانی شرکت:</span>
              <span className="text-grey">{order.provider.address}</span>
            </Col>
          </Row>
          <Row className="fw-bold px-1 fs-8 pt-2">
            <Col>
              <span className="ps-2">شناسه ملی شرکت:</span>
              <span className="text-grey">
                {order.provider.nationalCode &&
                  persianJs(order.provider.nationalCode)
                    .englishNumber()
                    .toString()}
              </span>
            </Col>
            <Col>
              <span className="ps-2">شماره ثبت:</span>
              <span className="text-grey">
                {order.provider.registerNo &&
                  persianJs(order.provider.registerNo)
                    .englishNumber()
                    .toString()}
              </span>
            </Col>
          </Row>
          <Row className="fw-bold px-1 fs-8 pt-2">
            <Col>
              <span className="ps-2">کد پستی:</span>
              <span className="text-grey">
                {order.provider.postalCode &&
                  persianJs(order.provider.postalCode)
                    .englishNumber()
                    .toString()}
              </span>
            </Col>
            <Col>
              <span className="ps-2">فروشنده:</span>
              <span className="text-grey">
                {order.provider.family &&
                  persianJs(order.provider.family).englishNumber().toString()}
              </span>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <Card className="rounded-card border-0 mb-2">
        <Card.Body className="pb-2 pt-0 px-2 lh-lg">
          <Card.Title className="mb-1">
            <Row className="fw-bold px-1">
              <Col>
                <span className="fs-7 ps-2">نام شرکت:</span>
                <span className="fs-7 text-grey">{order.customer.company}</span>
              </Col>
            </Row>
          </Card.Title>
          <hr className="dark-blue-border mt-0 mb-0" />
          <Row className="fw-bold px-1 fs-8 pt-2">
            <Col>
              <span className="ps-2">شماره تماس:</span>
              <span className="text-grey">
                {order.customer.mobile &&
                  persianJs(order.customer.mobile).englishNumber().toString()}
              </span>
            </Col>
            <Col>
              <span className="ps-2">کد اقتصادی:</span>
              <span className="text-grey">
                {order.customer.financialCode &&
                  persianJs(order.customer.financialCode)
                    .englishNumber()
                    .toString()}
              </span>
            </Col>
          </Row>
          <Row className="fw-bold px-1 fs-8 pt-2">
            <Col>
              <span className="ps-2">نشانی :</span>
              <span className="text-grey">{order.address}</span>
            </Col>
          </Row>
          <Row className="fw-bold px-1 fs-8 pt-2">
            <Col>
              <span className="ps-2">شناسه ملی شرکت:</span>
              <span className="text-grey">
                {order.customer.nationalCard &&
                  persianJs(order.customer.nationalCard)
                    .englishNumber()
                    .toString()}
              </span>
            </Col>
            <Col>
              <span className="ps-2">شماره ثبت:</span>
              <span className="text-grey">
                {order.customer.registerNo &&
                  persianJs(order.customer.registerNo)
                    .englishNumber()
                    .toString()}
              </span>
            </Col>
          </Row>
          <Row className="fw-bold px-1 fs-8 pt-2">
            <Col>
              <span className="ps-2">کد پستی:</span>
              <span className="text-grey">
                {order.customer.postalCode &&
                  persianJs(order.customer.postalCode)
                    .englishNumber()
                    .toString()}
              </span>
            </Col>
            <Col>
              <span className="ps-2">خریدار:</span>
              <span className="text-grey">{order.customer.family}</span>
            </Col>
          </Row>
          <Row className="fw-bold px-1 fs-8 pt-2">
            <Col>
              <span className="ps-2">تاریخ:</span>
              <span className="text-grey">
                {order.customer.createdAt &&
                  persianJs(
                    moment
                      .from(order.customer.createdAt, "YYYY/MM/DD")
                      .locale("fa")
                      .format("YYYY/MM/DD")
                  )
                    .englishNumber()
                    .toString()}
              </span>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <Card className="rounded-card border-0 mb-2">
        <Card.Body className="pb-0 pt-0 px-0 lh-lg fs-9 text-center fw-bold">
          <Row className="m-0 p-0">
            <Table bordered size="sm" className="table--blue mb-0">
              <thead>
                <tr>
                  <th style={{ width: "6%" }} className="px-0">
                    ردیف
                  </th>
                  <th style={{ width: "25.6%" }} className="px-0">
                    شرح کالا یا خدمات
                  </th>
                  <th style={{ width: "6%" }} className="px-0">
                    تعداد
                  </th>
                  <th style={{ width: "13.4%" }} className="px-0">
                    مبلغ واحد (ریال)
                  </th>
                  <th style={{ width: "12.19%" }} className="px-0">
                    تخفیف (ریال)
                  </th>
                  <th style={{ width: "18.28%" }} className="px-0">
                    تخفیف مالیات و عوارض ارزش افزوده (ریال)
                  </th>
                  <th style={{ width: "18.28%" }} className="px-0">
                    جمع کل تخفیف مالیات و عوارض (ریال)
                  </th>
                </tr>
              </thead>
              <tbody>
                {console.log(order.products)}
                {order.products?.map((product, index) => {
                  totalPrice =
                    totalPrice +
                    (product.quantity * product.sellingPrice +
                      product.quantity * product.sellingPrice * 0.09);

                  return (
                    <tr>
                      <td>
                        {index + 1 &&
                          persianJs(index + 1)
                            .englishNumber()
                            .toString()}
                      </td>
                      <td>{product.name}</td>
                      <td>
                        {product.quantity &&
                          persianJs(commaNumber(product.quantity))
                            .englishNumber()
                            .toString()}
                      </td>
                      <td>
                        {product.sellingPrice &&
                          persianJs(commaNumber(product.sellingPrice))
                            .englishNumber()
                            .toString()}
                      </td>
                      <td>
                        {persianJs(commaNumber(0)).englishNumber().toString()}
                      </td>
                      <td>
                        {product.sellingPrice &&
                          persianJs(commaNumber(product.sellingPrice * 0.09))
                            .englishNumber()
                            .toString()}
                      </td>
                      <td>
                        {product.quantity * product.sellingPrice &&
                          persianJs(
                            commaNumber(
                              product.quantity * product.sellingPrice +
                                product.quantity * product.sellingPrice * 0.09
                            )
                          )
                            .englishNumber()
                            .toString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Row>
          <Row className="text-start py-2 mt-0 mx-0 fs-9 fw-bold">
            <Col className="text-start ps-0">
              جمع کل پس از تخفیف و کسر مالیات و عوارض (ریال) :
            </Col>
            <Col xs={2} className="text-center ms-2 text-grey px-0">
              {persianJs(commaNumber(totalPrice)).englishNumber().toString()}
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <PayButton factor={order} />
    </Container>
  );
};
