import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Col, Card, Row, Button, Spinner } from 'react-bootstrap';
import persianJs from 'persianjs/persian.min';
import moment from 'jalali-moment';

//actions
import { employeeActions } from '../../../actions/employeeActions';

//components
import { Header } from '../base/header2';

//icons
import cancelIcon from './../../assets/images/employees/cancel.svg'
import tickIcon from './../../assets/images/employees/tick.svg'

export const Applications = () => {

    let applications = useSelector(state => state.getApplications.applications)
    let applicationsLoading = useSelector(state => state.getApplications.loading)
    const dispatch = useDispatch()

    const changeStatus = (id, status) => {
        let application = {
            applicationId: id,
            status: status
        }
        dispatch(employeeActions.editApplication(application))
    }

    useEffect(() => {
        dispatch(employeeActions.getApplications())
    }, [dispatch])

    return (
        <>
            <div className="finance-page orders">
                <Header title="درخواست ها" backLink="/dashboard" />
                <Container fluid className="m-auto">
                    {
                        applicationsLoading &&
                        <Row>
                            <Col className="col-3 mt-2 m-auto ">
                                <Spinner className="m-auto d-block" animation="border" />
                            </Col>
                        </Row>
                    }
                    {
                        applications
                            ? applications.map((item, index) =>
                                <Card className="m-auto mt-3 productCard border-0 lh-lg pb-2 " >
                                    <Card.Body className="pb-0 ps-0 applications-text-gray">
                                        <Row className="pe-2">
                                            <Row className="mt-2">
                                                <Col xs={3} className="ps-0">
                                                    <Card.Text>
                                                        نام :
                                                    </Card.Text>
                                                </Col>
                                                <Col className="pe-0">
                                                    <Card.Text>
                                                        <span>{item.employee.family}</span>
                                                    </Card.Text>
                                                </Col>
                                            </Row>
                                            <Row className="mt-2">
                                                <Col xs={3} className="ps-0">
                                                    <Card.Text>
                                                        موبایل :
                                                    </Card.Text>
                                                </Col>
                                                <Col className="pe-0">
                                                    <Card.Text>
                                                        <span>{item.employee.mobile && persianJs(item.employee.mobile).englishNumber().toString()}</span>
                                                    </Card.Text>
                                                </Col>
                                                <Col className="ps-0">
                                                    <Card.Text>
                                                        تاریخ :
                                                    </Card.Text>
                                                </Col>
                                                <Col className="px-0">
                                                    <Card.Text>
                                                        <span>{item.createdAt && persianJs(moment.from(item.createdAt, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')).englishNumber().toString()}</span>
                                                    </Card.Text>
                                                </Col>
                                            </Row>
                                        </Row>
                                        <Row className="mt-4 mb-2 pe-2">
                                            <Col xs={2}>
                                                <Button className="border-0 hire-application-btn p-0" type="button" onClick={() => changeStatus(item.id, 2)}>
                                                    <img className="d-flex m-auto " src={tickIcon} alt="close-btn" height="40px" />
                                                </Button>
                                            </Col>
                                            <Col xs={2}>
                                                <Button className="border-0 close-application-btn p-0" type="button" onClick={() => changeStatus(item.id, 3)}>
                                                    <img className="d-flex m-auto " src={cancelIcon} alt="close-btn" height="40px" />
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            )
                            : <p>درخواستی موجود نمی باشد</p>
                    }

                </Container>
            </div>
        </>
    )
}