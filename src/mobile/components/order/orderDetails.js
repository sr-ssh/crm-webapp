import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Container, Alert, Spinner, Image, Card, Table } from 'react-bootstrap';
import {Helmet} from "react-helmet";
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
        dispatch(orderActions.orderDetails("612c763b37888f4af878185d/612c763b37888f4af878185d"))
    }, [dispatch])


    return (
        <div className="product-page">
            {/* override meta tag so the page is scalable */}
            <Helmet>
                <meta name="viewport" content="width=device-width,height=' + window.innerHeight + ', initial-scale=1.0 maximum-scale=5, user-scalable=yes" />
            </Helmet>
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
                <Card className="rounded-card border-0 mb-2">
                    <Card.Body className="pb-2 pt-0 px-2 lh-lg">
                        <Card.Title className="mb-1">
                            <Row className="fw-bold text-center">
                                <Col>
                                    <span className="fs-8 ps-2">فروشنده:</span>
                                    <span className="fs-9 text-grey">محسن مصطفایی</span>
                                </Col>
                            </Row>
                        </Card.Title>
                        <hr className="dark-blue-border mt-0 mb-0"/>
                        <Row className="fw-bold px-3 fs-9 pt-2">
                            <Col>
                                <span className="ps-2">تلفن و فکس:</span>
                                <span className="text-grey">253645854441</span>
                            </Col>
                            <Col>
                                <span className="ps-2">شماره اقتصادی:</span>
                                <span className="text-grey">253645854441</span>
                            </Col>
                        </Row>
                        <Row className="fw-bold px-3 fs-9 pt-2">
                            <Col>
                                <span className="ps-2">نشانی شرکت:</span>
                                <span className="text-grey">کلاهدوز 4 . اولین کوچه سمت راست . پلاک 55</span>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
                <Card className="rounded-card border-0 mb-2">
                    <Card.Body className="pb-2 pt-0 px-2 lh-lg">
                        <Card.Title className="mb-1">
                            <Row className="fw-bold text-center">
                                <Col>
                                    <span className="fs-8 ps-2">خریدار:</span>
                                    <span className="fs-9 text-grey">سارا بنی اسدی</span>
                                </Col>
                            </Row>
                        </Card.Title>
                        <hr className="dark-blue-border mt-0 mb-0"/>
                        <Row className="fw-bold px-3 fs-9 pt-2">
                            <Col>
                                <span className="ps-2">شماره تماس:</span>
                                <span className="text-grey">09621520145</span>
                            </Col>
                            <Col>
                                <span className="ps-2">تاریخ:</span>
                                <span className="text-grey">1400/6/53</span>
                            </Col>
                        </Row>
                        <Row className="fw-bold px-3 fs-9 pt-2">
                            <Col>
                                <span className="ps-2">نشانی :</span>
                                <span className="text-grey">امیریه 31 . مجتمع سهند </span>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
                <Card className="rounded-card border-0 mb-2">
                    <Card.Body className="pb-0 pt-0 px-0 lh-lg fs-9 text-center fw-bold">
                        <Row className="m-0 p-0">
                            <Table bordered striped size="sm" className="mb-0">
                                <thead>
                                    <tr>
                                        <th>ردیف</th>
                                        <th>شرح کالا یا خدمات</th>
                                        <th>تعداد</th>
                                        <th>مبلغ واحد (ریال)</th>
                                        <th>تخفیف (ریال)</th>
                                        <th>تخفیف مالیات و عوارض ارزش افزوده  (ریال)</th>
                                        <th>جمع کل تخفیف مالیات و عوارض ارزش افزوده (ریال)</th>
                                    </tr>
                                </thead>
                                    <tr>
                                        <td>1</td>
                                        <td>11 iphone pro max</td>
                                        <td>1</td>
                                        <td>26000000</td>
                                        <td>0</td>
                                        <td>0</td>
                                        <td>1</td>
                                    </tr>
                                <tbody>
                                </tbody>
                            </Table>
                        </Row>
                        <Row className="text-start py-2 mt-0 fs-9 fw-bold">
                            <Col>
                                <span>
                                    جمع کل پس از تخفیف و کسر مالیات و عوارض (ریال) :
                                    </span>
                                <span className="p-3">26000000</span>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    )
}
