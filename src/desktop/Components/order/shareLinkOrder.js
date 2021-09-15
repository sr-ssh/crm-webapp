import React, { useState, useEffect } from "react";
import { Container, Form, Row, Col, Button, Spinner } from "react-bootstrap";
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import { Tooltip } from '@material-ui/core';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useDispatch, useSelector } from 'react-redux'

// Icons
import closeIcon from '../../assets/images/close.svg'
import copyIcon from '../../assets/images/order/sharelink/copy.svg'
import smsIcon from '../../assets/images/order/sharelink/sms.svg'
import emailIcon from '../../assets/images/order/sharelink/email.svg'



export const ShareLinkOrder = ({ isShareLinkOrder, setIsShareLinkOrder, customerMobile }) => {

    const [copied, setCopied] = useState(false)
    let shareLinkOrder = useSelector(state => state.getShareLinkOrder)

    let textLink = `پیش فاکتور شما ایجاد گردید. لینک پیش فاکتور http://crm-x.ir/orderdetails/${shareLinkOrder?.data?.orderId}/${shareLinkOrder?.data?.keyLink}`;

    return (
        <>
            <Button className="border-0 customer-modal-close--desktop" type="button" onClick={() => setIsShareLinkOrder(false)} >
                <img className="d-flex m-auto customer-modal-close-svg--desktop" src={closeIcon} alt="close-btn" />
            </Button>
            <div className="share--link--order--desktop">

                {shareLinkOrder.loading ?
                    (
                        <Container fluid className="m-0 h-100  d-flex justify-content-center align-items-center flex-wrap" style={{ width: "350px" }}>
                            <Col className="col-3 mt-2 m-auto d-block align-self-center w-100 mb-4 ">
                                <Spinner className="m-auto d-block" animation="border" />
                            </Col>
                        </Container>
                    ) : (

                        <Container>
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
                                            <a className="text-light text-decoration-none" href={`sms:${customerMobile};?&body=${textLink}`}>
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
                    )}
            </div>
        </>

    )



}