import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Container, Alert, Spinner, Image, Card, Table } from 'react-bootstrap';
import { Helmet } from "react-helmet";
import persianJs from 'persianjs/persian.min';
import moment from 'jalali-moment';
import commaNumber from 'comma-number'
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
    const total = () => {
        let total = 0
        order.products.map(item => {
            return total += item.sellingPrice * item.quantity
        })
        return total
    }

    useEffect(() => {
        if (props.match.params.orderId && props.match.params.keyLink)
            dispatch(orderActions.orderDetails(props.match.params))
    }, [dispatch, props.match.params])


    return (
        <div className="product-page">
            {/* override meta tag so the page is scalable */}
            <Helmet>
                <meta name="viewport" content="width=device-width,height=' + window.innerHeight + ', initial-scale=1.0 maximum-scale=5, user-scalable=yes" />
            </Helmet>
            <Container className="m-auto">
                {
                    alertMessage &&
                    <>
                        <div className="modal-backdrop--order-detail show"></div>
                        <Row className="justify-content-center text-center ">
                            <Alert variant={alerType}>
                                {alertMessage}
                            </Alert>
                        </Row>
                    </>
                }

                <Row className="align-items-center p-3">
                    <Col className='text-bold '>
                        پیش فاکتور
                    </Col>
                    <Col className="text-start">
                        <Image src={crmIcon} alt="crm-icon" height="37px" />
                    </Col>
                </Row>
                {
                    orderLoading &&
                    <Row>
                        <Col className="col-3 mt-2 m-auto ">
                            <Spinner className="m-auto d-block" animation="border" />
                        </Col>
                    </Row>
                }
                {
                    order && <>
                        <Card className="rounded-card border-0 mb-2">
                            <Card.Body className="pb-2 pt-0 px-2 lh-lg">
                                <Card.Title className="mb-1">
                                    <Row className="fw-bold text-center">
                                        <Col>
                                            <span className="fs-8 ps-2">فروشنده:</span>
                                            <span className="fs-9 text-grey">{order.provider.family}</span>
                                        </Col>
                                    </Row>
                                </Card.Title>
                                <hr className="dark-blue-border mt-0 mb-0" />
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
                                            <span className="fs-9 text-grey">{order.customer.family}</span>
                                        </Col>
                                    </Row>
                                </Card.Title>
                                <hr className="dark-blue-border mt-0 mb-0" />
                                <Row className="fw-bold px-3 fs-9 pt-2">
                                    <Col>
                                        <span className="ps-2">شماره تماس:</span>
                                        <span className="text-grey">{order.customer.mobile && persianJs(order.customer.mobile).englishNumber().toString()}</span>
                                    </Col>
                                    <Col>
                                        <span className="ps-2">تاریخ:</span>
                                        <span className="text-grey">{order.customer.createdAt && persianJs(moment.from(order.customer.createdAt, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')).englishNumber().toString()}</span>
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
                                    <Table bordered size="sm" className="table--blue mb-0">
                                        <thead>
                                            <tr>
                                                <th style={{ 'width': '6%' }} className="px-0">ردیف</th>
                                                <th style={{ 'width': '25.6%' }} className="px-0">شرح کالا یا خدمات</th>
                                                <th style={{ 'width': '6%' }} className="px-0">تعداد</th>
                                                <th style={{ 'width': '13.4%' }} className="px-0">مبلغ واحد (ریال)</th>
                                                <th style={{ 'width': '12.19%' }} className="px-0">تخفیف (ریال)</th>
                                                <th style={{ 'width': '18.28%' }} className="px-0">تخفیف مالیات و عوارض ارزش افزوده  (ریال)</th>
                                                <th style={{ 'width': '18.28%' }} className="px-0">جمع کل تخفیف مالیات و عوارض  (ریال)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {console.log(order.products)}
                                            {
                                                order.products?.map((product, index) =>
                                                    <tr>
                                                        <td>{(index + 1) && persianJs(index + 1).englishNumber().toString()}</td>
                                                        <td>{product.name}</td>
                                                        <td>{product.quantity && persianJs(commaNumber(product.quantity)).englishNumber().toString()}</td>
                                                        <td>{product.sellingPrice && persianJs(commaNumber(product.sellingPrice)).englishNumber().toString()}</td>
                                                        <td>{persianJs(commaNumber(0)).englishNumber().toString()}</td>
                                                        <td>{persianJs(commaNumber(0)).englishNumber().toString()}</td>
                                                        <td>{(product.quantity * product.sellingPrice) && persianJs(commaNumber(product.quantity * product.sellingPrice)).englishNumber().toString()}</td>
                                                    </tr>
                                                )
                                            }
                                        </tbody>
                                    </Table>
                                </Row>
                                <Row className="text-start py-2 mt-0 mx-0 fs-9 fw-bold">
                                    <Col className="text-start ps-0">
                                        جمع کل پس از تخفیف و کسر مالیات و عوارض (ریال) :
                                    </Col>
                                    <Col xs={2} className="text-center ms-2 text-grey px-0">
                                        {persianJs(commaNumber(total())).englishNumber().toString()}
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </>
                }
            </Container>
        </div>
    )
}
