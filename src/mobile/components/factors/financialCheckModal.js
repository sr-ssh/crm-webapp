import React, { useState } from 'react'
import { Modal, Card, Col, Form, Button, Spinner, Alert } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
// Actions
import { receiptActions } from '../../../actions'

// Icons
import closeIcon from '../../assets/images/close.svg'

export const FinancialCheckModal = (props) => {

    const [isChecked, setIsChecked] = useState(false)
    const dispatch = useDispatch()
    let loading = useSelector(state => state.confirmShop.loading)


    let toggleHandler = (e) => {
        setIsChecked(e.target.checked)
    }
    let handleClick = () => {

        if (isChecked) {
            dispatch(receiptActions.confirmShop(props.factor.id))
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
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop="static"
        >
            <Modal.Body className="add-product px-4">
                <Button className="border-0 customer-modal-close" type="button" onClick={e => props.onHide(false)}>
                    <img className="d-flex m-auto customer-modal-close-svg" src={closeIcon} alt="close-btn" />
                </Button>
                <Card className="notes-round">
                    <Card.Body>
                        <Col className="col-12 ps-2 d-flex align-items-center justify-content-center">
                            <input type="checkbox" id="formal" name="formal" className="btn-toggle-status-green  btn-toggle-status-green--checked" onChange={toggleHandler} />
                            <span className="fw-bold">تایید</span>
                            <span className="pe-2 text-success">
                                خرید
                            </span>
                        </Col>
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
