import React, { useEffect, useMemo, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Card, Form, Col, Row, Button, Dropdown, Spinner } from 'react-bootstrap'

// Actions
import { orderActions, settingActions } from '../../../actions'
// Icons
import editIcon from '../../assets/images/setting/edit-blue.svg'
import inactiveEditIcon from '../../assets/images/setting/inactive-edit.svg'
import tickIcon from '../../assets/images/tick.svg'
import spinnerIcon from './../../assets/images/sppiner-blue.svg'

export const OrderSetting = () => {


    const [configSettingOrder, setConfigSettingOrder] = useState({ share: {}, preSms: {}, postDeliverySms: {}, postCustomerSms: {} })


    let orderSms = useSelector(state => state.getOrderSms.sms)
    let editOrderSms = useSelector(state => state.editOrderSms)
    let shareLinkConfig = useSelector(state => state.getShareLinkConfig)
    const sideBar = useSelector(state => state.sideBar)

    const [shareLink, setShareLink] = useState({ duration: "", unitTime: "" })
    const dispatch = useDispatch();


    let toggleHandler = (e) => {

        let { id, name, value, type, checked } = e.target
        console.log(id, name, value, type, checked)


    }
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

    // useEffect(() => {
    //     dispatch(orderActions.getSms())
    //     dispatch(settingActions.getShareLinkConfig())
    // }, [dispatch])


    return (
        //  
        <Container fluid className="w-100 d-flex flex-column px-4 " >
            <Row className="m-0 my-3 p-0 w-100" >
                <Card className="sms-text-container border-0 notes-round">
                    <Card.Body className="d-flex flex-nowrap ">
                        <Col className="col-3 d-flex align-items-center justify-content-start text--input--sms--desktop inactive--text--input--sms--desktop">
                            <input type="checkbox" id="preSms" name="preSms" className="btn-toggle-status-setting--sms" onChange={toggleHandler} />
                            <span>پیامک ثبت سفارش</span>
                        </Col>
                        <Col className="col-8 pe-2">
                            <Form.Control as="textarea" name="preSms" className="textarea--setting--desktop" onChange={toggleHandler} />
                        </Col>
                        <Col className="col-1 d-flex align-items-center justify-content-center pe-5 me-1">
                            <img src={inactiveEditIcon} height="35px" alt="edit-icon" style={{ cursor: "pointer" }} />
                        </Col>
                    </Card.Body>
                </Card>
            </Row>
            <Row className="m-0 p-0 my-3  w-100" >
                <Card className="sms-text-container border-0 notes-round">
                    <Card.Body className="d-flex flex-nowrap ">
                        <Col className="col-3 d-flex align-items-center justify-content-start text--input--sms--desktop">
                            <input type="checkbox" id="postDeliverySms" name="postDeliverySms" className="btn-toggle-status-setting--sms" onChange={toggleHandler} />
                            <span>پیامک پیک</span>
                        </Col>
                        <Col className="col-8 pe-2">
                            <Form.Control as="textarea" name="postDeliverySms" className="textarea--setting--desktop" onChange={toggleHandler} />
                        </Col>
                        <Col className="col-1 d-flex align-items-center justify-content-center pe-5 me-1">
                            <img src={editIcon} height="35px" alt="edit-icon" style={{ cursor: "pointer" }} />
                        </Col>
                    </Card.Body>
                </Card>
            </Row>
            <Row className="m-0 p-0 my-3  w-100" >
                <Card className="sms-text-container border-0 notes-round">
                    <Card.Body className="d-flex flex-nowrap ">
                        <Col className="col-3 d-flex align-items-center justify-content-start text--input--sms--desktop">
                            <input type="checkbox" id="postCustomerSms" name="postCustomerSms" className="btn-toggle-status-setting--sms" onChange={toggleHandler} />
                            <span>پیامک ارسال محصول</span>
                        </Col>
                        <Col className="col-8 pe-2">
                            <Form.Control as="textarea" name="postCustomerSms" className="textarea--setting--desktop" onChange={toggleHandler} />
                        </Col>
                        <Col className="col-1 d-flex align-items-center justify-content-center pe-5 me-1">
                            <img src={editIcon} height="35px" alt="edit-icon" style={{ cursor: "pointer" }} />
                        </Col>
                    </Card.Body>
                </Card>
            </Row>
            <Form.Group>
                <Row className="mx-0 my-3">
                    <Col className="col-3 order-setting-field-label align-self-center">
                        تموم شدن وقت اشتراک گذاری بعد از
                    </Col>
                    <Col className="p-0 col-2" style={{ width: "15%" }}>
                        <Dropdown className="text-center w-100">
                            <Dropdown.Toggle className="w-100 px-1 d-flex align-items-center dropdown--btn--sms--setting" id="dropdown-basic">
                                {/* {selectedItem.length ? <span className="me-2">{selectedItem}</span > :  */}
                                <span className="me-2 fw-bold">دقیقه</span>
                                {/* // } */}
                                <img className="ms-1 me-auto" src={spinnerIcon} height="20px" alt="spinner-icon" />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item >دقیقه</Dropdown.Item>
                                <Dropdown.Item>ساعت</Dropdown.Item>
                                <Dropdown.Item >روز</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                    <Col className="p-0 col-4 d-flex align-items-center justify-content-start">
                        <Form.Group controlId="defaultReminder" className=" form-grp--setting--desktop">
                            <Form.Control type="number" className="order-setting-field--desktop m-auto" />
                            <span className="ms-3">دقیقه</span>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mx-0 my-3">
                    <Col className="col-3 order-setting-field-label align-self-center">
                        مقدار پیش فرض یادآوری
                    </Col>
                    <Col className="p-0 col-2" style={{ width: "15%" }}>
                        <Dropdown className="text-center w-100">
                            <Dropdown.Toggle className="w-100 px-1 d-flex align-items-center dropdown--btn--sms--setting" id="dropdown-basic">
                                {/* {selectedItem.length ? <span className="me-2">{selectedItem}</span > :  */}
                                <span className="me-2 fw-bold">محصولات</span>
                                {/* // } */}
                                <img className="ms-1 me-auto" src={spinnerIcon} height="20px" alt="spinner-icon" />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item >دقیقه</Dropdown.Item>
                                <Dropdown.Item>ساعت</Dropdown.Item>
                                <Dropdown.Item >روز</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                    <Col className="p-0 col-4 d-flex align-items-center justify-content-start">
                        <Form.Group controlId="defaultReminder" className=" form-grp--setting--desktop">
                            <Form.Control type="number" className="order-setting-field--desktop m-auto" />
                            <span className="ms-3">دقیقه</span>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mx-0 my-3">
                    <Col className="col-3 order-setting-field-label align-self-center">
                        مقدار پیش فرض آماده سازی
                    </Col>
                    <Col className="p-0 col-2" style={{ width: "15%" }}>
                        <Dropdown className="text-center w-100">
                            <Dropdown.Toggle className="w-100 px-1 d-flex align-items-center dropdown--btn--sms--setting" id="dropdown-basic">
                                {/* {selectedItem.length ? <span className="me-2">{selectedItem}</span > :  */}
                                <span className="me-2 fw-bold">محصولات</span>
                                {/* // } */}
                                <img className="ms-1 me-auto" src={spinnerIcon} height="20px" alt="spinner-icon" />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item >دقیقه</Dropdown.Item>
                                <Dropdown.Item>ساعت</Dropdown.Item>
                                <Dropdown.Item >روز</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                    <Col className="p-0 col-4 d-flex align-items-center justify-content-start">
                        <Form.Group controlId="defaultReminder" className=" form-grp--setting--desktop">
                            <Form.Control type="number" className="order-setting-field--desktop m-auto" />
                            <span className="ms-3">دقیقه</span>
                        </Form.Group>
                    </Col>
                </Row>
                {/* <Row className="mt-3 mx-0">
                    <Col className="col-2 order-setting-field-label  align-self-center">
                        مقدار پیش فرض یاد آوری
                    </Col>
                    <Col className="col-5">
                        <Form.Group controlId="defaultReminder">
                            <Form.Control type="number" className="order-setting-field m-auto" placeholder="دقیقه" />
                        </Form.Group>
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
                </Row> */}
            </Form.Group>
            <Row className="m-0 p-0 w-100 mb-3">
                <Col className="m-0 p-0 col-12">
                    <Button variant="primary" type="submit" className="w-100 m-0 p-0 py-2 mt-5 btn-dark-blue notes-round">
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
            {/* <Row className="d-flex flex-column">
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
                    </Form>


                </Col>
            </Row> */}
            {/* <Row className="m-0 p-0">
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
                                                <img
                                        className={`${orderSms.postDeliverySms.status ? "edit-permission-tick-show" : "edit-permission-tick-fade"}`}
                                        src={tickIcon}
                                        alt="tick-btn"
                                        height="30px" />

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
                                                <img
                                        className={`${orderSms.postCustomerSms.status ? "edit-permission-tick-show" : "d-none"}`}
                                        src={tickIcon}
                                        alt="tick-btn"
                                        height="30px" />
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
            </Row> */}
        </Container >
    )
}
