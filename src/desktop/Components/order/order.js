import React, { useEffect, useState } from 'react'
import moment from 'jalali-moment';
import { Container, Form, Card, Table, Row, Col, Spinner, Button } from 'react-bootstrap';
import persianJs from 'persianjs/persian.min';
import { Dialog, CircularProgress } from '@material-ui/core'
import ShareIcon from '@material-ui/icons/Share';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux'

//icons
import deliveryIcon from './../../assets/images/order/delivery.svg'
import printIcon from './../../assets/images/order/print.svg'
import submitIcon from './../../assets/images/order/submit.svg'
import editIcon from '../../assets/images/Products/edit.svg'
import deleteIcon from '../../assets/images/delete.svg'
import editeOrderIcon from '../../assets/images/order/edit-order-list.svg'
import addNoteIcon from '../../assets/images/order/add-note-black.svg'
import noteListIcon from '../../assets/images/order/note-list-white.svg'
import cancelIcon from '../../assets/images/order/cancel.svg'
import pishFactorIcon from '../../assets/images/order/pish-factor.svg'


// Actions
import { notesActions, orderActions } from '../../../actions';

//components
import { AddNotesModal } from './addNotesModal'
import { EditField } from './editField'
import { history } from '../../../helpers/history'
import { CancelProductOrder } from './cancelProductOrder'
import { EditeProductOrder } from './editProductOrder'
import { Notes } from './notes'
import { ShareLinkOrder } from "./shareLinkOrder"
import { Note } from './note'






const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff !important',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    productCard: {
        width: '100%'
    },
    rounded: {
        borderRadius: "15px"
    },
    paper: {
        maxWidth: "700px",
        borderRadius: "15px",
        overflowY: "visible"
    }
}));




