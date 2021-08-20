import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Table, Row, Col, Container, Button, Spinner } from 'react-bootstrap';
import moment from 'jalali-moment';
import persianJs from 'persianjs/persian.min';

// Actions
import { reminderActions } from '../../../actions';
// Components
import { Reminder } from './reminder'

export const Reminders = () => {

    let reminders = useSelector(state => state.getReminders.reminders)
    let reminderLoading = useSelector(state => state.getReminders.loading)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(reminderActions.getReminders());
    }, [dispatch])

    console.log(reminders);

    return (
        <div className="product-page orders">
            <Container fluid className="m-0 w-100 d-flex justify-content-center flex-wrap ">
                {
                    reminderLoading &&
                    <Col className="col-3 mt-2 m-auto d-block align-self-center w-100 mb-4 ">
                        <Spinner className="m-auto d-block" animation="border" />
                    </Col>
                }
                {
                    (reminders.length === 0 && !reminderLoading) ? (
                        <Row className="justify-content-center align-items-center no-result-filter">
                            <Col className="col-8 text-center">
                                هیچ یادآوری موجود نمی باشد!
                            </Col>
                        </Row>
                    ) : null
                }
                {reminders.length > 0 ?
                    reminders?.map((reminder, index) =>
                        <Reminder keyitem={index} reminder={reminder} />
                    )
                    : null
                }
            </Container>
        </div >
    )
}