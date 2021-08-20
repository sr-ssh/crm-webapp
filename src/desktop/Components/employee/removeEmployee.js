import React from 'react'
import { Modal, Row, Col, Form, Button, Spinner, Alert } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
// Actions
import { employeeActions } from '../../../actions/employeeActions'
// Icons
import closeIcon from '../../assets/images/close.svg'

export const RemoveEmployee = (props) => {
    const dispatch = useDispatch()

    let alert = useSelector(state => state.alert)
    let deleteLoading = useSelector(state => state.deleteEmployee.loading)

    const deleteHandler = (e) => {
        setTimeout(() => {
            props.onHide(false)
        }, 1900);
    }

    const formHandler = (e) => {
        e.preventDefault()
        dispatch(employeeActions.deleteEmployee(props.employee))
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

                <Row>
                    <Col className="text-center">
                        <span className="">آیا مطمئنید؟</span>
                    </Col>
                </Row>
                <Form onSubmit={formHandler} className="d-flex justify-content-around">
                    <Button className="fw-bold order-submit border-0 w-25 mt-4 text-light" onClick={e => props.onHide(false)} size="lg" block>
                        خیر
                    </Button>
                    {
                        deleteLoading ? (
                            <Button className="fw-bold order-submit border-0 w-50 mt-4" onClick={e => deleteHandler(e)} size="lg" type="submit" disabled>
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
                            <Button className="fw-bold order-submit border-0 bg-danger text-light w-25 mt-4" size="lg" onClick={e => deleteHandler(e)} type="submit" block>
                                بله
                            </Button>
                        )
                    }
                </Form>

            </Modal.Body>

        </Modal>
    )
}
