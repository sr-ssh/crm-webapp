import React, { useEffect } from 'react';
import { Button, Row, Col, Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import persianJs from 'persianjs/persian.min';

//icons
import cancelIcon from '../../assets/images/employees/cancel-blue.svg';
// Actions
import { employeeActions } from '../../../actions/employeeActions';


export const EmployeeApp = () => {

    let employer = JSON.parse(localStorage.getItem("employer"));
    let applicationId = localStorage.getItem('applicationId');
    const dispatch = useDispatch()

    const closeApplication = (e) => {
        e.preventDefault()
        let application = {
            applicationId: applicationId,
            status: 3
        }
        dispatch(employeeActions.editApplicationAndReload(application))

    }



    return (
        <>
            <Row className="mb-3 pe-3 justify-content-center mt-4">
                <Col xs={10} className="me-4 ms-auto mt-3">
                    <Card className="border-0 lh-lg main-card me-2 py-2" >
                        <Card.Body className="fs-6 fw-bold me-2">
                            <Row>
                                <Card.Text>
                                    <span> در انتظار قبول درخواست توسط آقا/خانم </span>
                                    <span className="fs-5">{employer.family}</span>
                                    <span> با شماره </span>
                                    {employer.mobile && persianJs(employer.mobile).englishNumber().toString()}
                                </Card.Text>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="my-3 pe-3 justify-content-center">
                <Col xs={10} className="">
                    <Button className="no-product-main-button w-100 me-auto d-block p-2 px-0" type="submit" onClick={e => closeApplication(e)}>
                        <Row>
                            <Col xs={3} className="ms-0 me-4 pe-4"><img src={cancelIcon} alt="add-order-icon" width="43px" /></Col>
                            <Col className="fs-6 me-0 text-end pt-2 pe-2">لغو درخواست</Col>
                        </Row>
                    </Button>
                </Col>
            </Row>
        </>
    )
}