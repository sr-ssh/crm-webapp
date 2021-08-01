import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, Row, Col, Form, Button, Spinner, Alert } from 'react-bootstrap'
import { history, translate } from '../../helpers'

//Assets
import closeIcon from '../../assets/images/close.svg'

//actions
import { orderActions } from '../../actions'

export const EditField = (props) => {

    const [validated, setValidated] = useState(false)
    const [input, setInput] = useState(props.input)
    const [name, setName] = useState(props.name)

    let addEmployeeLoading = useSelector(state => state.addEmployee.loading)
    let alert = useSelector(state => state.alert)
    const dispatch = useDispatch()
    const handleChange = (e) => {
        e.preventDefault()
        // console.log(e.target.value, e.target.name);
        // // const number = value;
        // // const patt = /^(09)(\d{9})/m;
        // // let res = patt.test(number) && number.length === 11;
        setInput(e.target.value)
    }

    const formHandler = (e) => {
        e.preventDefault()
        let form = e.currentTarget
        if (form.checkValidity() === false) {
            e.stopPropagation()
        } else {
            if (name == "price")
                dispatch(orderActions.editOrderPrice(props.orderId, props.productId, input))
            else if (name == "quantity")
                dispatch(orderActions.editOrderQuantity(props.orderId, props.productId, input))
            setValidated(false)
            props.onHide(false)
            dispatch(orderActions.getOrders())
        }
        setValidated(true)
    }

    useEffect(() => {
        setInput(props.input)
        setName(props.name)
    }, [props.input, props.name])



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
                {
                    props.show &&
                    <Form onSubmit={formHandler} noValidate validated={validated}>
                        <Row className="mt-3">
                            <Col className="order-filter-input">
                                <Form.Group controlId="name">
                                    <Form.Label className="pe-3">{translate(name)}</Form.Label>
                                    <Form.Control className="order-input" type="text" name={name} defaultValue={input} onChange={handleChange} required />
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
                                    ثبت
                                </Button>
                            )
                        }
                    </Form>
                }

            </Modal.Body>

        </Modal>
    )
}
