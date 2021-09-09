import React, { useState } from "react";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import SmsIcon from '@material-ui/icons/Sms';
import TelegramIcon from '@material-ui/icons/Telegram';
import EmailIcon from '@material-ui/icons/Email';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { Tooltip } from '@material-ui/core';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export const ShareLinkOrder = ({ orderId, isShareLinkOrder, setIsShareLinkOrder }) => {

    const [copied, setCopied] = useState(false)
    const textLink = `پیش فاکتور شما ایجاد گردید. لینک پیش فاکتور ${"http://localhost:3001/orders/612c763b37888f4af878185d/612c763b37888f4af878185d"}`

    return (
        <>
            <div className="share--link--order--desktop">
                {/* <Container fluid className="m-0 h-100  d-flex justify-content-center align-items-center flex-wrap" style={{ width: "350px" }}>
                    <Col className="col-3 mt-2 m-auto d-block align-self-center w-100 mb-4 ">
                        <Spinner className="m-auto d-block" animation="border" />
                    </Col>
                </Container> */}
                <Container>
                    <Row className="py-2 px-1">
                        <Col>
                            اشتراک گذاری با :
                        </Col>
                    </Row>
                    <Row className="m-0 p-0 mb-1">
                        <Col className="m-2 p-0 d-flex justify-content-center align-items-center border border-secondary" >
                            <Col className="col-1 d-flex justify-content-center align-items-center p-0 m-0 my-2 ">
                                <CopyToClipboard text="612c763b37888f4af878185d/612c763b37888f4af878185d" onCopy={() => setCopied(true)}>
                                    <Tooltip title={`${copied ? "کپی شد!" : "کپی در کلیپبورد"}`} placement="bottom" className="btn--copy--link" onClose={() => { setTimeout(() => { setCopied(false) }, 500) }} >
                                        <FileCopyIcon />
                                    </Tooltip>
                                </CopyToClipboard>

                            </Col>
                            <Col className="col-11 p-0 m-0 my-2 ms-2  col--share--link--desktop">
                                <Col classname="text-center">
                                    <span>
                                        <a href="http://localhost:3001/orders/612c763b37888f4af878185d/612c763b37888f4af878185d">http://localhost:3001/orders/612c763b37888f4af878185d/612c763b37888f4af878185d</a>
                                    </span>

                                </Col>

                            </Col>
                        </Col>
                    </Row>
                    <Row>
                        <Row className="p-0 m-0 my-1">
                            <Col className="col-6">
                                <Button className="w-100">
                                    <a className="text-light text-decoration-none" href={`https://web.whatsapp.com/send?text=${textLink}`}>
                                        <WhatsAppIcon />
                                        <span>واتساپ</span>
                                    </a>

                                </Button>
                            </Col>
                            <Col className="col-6">
                                <Button className="w-100">
                                    <a>
                                        <SmsIcon />
                                        <span>پیامک</span>
                                    </a>

                                </Button>
                            </Col>
                        </Row>
                        <Row className="p-0 m-0 my-1">
                            <Col>
                                <Button className="w-100">
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