import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Container, Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import "react-multi-date-picker/styles/layouts/mobile.css";

// Actions
import { alertActions } from '../../../actions/alertActions';
import { receiptActions, supplierActions } from '../../../actions';

// Components
import { Basket } from './basket';
import { AddNotesModal } from './addNotesModal'
import { Header } from '../base/header'

// Assets
import downloadIcon from '../../assets/images/download.svg'
import addIcon from '../../assets/images/order/add.svg'

export const AddFactor = () => {

    const [validated, setValidated] = useState(false);
    const [mobileValidated, setMobileValidated] = useState(false);
    const [nameValidated, setNameValidated] = useState(false);
    const [order, insertOrder] = useState([])
    const [customer, setCustomer] = useState({ birthday: "" })
    const [totalPrice, insertPrice] = useState("0")
    const [selectedItem, setItem] = useState("")
    const [quantity, setQuantity] = useState(1)
    const [price, setPrice] = useState(0)
    const [notes, setNotes] = useState([])
    const [showNotesModal, setShowNotesModal] = useState(false)
    const dispatch = useDispatch()
    let oldCustomer = useSelector(state => state.getSupplier.supplier)
    let { loading } = useSelector(state => state.getCustomer)
    let addOrderLoading = useSelector(state => state.addOrder.loading)

    let mobileHandler = (value) => {
        const number = value;
        const patt = /^(09)(\d{9})/m;
        let res = patt.test(number) && number.length === 11;
        if (res) {

            setMobileValidated(false)
            return value
        }
        else
            return undefined
    }
    let nameHandler = (value) => {
        const name = value;
        const patt = /^[آ-یa-zA-Z ]+$/;
        let res = patt.test(name);
        if (res) {
            setNameValidated(false)
            return value
        }
        else
            return undefined
    }
    let handleOldCustomer = (e) => {
        e.preventDefault()
        if (customer.mobile)
            dispatch(supplierActions.getSupplier(customer.mobile))
        else
            setMobileValidated(true)
    }

    let handleChange = (e) => {
        e.preventDefault()
        let value = e.target.value
        let name = e.target.name
        if (name === "mobile") {
            value = mobileHandler(value)
        }
        if (name === "family") {
            value = nameHandler(value)
        }
        setCustomer({ ...customer, [name]: value })
    }

    let formHandler = (e) => {
        e.preventDefault()
        if (order.length && customer.family && customer.mobile) {
            dispatch(receiptActions.addReceipt(order, customer, notes[0]))
            setCustomer({ mobile: "", address: "", family: "", company: "" })
            insertOrder([])
            setNotes([])
            insertPrice("0")
            setItem("")
            setQuantity(1)
            setPrice(0)
            oldCustomer = null;
        } else {
            if (customer.mobile && customer.family && !order.length)
                dispatch(alertActions.error('لیست سفارشات خالی است'));
            setTimeout(() => {
                dispatch(alertActions.clear());
            }, 1500);
            console.log('empty order can not be sent')
            setValidated(true);
        }
    }
    let noteHandler = (e) => {
        if (notes.length > 0) {
            dispatch(alertActions.error('بیشتر از یک یادداشت مجاز نیست'));
            setTimeout(() => {
                dispatch(alertActions.clear());
            }, 1100);
        } else
            setShowNotesModal(true)
    }

    // const submitCalendar = (value, name) => {
    //     let birthDate = `${value.year}/${value.month.number}/${value.day}`
    //     birthDate = moment.from(birthDate, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY-MM-DD');
    //     setCustomer({ ...customer, [name]: birthDate })
    // }
    useEffect(() => {
        if (oldCustomer?.mobile)
            setCustomer({ ...customer, ...oldCustomer })
    }, [oldCustomer])
    useEffect(() => {
        if (addOrderLoading)
            insertOrder([])
    }, [addOrderLoading, setCustomer])

    return (
        <>
            <Header isBTNSearch={false} isBTNRequest={false} />
            <div className="order-page--desktop margin--top--header ">
                <Container fluid className="pt-3 px-3 m-0">
                    <Form onSubmit={formHandler} noValidate className="d-flex flex-column align-items-center" >
                        <Row className="d-flex flex-column" style={{ width: "65%", height: "100vh" }}>
                            <Row className="col-12 m-0 p-0 mt-2 order-inputs d-flex flex-row justify-content-between align-items-center px-3">
                                <Col className="col-3 add-order-input--desktop mx-0 px-0">
                                    <Form.Group className="p--relative">
                                        <Form.Label className="me-3">موبایل</Form.Label>
                                        <Form.Control className="order-input radius-16" type="number" name="mobile"
                                            isInvalid={((!customer.mobile && validated) || (mobileValidated) && true)}
                                            isValid={((customer.mobile && validated) || (mobileValidated && customer.mobile) && true)}
                                            onChange={handleChange}
                                            value={customer.mobile}
                                            required
                                        />
                                        {loading ?
                                            <Spinner
                                                className="spinner--download--btn--desktop "
                                                as="div"
                                                variant="primary"
                                                animation="border"
                                                size="sm"
                                            />
                                            : <img src={downloadIcon} className="m-0 p-0  spinner--download--btn--desktop" onClick={(e) => handleOldCustomer(e)} height="25px" alt="down-icon" />
                                        }
                                    </Form.Group>
                                </Col>
                                <Col className="col-3 add-order-input--desktop  mx-0 px-0">
                                    <Form.Group >
                                        <Form.Label className="me-3">نام</Form.Label>
                                        <Form.Control className="order-input radius-16" type="text" name="family"
                                            onChange={handleChange}
                                            isInvalid={((!customer.family && validated) || (nameValidated) && true)}
                                            isValid={((customer.family && validated) || (nameValidated && customer.family) && true)}
                                            value={customer.family}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                                <Col className="col-3  add-order-input--desktop  mx-0 px-0">
                                    <Form.Group controlId="birthday">
                                        <Form.Label className="me-3">نام شرکت</Form.Label>
                                        <Form.Control className="order-input radius-16" type="text" name="company"
                                            onChange={handleChange}
                                            value={customer.company}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="col-12 m-0 pt-2 mt-4 order-inputs px-3">
                                <Col className="p-0 add-order-input  mx-0 px-0">
                                    <Form.Group controlId="address">
                                        <Form.Label className="me-3">آدرس</Form.Label>
                                        <Form.Control style={{"height": '128px'}} className="order-input radius-16" type="text" name="address"
                                            onChange={handleChange}
                                            isInvalid={false}
                                            isValid={false}
                                            value={customer.address}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="col-12 m-0 mt-4 basketContainer">
                                <Col>
                                    <Basket order={order} insertOrder={insertOrder} totalPrice={totalPrice} insertPrice={insertPrice} selectedItem={selectedItem} setItem={setItem} quantity={quantity} setQuantity={setQuantity} price={price} setPrice={setPrice} />
                                </Col>
                            </Row>
                            <Row className="m-0 p-0 " >
                                <Col className="mt-3 w-100">
                                    <Button className={`d-flex flex-row w-100 align-items-center justify-content-center btn--add--note--desktop radius-16 receipt--add--note`} onClick={noteHandler}>
                                        {
                                            notes.length > 0 ?
                                                <>
                                                    <span className="me-1 fw-bold ms-3">
                                                        {notes[0].text}
                                                    </span>
                                                </>
                                                :
                                                <>
                                                    <img className="me-3" src={addIcon} height="25px" alt="edit-icon" />
                                                    <span className="me-3 fw-bold ms-3">
                                                        اضافه یادداشت
                                                    </span>

                                                </>
                                        }
                                    </Button>
                                </Col>
                            </Row>
                            <Row className="m-0 mt-3 justify-content-center w-100">
                                {addOrderLoading ?
                                    <Button className="fw-bold order--btn order-submit--desktop border-0 w-100" size="lg" type="submit" disabled>
                                        <Spinner
                                            as="span"
                                            animation="grow"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />
                                        در حال ثبت ...
                                    </Button>
                                    :
                                    <>
                                        <Col className="col-12 m-0 p-0 ps-1">
                                            <Button className="fw-bold receipt--btn border-0 w-100 fs-6" size="lg" type="submit" block onClick={formHandler}>
                                                ثبت
                                            </Button>
                                        </Col>
                                    </>
                                }
                            </Row>
                        </Row>
                    </Form>
                </Container>
                <AddNotesModal show={showNotesModal} onHide={() => { setShowNotesModal(false) }} setNotes={setNotes} />
            </div >
        </>
    )
}
