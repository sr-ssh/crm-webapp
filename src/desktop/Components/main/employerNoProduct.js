import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

export const EmployerNoProduct = () => {
    return (
        <>
            <Row className="mb-3 pe-3 justify-content-center mt-5 col-5">
                <Col xs={10} className="me-4 ms-auto mt-3">
                    <Card className="border-0 lh-lg main-card me-2 py-2" >
                        <Card.Body className=" fs-6 fw-bold me-2">
                            <Row>
                                <Card.Text>
                                    لطفا <span className="fs-4 fw-bold mx-1">محصولات</span> خود را ثبت کنید.
                                </Card.Text>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    )
}