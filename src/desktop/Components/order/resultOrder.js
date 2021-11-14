import React from 'react'
import { Modal, Row, Col, Form, Button, Spinner, Alert } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'

// Actions
import { orderActions } from '../../../actions'
// Icons
import closeIcon from '../../assets/images/close.svg'
import cancelIcon from '../../assets/images/order/cancel.svg'
import submitIcon from './../../assets/images/order/submit.svg'


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
        dispatch(orderActions.editOrderStatus(props.order.id, "0" ))
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
            <Modal.Body className="add-product px-4">
                <Button className="border-0 customer-modal-close--desktop" type="button" onClick={e => props.onHide(false)}>
                    <img className="d-flex m-auto customer-modal-close-svg--desktop" src={closeIcon} alt="close-btn" />
                </Button>
                <Row className="d-flex flex-column justify-content-center align-items-center">
                    <Col className="d-flex justify-content-center">
                        <Button className="fw-bold order-submit border-0 w-75 mt-4 text-light fs-6 bg-success d-flex align-items-center " onClick={e => { successful() }} size="lg" block>
                            <img src={submitIcon} height="30px" alt="edit-order-icon" className="mx-2" />
                            <span>   موفق بود</span>
                        </Button>
                    </Col>
                    <Col className="d-flex justify-content-center">
                        <Button className="fw-bold order-submit border-0 bg-danger text-light w-75 mt-4 mb-3 fs-6 bg-danger d-flex align-items-center" size="lg"
                            onClick={e => { failure() }}
                            type="submit" block>
                            <img src={cancelIcon} height="28px" alt="edit-order-icon" className="mx-2" />
                            <span>نا موفق بود</span>
                        </Button>


                    </Col>

                </Row>
            </Modal.Body>
        </Modal >
    )
}