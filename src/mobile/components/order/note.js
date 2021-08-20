import React from 'react'
import { Container, Row, Card, Col } from 'react-bootstrap'
import moment from 'jalali-moment';
import persianJs from 'persianjs/persian.min';

export const Note = ({ note }) => {

    const now = new Date(note.createdAt);
    const option = {
        month: 'long',
    }
    const month = new Intl.DateTimeFormat("fa-IR", option).format(now)
    const day = moment.from(note.createdAt, 'DD').locale('fa').format('DD')
    const year = moment.from(note.createdAt, 'YYYY').locale('fa').format('YYYY')

    return (
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
                                                <span>{day && persianJs(day).englishNumber().toString()}</span>
                                                <span className="mx-1">{month}</span>
                                                <span>{year && persianJs(year).englishNumber().toString()}</span>
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

    )
}
