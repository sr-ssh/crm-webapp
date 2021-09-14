import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import SmsIcon from '@material-ui/icons/Sms';
import EmailIcon from '@material-ui/icons/Email';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { Tooltip } from '@material-ui/core';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import closeIcon from '../../assets/images/close.svg'
import { useDispatch, useSelector } from "react-redux";
import { orderActions } from "../../../actions";


export const ShareLinkModal = (props) => {

    const [copied, setCopied] = useState(false)
    const textLink = `پیش فاکتور شما ایجاد گردید. لینک پیش فاکتور ${"http://localhost:3001/orders/612c763b37888f4af878185d/612c763b37888f4af878185d"}`
    let link = useSelector(state => state.getShareLinkOrder.data)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(orderActions.getShareLinkOrder({orderId: props.orderId}))
    }, [dispatch, props.orderId])


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
                            <Col className="col-6 ">
                                <CopyToClipboard text={link} onCopy={() => setCopied(true)}>
                                    <Tooltip open={copied} title={`${copied ? "کپی شد!" : "کپی در کلیپبورد"}`} placement="bottom" className="btn--copy--link" onClose={() => { setTimeout(() => { setCopied(false) }, 500) }} >
                                        <Button className="w-100 h-100 btn--sale--opprotunity border-0">
                                            <FileCopyIcon />
                                            <span className="pe-2">copy کردن</span>
                                        </Button>
                                    </Tooltip>
                                </CopyToClipboard>
                            </Col>
                            <Col className="col-6">
                                <Button className="w-100 btn--sale--opprotunity border-0">
                                    <a className="text-light text-decoration-none" href="sms:09105044033;?&body=Hello">
                                        <SmsIcon />
                                        <span className="pe-2 fs-6">sms</span>
                                    </a>

                                </Button>
                            </Col>
                        </Row>
                        <Row className="p-0 m-0 my-1">
                        <Col className="col-6">
                                <Button className="w-100 btn--sale--opprotunity border-0">
                                    <a className="text-light text-decoration-none" href={`whatsapp://send?text=${textLink}`}>
                                        <WhatsAppIcon />
                                        <span className="pe-2">واتساپ</span>
                                    </a>
                                </Button>
                            </Col>
                            <Col>
                                <Button className="w-100 btn--sale--opprotunity border-0">
                                    <a className="text-light text-decoration-none" href={`mailto:?body=${textLink}`}>
                                        <EmailIcon />
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
