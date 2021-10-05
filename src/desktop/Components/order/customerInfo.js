import React, { useEffect, useState } from 'react'
import { Modal, Row, Col, Button, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { customerActions } from '../../../actions'
// Actions
// Icons
import closeIcon from '../../assets/images/close.svg'

export const CustomerInfo = (props) => {

    const [deliveryMobile, setDeliveryMobile] = useState(false)
    const dispatch = useDispatch()

    const handleChange = (e) => {
        e.preventDefault()
        setDeliveryMobile({ ...deliveryMobile, [e.target.id]: e.target.value })
    }


    const formHandler = (e) => {
        e.preventDefault()
        dispatch(customerActions.addCustomerformalInfo({ ...deliveryMobile, customerId: props.customer }))
        props.onHide(true)
    }

    // useEffect(() => {
    //     setDeliveryMobile({ customerId: props.order })
    // }, [setDeliveryMobile, props.customer])

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="mx-3 order-serach-modal--medium"
        >
            <Modal.Body className="add-product px-4">
                <Button className="border-0 customer-modal-close" type="button" onClick={e => props.onHide(false)}>
                    <img className="d-flex m-auto customer-modal-close-svg" src={closeIcon} alt="close-btn" />
                </Button>

                <Form onSubmit={formHandler} >
                    <Row className="mt-3">
                        <Col className="order-filter-input">
                            <Form.Group controlId="nationalCard">
                                <Form.Label className="pe-3">شناسه ملی</Form.Label>
                                <Form.Control className="order-input" type="number" name="mobile" onChange={handleChange} required />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col className="order-filter-input">
                            <Form.Group controlId="financialCode">
                                <Form.Label className="pe-3">شماره اقتصادی</Form.Label>
                                <Form.Control className="order-input" type="number" name="mobile" onChange={handleChange} required />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col className="order-filter-input">
                            <Form.Group controlId="postalCode">
                                <Form.Label className="pe-3">کدپستی</Form.Label>
                                <Form.Control className="order-input" type="number" name="mobile" onChange={handleChange} required />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col className="order-filter-input">
                            <Form.Group controlId="registerNo">
                                <Form.Label className="pe-3">شماره ثبت</Form.Label>
                                <Form.Control className="order-input" type="number" name="mobile" onChange={handleChange} required />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="col-12 m-auto">
                            <Button className="fw-bold order-submit border-0 w-100 mt-4" size="lg" type="submit" block>
                                ثبت
                            </Button>
                        </Col>
                    </Row>
                </Form>

            </Modal.Body>
        </Modal>
    )
}

