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



export const ShareLinkOrder = ({ isShareLinkOrder, setIsShareLinkOrder, order }) => {

    const dispatch = useDispatch()
    const [copied, setCopied] = useState(false)
    const [isTypeSelected, setIsTypeSelected] = useState(false)

    let shareLinkOrder = useSelector(state => state.getShareLinkOrder)
    let textLink = `پیش فاکتور شما ایجاد گردید. لینک پیش فاکتور http://crm-x.ir/order/factor/${shareLinkOrder?.data?.orderId}/${shareLinkOrder?.data?.keyLink}`;


    let setTypefactorHandler = (e, type) => {
        debugger;
        dispatch(orderActions.getShareLinkOrder({ orderId: order.id, type: type }))
        setIsTypeSelected(true)
    }



    return (
        <>
            <Button className="border-0 customer-modal-close--desktop" type="button" onClick={() => { setIsShareLinkOrder(false); setIsTypeSelected(false) }} >
                <img className="d-flex m-auto customer-modal-close-svg--desktop" src={closeIcon} alt="close-btn" />
            </Button>
            {isTypeSelected ? (

                shareLinkOrder.loading ?
                    <>
                        <Container fluid className="m-0 h-100 my-5  d-flex justify-content-center align-items-center flex-wrap" style={{ width: "350px" }}>
                            <Col className="col-3 mt-2 m-auto d-block align-self-center w-100 mb-4 ">
                                <Spinner className="m-auto d-block" animation="border" />
                            </Col>
                        </Container>
                    </>
                    :
                    <Container className="mb-3">
                        <Row className="my-3  px-1">
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
                                            <span>کپی در کلیپبورد</span>
                                        </Button>
                                    </CopyToClipboard>

                                </Col>
                                <Col className="col-6">
                                    <Button className="w-100 btn-outline-dark btn--sale--opprotunity border-0">
                                        <a className="text-light text-decoration-none" href={`sms:${order?.customer?.mobile};?&body=${textLink}`}>
                                            <img src={smsIcon} height="25px" alt="edit-order-icon" />
                                            <span>پیامک</span>
                                        </a>
                                    </Button>
                                </Col>
                            </Row>
                            <Row className="p-0 m-0 my-1">
                                <Col className="col-6">
                                    <Button className="w-100 btn-outline-dark btn--sale--opprotunity border-0">
                                        <a className="text-light text-decoration-none" href={`https://web.whatsapp.com/send?text=${textLink}`}>
                                            <WhatsAppIcon />
                                            <span>واتساپ</span>
                                        </a>
                                    </Button>
                                </Col>
                                <Col className="col-6">
                                    <Button className="w-100 btn-outline-dark btn--sale--opprotunity border-0">
                                        <a className="text-light text-decoration-none" href={`mailto:?body=${textLink}`}>
                                            <img src={emailIcon} height="25px" alt="edit-order-icon" />
                                            <span>ایمیل</span>
                                        </a>
                                    </Button>
                                </Col>
                            </Row>
                        </Row>
                    </Container>
            ) :
                <Container fluid className="m-0 h-100 my-3 " style={{ width: "350px" }}>

                    <Row className="pb-3 pt-1 px-1 order-inputs">
                        <Col>
                            پیش فاکتور
                        </Col>
                    </Row>
                    <Row>
                        <Row className="p-0 m-0 my-1">
                            <Col className="col-6 ps-2">
                                <Button className="w-100 h-100 btn--sale--opprotunity border-0" onClick={(e) => { setTypefactorHandler(e, 0) }}>
                                    <img src={copyIcon} alt="copy-icon" height="25px" className="pe-1" />
                                    <span className="pe-2">
                                        رسمی
                                    </span>
                                </Button>
                            </Col>
                            <Col className="col-6 pe-2">
                                <Button className="w-100 btn--sale--opprotunity border-0" onClick={(e) => { setTypefactorHandler(e, 1) }}>
                                    <img src={smsIcon} alt="copy-icon" height="25px" className="pe-1" />
                                    <span className="pe-2">غیر رسمی</span>
                                </Button>
                            </Col>
                        </Row>

                    </Row>
                </Container>
            }
        </>

    )



}