import React from 'react'
import persianJs from 'persianjs/persian.min';
import moment from 'jalali-moment';
import { Col, Container, Row, Card, Table } from 'react-bootstrap'
import commaNumber from 'comma-number'


// Icons
import logo from '../../../assets/images/crm.svg'
import { PayButton } from './payButton';

export const FormalFactor = ({ factor }) => {


    let totalPrice = 0


    return (
        <Container fluid className="factor--page--desktop d-flex flex-column align-items-center">
            <Row className="w-100 mt-5 d-flex justify-content-around ">
                <Col className="me-5 d-flex align-items-center">
                    <span className="fw-bold fs-5">{factor.status == 3 ? "پیش فاکتور" : "فاکتور"}</span>
                </Col>
                <Col className="ms-5 d-flex justify-content-end">
                    <img className="" height="60px" src={logo} alt="" />
                </Col>
            </Row>
            <Row className="w-100 mt-4 d-flex flex-row ">
                <Col>
                    <Card className="card--factor--desktop">
                        <Card.Body>
                            <Row className="d-flex mx-3 my-2">
                                <Col xs={2} className="d-flex align-items-center basket-dropdown-border-left" >
                                    <span className="fw-bold fs-6">نام شرکت :</span>
                                    <span className="text--gray--factor--desktop me-3">{factor.provider.company}</span>
                                </Col>
                                <Col className="d-flex align-items-center">
                                    <Row className="d-flex mx-3 my-0 lh-lg">
                                        <Col xs={4} className="d-flex align-items-center">
                                            <span className="fw-bold fs-7">تلفن و فکس:</span>
                                            <span className="text--gray--factor--desktop me-3 ">_</span>
                                        </Col>
                                        <Col xs={4} className="d-flex align-items-center">
                                            <span className="fw-bold fs-7">کد اقتصادی :</span>
                                            <span className="text--gray--factor--desktop me-3 ">
                                                {factor.provider.financialCode && persianJs(factor.provider.financialCode).englishNumber().toString()}
                                            </span>
                                        </Col>
                                        <Col xs={4} className="d-flex align-items-center">
                                            <span className="fw-bold fs-7">شماره ثبت:</span>
                                            <span className="text--gray--factor--desktop me-3 ">
                                                {factor.provider.registerNo && persianJs(factor.provider.registerNo).englishNumber().toString()}
                                            </span>
                                        </Col>
                                        <Col xs={4} className="d-flex align-items-center">
                                            <span className="fw-bold fs-7">کد پستی:</span>
                                            <span className="text--gray--factor--desktop me-3 ">
                                                {factor.provider.postalCode && persianJs(factor.provider.postalCode).englishNumber().toString()}
                                            </span>
                                        </Col>
                                        <Col xs={4} className="d-flex align-items-center">
                                            <span className="fw-bold fs-7">فروشنده:</span>
                                            <span className="text--gray--factor--desktop me-3 ">
                                                {factor.provider.family}
                                            </span>
                                        </Col>
                                        <Col xs={4} className="d-flex align-items-center">
                                            <span className="fw-bold fs-7">نشانی شرکت:</span>
                                            <span className="text--gray--factor--desktop me-3">{factor.provider.address}</span>
                                        </Col>
                                        <Col xs={4} className="d-flex align-items-center">
                                            <span className="fw-bold fs-7">شناسه ملی شرکت:</span>
                                            <span className="text--gray--factor--desktop me-3 ">
                                                {factor.provider.postalCode && persianJs(factor.provider.postalCode).englishNumber().toString()} 
                                            </span>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Card.Body>

                    </Card>
                </Col>
            </Row>
            <Row className="w-100 mt-3 d-flex flex-row ">
                <Col>
                    <Card className="card--factor--desktop">
                    <Card.Body>
                            <Row className="d-flex mx-3 my-2">
                                <Col xs={2} className="d-flex align-items-center basket-dropdown-border-left" >
                                    <span className="fw-bold fs-6">نام شرکت :</span>
                                    <span className="text--gray--factor--desktop me-3">{factor.customer.company}</span>
                                </Col>
                                <Col className="d-flex align-items-center">
                                    <Row className="d-flex mx-3 my-0 lh-lg">
                                        <Col xs={4} className="d-flex align-items-center">
                                            <span className="fw-bold fs-7">شماره تماس:</span>
                                            <span className="text--gray--factor--desktop me-3 ">
                                                {factor.customer.mobile && persianJs(factor.customer.mobile).englishNumber().toString()}
                                            </span>
                                        </Col>
                                        <Col xs={4} className="d-flex align-items-center">
                                            <span className="fw-bold fs-7">کد اقتصادی :</span>
                                            <span className="text--gray--factor--desktop me-3 ">
                                                {factor.customer.financialCode && persianJs(factor.customer.financialCode).englishNumber().toString()}
                                            </span>
                                        </Col>
                                        <Col xs={4} className="d-flex align-items-center">
                                            <span className="fw-bold fs-7">تاریخ:</span>
                                            <span className="text--gray--factor--desktop me-3 ">
                                                {factor.createdAt && persianJs(moment.from(factor.createdAt, 'YYYY').locale('fa').format('YYYY/MM/DD')).englishNumber().toString()}
                                            </span>
                                        </Col>
                                        <Col xs={4} className="d-flex align-items-center">
                                            <span className="fw-bold fs-7">شماره ثبت:</span>
                                            <span className="text--gray--factor--desktop me-3 ">
                                                {factor.customer.registerNo && persianJs(factor.customer.registerNo).englishNumber().toString()}
                                            </span>
                                        </Col>
                                        <Col xs={4} className="d-flex align-items-center">
                                            <span className="fw-bold fs-7">کد پستی:</span>
                                            <span className="text--gray--factor--desktop me-3 ">
                                                {factor.customer.postalCode && persianJs(factor.customer.postalCode).englishNumber().toString()}
                                            </span>
                                        </Col>
                                        <Col xs={4} className="d-flex align-items-center">
                                            <span className="fw-bold fs-7">نشانی:</span>
                                            <span className="text--gray--factor--desktop me-3">{factor.address}</span>
                                        </Col>
                                        <Col xs={4} className="d-flex align-items-center">
                                            <span className="fw-bold fs-7">شناسه ملی شرکت:</span>
                                            <span className="text--gray--factor--desktop me-3 ">
                                                {factor.customer.nationalCard && persianJs(factor.customer.nationalCard).englishNumber().toString()} 
                                            </span>
                                        </Col>
                                        <Col xs={4} className="d-flex align-items-center">
                                            <span className="fw-bold fs-7">خریدار:</span>
                                            <span className="text--gray--factor--desktop me-3 ">
                                                {factor.customer.family}
                                            </span>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="m-0 p-0 w-100 mt-4">
                <Col>
                    <Table bordered className="table--factor--desktop">
                        <thead>
                            <tr>
                                <th className="py-4  fs-7 text-center px-1">ردیف</th>
                                <th className="py-4  fs-7 text-center px-5 w-25 text-nowrap">شرح کالا یا خدمات</th>
                                <th className="py-4  fs-7 text-center px-1">تعداد</th>
                                <th className="py-4  fs-7 text-center px-5 text-nowrap">مبلغ واحد (ریال)</th>
                                <th className="py-4  fs-7 text-center px-5 text-nowrap">تخفیف (ریال)</th>
                                <th className="py-4  fs-7 text-center">تخفیف مالیات و عوارض ارزش افزوده (ریال)</th>
                                <th className="py-4  fs-7 text-center">جمع کل تخفیف مالیات و عوارض (ریال)</th>
                            </tr>
                        </thead>
                        <tbody className="border border-blue">
                            {factor.products.length ?
                                factor.products.map((item, index) => {
                                    totalPrice = totalPrice + (item.quantity * item.sellingPrice + item.quantity * item.sellingPrice * 0.09)
                                    return (
                                        <>
                                            <tr>
                                                <td className="py-3 text-center">{persianJs(index + 1).englishNumber().toString()}</td>
                                                <td className="py-3 text-center">{item.name}</td>
                                                <td className="py-3 text-center">{persianJs(item.quantity).englishNumber().toString()}</td>
                                                <td className="py-3 text-center">{persianJs(commaNumber(item.sellingPrice)).englishNumber().toString()}</td>
                                                <td className="py-3 text-center">0</td>
                                                <td className="py-3 text-center">{item.sellingPrice && persianJs(commaNumber(item.sellingPrice * 0.09)).englishNumber().toString()}</td>
                                                <td className="py-3 text-center">{(item.quantity * item.sellingPrice) && persianJs(commaNumber(item.quantity * item.sellingPrice + item.quantity * item.sellingPrice * 0.09)).englishNumber().toString()}</td>
                                            </tr>
                                            {((index + 1) < factor.products.length) ?
                                                <tr className="m-0 p-0 divider--table--factor--desktop">
                                                    <td colspan="7" className="m-0 p-0"></td>
                                                </tr>
                                                : null
                                            }
                                        </>
                                    )
                                })
                                : null
                            }
                            <tr className=" footer--table--factor--desktop">
                                <td className="py-3 text-start" colSpan="4">
                                    <span className="fs-7 fw-bold">جمع کل پس از تخفیف و کسر مالیات و عوارض (ریال): </span>
                                </td>
                                <td className="py-3 text-end pe-5" colSpan="4">
                                    <span className="text--gray--factor--desktop me-5 pe-5">{totalPrice && persianJs(commaNumber(totalPrice)).englishNumber().toString()} </span>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <PayButton factor={factor} />
        </Container >
    )
}

