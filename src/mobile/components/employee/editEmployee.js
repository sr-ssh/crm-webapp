import React, { useState, useEffect } from 'react'
import { Modal, Button, Row, Col, Alert, Form, Spinner, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import persianJs from 'persianjs/persian.min';
// Actions
import { employeeActions } from '../../../actions/employeeActions';
// Heloers
import { translate } from '../../../helpers';
// Icons
import closeIcon from '../../assets/images/close.svg'
import tickIcon from '../../assets/images/tick.svg'

export const EditEmployee = (props) => {
    const [validated, setValidated] = useState(false)
    const dispatch = useDispatch()
    let [newPermission, setNewPermission] = useState(props.employee.permission)
    let editEmployeeLoading = useSelector(state => state.editEmployee.loading)
    let alert = useSelector(state => state.alert)

    const handleChange = (e) => {
        if (e.target.type != "checkbox") {
            e.preventDefault()
        }
        setNewPermission({ ...newPermission, [e.target.name]: e.target.checked })
    }


    const formHandler = (e) => {
        e.preventDefault()
        let employee = { permissions: newPermission, _id: props.employee._id }
        dispatch(employeeActions.editEmployee(employee))
    }

    useEffect(() => {
        if (!newPermission)
            setNewPermission(props.employee.permission)
    }, [newPermission, props.show])

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="mx-3 order-serach-modal"
        >
            <Modal.Body className="add-product px-4 permission-card applications-text-gray">
                <Button className="border-0 customer-modal-close" type="button" onClick={e => props.onHide(false)}>
                    <img className="d-flex m-auto customer-modal-close-svg" src={closeIcon} alt="close-btn" />
                </Button>
                {
                    alert.message &&
                    <>
                        {/* <div className="modal-backdrop show"></div> */}
                        <Row className="justify-content-center text-center ">
                            <Alert variant={alert.type}>
                                {alert.message}
                            </Alert>
                        </Row>
                    </>
                }
                <Form onSubmit={formHandler} noValidate validated={validated}>
                    <Row >
                        <Col xs={2}>
                            نام :
                        </Col>
                        <Col>
                            <span>{props.employee.family}</span>
                        </Col>
                    </Row>
                    <Row className="my-2">
                        <Col xs={3}>
                            موبایل:
                        </Col>
                        <Col>
                            <span>{props.show && persianJs(props.employee.mobile).englishNumber().toString()}</span>
                        </Col>
                    </Row>
                    <Card className="m-auto mt-3 productCard border-0 lh-lg pb-2" >
                        <Card.Body className="pb-0 ps-0 emplyees-text-gray">
                            <Row>
                                <Col xs={5} className="ps-0">
                                    <Card.Text>
                                        سطح دسترسی:
                                    </Card.Text>
                                </Col>
                                <Col className="pe-0">
                                    {
                                        props.show && newPermission && Object.keys(newPermission).map((key, index) => {
                                            return (
                                                <Form.Group key={index} className="fw-bold" onChange={handleChange}>
                                                    <Row className="my-1">
                                                        <Col xs={3}>
                                                            <img
                                                                htmlFor={`${index}`}
                                                                className={`${newPermission[key] ? "edit-permission-tick-show" : "d-none"}`} src={tickIcon}
                                                                alt="close-btn"
                                                                height="30px" />
                                                            <Form.Check.Input name={key} id={`${index}`} defaultChecked={newPermission[key]} type="checkbox" className="mx-2 mt-2" />
                                                        </Col>
                                                        <Col>
                                                            <Form.Check.Label className="ms-2" htmlFor={`${index}`}>
                                                                <span>{translate(key)}</span>
                                                            </Form.Check.Label>
                                                        </Col>
                                                    </Row>
                                                </Form.Group>
                                            )
                                        })
                                    }
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                    {
                        editEmployeeLoading ? (
                            <Button className="fw-bold order-submit border-0 w-100 mt-3" size="lg" type="submit" disabled>
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
                            <Button className="fw-bold order-submit border-0 w-100 mt-3" size="lg" type="submit" block>
                                ثبت
                            </Button>
                        )
                    }
                </Form>
            </Modal.Body>
        </Modal>
    )
}
