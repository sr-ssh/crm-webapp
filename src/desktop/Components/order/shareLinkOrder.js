import React, { useState, useEffect } from "react";
import { Container, Form, Row, Col, Button, Spinner } from "react-bootstrap";
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import { Tooltip } from '@material-ui/core';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useDispatch, useSelector } from 'react-redux'

// Action
import { orderActions } from '../../../actions';


// Icons
import closeIcon from '../../assets/images/close.svg'
import copyIcon from '../../assets/images/order/sharelink/copy.svg'
import smsIcon from '../../assets/images/order/sharelink/sms.svg'
import emailIcon from '../../assets/images/order/sharelink/email.svg'



export const ShareLinkOrder = ({ isShareLinkOrder, setIsShareLinkOrder, order, ...props }) => {


    const dispatch = useDispatch()
    const [copied, setCopied] = useState(false)
    const [customerInfoRequire, setCustomerInfoRequire] = useState("")

    const [invoiceType, setInvoiceType] = useState(0)

    let shareLinkOrder = useSelector(state => state.getShareLinkOrder)
    let textLink = `پیش فاکتور شما ایجاد گردید. لینک پیش فاکتور http://crm-x.ir/order/factor/${shareLinkOrder?.data?.data?.orderId}/${shareLinkOrder?.data?.data?.keyLink}`;

    let customerInfo = order?.customer
    let toggleHandler = (e) => {
        let type = e.target.id == "formal" ? 0 : e.target.id == "inFormal" ? 1 : null
        if ((type == 1) || (type == 0 && order?.customer.registerNo && order?.customer.financialCode && order?.customer.nationalCard && order?.customer.postalCode)) {
            setCustomerInfoRequire(false);
            setInvoiceType(type)
            dispatch(orderActions.getShareLinkOrder({ orderId: order.id, type: type }))
        } else {
            setCustomerInfoRequire(true)
            setInvoiceType(type)
        }
    }

    useEffect(() => {
        if (order != null) {
            dispatch(orderActions.getShareLinkOrder({ orderId: order.id, type: invoiceType }))
        }
    }, [dispatch, order, invoiceType])


    return (
        <>
            <Button className="border-0 customer-modal-close--desktop" type="button" onClick={() => { setIsShareLinkOrder(false) }} >
                <img className="d-flex m-auto customer-modal-close-svg--desktop" src={closeIcon} alt="close-btn" />
            </Button>
            <Container className="mb-1 mt-3">

                <Row>
                    <Row className="p-0 m-0 my-1">
                        <Col className="col-6 ps-2 d-flex align-items-center">
                            <input type="checkbox" id="formal" name="formal" className="btn-toggle-status-green" checked={invoiceType == 0} onChange={toggleHandler} />
                            <label className="pe-2 text-success" htmlFor="formal">
                                رسمی
                            </label>

                        </Col>
                        <Col className="col-6 pe-2 d-flex align-items-center">
                            <input type="checkbox" id="inFormal" name="inFormal" className="btn-toggle-status-red" checked={invoiceType == 1} onChange={toggleHandler} />
                            <label className="pe-2 text-danger" htmlFor="inFormal">
                                غیر رسمی
                            </label>
                        </Col>
                    </Row>

                </Row>
            </Container>
            {shareLinkOrder && 
                shareLinkOrder.loading ?
                    <>
                        <Container fluid className="m-0 h-100 my-5  d-flex justify-content-center align-items-center flex-wrap" style={{ width: "350px" }}>
                            <Col className="col-3 mt-2 m-auto d-block align-self-center w-100 mb-4 ">
                                <Spinner className="m-auto d-block" animation="border" />
                            </Col>
                        </Container>
                    </>
                    :!shareLinkOrder.data?.data?.status ?
                    <>
                        <Container className="my-1 h-100  d-flex justify-content-center align-items-center flex-wrap" >
                            <Col className="col-3 mt-2 m-auto d-block align-self-center w-100 mb-4 ">
                                <h6 className="mt-2 text-center lh-lg ">{shareLinkOrder.data?.message} </h6>
                            </Col>
                        </Container>
                    </>
                    :
                    <Container className="mb-3">
                        <Row className="my-3 px-1">
                            <Col>
                                <Form.Label className="me-2">  اشتراک لینک از طریق</Form.Label>
                            </Col>
                        </Row>
                        <Row>
                            <Row className="p-0 m-0 mb-2">
                                <Col className="col-6">
                                    <CopyToClipboard text={textLink} >
                                        <Button className="w-100 btn-outline-dark btn--sale--opprotunity border-0">
                                            <img src={copyIcon} height="25px" alt="edit-order-icon" />
                                            <span className="me-2">کپی در کلیپبورد</span>
                                        </Button>
                                    </CopyToClipboard>

                                </Col>
                                <Col className="col-6">
                                    <Button className="w-100 btn-outline-dark btn--sale--opprotunity border-0">
                                        <a className="text-light text-decoration-none d-flex align-items-center" href={`sms:${order?.customer?.mobile};?&body=${textLink}`}>
                                            <img src={smsIcon} height="25px" alt="edit-order-icon" />
                                            <span className="me-2 ">پیامک</span>
                                        </a>
                                    </Button>
                                </Col>
                            </Row>
                            <Row className="p-0 m-0 my-1">
                                <Col className="col-6">
                                    <Button className="w-100 btn-outline-dark btn--sale--opprotunity border-0">
                                        <a className="text-light text-decoration-none d-flex align-items-center" href={`https://web.whatsapp.com/send?text=${textLink}`}>
                                            <WhatsAppIcon />
                                            <span className="me-2">واتساپ</span>
                                        </a>
                                    </Button>
                                </Col>
                                <Col className="col-6">
                                    <Button className="w-100 btn-outline-dark btn--sale--opprotunity border-0">
                                        <a className="text-light text-decoration-none d-flex align-items-center" href={`mailto:?body=${textLink}`}>
                                            <img src={emailIcon} height="25px" alt="edit-order-icon" className="me-2" />
                                            <span className="me-2">ایمیل</span>
                                        </a>
                                    </Button>
                                </Col>
                            </Row>
                        </Row>
                    </Container>
            }
        </>

    )



}