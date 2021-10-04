import React from 'react'
import { Card, Row, Col } from 'react-bootstrap';
import moment from 'jalali-moment';
import persianJs from 'persianjs/persian.min';
import commaNumber from 'comma-number'

export const Bill = ({ bill, sideBar }) => {
    return (
        <Card className={`mt-3 bg-light productCard bills--card--desktop border-0 lh-lg pb-2 ${sideBar ? 'bills--card--desktop--open' : null}`} >
            <Card.Body className="pb-0 ps-0 text-gray">
                <Row className="pe-2">
                    <Row>
                        <Col>
                            <Card.Text className="text--dark--blue fw-bold">
                                نام هزینه:
                            </Card.Text>
                        </Col>
                        <Col dir="ltr" >
                            <Card.Text>
                                <span>{bill.name && persianJs(bill.name).englishNumber().toString()}</span>
                            </Card.Text>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col>
                            <Card.Text className=" fw-bold">
                                تاریخ:
                            </Card.Text>
                        </Col>
                        <Col dir="ltr">
                            <Card.Text>
                                <span dir="rtl">{bill.createdAt && persianJs(moment.from(bill.createdAt, 'YYYY/MM/DD').locale('fa').format('DD MMMM YYYY')).englishNumber().toString()}</span>
                            </Card.Text>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col>
                            <Card.Text className=" fw-bold">
                                میزان هزینه:
                            </Card.Text>
                        </Col>
                        <Col className="text-start">
                            <Card.Text>
                                <span>{commaNumber(bill.cost) && persianJs(commaNumber(bill.cost)).englishNumber().toString()}</span>    <span>تومان</span>
                            </Card.Text>
                        </Col>
                    </Row>
                </Row>
            </Card.Body>
        </Card>
    )
}
