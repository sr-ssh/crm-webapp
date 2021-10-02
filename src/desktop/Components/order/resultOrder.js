import React from 'react'
import { Modal, Row, Col, Form, Button, Spinner, Alert } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'

// Actions
import { orderActions } from '../../../actions'
// Icons
import closeIcon from '../../assets/images/close.svg'


export const ResultOrder = (props) => {


    const dispatch = useDispatch()
    let failure = () => {
        dispatch(orderActions.editOrderStatus(props.order.id, "4"))
        setTimeout(() => {
            dispatch(orderActions.getOrders({ status: 3 }))
            props.onHide(false)

        }, 1500);

    }

    let successful = () => {
        dispatch(orderActions.editOrderStatus(props.order.id, "0"))
        setTimeout(() => {
            dispatch(orderActions.getOrders({ status: 3 }))
            props.onHide(false)

        }, 1500);
    }

    return (
        <Modal
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="mx-3 order-serach-modal"
        >
            <Modal.Body className="add-product px-4 my-2">
                <Button className="border-0 customer-modal-close--desktop" type="button" onClick={e => props.onHide(false)}>
                    <img className="d-flex m-auto customer-modal-close-svg--desktop" src={closeIcon} alt="close-btn" />
                </Button>
                <Row className="d-flex flex-column justify-content-center align-items-center">
                    <Col className="d-flex justify-content-center">
                        <Button className="fw-bold order-submit border-0 w-75 mt-4 text-light fs-6 bg-success" onClick={e => { successful() }} size="lg" block>
                            موفق بود
                        </Button>
                    </Col>
                    <Col className="d-flex justify-content-center">
                        <Button className="fw-bold order-submit border-0 bg-danger text-light w-75 mt-4 fs-6 bg-danger" size="lg"
                            onClick={e => { failure() }}
                            type="submit" block>
                            نا موفق بود
                        </Button>


                    </Col>

                </Row>
            </Modal.Body>
        </Modal >
    )
}