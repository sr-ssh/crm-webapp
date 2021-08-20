import React from 'react'
import { Card , Row , Col } from 'react-bootstrap';
import moment from 'jalali-moment';
import persianJs from 'persianjs/persian.min';

export const Bill = ({bill}) => {
    return(
        <Card className="mx-2 mb-auto mt-3 bg-light productCard border-0 lh-lg pb-2" >
            <Card.Body className="pb-0 ps-0 text-gray">
                <Row className="pe-2">
                    <Row>
                        <Col>
                            <Card.Text>
                               نام هزینه:
                            </Card.Text>
                        </Col>
                        <Col dir="ltr">
                            <Card.Text>
                                <span>{bill.name && persianJs(bill.name).englishNumber().toString()}</span>
                            </Card.Text>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col>
                            <Card.Text>
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
                            <Card.Text>
                                میزان هزینه:
                            </Card.Text>
                        </Col>
                        <Col dir="ltr">
                            <Card.Text>
                                <span>{bill.cost && persianJs(bill.cost).englishNumber().toString()}</span>
                            </Card.Text>
                        </Col>
                    </Row>
                </Row>
            </Card.Body>
        </Card>
    )
}
