import React, { useEffect, useState } from 'react'
import moment from 'jalali-moment';
import { Card, Table, Row, Col, Spinner, Button } from 'react-bootstrap';
import persianJs from 'persianjs/persian.min';
import { Dialog } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import commaNumber from 'comma-number'

//icons
import tickIcon from './../../assets/images/factor/tick.svg'
import closeIcon from './../../assets/images/order/close.svg'
import ShareIcon from '@material-ui/icons/Share';
import deliveryIcon from './../../assets/images/order/delivery1.svg'
import printIcon from './../../assets/images/order/print.svg'
import submitIcon from './../../assets/images/order/submit.svg'
import editIcon from '../../assets/images/Products/edit.svg'
import deleteIcon from '../../assets/images/delete.svg'
import editeOrderIcon from '../../assets/images/order/edit-order-list.svg'
import addNoteIcon from '../../assets/images/order/add-note-white.svg'
import noteListIcon from '../../assets/images/order/note-list-white.svg'
import cancelIcon from '../../assets/images/order/cancel.svg'
import prevFactorIcon from './../../assets/images/order/pish-factor.svg'
import financialCheckIcon from './../../assets/images/order/financial-check.svg'
import resultIcon from './../../assets/images/order/Result.svg'
import uploadIcon from './../../assets/images/order/Upload-documents.svg'
import viewDocumentsIcon from '../../assets/images/order/View-documents.svg'

//components
import { AddNotesModal } from './addNotesModal'
import { EditField } from './editField'
import { history } from '../../../helpers/history'
import { CancelProductOrder } from './cancelProductOrder'
import { EditeProductOrder } from './editProductOrder'
import { ShareLinkModal } from './shareLinkModal';
import { FinancialCheckModal } from './financialCheckModal'
import { ResultOrder } from './resultOrder'



const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff !important',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    }
}));



