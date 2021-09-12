import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Container, Alert, Spinner, Image, Card } from 'react-bootstrap';
// Actions
import { orderActions } from '../../../actions';
// Icons
import crmIcon from './../../assets/images/crm-dark-blue.svg'
export const OrderDetails = (props) => {

    let alertMessage = useSelector(state => state.alert.message)
    let alerType = useSelector(state => state.alert.type)
    const dispatch = useDispatch()
    const order = useSelector(state => state.orderDetails.data)
    let orderLoading = useSelector(state => state.orderDetails.loading)
    // let { err: cancelErr, loading: cancelLoading } = useSelector(state => state.cancelProductOrder)
    console.log("props", props)

    order && console.log(order)
    useEffect(() => {
        dispatch(orderActions.orderDetails("613d9292a708909be9146b26"))
    }, [dispatch])


    return (
        <div className="product-page orders ">
            <Container className="m-auto">
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
                <Row className="align-items-center p-3">
                    <Col className='text-bold '>
                        پیش فاکتور
                    </Col>
                    <Col className="text-start">
                        <Image src={crmIcon} alt="crm-icon" height="37px"/>
                    </Col>
                </Row>
                <Card className="rounded-card boder-0">
                    <Card.Body className="pb-0 ps-1 ">
                        <Card.Title>
                            <Row className="text-center fs-7">
                                <Col xs={4}>
                                    فروشنده:
                                </Col>
                                <Col xs={5}>
                                    {order?.employee.family}
                                </Col>
                            </Row>
                        </Card.Title>
                        <hr />
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                        
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                        
                    </Card.Body>
                </Card>
            </Container>
        </div>
    )
}
