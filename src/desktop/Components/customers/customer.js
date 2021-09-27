import React from 'react';
import moment from 'jalali-moment';
import { Card, Row, Col } from 'react-bootstrap';
import persianJs from 'persianjs/persian.min';


export const Customer = ({ customer }) => {
    return (
        <Card className="m-0 ms-3 mb-3 p-0 bg-light productCard border-0 lh-lg pb-2 flex-grow-0 productCard--dekstop"  >
            <Card.Body className="pb-0 ps-0 text-gray">
                <Row className="p-0 ps-3 m-0">
                    <Card className="bg--light--blue border-0">
                        <Card.Body className="py-3 px-0">
                            <Row>
                                <Col className="col-4 ps-0 ms-0">
                                    <Card.Text>
                                        <span>{customer.family}</span>
                                    </Card.Text>
                                </Col>
                                <Col dir="ltr" className="col-8">
                                    <Card.Text>
                                        عضویت : <span>{customer.createdAt && persianJs(moment.from(customer.createdAt, 'YYYY/MM/DD').locale('fa').format('DD MMMM YYYY')).englishNumber().toString()}</span>
                                    </Card.Text>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Row>
                <Row className="pe-2">
                    <Row className="my-1 py-1">
                        <Col>
                            <Card.Text>
                                موبایل:
                            </Card.Text>
                        </Col>
                        <Col dir="ltr">
                            <Card.Text>
                                <span>{customer.mobile && persianJs(customer.mobile).englishNumber().toString()}</span>
                            </Card.Text>
                        </Col>
                    </Row>
                    {/* <Row className="my-1 py-1">
                        <Col>
                            <Card.Text>
                                تاریخ تولد:
                            </Card.Text>
                        </Col>
                        <Col dir="ltr">
                            <Card.Text>
                                <span dir="rtl">{customer.birthday && persianJs(moment.from(customer.birthday, 'YYYY/MM/DD').locale('fa').format('DD MMMM YYYY')).englishNumber().toString()}</span>
                            </Card.Text>
                        </Col>
                    </Row> */}
                    <Row className="my-1 py-1">
                        <Col>
                            <Card.Text>
                                تعداد سفارش:
                            </Card.Text>
                        </Col>
                        <Col dir="ltr">
                            <Card.Text>
                                <span>{customer.order && persianJs(customer.order).englishNumber().toString()}</span>
                            </Card.Text>
                        </Col>
                    </Row>
                    <Row className="my-1 py-1">
                        <Col>
                            <Card.Text>
                                سفارش های موفق:
                            </Card.Text>
                        </Col>
                        <Col dir="ltr">
                            <Card.Text>
                                <span>{customer.successfullOrders && persianJs(customer.successfullOrders).englishNumber().toString()}</span>
                            </Card.Text>
                        </Col>
                    </Row>
                    <Row className="my-1 py-1">
                        <Col>
                            <Card.Text>
                                سفارش های ناموفق:
                            </Card.Text>
                        </Col>
                        <Col dir="ltr">
                            <Card.Text>
                                <span>{customer.failOrders && persianJs(customer.failOrders).englishNumber().toString()}</span>
                            </Card.Text>
                        </Col>
                    </Row>
                    <Row className="my-1 py-1">
                        <Col>
                            <Card.Text>
                                آخرین خرید:
                            </Card.Text>
                        </Col>
                        <Col dir="ltr">
                            <Card.Text>
                                <span dir="rtl">{customer.lastBuy && persianJs(moment.from(customer.lastBuy, 'YYYY/MM/DD').locale('fa').format('DD MMMM YYYY')).englishNumber().toString()}</span>
                            </Card.Text>
                        </Col>
                    </Row>
                    <Row className="my-1 py-1">
                        <Col>
                            <Card.Text>
                                جمع خرید:
                            </Card.Text>
                        </Col>
                        <Col dir="ltr">
                            <Card.Text>
                                <span>{customer.total && persianJs(customer.total).englishNumber().toString()}</span>
                            </Card.Text>
                        </Col>
                    </Row>
                </Row>
            </Card.Body>
        </Card>
    )
}

