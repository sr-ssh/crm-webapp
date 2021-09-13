import React, { useState } from "react";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import SmsIcon from '@material-ui/icons/Sms';
import TelegramIcon from '@material-ui/icons/Telegram';
import EmailIcon from '@material-ui/icons/Email';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { Tooltip, Modal } from '@material-ui/core';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export const ShareLinkOrder = ({ orderId, isShareLinkOrder, setIsShareLinkOrder }) => {

    const [copied, setCopied] = useState(false)
    const [open, setOpen] = useState(false)
    const textLink = `پیش فاکتور شما ایجاد گردید. لینک پیش فاکتور ${"http://localhost:3001/orders/612c763b37888f4af878185d/612c763b37888f4af878185d"}`

    return (
        <>
            <div className="share--link--order--desktop">
                <Container>
                    <Row className="py-2 px-1 order-inputs">
                        <Col>
                            اشتراک لینک از طریق
                        </Col>
                    </Row>
                    <Row>
                        <Row className="p-0 m-0 my-1">
                            <Col className="col-6">
                                <CopyToClipboard text="612c763b37888f4af878185d/612c763b37888f4af878185d" onCopy={() => setCopied(true)}>
                                    <Tooltip open={copied} title={`${copied ? "کپی شد!" : "کپی در کلیپبورد"}`} placement="bottom" className="btn--copy--link" onClose={() => { setTimeout(() => { setCopied(false) }, 500) }} >
                                        <Button className="w-100 btn--sale--opprotunity border-0">
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
                                        <span>پیامک</span>
                                    </a>

                                </Button>
                            </Col>
                        </Row>
                        <Row className="p-0 m-0 my-1">
                        <Col className="col-6">
                                <Button className="w-100 btn--sale--opprotunity border-0">
                                    <a className="text-light text-decoration-none" href={`whatsapp://send?text=${textLink}`}>
                                        <WhatsAppIcon />
                                        <span>واتساپ</span>
                                    </a>
                                </Button>
                            </Col>
                            <Col>
                                <Button className="w-100 btn--sale--opprotunity border-0">
                                    <a className="text-light text-decoration-none" href={`mailto:?body=${textLink}`}>
                                        <EmailIcon />
                                        <span>ایمیل</span>
                                    </a>
                                </Button>
                            </Col>
                        </Row>
                    </Row>
                </Container>


            </div>
        </>

    )



}