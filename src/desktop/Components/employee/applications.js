import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Col, Card, Row, Button, Spinner } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import { Dialog, AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import persianJs from 'persianjs/persian.min';
import moment from 'jalali-moment';

//actions
import { employeeActions } from '../../../actions/employeeActions';
import { Header } from '../base/header'


//icons
import cancelIcon from './../../assets/images/employees/cancel.svg'
import tickIcon from './../../assets/images/employees/tick.svg'



const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
        backgroundColor: '#70b2e2'
    }
}));


export const Applications = () => {

    const classes = useStyles();
    let applications = useSelector(state => state.getApplications.applications)
    let applicationsLoading = useSelector(state => state.getApplications.loading)
    const sideBar = useSelector(state => state.sideBar)

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
            <Header />
            <div className="finance-page orders margin--top--header" style={{ paddingRight: sideBar.open ? "250px" : 0 }} >
                {
                    applicationsLoading &&
                    <Col className="col-3 mt-2 m-auto d-block align-self-center w-100 mb-4 ">
                        <Spinner className="m-auto d-block" animation="border" />
                    </Col>
                }
                {applications.length > 0 ?
                    <Container fluid className="m-0 px-4 w-100 d-flex justify-content-center align-items-center flex-wrap ">
                        {
                            !applicationsLoading && applications.map((item, index) =>
                                <Card className={`m-0 p-0 mt-3 productCard application--dekstop border-0 lh-lg ms-2 `} >
                                    <Card.Body className="applications-text-gray--desktop">
                                        <Row className="d-flex align-items-center  mb-3">
                                            <Col className="d-flex justify-content-start align-items-center">
                                                <Col xs={2} >
                                                    نام:
                                                </Col>
                                                <Col className="me-2 ">
                                                    <span>{item.employee?.family}</span>
                                                </Col>
                                            </Col>
                                            <Col className="d-flex justify-content-end">
                                                <Col xs={3} className="ms-3">
                                                    <Button className="border-0 hire-application-btn--desktop p-0" type="button" onClick={() => changeStatus(item.id, 2)}>
                                                        <img className="d-flex m-auto " src={tickIcon} alt="close-btn" height="40px" />
                                                    </Button>
                                                </Col>
                                                <Col xs={3} >
                                                    <Button className="border-0 close-application-btn--desktop p-0" type="button" onClick={() => changeStatus(item.id, 3)}>
                                                        <img className="d-flex m-auto " src={cancelIcon} alt="close-btn" height="40px" />
                                                    </Button>
                                                </Col>
                                            </Col>

                                        </Row>
                                        <Row className="mt-3">

                                            <Col className="d-flex justify-content-start align-items-center">
                                                <Col xs={3} className="ps-0 text-nowrap" >
                                                    موبایل:
                                                </Col>
                                                <Col className="m-0 p-0 pe-3">
                                                    <span>{item.employee.mobile && persianJs(item.employee.mobile).englishNumber().toString()}</span>

                                                </Col>
                                            </Col>

                                            <Col className="d-flex">
                                                <Col className="ps-0">
                                                    <Card.Text>
                                                        تاریخ :
                                                    </Card.Text>
                                                </Col>
                                                <Col className="px-0 text-start">
                                                    <Card.Text>
                                                        <span>{item.createdAt && persianJs(moment.from(item.createdAt, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')).englishNumber().toString()}</span>
                                                    </Card.Text>
                                                </Col>
                                            </Col>

                                        </Row>

                                    </Card.Body>
                                </Card>
                            )
                        }
                    </Container>
                    :
                    <Container fluid className="m-0 px-4 w-100 h-75 d-flex justify-content-center align-items-center flex-wrap ">

                        <p className="mt-3">درخواستی موجود نمی باشد</p>
                    </Container>

                }
            </div>
        </>
    )
}