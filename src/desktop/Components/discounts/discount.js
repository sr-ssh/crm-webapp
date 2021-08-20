import React from 'react';
import moment from 'jalali-moment';
import { Card, Row, Col } from 'react-bootstrap';
// Helpers
import { history } from '../../../helpers';

// icons 
import editIcon from '../../assets/images/discounts/edit.svg'
import deleteIcon from '../../assets/images/discounts/deletee.svg'
import tickIcon from '../../assets/images/tick.svg'


export const Discount = ({ discount }) => {
    return (
        <Card className="m-auto mt-3 bg-light productCard border-0 lh-lg pb-2" >
            <Card.Body className="pb-0 ps-0 text-gray">
                <Row className="pe-2">
                    <Row className="mt-2">
                        <Col>
                            <Card.Text>
                                نام تخفیف: <span>{discount.name}</span>
                            </Card.Text>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col>
                            <Card.Text>
                                نوع: <span>{discount.type}</span>
                            </Card.Text>
                        </Col>
                        <Col>
                            <Card.Text>
                                درصد: % <span>{discount.percentage}</span>
                            </Card.Text>
                        </Col>
                    </Row>
                    {
                        discount.type === 0
                            ? <Row className="mt-2">
                                <Col>
                                    <Card.Text>
                                        نام مشتری: <span>{discount.customer.family}</span>
                                    </Card.Text>
                                </Col>
                            </Row>
                            : null
                    }
                    <Row className="mt-1 px-1">
                        {
                            discount.sms &&
                            <Col>
                                <Card.Text className={`fw-bold ${discount.sms ? 'discount-sms-active' : null}`}>
                                    <img src={tickIcon} height="25px" alt="tick-icon" />sms
                                </Card.Text>
                            </Col>
                        }
                        <Col className="d-flex justify-content-end mt-3">
                            <Card.Link>
                                <img className="ms-1" src={editIcon} height="33px" alt="edit-icon" />
                            </Card.Link>
                            <img src={deleteIcon} height="27px" alt="delete-icon" />
                        </Col>
                    </Row>
                </Row>
            </Card.Body>
        </Card>
    )
}

