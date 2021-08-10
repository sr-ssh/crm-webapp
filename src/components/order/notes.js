import React, { useEffect, useState } from 'react'
import { Container, Form, Row, Card, Spinner, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

// Actions
import { notesActions } from '../../actions';

// Helpers
import { history } from '../../helpers'

// Components
import { Header } from '../base/header3';
import { Note } from './note'

export const Notes = (props) => {

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
        if (e.target.checked === true)
            dispatch(notesActions.editStatusNotes(props.location.state.id, "1"))
        else if (e.target.checked === false)
            dispatch(notesActions.editStatusNotes(props.location.state.id, "0"))
    }

    useEffect(() => {
        if (props.location.state === undefined)
            return history.goBack()

        dispatch(notesActions.getNotes(props.location.state.id))
    }, [props.location.state])

    return (
        <>
            {
                props.location.state !== undefined &&
                <div className="notes--page">
                    <Header title="یادداشت ها" />

                    <Container>
                        <Row className="header--notes">
                            <Form.Group className="fw-bold mx-4" onChange={() => setIsPrivate(!isPrivate)} >
                                <label for="r1">
                                    {isPrivate ?
                                        <input type="checkbox" id="r1" name="r-group" className="btn-toggle-status-notes" checked onClick={toggleHanler} />
                                        :
                                        <input type="checkbox" id="r1" name="r-group" className="btn-toggle-status-notes" onClick={toggleHanler} />
                                    }
                                    خصوصی
                                </label>
                            </Form.Group>
                        </Row>
                    </Container>
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

                </div>
            }
        </>

    )
}
