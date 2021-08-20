import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { Modal, Button, Row, Col, Form, Dropdown } from 'react-bootstrap'
// Actions
import { discountActions } from '../../../actions/discountActions';

// Icons
import closeIcon from '../../assets/images/close.svg'
import spinnerIcon from './../../assets/images/sppiner.svg'

export const AddDiscount = (props) => {

    const [dimStatus, setDimStatus] = useState(false)
    const [filters, setFilters] = useState({ "sms": false })
    const [selectedItem, setItem] = useState(-1)
    const [validated, setValidated] = useState(false);
    const [customerValidated, setCustomerValidated] = useState(false);
    const [nameValidated, setNameValidated] = useState(false);
    const [percentageValidated, setPercentageValidated] = useState(false);
    const [discountTypeValidated, setDiscountTypeValidated] = useState(false);

    const dispatch = useDispatch()


    let discountNameHandler = value => {
        // Discount Name = dName
        const dName = value;
        const patt = /^[آ-یa-zA-Z0-9 ]+$/;
        let res = patt.test(dName.trim());
        if (res) {
            setNameValidated(false)
            return value
        }
        else {
            return undefined
        }
    }
    let discountPercentageHandler = value => {
        // Discount Percentage = dPercentage
        const dPercentage = value;
        const patt = /^[0-9]+$/m;
        let res = patt.test(dPercentage.trim()) && dPercentage >= 0 && dPercentage <= 100;
        if (res) {
            setPercentageValidated(false)
            return value
        }
        else {
            return undefined
        }
    }
    let customerHandler = value => {
        // Customer phone number = cPhoneNumber
        const cPhoneNumber = value;
        const patt = /^[0-9]+$/m;
        let res = patt.test(cPhoneNumber.trim()) && cPhoneNumber.length == 11;
        if (res) {
            setCustomerValidated(false)
            return value
        }
        else {
            return undefined
        }
    }

    const handleChange = (e) => {
        let value = e.target.value;
        let name = e.target.name

        if (name === "name")
            value = discountNameHandler(value)

        if (name === "percentage")
            value = discountPercentageHandler(value)

        if (name === "customer")
            value = customerHandler(value)

        if (e.target.type === 'checkbox')
            setFilters({ ...filters, [name]: e.target.checked })
        else
            setFilters({ ...filters, [name]: value })
    }

    const handleDropdown = (n) => {
        setItem(n)
        setDiscountTypeValidated(false);
        setFilters({ ...filters, "type": n })
    }

    const formHandler = (e) => {
        e.preventDefault();
        if (filters.name && filters.percentage && selectedItem !== -1) {
            if (selectedItem === 0 && !filters.customer)
                return setValidated(true)
            setFilters({ ...filters, type: selectedItem })
            dispatch(discountActions.addDiscount(filters))
            props.onHide(false)
            setFilters({ name: "", percentage: "", customer: "", type: "", "sms": false })
        }
        else {
            if (selectedItem === -1)
                setDiscountTypeValidated(true);
            setValidated(true)

        }
    }
    const closewindowHandle = () => {
        props.onHide(false);
        setItem(-1)
        setDiscountTypeValidated(false);
        setValidated(false);
    }
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered className="mx-3 order-serach-modal"
        >
            <Modal.Body className="order-filter-body add-discount">
                <Button className="border-0 customer-modal-close" type="button" onClick={closewindowHandle}>
                    <img className="d-flex m-auto customer-modal-close-svg" src={closeIcon} alt="close-btn" />
                </Button>
                <Form onSubmit={formHandler} >
                    <Row className="my-3 justify-content-between">
                        <Col className="col-6 order-filter-input">
                            <Form.Group className="ms-2">
                                <Form.Label className="pe-2">نام تخفیف</Form.Label>
                                <Form.Control style={{ "width": "94%" }} className="order-input h-100" type="text" name="name"
                                    min="0"
                                    value={filters.totalFrom}
                                    onChange={handleChange}
                                    isInvalid={((!filters.name && validated) || (nameValidated) && true)}
                                    isValid={((filters.name && validated) || (nameValidated && filters.name) && true)}
                                />
                            </Form.Group>
                        </Col>
                        <Col className="col-6 order-filter-input">
                            <Row>
                                <Col>
                                    <Form.Label className="pe-2">نوع </Form.Label>
                                </Col>
                                <Col className="ps-4 pt-1 text-start">
                                    <img className="me-auto" src={spinnerIcon} height="13px" alt="spinner-icon" />
                                </Col>
                            </Row>
                            <Dropdown onToggle={(e) => setDimStatus(!dimStatus)} >
                                {/* ${quantityOrder ? 'border border-danger' : null} */}
                                <Dropdown.Toggle className={`d-flex order-filter-input ${discountTypeValidated ? 'border border-danger' : null} `} >
                                    {selectedItem !== -1 ? <span>{selectedItem ? 'تولد' : 'فرد'}</span> : null}
                                </Dropdown.Toggle>
                                <Dropdown.Menu className={`${dimStatus ? "dim" : ""} dropdownProductMenu`}>
                                    <Dropdown.Item onClick={() => handleDropdown(0)} >
                                        <Col className="text-end pe-1 order-filter-input">فرد</Col>
                                    </Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item onClick={() => handleDropdown(1)} >
                                        <Col className="text-end pe-1 order-filter-input">تولد</Col>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                        </Col>
                    </Row>
                    <Row className="my-3 justify-content-between">
                        {
                            !selectedItem
                                ? <Col className="col-6 order-filter-input">
                                    <Form.Group>
                                        <Form.Label className="pe-2">مشتری</Form.Label>
                                        <Form.Control style={{ "width": "94%" }} className="order-input h-100"
                                            type="number"
                                            name="customer"
                                            value={filters.family}
                                            onChange={handleChange}
                                            isInvalid={((!filters?.customer && validated) || (customerValidated) && true)}
                                            isValid={((filters?.customer && validated) || (customerValidated && filters?.customer) && true)}
                                        />
                                    </Form.Group>
                                </Col>
                                : null
                        }
                        <Col className="col-6 order-filter-input">
                            <Form.Group>
                                <Form.Label className="pe-2">درصد تخفیف</Form.Label>
                                <Form.Control style={{ "width": "94%" }} className="order-input h-100" type="number"
                                    name="percentage"
                                    min="0"
                                    max="100"
                                    value={filters.family}
                                    onChange={handleChange}
                                    isInvalid={((!filters.percentage && validated) || (percentageValidated) && true)}
                                    isValid={((filters.percentage && validated) || (percentageValidated && filters.percentage) && true)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="col-6 order-filter-input mt-1 pe-4">
                            <Form.Group>
                                <Form.Check.Input name="sms" id="sms" defaultChecked={filters.sms} type="checkbox" className="border-1" onChange={handleChange} />
                                <Form.Check.Label className="pe-2" htmlFor="sms">فرستادن sms</Form.Check.Label>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="px-2 mt-4">
                        <Button className="order-filter-button" type="submit">اضافه</Button>
                    </Row>
                </Form>
            </Modal.Body>
        </Modal>
    );
}