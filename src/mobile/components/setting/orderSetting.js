import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Card, Form, Col, Row, Button, Dropdown, Spinner } from 'react-bootstrap'

// Components
import { Header } from '../base/settingHeader'
import CircularProgress from '@material-ui/core/CircularProgress';

// Actions
import { settingActions } from '../../../actions'
// Icons
import editIcon from '../../assets/images/setting/edit-blue.svg'
import inactiveEditIcon from '../../assets/images/setting/inactive-edit.svg'
import spinnerIcon from './../../assets/images/sppiner-blue.svg'




export const OrderSetting = () => {

    const dispatch = useDispatch();
    const [configSettingOrder, setConfigSettingOrder] = useState({ share: {}, preSms: {}, postDeliverySms: {}, postCustomerSms: {} })
    let settingOrder = useSelector(state => state.getSettingOrder)
    let editsettingOrder = useSelector(state => state.editSettingOrder)



    let toggleHandler = (e) => {

        let { id, name, value, type, checked } = e.target
        if (type === "checkbox") {
            setConfigSettingOrder({ ...configSettingOrder, [id]: { ...configSettingOrder[id], status: checked } })
        }
        if (type === "textarea") {
            setConfigSettingOrder({ ...configSettingOrder, [name]: { ...configSettingOrder[name], text: value } })
        }
        if (name == "share") {
            setConfigSettingOrder({ ...configSettingOrder, [name]: { ...configSettingOrder[name], unitTime: id } })
        }
        if (name == "shareText") {
            setConfigSettingOrder({ ...configSettingOrder, [id]: { ...configSettingOrder[id], time: value } })

        }
    }


    const getUnitTimeText = (e) => {
        if (e == "M") {
            return 'دقیقه'
        } else if (e == "H") {
            return 'ساعت'
        } else if (e == "D") {
            return 'روز'

        }
    }


    const HandleSubmit = (e) => {
        e.preventDefault();
        dispatch(settingActions.editSettingOrder(configSettingOrder))
    }

    useEffect(() => {
        if (settingOrder.loading == false && settingOrder.data != undefined) {
            setConfigSettingOrder({ ...settingOrder.data.setting.order })
        }
    }, [settingOrder.loading])

    useEffect(() => {
        dispatch(settingActions.getSettingOrder())
    }, [dispatch])


    return (

        <Container fluid className={`w-100 d-flex flex-column ${settingOrder.loading && 'justify-content-center align-items-center'}  px-2   `}  >
            {settingOrder.loading ?
                <CircularProgress />
                :
                <>
                    <Row className="m-0 p-0 d-flex flex-column">
                        <Col className={`col-12 d-flex align-items-center justify-content-start  ${!configSettingOrder.preSms.status && 'inactive--text--input--sms--mobile'} `}>
                            <input type="checkbox" id="preSms" name="preSms" className="btn-toggle-status-setting--sms--mobile" onChange={toggleHandler} checked={configSettingOrder.preSms.status} />
                            <span className="fw-bold fs-15px">پیامک ثبت سفارش</span>
                        </Col>
                        <Col>
                            <Card className="sms-text-container border-0 notes-round">
                                <Card.Body className="d-flex flex-nowrap justify-content-between">
                                    <Col className="col-10 pe-2">
                                        <Form.Control as="textarea" name="preSms" className={`textarea--setting--desktop ${!configSettingOrder.preSms.status && 'inactive--textarea--setting--desktop'} `} onChange={toggleHandler} defaultValue={configSettingOrder.preSms.text} />
                                    </Col>
                                    <Col className="col-1 d-flex align-items-center justify-content-center px-2">
                                        <img src={configSettingOrder.preSms.status ? editIcon : inactiveEditIcon} height="35px" alt="edit-icon" style={{ cursor: "pointer" }} />
                                    </Col>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row className="m-0 p-0 d-flex flex-column">
                        <Col className={`col-12 d-flex align-items-center justify-content-start  ${!configSettingOrder.postDeliverySms.status && 'inactive--text--input--sms--mobile'} `}>
                            <input type="checkbox" id="postDeliverySms" name="postDeliverySms" className="btn-toggle-status-setting--sms--mobile" onChange={toggleHandler} checked={configSettingOrder.postDeliverySms.status} />
                            <span className="fw-bold fs-15px">پیامک پیک</span>
                        </Col>
                        <Col>
                            <Card className="sms-text-container border-0 notes-round">
                                <Card.Body className="d-flex flex-nowrap justify-content-between">
                                    <Col className="col-10 pe-2">
                                        <Form.Control as="textarea" name="postDeliverySms" className={`textarea--setting--desktop ${!configSettingOrder.postDeliverySms.status && 'inactive--textarea--setting--desktop'}`} onChange={toggleHandler} defaultValue={configSettingOrder.postDeliverySms.text} />
                                    </Col>
                                    <Col className="col-1 d-flex align-items-center justify-content-center px-2">
                                        <img src={configSettingOrder.postDeliverySms.status ? editIcon : inactiveEditIcon} height="35px" alt="edit-icon" style={{ cursor: "pointer" }} />
                                    </Col>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row className="m-0 p-0 d-flex flex-column">
                        <Col className={`col-12 d-flex align-items-center justify-content-start  ${!configSettingOrder.postCustomerSms.status && 'inactive--text--input--sms--mobile'} `}>
                            <input type="checkbox" id="postCustomerSms" name="postCustomerSms" className="btn-toggle-status-setting--sms--mobile" onChange={toggleHandler} checked={configSettingOrder.postCustomerSms.status} />
                            <span className="fw-bold fs-15px">پیامک ارسال محصول</span>
                        </Col>
                        <Col>
                            <Card className="sms-text-container border-0 notes-round">
                                <Card.Body className="d-flex flex-nowrap justify-content-between">
                                    <Col className="col-10 pe-2">
                                        <Form.Control as="textarea" name="postCustomerSms" className={`textarea--setting--desktop ${!configSettingOrder.postCustomerSms.status && 'inactive--textarea--setting--desktop'}`} onChange={toggleHandler} defaultValue={configSettingOrder.postCustomerSms.text} />
                                    </Col>
                                    <Col className="col-1 d-flex align-items-center justify-content-center px-2">
                                        <img src={configSettingOrder.postCustomerSms.status ? editIcon : inactiveEditIcon} height="35px" alt="edit-icon" style={{ cursor: "pointer" }} />
                                    </Col>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row className="m-0 mt-3 d-flex flex-column">
                        <Col className={`col-12 d-flex align-items-center justify-content-start me-3 `}>
                            <span className=" fw-bold fs-15px">  تموم شدن وقت اشتراک گذاری بعد از</span>
                        </Col>
                        <Col className="m-0 pt-3 d-flex justify-content-between ">
                            <Col className="p-0 col-5 d-flex align-items-center justify-content-start" style={{ widyh: "45%" }}>
                                <Form.Group controlId="defaultReminder" className="form-grp--setting--mobile">
                                    <Form.Control type="number" name="shareText" id="share" className="order-setting-field--desktop m-auto" onChange={toggleHandler} min="1" defaultValue={configSettingOrder.share.time} />
                                    <span className="ms-3">{getUnitTimeText(configSettingOrder.share.unitTime)}</span>
                                </Form.Group>
                            </Col>
                            <Col className="m-0 p-0 col-5" style={{ widyh: "45%" }} >
                                <Dropdown className="text-center w-100">
                                    <Dropdown.Toggle className="w-100 px-1 d-flex align-items-center dropdown--btn--sms--setting" id="share">
                                        <span className="me-2 fw-bold">{getUnitTimeText(configSettingOrder.share.unitTime)}</span>
                                        <img className="ms-1 me-auto" src={spinnerIcon} height="20px" alt="spinner-icon" />
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item name="share" id="M" onClick={toggleHandler} >دقیقه</Dropdown.Item>
                                        <Dropdown.Item name="share" id="H" onClick={toggleHandler}>ساعت</Dropdown.Item>
                                        <Dropdown.Item name="share" id="D" onClick={toggleHandler} >روز</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                        </Col>
                    </Row>
                    <Row className="m-0 mt-3 d-flex flex-column">
                        <Col className={`col-12 d-flex align-items-center justify-content-start me-3 `}>
                            <span className=" fw-bold fs-15px">  مقدار پیش فرض یادآوری</span>
                        </Col>
                        <Col className="m-0 pt-3 d-flex justify-content-between ">
                            <Col className="p-0 col-5 d-flex align-items-center justify-content-start" style={{ widyh: "45%" }}>
                                <Form.Group controlId="defaultReminder" className="form-grp--setting--mobile">
                                    <Form.Control type="number" className="order-setting-field--desktop m-auto" disabled={true} />
                                    <span className="ms-3">دقیقه</span>
                                </Form.Group>
                            </Col>
                            <Col className="m-0 p-0 col-5" style={{ widyh: "45%" }} >
                                <Dropdown className="text-center w-100" show={false}>
                                    <Dropdown.Toggle className="w-100 px-1 d-flex align-items-center dropdown--btn--sms--setting" id="share">
                                        <span className="me-2 fw-bold">دقیقه</span>
                                        <img className="ms-1 me-auto" src={spinnerIcon} height="20px" alt="spinner-icon" />
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item name="share" id="M"  >دقیقه</Dropdown.Item>
                                        <Dropdown.Item name="share" id="H" >ساعت</Dropdown.Item>
                                        <Dropdown.Item name="share" id="D"  >روز</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                        </Col>
                    </Row>
                    <Row className="m-0 mt-3 d-flex flex-column">
                        <Col className={`col-12 d-flex align-items-center justify-content-start me-3 `}>
                            <span className=" fw-bold fs-15px">مقدار پیش فرض آماده سازی</span>
                        </Col>
                        <Col className="m-0 pt-3 d-flex justify-content-between ">
                            <Col className="p-0 col-5 d-flex align-items-center justify-content-start" style={{ widyh: "45%" }}>
                                <Form.Group controlId="defaultReminder" className="form-grp--setting--mobile">
                                    <Form.Control type="number" className="order-setting-field--desktop m-auto" disabled={true} />
                                    <span className="ms-3"></span>
                                </Form.Group>
                            </Col>
                            <Col className="m-0 p-0 col-5" style={{ widyh: "45%" }} >
                                <Dropdown className="text-center w-100" show={false}>
                                    <Dropdown.Toggle className="w-100 px-1 d-flex align-items-center dropdown--btn--sms--setting" id="share">
                                        <span className="me-2 fw-bold">دقیقه</span>
                                        <img className="ms-1 me-auto" src={spinnerIcon} height="20px" alt="spinner-icon" />
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item name="share" id="M"  >دقیقه</Dropdown.Item>
                                        <Dropdown.Item name="share" id="H" >ساعت</Dropdown.Item>
                                        <Dropdown.Item name="share" id="D"  >روز</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                        </Col>
                    </Row>
                    <Row className="m-0 p-0 w-100 py-2 ">
                        <Col className="m-0  col-12">
                            <Button variant="primary" type="submit" className="w-100 m-0 p-0 py-2 my-2 btn-dark-blue notes-round" onClick={HandleSubmit} disabled={editsettingOrder.loading}>
                                {
                                    editsettingOrder.loading ?
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
                </>
            }
            {/* {orderSms ?
                <Form onSubmit={HandleSubmit} className="order-setting">
                    {orderSms &&
                        (<>
                            <Form.Group controlId="preSms" className="mt-2" >
                                <Row className="m-0 px-4">
                                    <Col className="col-1">
                                        <Form.Check.Input name="preSms" defaultChecked={orderSms.preSms.status} onChange={handleChange} className="test" type="checkbox" />
                                        <span className="check"></span>
                                    </Col>
                                    <Col className="col-8 text-end">
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
                                    <Col className="col-1">
                                        <img
                                        className={`${orderSms.postDeliverySms.status ? "edit-permission-tick-show" : "edit-permission-tick-fade"}`}
                                        src={tickIcon}
                                        alt="tick-btn"
                                        height="30px" />

                                        <Form.Check.Input name="postDeliverySms" defaultChecked={orderSms.postDeliverySms.status} onChange={handleChange} className="test" type="checkbox" />
                                        <span className="check"></span>
                                    </Col>
                                    <Col className="col-8 text-end">
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
                                    <Col className="col-1">
                                        <img
                                        className={`${orderSms.postCustomerSms.status ? "edit-permission-tick-show" : "d-none"}`}
                                        src={tickIcon}
                                        alt="tick-btn"
                                        height="30px" />
                                        <Form.Check.Input name="postCustomerSms" defaultChecked={orderSms.postCustomerSms.status} onChange={handleChange} className="test" type="checkbox" />
                                        <span className="check"></span>
                                    </Col>
                                    <Col className="col-8 text-end">
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
                                    <Col className="col-7 order-setting-field-label align-self-center">
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
                                    <Col className="col-7 order-setting-field-label  align-self-center">
                                        مقدار پیش فرض یاد آوری
                                    </Col>
                                    <Col className="col-5">
                                        <Form.Group controlId="defaultReminder">
                                            <Form.Control type="number" className="order-setting-field m-auto" placeholder="دقیقه" />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="mt-3 mx-0">
                                    <Col className="col-7 order-setting-field-label align-self-center">
                                        مقدار پیش فرض آماده سازی
                                    </Col>
                                    <Col className="col-5">
                                        <Form.Group>
                                            <Form.Control type="number" className="order-setting-field m-auto" placeholder="دقیقه" />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="mt-3 mx-0">
                                    <Col className="col-7 order-setting-field-label align-self-center">
                                        تمام شدن وقت اشتراک گذاری بعد از
                                    </Col>
                                    <Col className="col-5">
                                        <Form.Group>
                                            <Form.Control name="" type="number" className="order-setting-field m-auto" placeholder="دقیقه" />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Form.Group>


                            <Button variant="primary" type="submit" className="edit-sms-submit-btn mb-5">
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
                        </>)
                    }

                </Form>
                :
                <Spinner className="m-auto d-block" animation="border" />
            } */}
        </Container >

    )
}
