import React, { useEffect, useState } from 'react'
import moment from 'jalali-moment';
import { Card , Table , Row , Col, Spinner, Button } from 'react-bootstrap';
import persianJs from 'persianjs/persian.min';

//icons
import deliveryIcon from './../../assets/images/order/delivery.svg'
import printIcon from './../../assets/images/order/print.svg'
import cancelIcon from './../../assets/images/order/cancel.svg'
import editIcon from '../../assets/images/Products/edit.svg'


//components
import { EditField } from './editField'


export const Order = ({order, deliveryShow, setDeliveryShow, cancelOrderShow, setCancelOrderShow, setActiveOrder, setOrder}) => {

    let [ print, setPrint ] = useState(false)
    
    const [editModalShow, setEditModalShow] = useState(false)
    const [input, setInput] = useState('')
    const [name, setName] = useState('')
    const [orderId, setOrderId] = useState("")
    const [productId, setProductId] = useState("")

    const edit = (value, name, orderId, productId) => {
        setInput(value)
        setName(name)
        setProductId(productId)
        setOrderId(orderId)
        setEditModalShow(true); 
    }


    const getTotalPrice = (order) => {
        let total = 0
        order.map(item => {
            total += item.sellingPrice * item.quantity
        })
        return total
    }

    const printWindow = async () => {
        await setPrint(true)
        window.print()
        setPrint(false)
    }


    return (
        
        <Card className={`m-auto mt-3 bg-light productCard border-0 lh-lg ${!print ? 'noPrint' : ''}`} >
            <Card.Body className="pb-0 ps-1 rounded-3 text-gray">
                <Row className="p-0 ps-2 m-0 ">
                    <Card className="background-blue border-0 customer-round">
                        <Card.Body className="pe-0 ps-0 ">
                            <Row>
                                <Col>
                                    <Card.Text>
                                    تاریخ : <span>{order.createdAt && persianJs(moment.from(order.createdAt, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')).englishNumber().toString()}</span>
                                    </Card.Text>
                                </Col>
                                <Col className="col-5">
                                    <Card.Text className="text-center">
                                    ساعت : <span>{order.createdAt && persianJs(moment.from(order.createdAt, 'HH:mm').locale('fa').format('HH:mm')).englishNumber().toString()}</span>
                                    </Card.Text>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Card.Text>
                                        نام مشتری: <span>{order.customer.family}</span>
                                    </Card.Text>
                                </Col>
                                <Col className="col-5">
                                    <Card.Text className="text-center">
                                        وضعیت: {(() => {
                                                switch (order.status) {
                                                    case 0:
                                                        return <span>فعال</span>;
                                                    case 1:
                                                        return <span>پایان یافته</span>;;
                                                    case 2:
                                                        return <span>لغو شده</span>;;
                                                    default:
                                                        return;
                                                }
                                                })()}
                                    </Card.Text>
                                </Col>
                            </Row>
                            <Row className="flex-nowrap mt-2">
                                <Col>
                                    <Card.Text>
                                        موبایل: <span>{order.customer.mobile && persianJs(order.customer.mobile).englishNumber().toString()}</span>
                                    </Card.Text>
                                </Col>
                            </Row>
                            <Row className="flex-nowrap mt-2">
                                <Col>
                                    <Card.Text>
                                        آدرس: <span>{order.address && persianJs(order.address).englishNumber().toString()}</span>
                                    </Card.Text>
                                </Col>
                            </Row>
                            <Row className="flex-nowrap mt-2">
                                <Col>
                                    <Card.Text>
                                        اتمام آماده سازی: <span>{order.readyTime && persianJs(moment.from(order.readyTime, 'YYYY/MM/DD HH:mm').locale('fa').format('HH:mm DD MMMM YYYY')).englishNumber().toString()}</span>
                                    </Card.Text>
                                </Col>
                            </Row>
                            <Row className="flex-nowrap mt-2">
                                <Col>
                                    <Card.Text>
                                        ثبت شده توسط: <span>{order.employee ? order.employee.family : null}</span>
                                    </Card.Text>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Row>
                <Row className="m-0 p-0 ps-2">
                    
                    <Table borderless size="sm">
                        <thead>
                            <tr>
                                <th>سفارش</th>
                                <th>قیمت(تومان)</th>
                                <th>تعداد</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        {
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
                                                        <Col className="my-0 pe-0" onClick={() => edit(item.sellingPrice, 'price', order.id, item._id)}>
                                                            <img className="" src={editIcon} height="25px" alt="edit-icon" />
                                                        </Col>
                                                    </Row>
                                                </td>
                                                <td>{item.quantity && persianJs(item.quantity).englishNumber().toString()}</td>
                                            </tr>
                                        )
                                    })
                                
                            : null
                        }
                        <tr className="border-top-blue">
                            <td>جمع کل:</td>
                            <td className="fs-6">{getTotalPrice(order.products) && persianJs(getTotalPrice(order.products)).englishNumber().toString()} </td>
                            <td></td>
                            <td></td>
                        </tr>
                            
                        </tbody>
                    </Table>
                </Row>
                <Row className=" pb-3 text-start ms-3 justify-content-end">
                   
                    <Col xs={2} className="text-start">
                        <Button className="btn-success reminder-sms-button p-1 border-0 noPrint" type="button"  onClick={() => printWindow()}>
                            <img src={printIcon} height="40px" alt="reminder-icon"  />
                        </Button>
                    </Col>
                        {
                            order.status !== 2 &&
                            <>
                            <Col xs={2} className="text-start">
                                <Button className="btn-primary delivery-sms-button p-1 border-0 noPrint" type="button"  onClick={() => {setDeliveryShow(true); setOrder(order.id);}}>
                                    <img src={deliveryIcon} height="40px" alt="delivery-icon"  />
                                </Button>
                            </Col>
                            <Col xs={2} className="text-start">
                            
                                <Button className="btn-danger cancel-order-btn p-1 border-0 noPrint" type="button"  onClick={() => { setCancelOrderShow(true); setActiveOrder(order)}}>
                                    <img src={cancelIcon} height="40px" alt="cancel-icon"  />
                                </Button>
                            </Col>
                            </>
                    }
                </Row> 
            </Card.Body>
            <EditField show={editModalShow} onHide={() => {setEditModalShow(false); setInput(''); }} input={input} name={name} productId={productId} orderId={orderId} setInput={setInput} />
        </Card> 
    )
}
