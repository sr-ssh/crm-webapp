import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { history } from '../../../helpers';


// Icons
import addOrderIcon from '../../assets/images/main/add-order.svg';


export const EmployerNoProduct = () => {
    return (
        <>
            <Row className="d-flex align-items-end justify-content-center col-10 h-50">
                <Col xs={10} className="">
                    <Card className="border-0 lh-lg main-card me-2 py-2" >
                        <Card.Body className=" fs-6 fw-bold me-2">
                            <Row className="text-center p-2">
                                <Card.Text>
                                    لطفا <span className="fw-bold text-primary">محصولات</span> خود را ثبت کنید.
                                </Card.Text>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="h-50 col-5 m-0 d-flex align-items-center justify-content-center ">
                <Col xs={10}>
                    <Button className="no-product-main-button--desktop w-100 me-auto d-block p-3 px-0" type="submit" onClick={e => history.push('/products')}>
                        <Row className="m-0 d-flex justify-content-center ">
                            <Col className="m-0 p-0 "><img src={addOrderIcon} alt="add-order-icon" width="28px" /><span className="fw-bold fs-6 mx-1">محصولات</span></Col>
                        </Row>
                    </Button>
                </Col>
            </Row>
        </>
    )
}