import React, { useState } from 'react'
import { Modal, Row, Col, Form, Button } from 'react-bootstrap'

//Assets
import closeIcon from '../../assets/images/close.svg'


export const AddNotesModal = (props) => {

    const [notesText, setNotesText] = useState('')
    const handleChange = (e) => {
        const value = e.target.value;
        setNotesText(value)
    }
    const formHandler = (e) => {
        e.preventDefault();
        const now = new Date();
        let createdAt = now.toISOString()
        if (!notesText == '') {
            let notes = {
                text: notesText,
                createdAt: createdAt
            }
            props.setNotes((prevNotesState) => [...prevNotesState, notes])
            props.onHide(false)
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
            className="px-4"
        >
            <Modal.Body className="add-product px-4">
                <Button className="border-0 customer-modal-close" type="button" onClick={e => props.onHide(false)}>
                    <img className="d-flex m-auto customer-modal-close-svg" src={closeIcon} alt="close-btn" />
                </Button>
                {
                    props.show &&
                    <Form onSubmit={formHandler}>
                        <Row className="mt-3">
                            <Col className="order-filter-input">
                                <Form.Group controlId="notes">
                                    <Form.Label className="pe-3">اضافه یادداشت</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        className="notes--input"
                                        onChange={handleChange}
                                        style={{ height: '100px' }}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Button className="fw-bold btn--notes--submit border-0 w-100 mt-4" size="lg" type="submit" block>
                            ثبت
                        </Button>
                    </Form>
                }
            </Modal.Body>

        </Modal>
    )
}
