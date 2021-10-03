import React, { useEffect, useState } from 'react'
import moment from 'jalali-moment';
import { Card, Table, Row, Col, Spinner, Button } from 'react-bootstrap';
import persianJs from 'persianjs/persian.min';
import { Dialog } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

//icons
import tickIcon from './../../assets/images/factor/tick.svg'
import deliveryIcon from './../../assets/images/order/delivery1.svg'
import printIcon from './../../assets/images/order/print.svg'
import submitIcon from './../../assets/images/order/submit.svg'
import editIcon from '../../assets/images/Products/edit.svg'
import deleteIcon from '../../assets/images/delete.svg'
import editeOrderIcon from '../../assets/images/order/edit-order-list.svg'
import noteListIcon from '../../assets/images/order/note-list-white.svg'
import cancelIcon from '../../assets/images/order/cancel.svg'
import closeIcon from '../../assets/images/order/close.svg'

//components
import { AddNotesModal } from './addNotesModal'
import { EditField } from './editField'
import { history } from '../../../helpers/history'
import { CancelProductOrder } from './cancelProductOrder'
import { EditFactor } from './editFactor'




const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff !important',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    }
}));



export const Factor = ({ factor, setActiveFactor, setCancelFactorShow, cancelOrderShow, setCancelOrderShow, recordOrderShow = '', setRecordOrderShow = {}, setActiveOrder, setOrder }) => {

    const classes = useStyles();
    let [print, setPrint] = useState(false)
    const [editModalShow, setEditModalShow] = useState(false)
    const [cancelModalShow, setCancelModalShow] = useState(false);
    const [editFactorModalShow, setEditFactorModalShow] = useState(false)
    const [showNotesModal, setShowNotesModal] = useState(false)


    const [input, setInput] = useState('')
    const [name, setName] = useState('')
    const [orderId, setOrderId] = useState("")
    const [productId, setProductId] = useState("")
    const [editFactor, setEditFactor] = useState("");
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


    const getTotalPrice = (factor) => {
        let total = 0
        factor.map(item => {
            total += item.price * item.quantity
        })
        return total
    }
    let notesHandler = () => {
        history.push({
            pathname: '/factor/note',
            state: { factor }
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


    return (

        <Card className={`m-auto mt-3 bg-light factorCard border-0 lh-lg ${!print ? 'noPrint' : ''}`} >

            <Card.Body className="pb-0 ps-1 rounded-3 text-gray">
                <Row className="p-0 ps-2 m-0 ">
                    <Card className="factor--blue--section border-0">
                        <Card.Body className="m-0 p-0 py-2 mx-3 ">
                            <Row className="d-flex justify-content-between align-items-center my-1">
                                <Col className="lable--factor p-0">
                                    تایید خرید:
                                </Col>
                                <Col className="d-flex justify-content-end align-items-center text--factor p-0 ">
                                    {factor.shopApproval.status ?
                                        <>
                                            <img src={tickIcon} alt="tick-icon" className="m-0 p-0 ms-1 p-1 icon--tick--confirm " />
                                            <span>{factor.shopApproval.acceptedBy}</span>
                                        </>
                                        :
                                        <>
                                            <img src={closeIcon} alt="tick-icon" className="m-0 p-0 ms-1 p-1 icon--tick--confirm " />
                                            <span>تایید نشده است</span>
                                        </>
                                    }
                                </Col>

                            </Row>

                            <Row className="d-flex justify-content-between align-items-center my-1">
                                <Col className="lable--factor p-0" >
                                    تاریخ و ساعت :
                                </Col>
                                <Col className="d-flex justify-content-end text--factor p-0">
                                    <span className="ms-2">{getDate(factor.createdAt)}</span>
                                    <span>{factor.createdAt && persianJs(moment.from(factor.createdAt, 'HH:mm').locale('fa').format('HH:mm')).englishNumber().toString()}</span>
                                </Col>
                            </Row>
                            <Row className="d-flex justify-content-between align-items-center my-1">
                                <Col className="lable--factor p-0" >
                                    نام تامین کننده:
                                </Col>
                                <Col className="d-flex justify-content-end text--factor p-0">
                                    <span>{factor.supplier.family}</span>
                                </Col>

                                {/* <Col className="col-5">
                                    <Card.Text className="text-center">
                                        وضعیت: {(() => {
                                            switch (factor.status) {
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
                            <Row className="d-flex justify-content-between align-items-center my-1" >
                                <Col className="lable--factor p-0" >
                                    موبایل:
                                </Col>
                                <Col className="d-flex justify-content-end text--factor p-0">
                                    <span>{factor.supplier.mobile && persianJs(factor.supplier.mobile).englishNumber().toString()}</span>
                                </Col>
                            </Row>
                            <Row className="d-flex justify-content-between align-items-center my-1" >
                                <Col className="lable--factor p-0" >
                                    آدرس:
                                </Col>
                                <Col className="d-flex justify-content-end text--factor p-0">
                                    <span>{factor.address}</span>
                                </Col>
                            </Row>
                            <Row className="d-flex justify-content-between align-items-center my-1" >
                                <Col className="lable--factor p-0" >
                                    ثبت شده توسط:
                                </Col>
                                <Col className="d-flex justify-content-end text--factor p-0">
                                    <span>{factor.employee ? factor.employee.family : null}</span>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Row>
                <Row className="m-0 p-0 ps-2 mt-2">
                    <Table borderless size="sm">
                        <thead>
                            <tr >
                                <th className="th--header--table--factor pe-3">فاکتور ها</th>
                                <th className="th--header--table--factor">قیمت</th>
                                <th className="th--header--table--factor text-start ps-3">تعداد</th>
                            </tr>
                        </thead>
                        <tbody>
                            {

                                factor.stock.length
                                    ? factor.stock.map(item => {
                                        return (
                                            <tr key={item.name}>
                                                <td className="pe-3 td--body--table--factor ">{
                                                    item.name && persianJs(item.name).englishNumber().toString()}
                                                </td>
                                                <td className="td--body--table--factor ">
                                                    {(item.quantity * item.price) && persianJs(item.quantity * item.price).englishNumber().toString()}
                                                </td>
                                                <td className="td--body--table--factor  text-start ps-4">
                                                    {item.quantity && persianJs(item.quantity).englishNumber().toString()}
                                                </td>
                                            </tr>

                                        )
                                    }
                                    )

                                    : null
                            }
                        </tbody>
                    </Table>
                    <Row className="border-top-blue td--body--table--factor d-flex align-items-center mb-4">
                        <Col className="col-6 m-0 p-0">
                            <span className="">جمع کل :</span>
                        </Col>
                        <Col className="px-1 fs-md-5 fs-6">
                            {getTotalPrice(factor.stock) && persianJs(getTotalPrice(factor.stock)).englishNumber().toString()} تومان

                        </Col>
                    </Row>
                </Row>
                <Row className="p-0 m-0 pb-3 w-100">
                    <Col xs={6} className="p-0 px-1 pb-3 ps-2">
                        <Button className="w-100 btn-outline-dark btn--sale--opprotunity p-1 border-0 noPrint py-2 pe-2" type="button" onClick={() => { setEditFactorModalShow(true); setEditFactor(factor) }}>
                            <img src={editeOrderIcon} height="25px" alt="edit-order-icon" className="col-3 py-1" />
                            <span className="pe-1 noPrint">ویرایش</span>
                        </Button>
                    </Col>
                    <Col xs={6} className="px-1 pb-3 pe-2">
                        <Button className="w-100 btn-outline-dark btn--sale--opprotunity p-1 border-0 noPrint py-2 pe-2" type="button" onClick={notesHandler} >
                            <img src={noteListIcon} height="25px" alt="note-list-icon" className="col-3" />
                            <span className="pe-1 noPrint">یادداشت </span>
                        </Button>
                    </Col>

                    <Col xs={6} className="p-0 px-1 pb-3 ps-2">
                        <Button className="w-100 btn-outline-dark btn--sale--opprotunity p-1 border-0 noPrint py-2 pe-2" type="button" onClick={() => { setCancelFactorShow(true); setActiveFactor(factor) }}>
                            <img src={cancelIcon} height="25px" alt="print-icon" className="col-3" />
                            <span className="pe-1 noPrint">لغو فاکتور</span>
                        </Button>
                    </Col>

                    <Col xs={6} className="p-0 px-1 pb-3 pe-2">
                        <Button className="w-100 btn-outline-dark btn--sale--opprotunity p-1 border-0 noPrint py-2 pe-2" type="button" onClick={() => printWindow()}>
                            <img src={printIcon} height="25px" alt="submit-icon" className="col-3 py-1" />
                            <span className="pe-1 noPrint">چاپ</span>
                        </Button>
                    </Col>
                </Row>
            </Card.Body>
            <EditField show={editModalShow} onHide={() => { setEditModalShow(false); setInput(''); }} input={input} name={name} productId={productId} orderId={orderId} setInput={setInput} />
            <CancelProductOrder show={cancelModalShow} onHide={() => { setCancelModalShow(false) }} productId={productId} orderId={orderId} />
            <EditFactor show={editFactorModalShow} onHide={() => { setEditFactorModalShow(false) }} factor={editFactor} />
        </Card >
    )
}
