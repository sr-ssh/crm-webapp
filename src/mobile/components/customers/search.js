import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { Modal, Button, Row, Col, Form } from 'react-bootstrap'
import moment from 'jalali-moment';
import DatePicker from "react-multi-date-picker";
import persianJs from 'persianjs/persian.min';

// Actions
import { customerActions } from '../../../actions/customerActions';
// Icons
import closeIcon from '../../assets/images/close.svg'

export const CustomerSearch = (props) => {

    const { filters, setFilters } = props
    let [check1, setCheck1] = useState(false)
    let [check0, setCheck0] = useState(false)
    let [check2, setCheck2] = useState(true)
    const dispatch = useDispatch()

    const handleChange = (e) => {
        console.log("handlechange", e.target)

        if (e.target.id === 'active1') {
            setFilters({ ...filters, orderStatus: 1 })
            setCheck0(false)
            setCheck1(true)
            setCheck2(false)
        }
        else if (e.target.id === 'active0') {
            setFilters({ ...filters, orderStatus: 0 })
            setCheck0(true)
            setCheck1(false)
            setCheck2(false)
        }
        else if (e.target.id === 'active2') {
            setFilters({ ...filters, orderStatus: 2 })
            setCheck0(false)
            setCheck1(false)
            setCheck2(true)
        }
        else if (e.target.name === 'mobile') {
            setFilters({ ...filters, [e.target.name]: e.target.value ? persianJs(e.target.value).toEnglishNumber().toString() : null })

        }
        else {
            setFilters({ ...filters, [e.target.name]: e.target.value })
        }

        console.log(filters)
    }

    const formHandler = (e) => {
        e.preventDefault();
        dispatch(customerActions.getCustomers(filters))
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
                                <Form.Control style={{ "width": "94%" }} className="order-input h-100" type="text" name="family" value={filters.family} onChange={handleChange} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="my-2">
                        <Col className="col-6  order-filter-input">
                            <Form.Group>
                                <Form.Label className="pe-2">موبایل</Form.Label>
                                <Form.Control style={{ "width": "94%" }} className="order-input h-100" type="tel"
                                    inputMode="tel"
                                    pattern="[0-9]*" name="mobile" value={filters.mobile} onChange={handleChange} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="my-3 justify-content-between">
                        <Col className="col-6 order-filter-input">
                            <Form.Group className="ms-2">
                                <Form.Label className="pe-2">تاریخ عضویت از</Form.Label>
                                <DatePicker
                                    inputClass="search-input"
                                    className="rmdp-mobile"
                                    calendar="persian"
                                    locale="fa"
                                    value={filters.createdAtFrom && filters.createdAtFrom !== "1900-01-01T05:42:13.845Z" && moment(filters.createdAtFrom, 'YYYY-MM-DD').locale('fa').format('YYYY/MM/DD')}
                                    calendarPosition="auto-right"
                                    editable={false}
                                    animation
                                    onChange={value => submitCalendar(value, 'createdAtFrom')}
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
                                    value={filters.createdAtTo && filters.createdAtTo !== "1900-01-01T05:42:13.845Z" && moment(filters.createdAtTo, 'YYYY-MM-DD').locale('fa').format('YYYY/MM/DD')}
                                    calendarPosition="auto-right"
                                    editable={false}
                                    animation
                                    onChange={value => submitCalendar(value, 'createdAtTo')}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="my-3 justify-content-between">
                        <Col className="col-6 order-filter-input">
                            <Form.Group className="ms-2">
                                <Form.Label className="pe-2">تاریخ آخرین خرید از</Form.Label>
                                <DatePicker
                                    inputClass="search-input"
                                    className="rmdp-mobile"
                                    calendar="persian"
                                    locale="fa"
                                    value={filters.lastBuyFrom && filters.lastBuyFrom !== "1900-01-01T05:42:13.845Z" && moment(filters.lastBuyFrom, 'YYYY-MM-DD').locale('fa').format('YYYY/MM/DD')}
                                    calendarPosition="auto-right"
                                    editable={false}
                                    animation
                                    onChange={value => submitCalendar(value, 'lastBuyFrom')}
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
                                    value={filters.lastBuyTo && filters.lastBuyTo !== "1900-01-01T05:42:13.845Z" && moment(filters.lastBuyTo, 'YYYY-MM-DD').locale('fa').format('YYYY/MM/DD')}
                                    calendarPosition="auto-right"
                                    editable={false}
                                    animation
                                    onChange={value => submitCalendar(value, 'lastBuyTo')}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="my-3 justify-content-between">
                        <Col className="col-6 order-filter-input">
                            <Form.Group className="ms-2">
                                <Form.Label className="pe-2">تعداد خرید از</Form.Label>
                                <Form.Control style={{ "width": "94%" }} className="order-input h-100" type="number" name="orderFrom" min="0" value={filters.orderFrom} onChange={handleChange} />
                            </Form.Group>
                        </Col>
                        <Col className="col-6 order-filter-input">
                            <Form.Group className="me-2">
                                <Form.Label className="pe-2">تا</Form.Label>
                                <Form.Control style={{ "width": "94%" }} className="order-input h-100" type="number" name="orderTo" value={filters.orderTo} onChange={handleChange} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="my-3 justify-content-between">
                        <Col className="col-6 order-filter-input">
                            <Form.Group className="ms-2">
                                <Form.Label className="pe-2">جمع خرید از</Form.Label>
                                <Form.Control style={{ "width": "94%" }} className="order-input h-100" type="number" name="totalFrom" min="0" value={filters.totalFrom} onChange={handleChange} />
                            </Form.Group>
                        </Col>
                        <Col className="col-6 order-filter-input">
                            <Form.Group className="me-2">
                                <Form.Label className="pe-2">تا</Form.Label>
                                <Form.Control style={{ "width": "94%" }} className="order-input h-100" type="number" name="totalTo" value={filters.totalTo} onChange={handleChange} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="my-3 justify-content-center">
                        <Col className="ms-3 order-filter-input">
                            <Form.Group className="fw-bold" onChange={handleChange}>
                                <Form.Check.Input name="activity" id="active1" defaultChecked={check1} inline type="radio" />
                                <Form.Check.Label htmlFor="active1" inline className="me-1">سفارش موفق</Form.Check.Label>
                            </Form.Group>
                        </Col>
                        <Col className="order-filter-input">
                            <Form.Group className="fw-bold" onChange={handleChange}>
                                <Form.Check.Input name="activity" id="active0" defaultChecked={check0} inline type="radio" />
                                <Form.Check.Label htmlFor="active0" inline className="me-1">سفارش ناموفق</Form.Check.Label>
                            </Form.Group>
                        </Col>
                        <Col className="ms-3 order-filter-input">
                            <Form.Group className="fw-bold" onChange={handleChange} >
                                <Form.Check.Input name="activity" id="active2" defaultChecked={check2} inline type="radio" />
                                <Form.Check.Label htmlFor="active2" inline className="me-1">همه سفارش ها</Form.Check.Label>
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