import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, Row, Col, Form, Button, Spinner, Alert } from 'react-bootstrap'

// Actions
import { employeeActions } from '../../../actions/employeeActions'
// Icons
import closeIcon from '../../assets/images/close.svg'

export const AddEmployee = (props) => {
    const [validated, setValidated] = useState(false)
    const [employee, setEmployee] = useState({})

    let addEmployeeLoading = useSelector(state => state.addEmployee.loading)
    let alert = useSelector(state => state.alert)
    const dispatch = useDispatch()
    const handleChange = (e) => {
        e.preventDefault()
        setEmployee({ ...employee, [e.target.name]: e.target.value })
    }

    const formHandler = (e) => {
        e.preventDefault()
        let form = e.currentTarget
        if (form.checkValidity() === false) {
            e.stopPropagation()
        } else {
            dispatch(employeeActions.addEmployee(employee))
        }
        setValidated(true)
    }


    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="mx-3 order-serach-modal"
        >
            <Modal.Body className="add-product px-4">
                <Button className="border-0 customer-modal-close" type="button" onClick={e => props.onHide(false)}>
                    <img className="d-flex m-auto customer-modal-close-svg" src={closeIcon} alt="close-btn" />
                </Button>
                {/* {
                    alert.message &&
                    <>
                        <div className="modal-backdrop show"></div>
                        <Row className="justify-content-center text-center ">
                            <Alert variant={alert.type}>
                                {alert.message}
                            </Alert>
                        </Row>
                    </>
                } */}
                <Form onSubmit={formHandler} noValidate validated={validated}>
                    <Row className="mt-3">
                        <Col className="order-filter-input">
                            <Form.Group controlId="name">
                                <Form.Label className="pe-3">شماره موبایل کارمند جدید را وارد کنید:</Form.Label>
                                <Form.Control className="order-input" type="number" name="usernameOrMobile" defaultValue={employee.usernameOrMobile} onChange={handleChange} required />
                            </Form.Group>
                        </Col>
                    </Row>

                    {
                        addEmployeeLoading ? (
                            <Button className="fw-bold order-submit border-0 w-100 mt-4" size="lg" type="submit" disabled>
                                <Spinner
                                    as="span"
                                    animation="grow"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                                در حال انجام عملیات...
                            </Button>
                        ) : (
                            <Button className="fw-bold order-submit border-0 w-100 mt-4" size="lg" type="submit" block>
                                افزودن
                            </Button>
                        )
                    }
                </Form>

            </Modal.Body>

        </Modal>
    )
}
