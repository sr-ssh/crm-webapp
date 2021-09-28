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
                <Container fluid className="m-0 mx-4 w-100 d-flex justify-content-center align-items-center flex-wrap ">
                    {
                        applicationsLoading &&
                        <Col className="col-3 mt-2 m-auto d-block align-self-center w-100 mb-4 ">
                            <Spinner className="m-auto d-block" animation="border" />
                        </Col>
                    }
                    {
                        !applicationsLoading &&
                            applications.length > 0
                            ? applications.map((item, index) =>
                                <Card className="m-0 p-0 mt-3 productCard border-0 lh-lg mx-2 col-3 " >
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
                                                        <span>{item.employee?.family}</span>
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
                            : <p className="mt-3">درخواستی موجود نمی باشد</p>
                    }
                </Container>
            </div>
        </>
    )
}