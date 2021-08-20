import React, { useEffect, useState } from 'react'
import { Container, Form, Row, Card, Spinner, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

// Actions
import { notesActions } from '../../../actions';

// Helpers
import { history } from '../../../helpers'

// Components
import { Note } from './note'

export const Notes = ({ orderId, open, setOpen }) => {

    const [isPrivate, setIsPrivate] = useState(false);
    const [note, setNote] = useState([])
    const dispatch = useDispatch()
    let { notes, loading } = useSelector(state => state.getNotes)

    useEffect(() => {
        notes.reduce((result, item) => {
            setIsPrivate(item.isPrivate)
            setNote(result = item.data);
        }, {});
    }, [notes])

    let toggleHanler = (e) => {
        console.log(e.target.checked);
        if (e.target.checked === true) {
            dispatch(notesActions.editStatusNotes(orderId, '1'))
        }
        else if (e.target.checked === false) {
            dispatch(notesActions.editStatusNotes(orderId, '0'))
        }
    }
    useEffect(() => {
        if (open === true && orderId != null)
            dispatch(notesActions.getNotes(orderId))
    }, [open, orderId])

    return (
        <>

            <div className="notes--page--dektop">

                <Container style={{ position: "sticky" }} >
                    <Row className="header--notes bg-dark">
                        <Form.Group className="fw-bold mx-4" onChange={() => setIsPrivate(!isPrivate)} >
                            <label for="r1">
                                <input type="checkbox" id="r1" name="r-group" className="btn-toggle-status-notes" checked={isPrivate} onChange={toggleHanler} />
                                <span className="text-light">خصوصی</span>
                            </label>
                        </Form.Group>
                    </Row>
                </Container>
                <Container style={{ height: "455px" }}>
                    <Row>
                        <Col className="m-0 p-0" >
                            {
                                loading ?
                                    <Row>
                                        <Col className="col-3 mt-4 m-auto ">
                                            <Spinner className="m-auto d-block" animation="border" />
                                        </Col>
                                    </Row> :
                                    (note?.length > 0) ?
                                        (note?.map((note) => <Note note={note} />))
                                        : <span> هنوز یادداشتی برای این سفارش ثبت نشده است</span>
                            }
                        </Col>
                    </Row>
                </Container>

            </div >

        </>

    )
}
