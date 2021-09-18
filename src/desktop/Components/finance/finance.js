import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { financeActions } from '../../../actions'
import { Container, Button, Col, Card, Row, Alert, Spinner } from 'react-bootstrap';
import persianJs from 'persianjs/persian.min';
import { history } from '../../../helpers';

// Components
import { Header } from '../base/header'


export const Finance = () => {

    let alertMessage = useSelector(state => state.alert.message)
    let alerType = useSelector(state => state.alert.type)
    let loading = useSelector(state => state.financeSummary.loading)
    let summary = useSelector(state => state.financeSummary.data)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(financeActions.getFinanceSummary())
    }, [dispatch])

    return (
        <>
            <Header isBTNSearch={false} isBTNRequest={false} />

            <div className="finance-page orders margin--top--header">
                <Container fluid className="m-0 w-100 d-flex justify-content-center flex-wrap">

                    {
                        loading &&
                        <Col className="col-3 mt-2 m-auto d-block align-self-center w-100 mb-4 ">
                            <Spinner className="m-auto d-block" animation="border" />
                        </Col>
                    }
                    {
                        summary
                            ? <Card className="mx-2 mb-auto mt-3 bg-light productCard border-0 lh-lg pb-2 col-4" >
                                <Card.Body className="pb-0 ps-0 text-gray">
                                    <Row className="p-0 ps-3 m-0">
                                        <Card className="background-blue border-0 customer-round">
                                            <Card.Body className="py-2 px-0">
                                                <Row>
                                                    <Col>
                                                        <Card.Text>
                                                            درآمد:
                                                        </Card.Text>
                                                    </Col>
                                                    <Col className="col-3 ms-0 text-start">
                                                        <Card.Text>
                                                            <span>{summary.income && persianJs(summary.income).englishNumber().toString()}</span>
                                                        </Card.Text>
                                                    </Col>
                                                </Row>
                                            </Card.Body>
                                        </Card>
                                    </Row>
                                    <Row className="pe-2">
                                        <Row className="mt-2">
                                            <Col>
                                                <Card.Text>
                                                    هزینه جاری:
                                                </Card.Text>
                                            </Col>
                                            <Col dir="ltr">
                                                <Card.Text>
                                                    <span>{summary.bills && persianJs(summary.bills).englishNumber().toString()}</span>
                                                </Card.Text>
                                            </Col>
                                        </Row>
                                        <Row className="mt-2">
                                            <Col>
                                                <Card.Text>
                                                    سود:
                                                </Card.Text>
                                            </Col>
                                            <Col dir="ltr">
                                                <Card.Text>
                                                    <span>{(summary.income - summary.bills) && persianJs(summary.income - summary.bills).englishNumber().toString()}</span>
                                                </Card.Text>
                                            </Col>
                                        </Row>
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
                </Container>
            </div>
        </>
    )
}