import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Modal, Spinner } from "react-bootstrap";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import closeIcon from '../../assets/images/close.svg'
import { useDispatch, useSelector } from "react-redux";
import { orderActions } from "../../../actions";
import { SERVER_URL } from "../../../config";
import { Snackbar } from '@material-ui/core'
//icons
import copyIcon from './../../assets/images/order/copy.svg'
import smsIcon from './../../assets/images/order/sms.svg'
import whatsAppIcon from './../../assets/images/order/whatsapp.svg'
import emailIcon from './../../assets/images/order/email.svg'

export const ShareLinkModal = (props) => {

    const [isOk, setIsOk] = useState(true)
    const [copied, setCopied] = useState(false)

    const [invoiceType, setInvoiceType] = useState(0)
    let link = useSelector(state => state.getShareLinkOrder.data)
    let loadingLink = useSelector(state => state.getShareLinkOrder.loading)
    let shareLink = `${SERVER_URL.substr(0, SERVER_URL.length - 16)}3001/order/factor/${link?.orderId}/${link?.keyLink}`
    const textLink = `پیش فاکتور شما ایجاد گردید. لینک پیش فاکتور
     \n ${shareLink}`
    const dispatch = useDispatch()

    let toggleHandler = (e) => {
        let type = e.target.id == "formal" ? 0 : e.target.id == "inFormal" ? 1 : null
        setInvoiceType(type)
        dispatch(orderActions.getShareLinkOrder({ orderId: props.order.id, type: type }))
    }

    useEffect(() => {
        if (isOk === true && props.order != null) {
            dispatch(orderActions.getShareLinkOrder({ orderId: props.order.id, type: invoiceType }))
            setIsOk(false)
        }
    }, [dispatch, props.order])


    return (
        <Modal
            {...props}
            size="lg"
            backdrop="static"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="px-4"
        >
            <Modal.Body className="add-product px-0 py-3">
                <Button className="border-0 customer-modal-close" type="button" onClick={e => { props.onHide(false) }}>
                    <img className="d-flex m-auto customer-modal-close-svg" src={closeIcon} alt="close-btn" />
                </Button>
                <Container className="mb-2">
                    <Row className="pb-3 pt-1 px-1 order-inputs">
                        <Col>
                            پیش فاکتور
                        </Col>
                    </Row>
                    <Row>
                        <Row className="p-0 m-0 my-1">
                            <Col className="col-6 ps-2 d-flex align-items-center">
                                <input type="checkbox" id="formal" name="formal" className="btn-toggle-status-green" checked={invoiceType == 0} onChange={toggleHandler} />
                                <span className="pe-2 text-success">
                                    رسمی
                                </span>

                            </Col>
                            <Col className="col-6 pe-2 d-flex align-items-center">
                                <input type="checkbox" id="inFormal" name="inFormal" className="btn-toggle-status-red" checked={invoiceType == 1} onChange={toggleHandler} />
                                <span className="pe-2 text-danger">
                                    غیر رسمی
                                </span>
                            </Col>
                        </Row>

                    </Row>
                </Container>
                {loadingLink ?
                    <>
                        <Container fluid className="my-4 h-100  d-flex justify-content-center align-items-center flex-wrap" style={{ width: "350px" }}>
                            <Col className="col-3 mt-2 m-auto d-block align-self-center w-100 mb-4 ">
                                <Spinner className="m-auto d-block" animation="border" />
                            </Col>
                        </Container>
                    </>
                    :

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
                                        <Button className="w-100 h-100 btn--sale--opprotunity border-0">
                                            <img src={copyIcon} alt="copy-icon" height="25px" className="pe-1" />
                                            <span className="pe-2">
                                                <span className="fs-6">copy</span> کردن
                                            </span>
                                        </Button>
                                    </CopyToClipboard>
                                </Col>
                                <Col className="col-6 pe-2">
                                    <Button className="w-100 btn--sale--opprotunity border-0">
                                        <a className="text-light text-decoration-none" href={`sms:${props.customerMobile};?&body=${textLink}`}>
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

                }
                <Snackbar
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    open={copied}
                    autoHideDuration={2000}
                    onClose={() => setCopied(false)}
                    message="کپی شد !"
                    key={{ vertical: "top", horizontal: "center" }}
                >
                </Snackbar>



            </Modal.Body>

        </Modal>
    )
}
