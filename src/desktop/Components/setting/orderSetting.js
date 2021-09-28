import React, { useEffect, useMemo, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Card, Form, Col, Row, Button, Dropdown, Spinner } from 'react-bootstrap'

// Actions
import { orderActions, settingActions } from '../../../actions'
// Icons
import editIcon from '../../assets/images/Products/edit.svg'
import tickIcon from '../../assets/images/tick.svg'

export const OrderSetting = () => {
    let orderSms = useSelector(state => state.getOrderSms.sms)
    let editOrderSms = useSelector(state => state.editOrderSms)
    let shareLinkConfig = useSelector(state => state.getShareLinkConfig)
    const sideBar = useSelector(state => state.sideBar)

    const [shareLink, setShareLink] = useState({ duration: "", unitTime: "" })
    const dispatch = useDispatch();
    const handleChange = (e) => {
        console.log('_____________________handleChange_____________________')
        if (e.target.type === "checkbox") {
            dispatch(orderActions.editNewSms(
                {
                    ...orderSms, [e.target.id]: {
                        ...orderSms[e.target.id],
                        text: orderSms[e.target.id].text,
                        status: e.target.checked
                    }
                }
            ))
            return
        }
        if (e.target.type === "textarea") {
            dispatch(orderActions.editNewSms(
                {
                    ...orderSms, [e.target.id]: {
                        ...orderSms[e.target.id],
                        text: e.target.value,
                        status: orderSms[e.target.id].status
                    }
                }
            ))
            return
        }

        e.preventDefault()

        dispatch(orderActions.editNewSms({
            ...orderSms, [e.target.id]: {
                ...orderSms[e.target.id],
                text: e.target.value,
                status: orderSms[e.target.id].status
            }
        }))
    }

    const HandleSubmit = (e) => {
        e.preventDefault();
        dispatch(orderActions.editSms(orderSms))
    }
    const HandleSubmitFormShareLink = (e) => {
        e.preventDefault();
        if (shareLink.duration != "" || shareLink.unitTime != "")
            dispatch(settingActions.editShareLinkConfig(shareLink))
    }

    const HandleChangeFormShareLink = (e) => {
        e.preventDefault();
        if (e.target.id == "unitTime") {
            if (e.target.value == "دقیقه")
                setShareLink({ ...shareLink, unitTime: "M" })
            if (e.target.value == "ساعت")
                setShareLink({ ...shareLink, unitTime: "H" })
            if (e.target.value == "روز")
                setShareLink({ ...shareLink, unitTime: "D" })
        } else {
            setShareLink({ ...shareLink, duration: e.target.value })
        }

    }
    useEffect(() => {
        if (shareLinkConfig.loading == false && shareLinkConfig.data != undefined)
            setShareLink({ duration: shareLinkConfig.data?.time, unitTime: shareLinkConfig.data?.unitTime })
    }, [shareLinkConfig.loading])

    useEffect(() => {
        dispatch(orderActions.getSms())
        dispatch(settingActions.getShareLinkConfig())
    }, [dispatch])


    return (
        <Container fluid className="m-0 ps-4 mt-4 w-100 d-flex flex-column justify-content-center" style={{ paddingRight: sideBar.open ? "250px" : 0 }}>
            <Row className="d-flex flex-column">
                <Col>
                    <h5 className="me-4">لینک اشتراک گذاری</h5>
                </Col>
                <Col className="me-4 ">
                    <Form onSubmit={HandleSubmitFormShareLink} className="m-0 p-0  d-flex flex-row align-items-center">
                        <span>
                            منقضی شدن لینک اشتراک گذاری بعد از
                        </span>
                        <Col className="mx-3 col-2">
                            <Form.Control type="number" onChange={HandleChangeFormShareLink} defaultValue={shareLinkConfig.data?.time} />
                        </Col>
                        <Col className="mx-3 col-1">
                            <Form.Control as="select" id="unitTime" onChange={HandleChangeFormShareLink}>
                                <option selected={shareLinkConfig.data?.unitTime == "M" ? 'selected' : null} id="M">دقیقه</option>
                                <option selected={shareLinkConfig.data?.unitTime == "H" ? 'selected' : null} id="H">ساعت</option>
                                <option selected={shareLinkConfig.data?.unitTime == "D" ? 'selected' : null} id="D">روز</option>
                            </Form.Control>
                        </Col>
                        <Col className="me-auto ms-5 d-flex justify-content-end">
                            <Button variant="primary" type="submit" className="edit-sms-submit-btn m-0 py-2 w-25" style={{ top: "0" }}>
                                {/* {
                                    editOrderSms.loading ?
                                        <Spinner
                                            as="span"
                                            animation="grow"
                                            size="sm"
                                            role="status"
                                            variant="light"
                                            aria-hidden="true"
                                        />
                                        : */}
                                <> ثبت </>
                                {/* }  */}

                            </Button>
                        </Col>
                    </Form>


                </Col>
            </Row>
            <Row className="m-0 p-0">
                <Col className="m-0 p-0">
                    <Col className="my-3 me-4">
                        <h5>پیامک</h5>
                    </Col>
                    {orderSms ?
                        <Form onSubmit={HandleSubmit} className="order-setting--desktop">
                            {orderSms &&
                                (<>
                                    <Form.Group controlId="preSms" className="mt-2" >
                                        <Row className="m-0 px-4">
                                            <Col className="col-auto">
                                                <Form.Check.Input name="preSms" defaultChecked={orderSms.preSms.status} onChange={handleChange} className="test" type="checkbox" />
                                                <span className="check"></span>
                                            </Col>
                                            <Col className=" text-end">
                                                <Form.Check.Label htmlFor="preSms">
                                                    <span className="sms-status-label">اس ام اس ثبت سفارش</span>
                                                </Form.Check.Label>
                                            </Col>
                                        </Row>
                                        <Card className="m-3 mt-1 sms-text-container">
                                            <Card.Body>
                                                <Card.Text>
                                                    <Form.Control as="textarea" name="preSms" onChange={handleChange} defaultValue={orderSms.preSms.text} />
                                                </Card.Text>
                                                <Card.Link className="editLogo d-block me-auto">
                                                    <img className="edit-sms-icon d-block me-auto" src={editIcon} height="35px" alt="edit-icon" />
                                                </Card.Link>
                                            </Card.Body>
                                        </Card>
                                    </Form.Group>

                                    <Form.Group controlId="postDeliverySms" className="mt-2" onChange={handleChange}>
                                        <Row className="m-0 px-4">
                                            <Col className="col-auto">
                                                {/* <img
                                        className={`${orderSms.postDeliverySms.status ? "edit-permission-tick-show" : "edit-permission-tick-fade"}`}
                                        src={tickIcon}
                                        alt="tick-btn"
                                        height="30px" /> */}

                                                <Form.Check.Input name="postDeliverySms" defaultChecked={orderSms.postDeliverySms.status} onChange={handleChange} className="test" type="checkbox" />
                                                <span className="check"></span>
                                            </Col>
                                            <Col className="text-end">
                                                <Form.Check.Label htmlFor="postDeliverySms">
                                                    <span className="sms-status-label">اس ام اس پیک</span>
                                                </Form.Check.Label>
                                            </Col>
                                        </Row>
                                        <Card className="m-3 mt-1 sms-text-container">
                                            <Card.Body>
                                                <Card.Text>
                                                    <Form.Control as="textarea" name="postDeliverySms" onChange={handleChange} defaultValue={orderSms.postDeliverySms.text} />
                                                </Card.Text>
                                                <Card.Link className="editLogo d-block me-auto">
                                                    <img className="edit-sms-icon d-block me-auto" src={editIcon} height="35px" alt="edit-icon" />
                                                </Card.Link>
                                            </Card.Body>
                                        </Card>
                                    </Form.Group>

                                    <Form.Group controlId="postCustomerSms" className="mt-2" onChange={handleChange}>
                                        <Row className="m-0 px-4">
                                            <Col className="col-auto">
                                                {/* <img
                                        className={`${orderSms.postCustomerSms.status ? "edit-permission-tick-show" : "d-none"}`}
                                        src={tickIcon}
                                        alt="tick-btn"
                                        height="30px" /> */}
                                                <Form.Check.Input name="postCustomerSms" defaultChecked={orderSms.postCustomerSms.status} onChange={handleChange} className="test" type="checkbox" />
                                                <span className="check"></span>
                                            </Col>
                                            <Col className="text-end">
                                                <Form.Check.Label className="me-1" htmlFor="postCustomerSms">
                                                    <span className="sms-status-label">اس ام اس ارسال محصول</span>
                                                </Form.Check.Label>
                                            </Col>
                                        </Row>
                                        <Card className="m-3 mt-1 sms-text-container">
                                            <Card.Body>
                                                <Card.Text>
                                                    <Form.Control as="textarea" name="postCustomerSms" onChange={handleChange} defaultValue={orderSms.postCustomerSms.text} />
                                                </Card.Text>
                                                <Card.Link className="editLogo d-block me-auto">
                                                    <img className="edit-sms-icon d-block me-auto" src={editIcon} height="35px" alt="edit-icon" />
                                                </Card.Link>
                                            </Card.Body>
                                        </Card>
                                    </Form.Group>

                                    <Form.Group>
                                        <Row className="mx-0">
                                            <Col className="col-2 order-setting-field-label align-self-center">
                                                واحد زمان
                                            </Col>
                                            <Col className="col-5">
                                                <Dropdown className="text-center">
                                                    <Dropdown.Toggle className="dropdown-toggle" id="dropdown-basic">
                                                        دقیقه
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item >دقیقه</Dropdown.Item>
                                                        <Dropdown.Item>ساعت</Dropdown.Item>
                                                        <Dropdown.Item >روز</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </Col>
                                        </Row>
                                        <Row className="mt-3 mx-0">
                                            <Col className="col-2 order-setting-field-label  align-self-center">
                                                مقدار پیش فرض یاد آوری
                                            </Col>
                                            <Col className="col-5">
                                                <Form.Group controlId="defaultReminder">
                                                    <Form.Control type="number" className="order-setting-field m-auto" placeholder="دقیقه" />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row className="mt-3 mx-0">
                                            <Col className="col-2 order-setting-field-label align-self-center">
                                                مقدار پیش فرض آماده سازی
                                            </Col>
                                            <Col className="col-5">
                                                <Form.Group>
                                                    <Form.Control type="number" className="order-setting-field m-auto" placeholder="دقیقه" />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Form.Group>

                                    <Row>
                                        <Col className="mx-2">
                                            <Button variant="primary" type="submit" className="edit-sms-submit-btn  mb-5 py-3">
                                                {
                                                    editOrderSms.loading ?
                                                        <Spinner
                                                            as="span"
                                                            animation="grow"
                                                            size="sm"
                                                            role="status"
                                                            variant="light"
                                                            aria-hidden="true"
                                                        />
                                                        :
                                                        <> ثبت </>
                                                }

                                            </Button>
                                        </Col>
                                    </Row>

                                </>)
                            }

                        </Form>
                        :
                        <Spinner className="m-auto d-block" animation="border" />
                    }
                </Col>
            </Row>
        </Container >
    )
}
