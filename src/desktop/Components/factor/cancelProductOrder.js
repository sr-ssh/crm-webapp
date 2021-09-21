import React from 'react'
import { Modal, Row, Col, Form, Button, Spinner, Alert } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
// Actions
import { orderActions, alertActions } from '../../../actions'

export const CancelProductOrder = (props) => {
    const dispatch = useDispatch()

    let cancelLoading = useSelector(state => state.cancelProductOrder.loading)
    let { message: alertMessage, type: alerType } = useSelector(state => state.alert)


    const editHandler = (e) => {
        props.onHide(false)
        if (alerType === "success")
            dispatch(orderActions.getOrders())
        dispatch(alertActions.clear());
    }
    const formHandler = (e) => {
        e.preventDefault()
        dispatch(orderActions.cancelProductOrder(props.orderId, props.productId))
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            backdrop="static"
            centered
            className="mx-3 order-serach-modal"
        >
            <Modal.Body className="add-product px-4">


                <Row>
                    <Col className="text-center">
                        <span className="">آیا از حذف کالا مطمئنید؟</span>
                    </Col>
                </Row>
                <Form onSubmit={formHandler} className="d-flex justify-content-around">
                    <Button className="fw-bold order-submit border-0 w-25 mt-4 text-light" onClick={e => props.onHide(false)} size="lg" block>
                        خیر
                    </Button>
                    {
                        cancelLoading ? (
                            <Button className="fw-bold order-submit border-0 w-50 mt-4" size="lg" disabled>
                                <Spinner
                                    as="span"
                                    animation="grow"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                                در حال حذف...
                            </Button>
                        ) : (
                            <Button className="fw-bold order-submit border-0 bg-danger text-light w-25 mt-4" size="lg" type="submit" block>
                                بله
                            </Button>
                        )
                    }
                </Form>


            </Modal.Body>
        </Modal>
    )
}
