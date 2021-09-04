import React, { useState } from 'react';
import { Button, Row, Col, Card } from 'react-bootstrap';

//icons
import cancelIcon from '../../assets/images/Products/pluss.svg';
import plusIcon from './../../assets/images/main/plus-employer-white.svg'

//components
import { AddEmployer } from './addEmployer';

export const EmployeeNoApp = () => {

    const [modalShow, setModalShow] = useState(false)


    return (
        <>
            <Row className="col-12 d-flex flex-column align-items-center">
                <Row className="mb-3 justify-content-center mt-4 col-8">
                    <Col className=" mt-3">
                        <Card className="border-0 lh-lg main-card py-3" >
                            <Card.Body className="fs-6 fw-bold me-2">
                                <Row className="text-center">
                                    <Card.Text>
                                        برای کارمند شدن لطفا اول درخواست بدهید
                                    </Card.Text>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row className="my-3 col-5  justify-content-center ">
                    <Col className="">
                        <Button className="no-product-main-button--desktop w-100 me-auto d-block p-2 px-0" type="submit" onClick={e => setModalShow(true)}>
                            <Row className="justify-content-center align-items-center">
                                <Col className="m-0 p-0 col-1"><img src={plusIcon} alt="add-order-icon" width="30px" /></Col>
                                ارسال درخواست
                            </Row>
                        </Button>
                    </Col>
                </Row>
            </Row>
            <AddEmployer show={modalShow} onHide={() => setModalShow(false)} />
        </>
    )
}