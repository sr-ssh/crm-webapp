import React, { useEffect } from 'react'
import { Card, Row, Button, Spinner, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import persianJs from 'persianjs/persian.min';
// Actions
import { leadActions } from '../../../actions'

// Icons
import phoneIcon from './../../assets/images/lead/call.svg'

export const Lead = ({item, acceptLead, activeId, addOrder,failLead}) => {


    const dispatch = useDispatch()
    const editLoading = useSelector(state => state.editLeadStatus.loading)

    useEffect(() => {
        (activeId === item?._id) && editLoading && dispatch(leadActions.getLeads())
    }, [editLoading])


    return (
        <>
        <Card className={`m-auto mt-3 bg-light radius-10 border-0 mx-1`} >
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
                        <Button onClick={(e) => addOrder(e, item?._id, item?.family, item?.mobile)} className="background--green button--green border-0 p-1">
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
                    ((activeId === item?._id) && editLoading) ? (
                        <Button className="button--green fs-6 fw-bold background--green border-0 w-100 mt-3" size="lg" type="submit" disabled>
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
                        <Button onClick={(e) => failLead(e, item?._id)} className="button--red fs-6 fw-bold background--red border-0 w-100 mt-3" size="lg" type="submit" block>
                            ناموفق
                        </Button>
                    :  <Button onClick={(e) => acceptLead(e, item?._id)} className="button--green fs-6 fw-bold background--green border-0 w-100 mt-3" size="lg" type="submit" block>
                        قبول
                    </Button>
                }
                </Card.Text>
        </Card.Body>
    </Card>
    </>
    )
}
