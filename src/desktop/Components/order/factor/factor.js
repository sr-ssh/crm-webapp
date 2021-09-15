import React from 'react'
import { Col, Container, Row, Card, Table } from 'react-bootstrap'
import CircularProgress from '@material-ui/core/CircularProgress';

// Icons
import logo from '../../../assets/images/crm.svg'





export const Factor = (props) => {



    console.log(props)

    return (
        <div>
            {/* <Container fluid className="factor--page--desktop d-flex justify-content-center align-items-center">
                <CircularProgress />
            </Container> */}
            <Container fluid className="factor--page--desktop d-flex flex-column align-items-center">
                <Row className="w-100 mt-5 d-flex justify-content-around ">
                    <Col className="me-5 d-flex align-items-center">
                        <span className="fw-bold fs-5">پیش فاکتور</span>
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
                                <span className="text--gray--factor--desktop me-3">محمد جواد حیدری</span>
                            </Card.Header>
                            <Card.Body>
                                <Row className="d-flex mx-3 my-2">
                                    <Col className="d-flex align-items-center">
                                        <span className="fw-bold fs-7">تلفن و فکس:</span>
                                        <span className="text--gray--factor--desktop me-3 ">23654178561</span>
                                    </Col>
                                    <Col className="d-flex align-items-center">
                                        <span className="fw-bold fs-7">شماره اقتصادی :</span>
                                        <span className="text--gray--factor--desktop me-3 ">23654178561</span>
                                    </Col>
                                </Row>
                                <Row className="d-flex mx-3 my-3">
                                    <Col className="d-flex align-items-center">
                                        <span className="fw-bold fs-7">نشانی شرکت:</span>
                                        <span className="text--gray--factor--desktop me-3">کلاهدوز 4 و کوچه اول سمت راست پلاک 50</span>
                                    </Col>
                                </Row>
                            </Card.Body>

                        </Card>
                    </Col>
                    <Col>
                        <Card className="card--factor--desktop">
                            <Card.Header className="card--header--factor--desktop mx-2 py-3 d-flex justify-content-center align-items-center">
                                <span className="fw-bold fs-6">خریدار :</span>
                                <span className="text--gray--factor--desktop me-3">محمد جواد حیدری</span>
                            </Card.Header>
                            <Card.Body>
                                <Row className="d-flex mx-3 my-2">
                                    <Col className="d-flex align-items-center">
                                        <span className="fw-bold fs-7">شماره تلفن :</span>
                                        <span className="text--gray--factor--desktop me-3 ">23654178561</span>
                                    </Col>
                                    <Col className="d-flex align-items-center pe-5">
                                        <span className="fw-bold fs-7">تاریخ :</span>
                                        <span className="text--gray--factor--desktop me-3 ">23654178561</span>
                                    </Col>
                                </Row>
                                <Row className="d-flex mx-3 my-3">
                                    <Col className="d-flex align-items-center">
                                        <span className="fw-bold fs-7">نشانی :</span>
                                        <span className="text--gray--factor--desktop me-3">کلاهدوز 4 و کوچه اول سمت راست پلاک 50</span>
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
                                <tr>
                                    <td className="py-3 text-center">1</td>
                                    <td className="py-3 text-center">11 Iphone pro max</td>
                                    <td className="py-3 text-center">1</td>
                                    <td className="py-3 text-center">25000000</td>
                                    <td className="py-3 text-center">0</td>
                                    <td className="py-3 text-center">0</td>
                                    <td className="py-3 text-center">25000000</td>
                                </tr>
                                {/* <tr className="m-0 p-0 divider--table--factor--desktop">
                                    <td colspan="7" className="m-0 p-0"></td>
                                </tr> */}
                                <tr className=" footer--table--factor--desktop">
                                    <td className="py-3 text-start" colSpan="4">
                                        <span className="fs-7 fw-bold">جمع کل پس از تخفیف و کسر مالیات و عوارض (ریال) :</span>
                                    </td>
                                    <td className="py-3 text-end pe-5" colSpan="4">
                                        <span className="text--gray--factor--desktop me-5 pe-5">68416854168541685413854</span>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </div >
    )
}
