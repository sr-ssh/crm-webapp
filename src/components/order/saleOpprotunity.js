import React, { useEffect, useState } from 'react'
import moment from 'jalali-moment';
import { Container, Card, Table, Row, Col, Spinner, Button } from 'react-bootstrap';
import { Header } from '../base/header2';
import persianJs from 'persianjs/persian.min';

//icons
import deliveryIcon from './../../assets/images/order/delivery.svg'
import printIcon from './../../assets/images/order/print.svg'
import submitIcon from './../../assets/images/order/submit.svg'
import editIcon from '../../assets/images/Products/edit.svg'
import deleteIcon from '../../assets/images/delete.svg'
import editeOrderIcon from '../../assets/images/order/edit-order-list.svg'
import addNoteIcon from '../../assets/images/order/add-note-white.svg'
import noteListIcon from '../../assets/images/order/note-list-white.svg'




//components
import { EditField } from './editField'
import { CancelProductOrder } from './cancelProductOrder'
import { EditeProductOrder } from './editProductOrder'

export const SaleOpprotunity = ({ order, deliveryShow, setDeliveryShow, cancelOrderShow, setCancelOrderShow, setActiveOrder, setOrder }) => {

    let [print, setPrint] = useState(false)
    // const [editModalShow, setEditModalShow] = useState(false)
    // const [cancelModalShow, setCancelModalShow] = useState(false);
    // const [editOrder, setEditOrder] = useState(false)

    // const [input, setInput] = useState('')
    // const [name, setName] = useState('')
    // const [orderId, setOrderId] = useState("")
    // const [productId, setProductId] = useState("")
    // const [editProductOrder, setEditProductOrder] = useState("");

    // const edit = (value, name, orderId, productId) => {
    //     setInput(value)
    //     setName(name)
    //     setProductId(productId)
    //     setOrderId(orderId)
    //     setEditModalShow(true);
    // }
    // const cancel = (orderId, productId) => {
    //     setProductId(productId)
    //     setOrderId(orderId)
    //     setCancelModalShow(true);
    // }


    // const getTotalPrice = (order) => {
    //     let total = 0
    //     order.map(item => {
    //         total += item.sellingPrice * item.quantity
    //     })
    //     return total
    // }

    // const printWindow = async () => {
    //     await setPrint(true)
    //     window.print()
    //     setPrint(false)
    // }

    return (
        <div className="product-page orders ">
            <Header className="noPrint" title="فرصت سفارشات" backLink="/" />
            <Container className="m-auto">
                <Card className={`m-auto mt-3 bg-light productCard border-0 lh-lg ${!print ? 'noPrint' : ''}`} >
                    <Card.Body className="pb-0 px-2 rounded-3 text-gray">
                        <Row className="p-0 m-0 ">
                            <Card className="background-blue border-0 customer-round">
                                <Card.Body className="pe-0 ps-0 ">
                                    <Row>
                                        <Col>
                                            <Card.Text>
                                                تاریخ :
                                                {/* <span>{order.createdAt && persianJs(moment.from(order.createdAt, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')).englishNumber().toString()}</span> */}
                                            </Card.Text>
                                        </Col>
                                        <Col className="col-5">
                                            <Card.Text className="text-center">
                                                ساعت :
                                                {/* <span>{order.createdAt && persianJs(moment.from(order.createdAt, 'HH:mm').locale('fa').format('HH:mm')).englishNumber().toString()}</span> */}
                                            </Card.Text>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Card.Text>
                                                نام مشتری:
                                                {/* <span>{order.customer.family}</span> */}
                                            </Card.Text>
                                        </Col>
                                    </Row>
                                    <Row className="flex-nowrap mt-2">
                                        <Col>
                                            <Card.Text>
                                                موبایل:
                                                {/* <span>{order.customer.mobile && persianJs(order.customer.mobile).englishNumber().toString()}</span> */}
                                            </Card.Text>
                                        </Col>
                                    </Row>
                                    <Row className="flex-nowrap mt-2">
                                        <Col>
                                            <Card.Text>
                                                آدرس:
                                                {/* <span>{order.address && persianJs(order.address).englishNumber().toString()}</span> */}
                                            </Card.Text>
                                        </Col>
                                    </Row>
                                    <Row className="flex-nowrap mt-2">
                                        <Col>
                                            <Card.Text>
                                                اتمام آماده سازی:
                                                {/* <span>{order.readyTime && persianJs(moment.from(order.readyTime, 'YYYY/MM/DD HH:mm').locale('fa').format('HH:mm DD MMMM YYYY')).englishNumber().toString()}</span> */}
                                            </Card.Text>
                                        </Col>
                                    </Row>
                                    <Row className="flex-nowrap mt-2">
                                        <Col>
                                            <Card.Text>
                                                ثبت شده توسط:
                                                {/* <span>{order.employee ? order.employee.family : null}</span> */}
                                            </Card.Text>
                                        </Col>
                                    </Row>
                                </Card.Body >
                            </Card >
                        </Row >
                        <Row className="m-0 p-0 px-2 ">
                            <Table borderless size="sm">
                                <thead>
                                    <tr>
                                        <th className="fw-bold">سفارش</th>
                                        <th className="fw-bold">قیمت(تومان)</th>
                                        <th className="fw-bold">تعداد</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* {

                                order.products.length
                                    ? order.products.map(item => {
                                        return (

                                            <tr key={item.name}>
                                                <td>{item.name && persianJs(item.name).englishNumber().toString()}</td>
                                                <td>
                                                    <Row>
                                                        <Col className="ps-0">
                                                            {(item.quantity * item.sellingPrice) && persianJs(item.quantity * item.sellingPrice).englishNumber().toString()}
                                                        </Col>
                                                    </Row>
                                                </td>
                                                <td>
                                                    <Row>
                                                        <Col className="ps-0">
                                                            {item.quantity && persianJs(item.quantity).englishNumber().toString()}
                                                        </Col>
                                                    </Row>
                                                </td>
                                                <td className="d-flex justify-content-center align-content-center">
                                                    <Row>
                                                    </Row>
                                                </td>
                                            </tr>

                                        )
                                    }
                                    )

                                    : null
                            } */}

                                    <tr>
                                        <td>کیک</td>
                                        <td>
                                            <Row>
                                                <Col className="ps-0">
                                                    12000
                                                </Col>
                                            </Row>
                                        </td>
                                        <td>
                                            <Row>
                                                <Col className="ps-0">
                                                    12
                                                </Col>
                                            </Row>
                                        </td>
                                        <td className="d-flex justify-content-center align-content-center">
                                            <Row>
                                            </Row>
                                        </td>
                                    </tr>
                                    <tr className="border-top-blue">
                                        <td>جمع کل:</td>
                                        <td className="fs-6">50000  <span classname="px-3 span--total--price" >تومان</span></td>
                                        <td></td>
                                        <td></td>
                                    </tr>

                                </tbody>
                            </Table>
                        </Row>
                        <Row className="p-0 m-0 pb-3 w-100">
                            <Col xs={6} className="p-0 px-1">
                                <Button className="w-100 btn-outline-dark btn--sale--opprotunity p-1 border-0 noPrint py-2 pe-2" type="button">
                                    <img src={addNoteIcon} height="25px" alt="add-note-icon" className="col-3" />
                                    <span>اضافه یادداشت</span>
                                </Button>
                            </Col>
                            <Col xs={6} className="p-0 px-1 ">
                                <Button className="w-100 btn-outline-dark btn--sale--opprotunity p-1 border-0 noPrint py-2 pe-2" type="button">
                                    <img src={noteListIcon} height="25px" alt="note-list-icon" className="col-3" />
                                    <span>یادداشت ها</span>
                                </Button>
                            </Col>
                        </Row>
                        <Row className="p-0 m-0 pb-3 w-100">
                            <Col xs={6} className="p-0 px-1">
                                <Button className="w-100 btn-outline-dark btn--sale--opprotunity p-1 border-0 noPrint py-2 pe-2" type="button">
                                    <img src={editeOrderIcon} height="25px" alt="edit-order-icon" className="col-3 py-1" />
                                    <span>تغییر</span>
                                </Button>
                            </Col>
                            <Col xs={6} className="p-0 px-1">
                                <Button className="w-100 btn-outline-dark btn--sale--opprotunity p-1 border-0 noPrint py-2 pe-2" type="button">
                                    <img src={deliveryIcon} height="25px" alt="delivery-icon" className="col-3" />
                                    <span>پیک</span>
                                </Button>
                            </Col>
                        </Row>
                        <Row className="p-0 m-0 pb-3 w-100">
                            <Col xs={6} className="p-0 px-1">
                                <Button className="w-100 btn-outline-dark btn--sale--opprotunity p-1 border-0 noPrint py-2 pe-2" type="button">
                                    <img src={submitIcon} height="25px" alt="submit-icon" className="col-3" />
                                    <span>ثبت</span>
                                </Button>
                            </Col>
                            <Col xs={6} className="p-0 px-1">
                                <Button className="w-100 btn-outline-dark btn--sale--opprotunity p-1 border-0 noPrint py-2 pe-2" type="button">
                                    <img src={printIcon} height="25px" alt="print-icon" className="col-3 py-1" />
                                    <span>چاپ</span>
                                </Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    )
}
