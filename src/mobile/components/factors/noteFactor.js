import React, { useEffect, useState } from 'react'
import { Container, Form, Row, Card, Alert, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'jalali-moment';
import persianJs from 'persianjs/persian.min';

// Actions
import { notesActions, alertActions } from '../../../actions';

// Helpers
import { history } from '../../../helpers'

// Components
import { Header } from '../base/header3';

export const NoteFactor = (props) => {

    const [isPrivate, setIsPrivate] = useState(false);
    const [note, setNote] = useState({})
    const [permission, setPermission] = useState(false)
    const dispatch = useDispatch()
    let alert = useSelector(state => state.alert)


    // useEffect(() => {
    //     notes.reduce((result, item) => {
    //         setIsPrivate(item.isPrivate)
    //         setNote(result = item.data);
    //     }, {});
    // }, [notes])

    let toggleHanler = (e) => {
        if (permission) {
            dispatch(alertActions.error("امکان انجام عملیات ممکن نیست"))
            e.target.checked = false
            setTimeout(() => {
                dispatch(alertActions.clear())
            }, 1500);
        } else {
            console.log("OK")
            // if (e.target.checked === true)
            //     dispatch(notesActions.editStatusNotes(props.location.state.id, "1"))
            // else if (e.target.checked === false)
            //     dispatch(notesActions.editStatusNotes(props.location.state.id, "0"))
        }
    }

    let getDate = (date) => {
        const now = new Date(date);
        const option = {
            month: 'long',
        }
        const month = new Intl.DateTimeFormat("fa-IR", option).format(now)
        const day = moment.from(date, 'DD').locale('fa').format('DD')
        const year = moment.from(date, 'YYYY').locale('fa').format('YYYY')


        return `${persianJs(day).englishNumber().toString()}  ${month}  ${persianJs(year).englishNumber().toString()}`
    }

    useEffect(() => {
        if (props.location.state === undefined)
            return history.goBack()
        if (props.location.state.factor.note) {
            setNote(props.location.state.factor.note.Note)
            setIsPrivate(props.location.state.factor.note.isPrivate)
        } else {
            setIsPrivate(false)
            setPermission(true)
        }
    }, [props.location.state])


    console.log(props)
    return (
        <>

            {
                props.location.state !== undefined &&
                <div className="notes--page">
                    <Header title="یادداشت ها" />
                    {
                        alert.message &&
                        <>
                            <div className="modal-backdrop show"></div>
                            <Row className="justify-content-center text-center ">
                                <Alert variant={alert.type}>
                                    {alert.message}
                                </Alert>
                            </Row>
                        </>
                    }
                    <Container>
                        <Row className="header--notes">
                            {/* onChange={() => setIsPrivate(!isPrivate)} */}
                            <Form.Group className="fw-bold mx-4"  >
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
                        note.text ?
                            <>
                                <Container>
                                    <Card className="m-auto mt-3 notes--Card border-0 lh-sm" >
                                        <Card.Body className="pb-4 pt-2 px-2  rounded-3 text-gray">
                                            <Row className="p-0 m-0 text-dark ">
                                                <Card className="background-blue border-0 py-0 notes-round">
                                                    <Card.Body className="pe-0 ps-0 fw-bold ">
                                                        <Row className="">
                                                            <Col className="fs-6">
                                                                <Card.Text>
                                                                    {note.writtenBy}

                                                                </Card.Text>
                                                            </Col>
                                                            <Col className="ms-3 fs-6">
                                                                <Card.Text className="text-start">
                                                                    {getDate(note.createdAt)}
                                                                </Card.Text>
                                                            </Col>
                                                        </Row>
                                                    </Card.Body>
                                                </Card>
                                            </Row>
                                            <Row className="p-0 ps-2 m-0 mt-3">
                                                <Col className="m-0 p-0 col-3 fs-6">
                                                    یادداشت :
                                                </Col>
                                                <Col className="m-0 p-0 text-dark fw-bold">
                                                    {note.text}

                                                </Col>

                                            </Row>
                                        </Card.Body>
                                    </Card>
                                </Container>
                            </>
                            :
                            <span>هنوز یادداشتی برای این فاکتور ثبت نشده است</span>
                    }

                </div>
            }
        </>

    )
}
