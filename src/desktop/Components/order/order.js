import React, { useEffect, useState } from 'react'
import moment from 'jalali-moment';
import { Card, Table, Row, Col, Spinner, Button } from 'react-bootstrap';
import persianJs from 'persianjs/persian.min';
import { Dialog } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
//icons
import deliveryIcon from './../../assets/images/order/delivery.svg'
import printIcon from './../../assets/images/order/print.svg'
import submitIcon from './../../assets/images/order/submit.svg'
import editIcon from '../../assets/images/Products/edit.svg'
import deleteIcon from '../../assets/images/delete.svg'
import editeOrderIcon from '../../assets/images/order/edit-order-list.svg'
import addNoteIcon from '../../assets/images/order/add-note-white.svg'
import noteListIcon from '../../assets/images/order/note-list-white.svg'
import cancelIcon from '../../assets/images/order/cancel.svg'

//components
import { AddNotesModal } from './addNotesModal'
import { EditField } from './editField'
import { history } from '../../../helpers/history'
import { CancelProductOrder } from './cancelProductOrder'
import { EditeProductOrder } from './editProductOrder'
import { Notes } from './notes'






const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff !important',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
}));









export const Order = ({ order, deliveryShow, setDeliveryShow, cancelOrderShow, setCancelOrderShow, recordOrderShow = '', setRecordOrderShow = {}, setActiveOrder, setOrder }) => {


    const classes = useStyles();
    let [print, setPrint] = useState(false)
    const [editModalShow, setEditModalShow] = useState(false)
    const [cancelModalShow, setCancelModalShow] = useState(false);
    const [editOrder, setEditOrder] = useState(false)
    const [showNotesModal, setShowNotesModal] = useState(false)
    const [open, setOpen] = useState(false);

    const [input, setInput] = useState('')
    const [name, setName] = useState('')
    const [orderId, setOrderId] = useState("")
    const [productId, setProductId] = useState("")
    const [editProductOrder, setEditProductOrder] = useState("");

    const edit = (value, name, orderId, productId) => {
        setInput(value)
        setName(name)
        setProductId(productId)
        setOrderId(orderId)
        setEditModalShow(true);
    }
    const cancel = (orderId, productId) => {
        setProductId(productId)
        setOrderId(orderId)
        setCancelModalShow(true);
    }


    const getTotalPrice = (order) => {
        let total = 0
        order.map(item => {
            total += item.sellingPrice * item.quantity
        })
        return total
    }
    let notesHandler = () => {
        history.push({
            pathname: '/order/notes',
            state: { id: order.id }
        })
    }

    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };


    const printWindow = async () => {
        await setPrint(true)
        window.print()
        setPrint(false)
    }

    return (

        <Card className={`m-auto mt-3 bg-light productCard border-0 lh-lg ${!print ? 'noPrint' : ''} col-3 mx-1`} >
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
                                {/* <Col className="col-5">
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
                                </Col> */}
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
                <Row className="p-0 m-0 pb-3 w-100">
                    <Col xs={6} className="p-0 px-1 pb-3">
                        <Button className="w-100 btn-outline-dark btn--sale--opprotunity p-1 border-0 noPrint py-2 pe-2" type="button" onClick={() => { setShowNotesModal(true); setActiveOrder(order) }}>
                            <img src={addNoteIcon} height="25px" alt="add-note-icon" className="col-3" />
                            <span>اضافه یادداشت</span>
                        </Button>
                    </Col>
                    <Col xs={6} className="p-0 px-1 pb-3">
                        <Button className="w-100 btn-outline-dark btn--sale--opprotunity p-1 border-0 noPrint py-2 pe-2" type="button" onClick={handleToggle} >

                            <img src={noteListIcon} height="25px" alt="note-list-icon" className="col-3" />
                            <span>یادداشت ها</span>
                        </Button>
                    </Col>
                    {
                        order.status !== 2 &&
                        <Col xs={6} className="p-0 px-1 pb-3">
                            <Button className="w-100 btn-outline-dark btn--sale--opprotunity p-1 border-0 noPrint py-2 pe-2" type="button" onClick={() => { setEditOrder(true); setEditProductOrder(order) }}>
                                <img src={editeOrderIcon} height="25px" alt="edit-order-icon" className="col-3 py-1" />
                                <span>تغییر</span>
                            </Button>
                        </Col>
                    }
                    <Col xs={6} className="p-0 px-1 pb-3">
                        <Button className="w-100 btn-outline-dark btn--sale--opprotunity p-1 border-0 noPrint py-2 pe-2" type="button" onClick={() => { setDeliveryShow(true); setOrder(order.id); }}>
                            <img src={deliveryIcon} height="25px" alt="delivery-icon" className="col-3" />
                            <span>پیک</span>
                        </Button>
                    </Col>
                    {order.status === 3 &&
                        <Col xs={6} className="p-0 px-1 pb-3">
                            <Button className="w-100 btn-outline-dark btn--sale--opprotunity p-1 border-0 noPrint py-2 pe-2" type="button" onClick={() => { setRecordOrderShow(true); setActiveOrder(order) }}>
                                <img src={submitIcon} height="25px" alt="print-icon" className="col-3" />
                                <span>ثبت</span>
                            </Button>
                        </Col>}
                    {order.status !== 3 && order.status !== 2 &&
                        <Col xs={6} className="p-0 px-1 pb-3">
                            <Button className="w-100 btn-outline-dark btn--sale--opprotunity p-1 border-0 noPrint py-2 pe-2" type="button" onClick={() => { setCancelOrderShow(true); setActiveOrder(order) }}>
                                <img src={cancelIcon} height="25px" alt="print-icon" className="col-3" />
                                <span>لغو سفارش</span>
                            </Button>
                        </Col>
                    }
                    <Col xs={6} className="p-0 px-1 pb-3">
                        <Button className="w-100 btn-outline-dark btn--sale--opprotunity p-1 border-0 noPrint py-2 pe-2" type="button" onClick={() => printWindow()}>
                            <img src={printIcon} height="25px" alt="submit-icon" className="col-3 py-1" />
                            <span>چاپ</span>
                        </Button>
                    </Col>

                </Row>
            </Card.Body>
            <EditField show={editModalShow} onHide={() => { setEditModalShow(false); setInput(''); }} input={input} name={name} productId={productId} orderId={orderId} setInput={setInput} />
            <CancelProductOrder show={cancelModalShow} onHide={() => { setCancelModalShow(false) }} productId={productId} orderId={orderId} />
            <EditeProductOrder show={editOrder} onHide={() => { setEditOrder(false) }} order={editProductOrder} />
            <AddNotesModal show={showNotesModal} onHide={() => { setShowNotesModal(false) }} permission={true} orderId={order.id} />
            <Dialog onClose={handleClose} className={classes.backdrop} aria-labelledby="notes-dialog" open={open}>
                <Notes orderId={open ? order.id : null} open={open} setOpen={setOpen} />
            </Dialog>

        </Card >
    )
}