export const Order = ({ order, deliveryShow, setDeliveryShow, cancelOrderShow, setCancelOrderShow, recordOrderShow = '', setRecordOrderShow = {}, setActiveOrder, setOrder, setUploadModalShow, setShowDocModalShow, setCustomerInfoShow  }) => {

    const classes = useStyles();
    let [print, setPrint] = useState(false)
    const [editModalShow, setEditModalShow] = useState(false)
    const [cancelModalShow, setCancelModalShow] = useState(false);
    const [editOrder, setEditOrder] = useState(false)
    const [showNotesModal, setShowNotesModal] = useState(false)
    const [isShareLinkOrder, setIsShareLinkOrder] = useState(false)
    const [financialCheckModal, setFinancialCheckModal] = useState(false)
    const [resultOrderModal, setResultOrderModal] = useState(false)

    const [input, setInput] = useState('')
    const [name, setName] = useState('')
    const [orderId, setOrderId] = useState("")
    const [productId, setProductId] = useState("")
    const [editProductOrder, setEditProductOrder] = useState("");
    const [shareLinkOrder, setShareLinkOrder] = useState("")

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

    const printWindow = async () => {
        await setPrint(true)
        window.print()
        setPrint(false)
    }
    let getDate = (date) => {
        const now = new Date(date);
        const option = {
            month: 'long',
        }
        const month = new Intl.DateTimeFormat("fa-IR", option).format(now)
        const day = moment.from(date, 'DD').locale('fa').format('DD')
        const year = moment.from(date, 'YYYY').locale('fa').format('YYYY')


        return `${persianJs(day).englishNumber().toString()}  ${month}  ${persianJs(year).englishNumber().toString()}`
    }


    console.log("order", order)
    return (

        <Card className={`m-auto mt-3 bg-light productCard border-0 lh-lg ${!print ? 'noPrint' : ''}`} >
            <Card.Body className="pb-0 ps-1 rounded-3 text-gray">
                <img src={cancelIcon} height="25px" alt="print-icon" className="col-3" />
                <Row className="p-0 ps-2 m-0 ">
                    <Card className="factor--blue--section border-0">
                        <Card.Body className="m-0 p-0 py-2 mx-3 ">
                            {order.status === 0 &&
                                <Row className="d-flex justify-content-between align-items-center my-1">
                                    <Col className="lable--factor p-0">
                                        تایید مالی:
                                    </Col>
                                    {order.financialApproval.status === 1 ?
                                        <Col className="d-flex justify-content-end align-items-center text--factor p-0 ">
                                            <img src={tickIcon} alt="tick-icon" className="m-0 p-0 ms-1 p-1 icon--tick--confirm " />
                                            <span>{order.financialApproval.acceptedBy}</span>
                                        </Col>
                                        : order.financialApproval.status === 2 ?
                                        <Col className="d-flex justify-content-end align-items-center text--factor p-0 ">
                                            <img src={closeIcon} alt="tick-icon" className="m-0 p-0 ms-1 p-1 icon--tick--confirm " />
                                            <span>{order.financialApproval.acceptedBy}</span>
                                        </Col>
                                        : 
                                        <Col className="d-flex justify-content-end align-items-center text--factor p-0 ">
                                            <span>در انتظار تعیین وضعیت مالی</span>
                                        </Col>
                                    }

                                </Row>
                            }

                            <Row className="d-flex justify-content-between align-items-center my-1">
                                <Col className="lable--factor p-0" >
                                    تاریخ و ساعت :
                                </Col>
                                <Col className="d-flex justify-content-end text--factor p-0">
                                    <span className="ms-2">{getDate(order.createdAt)}</span>
                                    <span>{order.createdAt && persianJs(moment.from(order.createdAt, 'HH:mm').locale('fa').format('HH:mm')).englishNumber().toString()}</span>
                                </Col>
                            </Row>
                            <Row className="d-flex justify-content-between align-items-center my-1">
                                <Col className="lable--factor p-0" >
                                    نام مشتری:
                                </Col>
                                <Col className="d-flex justify-content-end text--factor p-0">
                                    <span>{order.customer.family}</span>
                                </Col>
                            </Row>
                            <Row className="d-flex justify-content-between align-items-center my-1" >
                                <Col className="lable--factor p-0" >
                                    موبایل:
                                </Col>
                                <Col className="d-flex justify-content-end text--factor p-0">
                                    <span>{order.customer.mobile && persianJs(order.customer.mobile).englishNumber().toString()}</span>
                                </Col>
                            </Row>
                            <Row className="d-flex justify-content-between align-items-center my-1" >
                                <Col className="lable--factor p-0" >
                                    آدرس:
                                </Col>
                                <Col className="d-flex justify-content-end text--factor p-0">
                                    <span>{order.address && persianJs(order.address).englishNumber().toString()}</span>
                                </Col>
                            </Row>
                            <Row className="d-flex justify-content-between align-items-center my-1" >
                                <Col className="lable--factor p-0" >
                                    اتمام آماده سازی:
                                </Col>
                                <Col className="d-flex justify-content-end text--factor p-0">
                                    <span>{order.readyTime && persianJs(moment.from(order.readyTime, 'YYYY/MM/DD HH:mm').locale('fa').format('HH:mm DD MMMM YYYY')).englishNumber().toString()}</span>

                                </Col>
                            </Row>
                            <Row className="d-flex justify-content-between align-items-center my-1" >
                                <Col className="lable--factor p-0" >
                                    ثبت شده توسط:
                                </Col>
                                <Col className="d-flex justify-content-end text--factor p-0">
                                    <span>{order.employee ? order.employee.family : null}</span>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Row>
                {/* <Row className="p-0 ps-2 m-0 ">
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
                </Row> */}
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
                                                            {(item.quantity * item.sellingPrice) && persianJs(commaNumber(item.quantity * item.sellingPrice)).englishNumber().toString()}
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
                                <td className="fs-6">{getTotalPrice(order.products) && persianJs(commaNumber(getTotalPrice(order.products))).englishNumber().toString()} </td>
                                <td></td>
                                <td></td>
                            </tr>

                        </tbody>
                    </Table>
                </Row>
                <Row className="p-0 m-0 pb-3 w-100">
                    {order.status === 0 &&
                        <Col xs={6} className="p-0 px-1 pb-3 ps-2">
                            <Button className="w-100 btn-outline-dark btn--sale--opprotunity p-1 border-0 noPrint py-2 pe-2" type="button" onClick={() => { setFinancialCheckModal(true); setActiveOrder(order) }}>
                                <img src={financialCheckIcon} height="25px" alt="add-note-icon" className="col-3" />
                                <span className="pe-1">تایید مالی</span>
                            </Button>
                        </Col>
                    }
                    <Col xs={6} className="p-0 px-1 pb-3 ps-2">
                        <Button className="w-100 btn-outline-dark btn--sale--opprotunity p-1 border-0 noPrint py-2 pe-2" type="button" onClick={() => { setIsShareLinkOrder(true); setShareLinkOrder(order) }}>
                            <img src={prevFactorIcon} height="26px" alt="prev-factor-icon" className="col-3 py-1 me-1" />

                            <span className="me-2">پیش فاکتور</span>
                        </Button>
                    </Col>
                    <Col xs={6} className="p-0 px-1 pb-3 ps-2">
                        <Button className="w-100 btn-outline-dark btn--sale--opprotunity p-1 border-0 noPrint py-2 pe-2" type="button" onClick={() => { setShowNotesModal(true); setActiveOrder(order) }}>
                            <img src={addNoteIcon} height="25px" alt="add-note-icon" className="col-3" />
                            <span className="pe-1">اضافه یادداشت</span>
                        </Button>
                    </Col>
                    <Col xs={6} className="p-0 px-1 pb-3 ps-2">
                        <Button className="w-100 btn-outline-dark btn--sale--opprotunity p-1 border-0 noPrint py-2 pe-2" type="button" onClick={notesHandler} >
                            <img src={noteListIcon} height="25px" alt="note-list-icon" className="col-3" />
                            <span className="pe-1">یادداشت ها</span>
                        </Button>
                    </Col>
                    {/* <Col xs={6} className="px-1 pb-3 pe-2">
                        <Button className="w-100 btn-outline-dark btn--sale--opprotunity p-1 border-0 noPrint py-2 pe-2" type="button" onClick={() => { setIsShareLinkOrder(true); setShareLinkOrder(order) }} >
                            <img src={prevFactorIcon} height="20px" alt="prev-factor-icon" className="" />
                            <span className="pe-1">پیش فاکتور</span>
                        </Button>
                    </Col> */}
                    {/* <Col xs={12} className="p-0 px-1 pb-3">
                        <Button className="w-100 btn-outline-dark btn--sale--opprotunity p-1 border-0 noPrint py-2" type="button" onClick={() => { setIsShareLinkOrder(true); setShareLinkOrder(order) }}>
                            <Col xs={4} className="text-start align-items-center">
                                <img src={prevFactorIcon} height="20px" alt="prev-factor-icon" className="" />
                            </Col>
                            <Col className="text-end pe-3 me-0 align-items-center">
                                <span className="me-2">پیش فاکتور</span>
                            </Col>
                        </Button>
                    </Col> */}
                    <Col xs={6} className="p-0 px-1 pb-3 ps-2">
                        <Button className="w-100 btn-outline-dark btn--sale--opprotunity p-1 border-0 noPrint py-2 pe-2" type="button" onClick={() => printWindow()}>
                            <img src={printIcon} height="25px" alt="submit-icon" className="col-3 py-1" />
                            <span className="pe-1">پرینت</span>
                        </Button>
                    </Col>
                    {order.status !== 3 && order.status !== 2 &&
                        <Col xs={6} className="p-0 px-1 pb-3 ps-2">
                            <Button className="w-100 btn-outline-dark btn--sale--opprotunity p-1 border-0 noPrint py-2 pe-2" type="button" onClick={() => { setCancelOrderShow(true); setActiveOrder(order) }}>
                                <img src={cancelIcon} height="25px" alt="print-icon" className="col-3" />
                                <span className="pe-1">لغو سفارش</span>
                            </Button>
                        </Col>
                    }
                    {
                        order.status !== 2 &&
                        <Col xs={6} className="p-0 px-1 pb-3 ps-2">
                            <Button className="w-100 btn-outline-dark btn--sale--opprotunity p-1 border-0 noPrint py-2 pe-2" type="button" onClick={() => { setEditOrder(true); setEditProductOrder(order) }}>
                                <img src={editeOrderIcon} height="25px" alt="edit-order-icon" className="col-3 py-1" />
                                <span className="pe-1">ویرایش</span>
                            </Button>
                        </Col>
                    }
                    <Col xs={6} className="p-0 px-1 pb-3 ps-2">
                        <Button className="w-100 btn-outline-dark btn--sale--opprotunity p-1 border-0 noPrint py-2 pe-2" type="button" onClick={() => { setUploadModalShow(true); setActiveOrder(order) }}>
                            <img src={uploadIcon} height="25px" alt="print-icon" className="col-3" />

                            <span className="noPrint">بارگذاری مدارک</span>
                        </Button >
                    </Col >
                    <Col xs={6} className="p-0 px-1 pb-3 ps-2">
                        <Button className="w-100 btn-outline-dark btn--sale--opprotunity p-1 border-0 noPrint py-2 pe-2" type="button" onClick={() => { setShowDocModalShow(true); setActiveOrder(order); }}>
                            <img src={viewDocumentsIcon} height="25px" alt="print-icon" className="col-3" />
                            <span className="noPrint">مشاهده مدارک</span>
                        </Button>
                    </Col>
                    <Col xs={6} className="p-0 px-1 pb-3 ps-2">
                        <Button className="w-100 btn-outline-dark btn--sale--opprotunity p-1 border-0 noPrint py-2 pe-2" type="button" onClick={() => { setDeliveryShow(true); setOrder(order.id); }}>
                            <img src={deliveryIcon} height="25px" alt="delivery-icon" className="col-3" />
                            <span className="pe-1">پیک</span>
                        </Button>
                    </Col>

                    {
                        order.status === 3 &&
                        <Col xs={6} className="p-0 px-1 pb-3 ps-2">
                            <Button className="w-100 btn-outline-dark btn--sale--opprotunity p-1 border-0 noPrint py-2 pe-2" type="button" onClick={() => { setResultOrderModal(true); setActiveOrder(order) }}>
                                <img src={resultIcon} height="25px" alt="print-icon" className="col-3" />
                                <span className="pe-1">نتیجه</span>
                            </Button>
                        </Col>
                    }
                    <Col xs={6} className="p-0 px-1 pb-3 ps-2">
                        <Button className="w-100 btn-outline-dark btn--sale--opprotunity p-1 border-0 noPrint py-2 pe-2" type="button" onClick={() => { setCustomerInfoShow(true); setOrder(order.customer._id); }}>
                            <img src={submitIcon} height="25px" alt="print-icon" className="col-3" />
                            <span className="pe-1">اطلاعات مشتری</span>
                        </Button>
                    </Col>
                </Row>
            </Card.Body>
            <EditField show={editModalShow} onHide={() => { setEditModalShow(false); setInput(''); }} input={input} name={name} productId={productId} orderId={orderId} setInput={setInput} />
            <CancelProductOrder show={cancelModalShow} onHide={() => { setCancelModalShow(false) }} productId={productId} orderId={orderId} />
            <EditeProductOrder show={editOrder} onHide={() => { setEditOrder(false) }} order={editProductOrder} />
            <AddNotesModal show={showNotesModal} onHide={() => { setShowNotesModal(false) }} permission={true} orderId={order.id} />
            <ShareLinkModal show={isShareLinkOrder} onHide={() => setIsShareLinkOrder(false)} order={isShareLinkOrder ? shareLinkOrder : null} />
            <FinancialCheckModal show={financialCheckModal} onHide={() => setFinancialCheckModal(false)} order={financialCheckModal ? order : null} />
            <ResultOrder show={resultOrderModal} onHide={() => setResultOrderModal(false)} order={resultOrderModal ? order : null} />
        </Card >
    )
}
