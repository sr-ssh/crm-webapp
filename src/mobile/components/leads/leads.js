import React, { useEffect, useState } from 'react'
import { Container, Card, Row, Button, Spinner, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import moment from 'jalali-moment';
import persianJs from 'persianjs/persian.min';
// Actions
import { leadActions, employeeActions } from '../../../actions'
// Components
import { Header } from '../base/productsExcelHeader';
import { AddLead } from './addLead'

// Icons
import editIcon from '../../assets/images/Products/edit.svg'
import phoneIcon from './../../assets/images/lead/call.svg'

export const Lead = () => {


    const [addModalShow, setAddModalShow] = useState(false)
    const [editModalShow, setEditModalShow] = useState(false)
    const [xlsxModalShow, setXlsxModalShow] = useState(false)

    const [lead, setLead] = useState({})
    const dispatch = useDispatch()
    const leads = useSelector(state => state.getLeads.leads)
    const loading = useSelector(state => state.getLeads.loading)
    const addloading = useSelector(state => state.addLead.loading)
    const userPermissions = useSelector(state => state.getPermissions.permissions)
    const getExcel = () => {
        dispatch(leadActions.getExcelProducts())
    }

    useEffect(() => {
        if (!editModalShow && !addModalShow && !xlsxModalShow)
            dispatch(leadActions.getLeads())
        dispatch(employeeActions.getPermissions())
    }, [dispatch, editModalShow, addModalShow, xlsxModalShow])


    return (
        <div className="product-page">
            <Header title="سرنخ" getExcel={() => setXlsxModalShow(true)} setModalShow={setAddModalShow} userPermission={userPermissions.excelProduct} />
            <Container className="m-auto">
                {
                    (loading) &&
                    <Row>
                        <Col className="col-3 mt-2 m-auto ">
                            <Spinner className="m-auto d-block" animation="border" />
                        </Col>
                    </Row>
                }
                {leads ?
                    (leads.map((item, index) =>
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
                                    <Button className="backgound--green border-0 p-1">
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
                                    <Button className="fs-6 fw-bold backgound--green border-0 w-100 mt-3" size="lg" type="submit" disabled>
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
                                    <Button className="fs-6 fw-bold backgound--red border-0 w-100 mt-3" size="lg" type="submit" block>
                                        ناموفق
                                    </Button>
                                :  <Button className="fs-6 fw-bold backgound--green border-0 w-100 mt-3" size="lg" type="submit" block>
                                    قبول
                                </Button>
                            }
                            </Card.Text>
                    </Card.Body>
                </Card>
                    ))

                    : null}

                <AddLead show={addModalShow} onHide={() => setAddModalShow(false)} />

                {/* <XlsxModal show={xlsxModalShow} onHide={() => setXlsxModalShow(false)} /> */}

            </Container>
        </div>
    )
}
