import React, { useEffect, useState } from 'react'
import { Container, Card, Row, Button, Spinner, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { history } from '../../../helpers';
// Actions
import { leadActions, employeeActions } from '../../../actions'
// Components
import { Header } from '../base/productsExcelHeader2';
import { AddLead } from './addLead'
import { Lead } from './lead';

export const Leads = () => {


    const [addModalShow, setAddModalShow] = useState(false)

    const [lead, setLead] = useState({})
    const [activeId, setActiveId] = useState({})

    const dispatch = useDispatch()
    const leads = useSelector(state => state.getLeads.leads)
    const loading = useSelector(state => state.getLeads.loading)
    const editLoading = useSelector(state => state.editLeadStatus.loading)
    const addloading = useSelector(state => state.addLead.loading)
    const userPermissions = useSelector(state => state.getPermissions.permissions)
    
    let uploadHandler = (e) => {
        e.preventDefault()
        console.log(e.target.files[0])
        const formData = new FormData();
        formData.append('excel', e.target.files[0])
        dispatch(leadActions.uploadExcel(formData))
    }

    let acceptLead = (e, id) => {
        e.preventDefault()
        setActiveId(id)
        dispatch(leadActions.editLeadStatus({leadId: id, status: 0}))
    }

    let addOrder = (e, id, family, mobile) => {
        history.push({
            pathname: '/order/add',
            state: { id, family, mobile}
        })
    }

    useEffect(() => {
        if (!addModalShow)
            dispatch(leadActions.getLeads())
        dispatch(employeeActions.getPermissions())
    }, [dispatch, addModalShow, addloading])


    return (
        <div className="product-page">
            <Header title="سرنخ" uploadHandler={uploadHandler} setModalShow={setAddModalShow} userPermission={true} />
            <Container className="m-auto">
                {
                    ((editLoading === false) && loading) &&
                    <Row>
                        <Col className="col-3 mt-2 m-auto ">
                            <Spinner className="m-auto d-block" animation="border" />
                        </Col>
                    </Row>
                }
                {leads ?
                    (leads.map((item, index) => <Lead 
                                                    key={index} 
                                                    item={item} 
                                                    acceptLead={acceptLead} 
                                                    activeId={activeId}
                                                    addOrder={addOrder} 
                                                />
                    ))

                    : null}

                <AddLead show={addModalShow} onHide={() => setAddModalShow(false)} />
            </Container>
        </div>
    )
}
