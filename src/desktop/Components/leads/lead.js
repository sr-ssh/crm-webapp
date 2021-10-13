import React, { useState } from 'react'
import { Container, Card, Row, Alert, Spinner, Col, Button } from 'react-bootstrap';
import { Popover, Backdrop } from '@material-ui/core';
import moment from 'jalali-moment';
import persianJs from 'persianjs/persian.min';
import { makeStyles } from '@material-ui/core/styles';
import commaNumber from 'comma-number'

// Icons
import phoneIcon from './../../assets/images/lead/call.svg'

const useStyles = makeStyles((theme) => ({
    root: {
        zIndex: "9999 !important",
        backgroundColor: "rgb(0, 0, 0,0.5)"
    },
    popover: {
        width: "23%",
        backgroundColor: "transparent",
        display: "flex",
        alignItems: "center",
        overflow: "inherit"
    },
    backdrop: {
        zIndex: "5000 !important"
    }
}));


export const Lead = ({ item, sideBar, ...props }) => {


    const classes = useStyles();
    let loading ;

    return (
        <>
            <Card className={`m-auto mt-3 bg-light radius-10 border-0 mx-4`} >
                <Card.Body className="pb-3 ps-1 rounded-3">
                    <Card.Text className="pt-1">
                        <span className="text-gray fw-bold" >نام : </span>
                        <span className="fs-6 me-2 fw-bold">{item.family && persianJs(item.family).englishNumber().toString()}</span>
                    </Card.Text>
                    {
                        item?.accepted && <>
                            <Card.Text className="pt-1">
                            <Row>
                            <Col xs={9}>
                            <span className="text-gray fw-bold" >شماره : </span>
                            <span className="fs-6 me-2 fw-bold">{item.mobile && persianJs(item.mobile).englishNumber().toString()}</span>
                            </Col>
                            <Col dir="ltr" className="top-16 ms-2 ">
                                <Button className="backgound--green border-0 radius-10 p-1">
                                    <img src={phoneIcon} alt="phone-icon" width="27px"/>
                                </Button>
                            </Col>
                            </Row>
                            </Card.Text>
                            <Card.Text className="m-0 p-0 pt-1 d-flex align-items-start top-16">
                                <span className="text-gray fw-bold text--description--product">توضیحات :</span>
                                <span className="fs-6 me-2 fw-bold text--breake--dscription">{item.description && persianJs(item.description).englishNumber().toString()}</span>
                            </Card.Text>
                        </>
                    }

                    <Card.Text className="m-0 p-0 pt-1 d-flex align-items-start ms-2">
                        {
                            loading ? (
                                <Button className="radius-10  fs-6 fw-bold backgound--green border-0 w-100 mt-3" size="lg" type="submit" disabled>
                                    <Spinner
                                        as="span"
                                        animation="grow"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                    در حال انجام عملیات...
                                </Button>
                            ) : item?.accepted ?
                                <Button className="radius-10 fs-6 fw-bold backgound--red border-0 w-100 mt-3" size="lg" type="submit" block>
                                    ناموفق
                                </Button>
                            :  <Button className="radius-10  fs-6 fw-bold backgound--green border-0 w-100 mt-3" size="lg" type="submit" block>
                                قبول
                            </Button>
                        }
                        </Card.Text>
                </Card.Body>
            </Card>
        </>
    )
}
