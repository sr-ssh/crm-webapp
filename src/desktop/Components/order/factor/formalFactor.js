import React from 'react'
import persianJs from 'persianjs/persian.min';
import moment from 'jalali-moment';
import { Col, Container, Row, Card, Table } from 'react-bootstrap'
import commaNumber from 'comma-number'


// Icons
import logo from '../../../assets/images/crm.svg'

export const FormalFactor = ({ factor }) => {

    const getTotalPrice = (order) => {
        let total = 0
        order.map(item => {
            total += item.sellingPrice * item.quantity
        })
        return total
    }


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
            <Row className="w-100 mt-3 d-flex flex-row ">
                <Col>
                    <Card className="card--factor--desktop">
                        <Card.Header className="card--header--factor--desktop mx-2 py-3 d-flex justify-content-center align-items-center">
                            <span className="fw-bold fs-6">فروشنده :</span>
                            <span className="text--gray--factor--desktop me-3">{factor.provider.family}</span>
                        </Card.Header>
                        <Card.Body>
                            <Row className="d-flex mx-3 my-2">
                                <Col className="d-flex align-items-center">
                                    <span className="fw-bold fs-7">تلفن و فکس:</span>
                                    <span className="text--gray--factor--desktop me-3 ">_</span>
                                </Col>
                                <Col className="d-flex align-items-center">
                                    <span className="fw-bold fs-7">شماره اقتصادی :</span>
                                    <span className="text--gray--factor--desktop me-3 ">_</span>
                                </Col>
                            </Row>
                            <Row className="d-flex mx-3 my-3">
                                <Col className="d-flex align-items-center">
                                    <span className="fw-bold fs-7">نشانی شرکت:</span>
                                    <span className="text--gray--factor--desktop me-3">{factor.provider.address}</span>
                                </Col>
                            </Row>
                        </Card.Body>

                    </Card>
                </Col>
                <Col>
                    <Card className="card--factor--desktop">
                        <Card.Header className="card--header--factor--desktop mx-2 py-3 d-flex justify-content-center align-items-center">
                            <span className="fw-bold fs-6">خریدار :</span>
                            <span className="text--gray--factor--desktop me-3">{factor.customer.family}</span>
                        </Card.Header>
                        <Card.Body>
                            <Row className="d-flex mx-3 my-2">
                                <Col className="d-flex align-items-center">
                                    <span className="fw-bold fs-7">شماره تلفن :</span>
                                    <span className="text--gray--factor--desktop me-3 ">{factor.customer.mobile}</span>
                                </Col>
                                <Col className="d-flex align-items-center pe-5">
                                    <span className="fw-bold fs-7">تاریخ :</span>
                                    <span className="text--gray--factor--desktop me-3 ">{factor.createdAt && persianJs(moment.from(factor.customer.createdAt, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')).englishNumber().toString()}</span>
                                </Col>
                            </Row>
                            <Row className="d-flex mx-3 my-3">
                                <Col className="d-flex align-items-center">
                                    <span className="fw-bold fs-7">نشانی :</span>
                                    <span className="text--gray--factor--desktop me-3">{factor.address}</span>
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
                                    return (
                                        <>
                                            <tr>
                                                <td className="py-3 text-center">{persianJs(index + 1).englishNumber().toString()}</td>
                                                <td className="py-3 text-center">{item.name}</td>
                                                <td className="py-3 text-center">{persianJs(item.quantity).englishNumber().toString()}</td>
                                                <td className="py-3 text-center">{persianJs(item.sellingPrice).englishNumber().toString()}</td>
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
                                    <span className="text--gray--factor--desktop me-5 pe-5">{getTotalPrice(factor.products) && persianJs(getTotalPrice(factor.products)).englishNumber().toString()} </span>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container >
    )
}

