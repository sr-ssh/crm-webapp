import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { Tooltip } from '@material-ui/core';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import closeIcon from '../../assets/images/close.svg'
import { useDispatch, useSelector } from "react-redux";
import { orderActions } from "../../../actions";
import { SERVER_URL } from "../../../config";

//icons
import copyIcon from './../../assets/images/order/copy.svg'
import smsIcon from './../../assets/images/order/sms.svg'
import whatsAppIcon from './../../assets/images/order/whatsapp.svg'
import emailIcon from './../../assets/images/order/email.svg'

export const ShareLinkModal = (props) => {

    const [copied, setCopied] = useState(false)
    let link = useSelector(state => state.getShareLinkOrder.data)
    let shareLink = `${SERVER_URL.substr(0, SERVER_URL.length - 16)}3001/order/factor/${link?.orderId}/${link?.keyLink}`
    const textLink = `پیش فاکتور شما ایجاد گردید. لینک پیش فاکتور
     \n ${shareLink}`
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(orderActions.getShareLinkOrder(props.orderId))
    }, [dispatch, props.orderId])
    console.log(props)

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="px-4"
        >
            <Modal.Body className="add-product px-0 py-3">
            <Button className="border-0 customer-modal-close" type="button" onClick={e => props.onHide(false)}>
                    <img className="d-flex m-auto customer-modal-close-svg" src={closeIcon} alt="close-btn" />
                </Button>
                <Container>
                    <Row className="pb-3 pt-1 px-1 order-inputs">
                        <Col>
                            اشتراک لینک از طریق
                        </Col>
                    </Row>
                    <Row>
                        <Row className="p-0 m-0 my-1">
                            <Col className="col-6 ps-2">
                                <CopyToClipboard text={shareLink} onCopy={() => setCopied(true)}>
                                    <Tooltip open={copied} title={`${copied ? "کپی شد!" : "کپی در کلیپبورد"}`} placement="bottom" className="btn--copy--link" onClose={() => { setTimeout(() => { setCopied(false) }, 500) }} >
                                        <Button className="w-100 h-100 btn--sale--opprotunity border-0">
                                            <img src={copyIcon} alt="copy-icon" height="25px" className="pe-1" />
                                            <span className="pe-2">
                                                <span className="fs-6">copy</span> کردن
                                            </span>
                                        </Button>
                                    </Tooltip>
                                </CopyToClipboard>
                            </Col>
                            <Col className="col-6 pe-2">
                                <Button className="w-100 btn--sale--opprotunity border-0">
                                    <a className="text-light text-decoration-none" href="sms:09307580142;?&body=Hello">
                                        <img src={smsIcon} alt="copy-icon" height="25px" className="pe-1" />
                                        <span className="pe-2 fs-6">sms</span>
                                    </a>
                                </Button>
                            </Col>
                        </Row>
                        <Row className="p-0 m-0 my-1">
                        <Col className="col-6 ps-2">
                                <Button className="w-100 btn--sale--opprotunity border-0">
                                    <a className="text-light text-decoration-none" href={`whatsapp://send?text=${textLink}`}>
                                        <img src={whatsAppIcon} alt="copy-icon" height="25px" className="pe-1" />
                                        <span className="pe-2">واتساپ</span>
                                    </a>
                                </Button>
                            </Col>
                            <Col className="pe-2">
                                <Button className="w-100 btn--sale--opprotunity border-0">
                                    <a className="text-light text-decoration-none" href={`mailto:?body=${textLink}`}>
                                        <img src={emailIcon} alt="copy-icon" height="25px" className="pe-1" />
                                        <span className="pe-2">ایمیل</span>
                                    </a>
                                </Button>
                            </Col>
                        </Row>
                    </Row>
                </Container>


            </Modal.Body>

        </Modal>
    )
}
