import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { financeActions } from '../../../actions'
import { Container, Button, Col, Card, Row, Alert, Spinner } from 'react-bootstrap';
import persianJs from 'persianjs/persian.min';
import { history } from '../../../helpers';
import commaNumber from 'comma-number'

// Components
import { Header } from '../base/header'


export const Finance = () => {

    let alertMessage = useSelector(state => state.alert.message)
    let alerType = useSelector(state => state.alert.type)
    let loading = useSelector(state => state.financeSummary.loading)
    let summary = useSelector(state => state.financeSummary.data)
    const sideBar = useSelector(state => state.sideBar)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(financeActions.getFinanceSummary())
    }, [dispatch])

    return (
        <>
            <Header isBTNSearch={false} isBTNRequest={false} />

            <div className="finance-page--desktop margin--top--header" style={{ paddingRight: sideBar.open ? "250px" : 0 }}>
                {/* <Container fluid className="m-0 w-100 d-flex justify-content-center flex-wrap"> */}

                {
                    loading &&
                    <Col className="col-3 mt-2 m-auto d-block align-self-center w-100 mb-4 ">
                        <Spinner className="m-auto d-block" animation="border" />
                    </Col>
                }
                {
                    summary
                        ? <Card className={`m-0 ${sideBar.open ? 'w-75' : 'finance--card'}  h-50 bg-light productCard border-0 lh-lg`} >
                            <Card.Body className="d-flex justify-content-around align-items-center">
                                <Row className="item--card--finance--desktop col-4 px-5" >
                                    <Col className="pt-4">
                                        <Card.Text className="label--bill--desktop text--dark--blue">
                                            در آمد
                                        </Card.Text>
                                    </Col>
                                    <Col className="ms-0 text-start d-flex align-items-center">
                                        <Card.Text className="text--bill--desktop">
                                            <span>{commaNumber(summary.income) && persianJs(commaNumber(summary.income)).englishNumber().toString()}</span>
                                            <span className="me-2">تومان</span>

                                        </Card.Text>
                                    </Col>
                                </Row>
                                <Row className="item--card--finance--desktop col-4 px-5 border--dark--blue">
                                    <Col className="pt-4">
                                        <Card.Text className="label--bill--desktop">
                                            هزینه جاری
                                        </Card.Text>
                                    </Col>
                                    <Col className="d-flex align-items-center">
                                        <Card.Text className="text--bill--desktop">
                                            <span>{commaNumber(summary.bills) && persianJs(commaNumber(summary.bills)).englishNumber().toString()}</span>
                                            <span className="me-2">تومان</span>
                                        </Card.Text>
                                    </Col>
                                </Row>
                                <Row className="item--card--finance--desktop col-4 px-5">
                                    <Col className="pt-4 pe-5">
                                        <Card.Text className="label--bill--desktop">
                                            سود
                                        </Card.Text>
                                    </Col>
                                    <Col className="pe-5 d-flex align-items-center">
                                        <Card.Text className="text--bill--desktop">
                                            <span>{commaNumber(summary.income - summary.bills) && persianJs(commaNumber(summary.income - summary.bills)).englishNumber().toString()}</span>
                                            <span className="me-2">تومان</span>

                                        </Card.Text>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                        : null
                }
                {/* <Row className="m-0 mt-4 justify-content-center w-100">
                        <Col className="col-6">
                            <Button className="fw-bold order-submit border-0 w-100" size="lg" type="submit" block onClick={() => history.push('/bills')}>
                                هزینه های جاری
                            </Button>
                        </Col>
                    </Row> */}
                {/* {
                        alertMessage &&
                        <>
                            <div className="modal-backdrop show"></div>
                            <Row className="justify-content-center text-center ">
                                <Alert variant={alerType}>
                                    {alertMessage}
                                </Alert>
                            </Row>
                        </>
                    } */}
                {/* </Container> */}
            </div>
        </>
    )
}