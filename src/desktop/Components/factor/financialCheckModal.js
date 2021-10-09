import React, { useState } from 'react'
import { Modal, Card, Col, Form, Button, Spinner, Row } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
// Actions
import { orderActions, receiptActions } from '../../../actions'

// Icons
import closeIcon from '../../assets/images/close.svg'

export const FinancialCheckModal = (props) => {

    const [invoiceType, setInvoiceType] = useState(0)
    const dispatch = useDispatch()
    let loading = useSelector(state => state.confirmShop.loading)


    let toggleHandler = (e) => {
        let type = e.target.id === "pass" ? 1 : e.target.id === "fail" ? 2 : null
        setInvoiceType(type)
    }
    let handleClick = () => {

        if (invoiceType) {
            dispatch(receiptActions.confirmShop({ receiptId: props.factor.id, status: invoiceType }))
            setTimeout(() => {
                dispatch(receiptActions.getReceipts())
                props.onHide(false)

            }, 1500);
        }
        else
            props.onHide(false)
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop="static"
            className="mx-3 order-serach-modal--medium"
        >
            <Modal.Body className="add-product px-3 pt-4">
                <Button className="border-0 customer-modal-close" type="button" onClick={e => props.onHide(false)}>
                    <img className="d-flex m-auto customer-modal-close-svg" src={closeIcon} alt="close-btn" />
                </Button>
                <Card className="notes-round">
                    <Card.Body>
                        <Row>
                        <Row className="p-0 m-0 my-1">
                            <Col className="col-6 ps-2 d-flex align-items-center">
                                <input type="checkbox" id="pass" name="pass" className="btn-toggle-status-green" checked={invoiceType === 1} onChange={toggleHandler} />
                                <span className="pe-2 fw-bold">تایید</span>
                                <span className="pe-2 text-success">
                                    خرید شود
                                </span>
                                .
                            </Col>
                            <Col className="col-6 pe-2 d-flex align-items-center">
                                <input type="checkbox" id="fail" name="fail" className="btn-toggle-status-red" checked={invoiceType === 2} onChange={toggleHandler} />
                                <span className="pe-2 fw-bold">تایید</span>
                                <span className="pe-2 text-danger">
                                    خرید نشود
                                </span>
                                .
                            </Col>
                        </Row>

                    </Row>
                    </Card.Body>

                </Card>

                {
                    loading ? (
                        <Button className="fw-bold order-submit btn-dark-blue border-0 w-100 mt-4" size="lg" type="submit" disabled>
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
                        <Button className="fw-bold order-submit btn-dark-blue border-0 w-100 mt-4 notes-round" size="lg" type="submit" block onClick={handleClick} >
                            ثبت
                        </Button>
                    )
                }
            </Modal.Body>

        </Modal>
    )
}
