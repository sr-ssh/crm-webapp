import React from 'react';
import moment from 'jalali-moment';
import { Card, Row, Col } from 'react-bootstrap';
import persianJs from 'persianjs/persian.min';


export const Supplier = ({ supplier }) => {
    return (
        <Card className="m-auto px-2 mt-3 bg-light productCard border-0 lh-lg pb-4" style={{'height': '220px'}}>
            <Card.Body className="pb-0 ps-0 text-gray">
                <Row className="p-0 ps-3 m-0">
                    <Card className="background-blue border-0 customer-round">
                        <Card.Body className="py-2 px-0">
                            <Row>
                                <Col className="col-5 ps-0 ms-0">
                                    <Card.Text>
                                        <span>{supplier.family}</span>
                                    </Card.Text>
                                </Col>
                                <Col dir="ltr" className="col-7">
                                    <Card.Text>
                                        تاریخ عضویت : <span>{supplier.createdAt && persianJs(moment.from(supplier.createdAt, 'YYYY/MM/DD').locale('fa').format('DD MMMM YYYY')).englishNumber().toString()}</span>
                                    </Card.Text>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Row>
                <Row className="pe-2">
                    <Row className="mt-2">
                        <Col>
                            <Card.Text>
                                موبایل:
                            </Card.Text>
                        </Col>
                        <Col dir="ltr">
                            <Card.Text>
                                <span>{supplier.mobile && persianJs(supplier.mobile).englishNumber().toString()}</span>
                            </Card.Text>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col>
                            <Card.Text>
                                نام شرکت:
                            </Card.Text>
                        </Col>
                        <Col dir="ltr">
                            <Card.Text>
                                <span>{supplier.company && persianJs(supplier.company).englishNumber().toString()}</span>
                            </Card.Text>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col>
                            <Card.Text>
                                تعداد خرید:
                            </Card.Text>
                        </Col>
                        <Col dir="ltr">
                            <Card.Text>
                                <span>{supplier.receipts && persianJs(supplier.receipts).englishNumber().toString()}</span>
                            </Card.Text>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col>
                            <Card.Text>
                                آخرین خرید:
                            </Card.Text>
                        </Col>
                        <Col dir="ltr">
                            <Card.Text>
                                <span dir="rtl">{supplier.lastBuy && persianJs(moment.from(supplier.lastBuy, 'YYYY/MM/DD').locale('fa').format('DD MMMM YYYY')).englishNumber().toString()}</span>
                            </Card.Text>
                        </Col>
                    </Row>
                </Row>
            </Card.Body>
        </Card>
    )
}

