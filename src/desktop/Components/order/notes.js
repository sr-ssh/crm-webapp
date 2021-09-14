import React, { useState } from 'react'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'

// Icons
import addNoteIcon from '../../assets/images/order/add-note-black.svg'
import closeIcon from '../../assets/images/close.svg'

// Actions
import { notesActions } from '../../../actions';


// Components
import { Note } from './note'

export const Notes = (props) => {
    let { order, open, setOpen, setShowNotesModal, setActiveOrder } = props;
    const [isPrivate, setIsPrivate] = useState(false);
    const dispatch = useDispatch()


    let toggleHanler = (e) => {
        if (e.target.checked === true) {
            dispatch(notesActions.editStatusNotes(order.id, '1'))
        }
        else if (e.target.checked === false) {
            dispatch(notesActions.editStatusNotes(order.id, '0'))
        }
    }

    return (
        <>
            <Button className="border-0 customer-modal-close--desktop" type="button" onClick={() => setOpen(false)} >
                <img className="d-flex m-auto customer-modal-close-svg--desktop" src={closeIcon} alt="close-btn" />
            </Button>
            <div className="dialog--notes--page--dektop">

                <Container className="m-0 p-0" style={{ position: "sticky", top: "0", zIndex: "2" }} >
                    <Row className="m-0 p-0 header--notes--desktop d-flex flex-row justify-content-between ">
                        <Col className="m-0 p-0">
                            <Form.Group className="fw-bold mx-4" onChange={() => setIsPrivate(!isPrivate)} >
                                <label for="r1">
                                    <input type="checkbox"
                                        id="r1" name="r-group"
                                        className="btn-toggle-status-notes--desktop"
                                        defaultChecked={order?.notes?.isPrivate}
                                        onChange={toggleHanler}
                                    />
                                    <span className="text-light me-3">خصوصی</span>
                                </label>
                            </Form.Group>
                        </Col>
                        <Col className="m-0 p-0 d-flex justify-content-end">
                            <Button className="m-0 p-0 py-1 btn-outline-dark btn--add--note--desktop border-0 noPrint ms-5 " type="button" onClick={() => { setOpen(false); setShowNotesModal(true); setActiveOrder() }}>
                                <img src={addNoteIcon} height="25px" alt="add-note-icon" className="mx-2" />
                                <span className="ms-2">اضافه یادداشت</span>
                            </Button>
                        </Col>

                    </Row>
                </Container>
                <Container style={{ height: "455px" }}>
                    <Row>
                        <Col className="m-0 p-0" >
                            {(order.notes.Notes != undefined) ?
                                (order.notes.Notes?.map((note) => <Note note={note} />))
                                :
                                <span> هنوز یادداشتی برای این سفارش ثبت نشده است</span>
                            }
                        </Col>
                    </Row>
                </Container>

            </div >

        </>

    )
}
