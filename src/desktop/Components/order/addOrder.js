import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Container, Form, Button, Row, Col, Alert, Spinner } from 'react-bootstrap';
import DatePicker from "react-multi-date-picker";
import moment from 'jalali-moment';
import "react-multi-date-picker/styles/layouts/mobile.css";
import persianJs from 'persianjs/persian.min';

// Actions
import { alertActions } from '../../../actions/alertActions';
import { orderActions, customerActions } from '../../../actions';

// Components
import { Basket } from './basket';
import { AddNotesModal } from './addNotesModal'
import { Header } from '../base/header'
import {ModalContinueProcessesAddOrder} from './modalContinueProcesses'

// Assets
import downloadIcon from '../../assets/images/download.svg'
import addIcon from '../../assets/images/order/add.svg'

export const AddOrder = (props) => {

    const [validated, setValidated] = useState(false);
    const [mobileValidated, setMobileValidated] = useState(false);
    const [nameValidated, setNameValidated] = useState(false);
    const [order, insertOrder] = useState([])
    const [customer, setCustomer] = useState({ birthday: "" })
    const [totalPrice, insertPrice] = useState("0")
    const [selectedItem, setItem] = useState("")
    const [quantity, setQuantity] = useState(1)
    const [notes, setNotes] = useState([])
    const [showNotesModal, setShowNotesModal] = useState(false)
    const [modalContinueProcesses,setModalContinueProcesses] = useState(false)
    const dispatch = useDispatch()
    let oldCustomer = useSelector(state => state.getCustomer.customer)
    let { loading } = useSelector(state => state.getCustomer)
    let addOrderLoading = useSelector(state => state.addOrder.loading)
    let addOrder = useSelector(state => state.addOrder)
    const sideBar = useSelector(state => state.sideBar)


    let mobileHandler = (value) => {
        const number = value;
        // const patt = /^(09)(\d{9})/m;
        // patt.test(number) &&
        let res = number.length === 11;
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
            dispatch(customerActions.getCustomer(customer.mobile))
        else
            setMobileValidated(true)
    }

    let handleChange = (e) => {
        e.preventDefault()
        let value = e.target.value
        let name = e.target.name
        if (name === "mobile") {
            value = value ? mobileHandler(persianJs(value).toEnglishNumber().toString()) : undefined

        }
        if (name === "family") {
            value = nameHandler(value)
        }
        setCustomer({ ...customer, [name]: value })
    }

    let formHandler = (e) => {
        e.preventDefault()

        if (order.length && customer.family && customer.mobile) {
            if (e.target.id === 'saleOpprotunity'){
                dispatch(orderActions.addOrder(order, customer, notes, 3 , 0 ))
            }else{
                dispatch(orderActions.addOrder(order, customer, notes))
            }
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


    function clearInputes() {
        setCustomer({ mobile: "", address: "", family: "", reminder: "", duration: "", company: "", lastAddress: "" })
        insertOrder([])
        setNotes([])
        insertPrice("0")
        setItem("")
        setQuantity(1)
        oldCustomer = null;        
    }
    // const submitCalendar = (value, name) => {
    //     let birthDate = `${value.year}/${value.month.number}/${value.day}`
    //     birthDate = moment.from(birthDate, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY-MM-DD');
    //     setCustomer({ ...customer, [name]: birthDate })
    // }
    useEffect(() => {
        if (oldCustomer?.mobile)
            setCustomer({ ...customer, ...oldCustomer, address: oldCustomer.lastAddress })
    }, [oldCustomer])

    useEffect(() => {
         if(addOrderLoading == false  &&  addOrder.error?.dialogTrigger == true ){
            setModalContinueProcesses(true)
         }else if (addOrderLoading == false  &&  addOrder.error?.dialogTrigger == undefined ){
            clearInputes()
         }
    }, [addOrderLoading])

    
    useEffect(() => {
        if(props.location?.state?.mobile){
            setCustomer({ ...customer, ...props.location.state })
        }
   }, [])


    return (
        <>
            <Header isBTNSearch={false} isBTNRequest={false} />
            <div className="order-page--desktop margin--top--header " style={{ paddingRight: sideBar.open ? "250px" : 0 }}>
                <Container fluid className="pt-3 px-3 m-0">
                    <Form onSubmit={formHandler} noValidate className="d-flex flex-column align-items-center" >
                        <Row className="d-flex flex-column" style={{ width: "65%", height: "100vh" }}>
                            <Row className="col-12 m-0 p-0 mt-2 order-inputs d-flex flex-row justify-content-between align-items-center">
                                <Col className="col-4 add-order-input--desktop">
                                    <Form.Group className="p--relative">
                                        <Form.Label className="me-3">موبایل</Form.Label>
                                        <Form.Control className="order-input" type="tel" name="mobile"
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
                                <Col className=" col-4 add-order-input--desktop">
                                    <Form.Group >
                                        <Form.Label className="me-3">نام</Form.Label>
                                        <Form.Control className="order-input" type="text" name="family"
                                            onChange={handleChange}
                                            isInvalid={((!customer.family && validated) || (nameValidated) && true)}
                                            isValid={((customer.family && validated) || (nameValidated && customer.family) && true)}
                                            value={customer.family}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                                <Col className=" col-4  add-order-input--desktop">
                                    <Form.Group controlId="birthday">
                                        <Form.Label className="me-3">نام شرکت</Form.Label>
                                        {/* <DatePicker
                                    style={{
                                        width: "100%"
                                    }}
                                    inputClass="search-input"
                                    className="rmdp-mobile"
                                    calendar="persian"
                                    locale="fa"
                                    value={customer.birthday !== "1900-01-01T05:42:13.845Z" && customer.birthday ? moment(customer.birthday, 'YYYY-MM-DD').locale('fa').format('YYYY/MM/DD') : null}
                                    calendarPosition="auto-right"
                                    editable={false}
                                    animation
                                    maxDate={new Date()}
                                    onChange={value => submitCalendar(value, 'birthday')}
                                /> */}
                                        <Form.Control className="order-input" type="text" name="company"
                                            onChange={handleChange}
                                            value={customer.company}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="col-12 m-0 pt-2 mt-4 order-inputs">
                                <Col className="p-0 add-order-input">
                                    <Form.Group controlId="address">
                                        <Form.Label className="me-3">آدرس</Form.Label>
                                        <Form.Control className="order-input" type="text" name="address"
                                            onChange={handleChange}
                                            isInvalid={false}
                                            isValid={false}
                                            value={customer.address}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="col-12 m-0 mt-4 basketContainer">
                                <Form.Label className="me-2">سبد خرید</Form.Label>
                                <Col>
                                    <Basket order={order} insertOrder={insertOrder} totalPrice={totalPrice} insertPrice={insertPrice} selectedItem={selectedItem} setItem={setItem} quantity={quantity} setQuantity={setQuantity} />
                                </Col>
                            </Row>
                            <Row className="m-0 p-0 " >
                                <Col className="mt-3 w-100">
                                    <Button className={`d-flex flex-row w-100 align-items-center justify-content-center btn--add--note--desktop  `} onClick={noteHandler}>
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
                                                    <span className="me-1 fw-bold ms-3">
                                                        اضافه یادداشت
                                                    </span>

                                                </>
                                        }
                                    </Button>
                                </Col>
                            </Row>
                            <Row className="m-0 p-0 align-self-start flex-row" >
                                <Col className="d-flex flex-row align-items-center" style={{ height: "fit-content" }}>
                                    <Col className="m-0 col-6 order-inputs">
                                        <Form.Group controlId="duration">
                                            <Form.Label className="pe-1"> آماده سازی</Form.Label>
                                            <Form.Control className="order-input me-2" type="number" min="0" name="duration"
                                                onChange={handleChange}
                                                isInvalid={false}
                                                isValid={false}
                                                value={customer.duration}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col className="align-self-center m-0  mt-3 me-2 col-2 text-center  order-input">
                                        <span className="reminder-span fs-7 fw-bold">دقیقه</span>
                                    </Col>
                                </Col>
                                <Col className="d-flex flex-row align-items-center justify-content-end" style={{ height: "fit-content" }}>
                                    <Col className="m-0 col-6 order-inputs">
                                        <Form.Group controlId="reminder">
                                            <Form.Label className="pe-1">تاریخ یادآوری</Form.Label>
                                            <Form.Control className="text-center order-input" type="number" name="reminder" min="0"
                                                onChange={handleChange}
                                                isInvalid={false}
                                                isValid={false}
                                                value={customer.reminder}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={2} className="align-self-center m-0  mt-3 me-2  col-2 text-center  order-input">
                                        <span className="reminder-span fs-7 fw-bold" >روز دیگر</span>
                                    </Col>
                                </Col>
                            </Row>
                            <Row className="m-0 mt-4 justify-content-center w-100">


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
                                        <Col className="col-7 m-0 p-0 ps-1">
                                            <Button className="fw-bold order--btn order-submit--desktop border-0 w-100" size="lg" type="submit" block onClick={formHandler}>
                                                ثبت
                                            </Button>


                                        </Col>
                                        <Col className="col-5 m-0 p-0 pe-1">
                                            <Button className="order--btn border-0 w-100 btn-secondary order--sale--opportunity" id="saleOpprotunity" size="lg" type="submit" block onClick={formHandler}>
                                                فرصت فروش
                                            </Button>
                                        </Col>
                                    </>
                                }
                            </Row>
                        </Row>


                    </Form>
                </Container>
                <AddNotesModal show={showNotesModal} onHide={() => { setShowNotesModal(false) }} setNotes={setNotes} />
                <ModalContinueProcessesAddOrder show={modalContinueProcesses} onHide={() => { setModalContinueProcesses(false) }} order={order} customer={customer} notes={notes} clearInputes={clearInputes} />
            </div >
        </>
    )
}