export const Order = ({ order, deliveryShow, setDeliveryShow, cancelOrderShow, setCancelOrderShow, recordOrderShow = '', setRecordOrderShow = {}, setActiveOrder, setOrder, status }) => {


    const classes = useStyles();
    const dispatch = useDispatch()
    let [print, setPrint] = useState(false)
    const [editModalShow, setEditModalShow] = useState(false)
    const [cancelModalShow, setCancelModalShow] = useState(false);
    const [editOrder, setEditOrder] = useState(false)
    const [showNotesModal, setShowNotesModal] = useState(false)
    const [open, setOpen] = useState(false);
    const [isShareLinkOrder, setIsShareLinkOrder] = useState(false)
    const [isPrivate, setIsPrivate] = useState(order.notes.isPrivate);

    let editStatusNotesLoading = useSelector(state => state.editStatusNotes)

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

    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };

    let toggleHanler = (e) => {
        if (e.target.checked === true) {
            dispatch(notesActions.editStatusNotes(order.id, '1'))
        }
        else if (e.target.checked === false) {
            dispatch(notesActions.editStatusNotes(order.id, '0'))
        }
        setTimeout(() => { setOrderId("") }, 1000)
    }

    const printWindow = async () => {
        await setPrint(true)
        window.print()
        setPrint(false)
    }

    // 
    return (

        <Card className={`m-auto mt-3 bg-light productCard border-0 lh-lg ${!print ? 'noPrint' : ''} mx-1 ${classes.productCard}`} >
            <Row className="mt-3 noPrint">
                <Col className="d-flex justify-content-center ">
                    <Button className="w-75 btn-outline-dark btn--sale--opprotunity p-1 border-0 noPrint py-2 pe-2" type="button" onClick={() => { dispatch(orderActions.getShareLinkOrder(order.id)); setIsShareLinkOrder(true) }}>
                        <img src={pishFactorIcon} height="25px" alt="edit-order-icon" className="col-3 py-1" />
                        <span>پیش فاکتور</span>
                    </Button>
                </Col>
                <Col className="d-flex justify-content-center">
                    {
                        order.status !== 2 &&
                        <Button className="w-75 btn-outline-dark btn--sale--opprotunity p-1 border-0 noPrint py-2 pe-2" type="button" onClick={() => { setEditOrder(true); setEditProductOrder(order) }}>
                            <img src={editeOrderIcon} height="25px" alt="edit-order-icon" className="col-3 py-1" />
                            <span>ویرایش</span>
                        </Button>
                    }
                </Col>
                <Col className="d-flex justify-content-center">
                    <Button className="w-75 btn-outline-dark btn--sale--opprotunity p-1 border-0 noPrint py-2 pe-2" type="button" onClick={() => printWindow()}>
                        <img src={printIcon} height="25px" alt="submit-icon" className="col-3 py-1" />
                        <span>چاپ</span>
                    </Button>
                </Col>
                <Col className="d-flex justify-content-center">
                    <Button className="w-75 btn-outline-dark btn--sale--opprotunity p-1 border-0 noPrint py-2 pe-2" type="button" onClick={() => { setDeliveryShow(true); setOrder(order.id); }}>
                        <img src={deliveryIcon} height="25px" alt="delivery-icon" className="col-3" />
                        <span>پیک</span>
                    </Button>
                </Col>
                <Col className="d-flex justify-content-center">
                    <>
                        {order.status === 3 &&
                            <Button className="w-75 btn-outline-dark btn--sale--opprotunity p-1 border-0 noPrint py-2 pe-2" type="button" onClick={() => { setRecordOrderShow(true); setActiveOrder(order) }}>
                                <img src={submitIcon} height="25px" alt="print-icon" className="col-3" />
                                <span>ثبت</span>
                            </Button>
                        }
                        {order.status !== 3 && order.status !== 2 &&
                            <Button className="w-75 btn-outline-dark btn--sale--opprotunity p-1 border-0 noPrint py-2 pe-2" type="button" onClick={() => { setCancelOrderShow(true); setActiveOrder(order) }}>
                                <img src={cancelIcon} height="25px" alt="print-icon" className="col-3" />
                                <span>لغو سفارش</span>
                            </Button>
                        }
                    </>
                </Col>
            </Row>
            <Card.Body className="pb-0 ps-1 rounded-3 text-gray">
                <Row className="p-0 ps-2 m-0 ">
                    <Card className="background-blue border-0 customer-round">
                        <Card.Body className="pe-0 ps-0 ">
                            <Row className="mx-2">
                                <Col className="p-0 d-flex justify-content-start">
                                    <Card.Text>
                                        تاریخ : <span className="me-2">{order.createdAt && persianJs(moment.from(order.createdAt, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')).englishNumber().toString()}</span>
                                    </Card.Text>
                                </Col>
                                <Col className="p-0 d-flex justify-content-start" >
                                    <Card.Text className="text-center">
                                        ساعت : <span className="me-2">{order.createdAt && persianJs(moment.from(order.createdAt, 'HH:mm').locale('fa').format('HH:mm')).englishNumber().toString()}</span>
                                    </Card.Text>
                                </Col>
                                <Col className="p-0 d-flex justify-content-start flex-grow-1-5" >
                                    <Card.Text>
                                        نام مشتری: <span className="me-2">{order.customer.family}</span>
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

                                <Col className="p-0 d-flex justify-content-start" >
                                    <Card.Text>
                                        موبایل: <span className="me-2">{order.customer.mobile && persianJs(order.customer.mobile).englishNumber().toString()}</span>
                                    </Card.Text>
                                </Col>

                                <Col className="p-0 d-flex justify-content-start" >
                                    <Card.Text>
                                        اتمام آماده سازی: <span className="me-2">{order.readyTime && persianJs(moment.from(order.readyTime, 'YYYY/MM/DD HH:mm').locale('fa').format('HH:mm DD MMMM YYYY')).englishNumber().toString()}</span>
                                    </Card.Text>
                                </Col>
                            </Row>
                            <Row className="flex-nowrap mt-2 mx-2">
                                <Col className="p-0 d-flex justify-content-start" >
                                    <Card.Text>
                                        آدرس: <span className="me-2">{order.address && persianJs(order.address).englishNumber().toString()}</span>
                                    </Card.Text>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Row>

                <Row className="m-0 mt-3 p-0 ps-2">
                    <Col className="ms-xl-5 col-12 col-md-6">
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
                    </Col>
                    <Col className="mb-3 noPrint">
                        <div className="notes--page--dektop">
                            <Container fluid className="m-0 p-0" style={{ position: "sticky", top: "0", zIndex: "2" }} >
                                <Row className="m-0 p-0 header--notes--desktop d-flex flex-row justify-content-between ">
                                    <Col className="m-0 p-0">
                                        <Form.Group className="fw-bold mx-4" onChange={() => setIsPrivate(!isPrivate)} >
                                            <label for="r1">
                                                {(editStatusNotesLoading.loading && orderId == order.id) ?
                                                    <CircularProgress color="secondary" size={24} />
                                                    :
                                                    <>
                                                        <input type="checkbox"
                                                            id="r1" name="r-group"
                                                            className="btn-toggle-status-notes--desktop"
                                                            checked={isPrivate}
                                                            onChange={(e) => { toggleHanler(e); setOrderId(order.id) }} />
                                                    </>
                                                }
                                                <span className="text-light me-3">خصوصی</span>
                                            </label>
                                        </Form.Group>
                                    </Col>
                                    <Col className="m-0 p-0 d-flex justify-content-end">
                                        <Button className="m-0 p-0 py-1 btn-outline-dark btn--add--note--desktop border-0 noPrint ms-2 " type="button" onClick={() => { setShowNotesModal(true); setActiveOrder(order) }}>
                                            <img src={addNoteIcon} height="25px" alt="add-note-icon" className="mx-2" />
                                            <span className="ms-2">اضافه یادداشت</span>
                                        </Button>
                                    </Col>

                                </Row>
                            </Container>
                            <Container style={{ height: "195px", overflow: "hidden" }}>

                                <Row>
                                    <Col className="m-0 p-0" >
                                        {(order.notes.Notes != undefined) ?
                                            (order.notes.Notes?.map((note) => <Note note={note} />))
                                            :
                                            <span> هنوز یادداشتی برای این سفارش ثبت نشده است</span>
                                        }
                                    </Col>
                                </Row>

                            </Container>
                            <Container fluid className="m-0 p-0 w-100 mt-1" >
                                <Row className="m-0 p-0 ">
                                    <Col className="m-0 p-0 d-flex justify-content-end ms-4 text--more--note--desktop" >
                                        <span onClick={() => setOpen(true)}>بیشتر ...</span>
                                    </Col>
                                </Row>
                            </Container>
                        </div >
                    </Col>
                </Row>
            </Card.Body>
            <EditField show={editModalShow} onHide={() => { setEditModalShow(false); setInput(''); }} input={input} name={name} productId={productId} orderId={orderId} setInput={setInput} />
            <CancelProductOrder show={cancelModalShow} onHide={() => { setCancelModalShow(false) }} productId={productId} orderId={orderId} />
            <EditeProductOrder show={editOrder} onHide={() => { setEditOrder(false) }} order={editProductOrder} status={status} />
            <AddNotesModal show={showNotesModal} onHide={() => { setShowNotesModal(false) }} permission={true} orderId={order.id} />
            <Dialog onClose={handleClose} className="notes-round" aria-labelledby="notes-dialog" open={open} classes={{ paper: classes.paper }} >
                <Notes order={order} open={open} setOpen={setOpen} setShowNotesModal={setShowNotesModal} setActiveOrder={() => setActiveOrder(order)} />
            </Dialog>
            <Dialog classes={{ paper: classes.paper }} onClose={() => setIsShareLinkOrder(false)} aria-labelledby="shareLink-dialog" open={isShareLinkOrder}>
                <ShareLinkOrder isShareLinkOrder={isShareLinkOrder} setIsShareLinkOrder={setIsShareLinkOrder} customerMobile={order.customer.mobile} />
            </Dialog>

        </Card >
    )
}
