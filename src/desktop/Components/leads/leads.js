import React, { useEffect, useState } from 'react'
import { Container, Spinner, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'

import { Button } from '@material-ui/core'

// Actions
import { productActions, employeeActions, leadActions } from '../../../actions'
// Components
import { AddLead } from './addLead'
import { Header } from '../base/headerExcel'
import { Lead } from './lead'


export const Leads = () => {


    const [addModalShow, setAddModalShow] = useState(false)
    const dispatch = useDispatch()
    const leads = useSelector(state => state.getLeads.leads)
    const loading = useSelector(state => state.getLeads.loading)
    const addloading = useSelector(state => state.addLead.loading)
    const userPermissions = useSelector(state => state.getPermissions.permissions)
    const sideBar = useSelector(state => state.sideBar)
    const [activeId, setActiveId] = useState({})



    useEffect(() => {
        if (!addModalShow)
            dispatch(leadActions.getLeads())
        dispatch(employeeActions.getPermissions())
    }, [dispatch, addModalShow, addloading])

    let acceptLead = (e, id) => {
        e.preventDefault()
        setActiveId(id)
        dispatch(leadActions.editLeadStatus({leadId: id, status: 0}))
    }

    return (
        <>
            <Header isBTNSearch={false} userPermission={true} isGetExcel={true} getExcel={() => {}} isBtnAdd={"اضافه سرنخ"} btnAdd={() => setAddModalShow(true)} />
            <div className="product-page d-flex flex-column align-items-center margin--top--header" style={{ paddingRight: sideBar.open ? "250px" : 0 }}>
                <Container fluid className="m-0 px-4 w-100 d-flex justify-content-evenly flex-wrap ">
                    {leads ?
                        (leads.map((item, index) =>
                            <Col key={index} xs={4}><Lead acceptLead={acceptLead} sideBar={sideBar.open} item={item} activeId={activeId} /></Col>
                        ))
                        : null}
                    <AddLead show={addModalShow} onHide={() => setAddModalShow(false)} />
                </Container>
            </div>
        </>
    )
}
