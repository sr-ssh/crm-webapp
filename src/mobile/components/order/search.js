import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { Modal, Button, Row, Col, Form } from 'react-bootstrap'
//import { DatePicker } from "jalali-react-datepicker";
import DatePicker from "react-multi-date-picker";
import moment from 'jalali-moment';
import persianJs from 'persianjs/persian.min';

// Actions
import { orderActions } from '../../../actions';
// Icons
import closeIcon from '../../assets/images/close.svg'

export const OrderSearch = (props) => {

    const [filters, setFilters] = useState({ status: '' })
    const dispatch = useDispatch()

    const handleChange = (e) => {
        e.preventDefault()
        if (e.target.name == "customerMobile")
            e.target.value = persianJs(e.target.value).toEnglishNumber().toString()
        setFilters({ ...filters, [e.target.name]: e.target.value })
    }

    const formHandler = (e) => {
        e.preventDefault();
        dispatch(orderActions.getOrders(filters))
        props.onHide(false)
    }

    const submitCalendar = (value, name) => {
        let date = `${value.year}/${value.month.number}/${value.day}`
        date = moment.from(date, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY-MM-DD');
        setFilters({ ...filters, [name]: date })
    }
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered className="mx-3 order-serach-modal"
        >
            <Modal.Body className="order-filter-body">
                <Button className="border-0 customer-modal-close" type="button" onClick={e => props.onHide(false)}>
                    <img className="d-flex m-auto customer-modal-close-svg" src={closeIcon} alt="close-btn" />
                </Button>
                <Form onSubmit={formHandler} >
                    <Row>
                        <Col className="col-6 order-filter-input">
                            <Form.Group>
                                <Form.Label className="pe-2">نام مشتری</Form.Label>
                                <Form.Control style={{ "width": "94%" }} className="order-input" type="text" name="customerName" value={filters.customerName} onChange={handleChange} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="my-3">
                        <Col className="col-6  order-filter-input">
                            <Form.Group>
                                <Form.Label className="pe-2">موبایل</Form.Label>
                                <Form.Control style={{ "width": "94%" }} className="order-input"
                                    type="tel"
                                    inputMode="tel"
                                    pattern="[0-9]*"
                                    name="customerMobile" value={filters.customerMobile} onChange={handleChange} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="my-3 justify-content-between">
                        <Col className="col-6 order-filter-input">
                            <Form.Group className="ms-2">
                                <Form.Label className="pe-2">تاریخ سفارش از</Form.Label>
                                <DatePicker
                                    inputClass="search-input"
                                    className="rmdp-mobile"
                                    calendar="persian"
                                    locale="fa"
                                    value={filters.startDate && filters.startDate !== "1900-01-01T05:42:13.845Z" && moment(filters.startDate, 'YYYY-MM-DD').locale('fa').format('YYYY/MM/DD')}
                                    calendarPosition="auto-right"
                                    editable={false}
                                    animation
                                    onChange={value => submitCalendar(value, 'startDate')}
                                />
                            </Form.Group>
                        </Col>
                        <Col className="col-6 order-filter-input">
                            <Form.Group className="me-2">
                                <Form.Label className="pe-2">تا</Form.Label>
                                <DatePicker
                                    inputClass="search-input"
                                    className="rmdp-mobile"
                                    calendar="persian"
                                    locale="fa"
                                    value={filters.endDate && filters.endDate !== "1900-01-01T05:42:13.845Z" && moment(filters.endDate, 'YYYY-MM-DD').locale('fa').format('YYYY/MM/DD')}
                                    calendarPosition="auto-right"
                                    editable={false}
                                    animation
                                    onChange={value => submitCalendar(value, 'endDate')}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="px-2 mt-4">
                        <Button className="order-filter-button" type="submit">جست و جو</Button>
                    </Row>
                </Form>
            </Modal.Body>
        </Modal>
    );
}