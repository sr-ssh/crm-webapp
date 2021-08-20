import React, { useEffect } from 'react';
import { Button, Row, Col, Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import persianJs from 'persianjs/persian.min';

//icons
import cancelIcon from '../../assets/images/employees/cancel-blue.svg';
// Actions
import { employeeActions } from '../../../actions/employeeActions';


export const EmployeeApp = () => {

    let employer = JSON.parse(localStorage.getItem('employer'));
    let applicationId = JSON.parse(localStorage.getItem('applicationId'));
    const dispatch = useDispatch()

    const closeApplication = (e) => {
        e.preventDefault()
        let application = {
            applicationId: applicationId,
            status: 3
        }
        dispatch(employeeActions.editApplicationAndReload(application))

    }

    useEffect(() => {

        dispatch(employeeActions.getPermissions())

    }, [dispatch])


    return (
        <>
            <Row className="mx-4 col-5">
                <Row className="mb-3 justify-content-center mt-4">
                    <Col className="mt-3">
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
                <Row className="my-3  justify-content-center ">
                    <Col className="">
                        <Button className="no-product-main-button w-100 me-auto d-block p-2 px-0" type="submit" onClick={e => closeApplication(e)}>
                            <Row className="justify-content-center align-items-center">
                                <Col className="m-0 p-0 col-1"><img src={cancelIcon} alt="add-order-icon" width="43px" /></Col>
                                لغو درخواست
                            </Row>
                        </Button>
                    </Col>
                </Row>
            </Row>
        </>
    )
}