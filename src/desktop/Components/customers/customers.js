import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Container, Spinner, Col, Row, Alert } from 'react-bootstrap';
import { Button } from '@material-ui/core'

// Actions
import { customerActions, employeeActions } from '../../../actions';


// components
import { Customer } from './customer'
import { CustomerSearch } from './search';
import { Header } from '../base/headerExcel'

export const Customers = () => {

    let alertMessage = useSelector(state => state.alert.message)
    let alerType = useSelector(state => state.alert.type)
    const [filters, setFilters] = useState({})

    const [modalShow, setModalShow] = useState(false)
    let customers = useSelector(state => state.getCustomers.customers)
    let customerLoading = useSelector(state => state.getCustomers.loading)
    const userPermissions = useSelector(state => state.getPermissions.permissions)

    const dispatch = useDispatch()


    const getExcel = () => {

        dispatch(customerActions.getExcelCustomers(filters))
    }

    useEffect(() => {
        dispatch(customerActions.getCustomers());
        dispatch(employeeActions.getPermissions())

    }, [dispatch])


    return (
        <>
            <Header isBTNSearch={true} searchModalShow={() => setModalShow(true)} userPermission={userPermissions.excelCustomer} isGetExcel={true} getExcel={getExcel} isBtnAdd={" "} />


            <div className="product-page orders margin--top--header">
                <Container fluid className="m-0 p-0 w-100 d-flex flex-row flex-wrap mx-4 ">
                    {
                        customerLoading &&
                        <Col className="col-3 mt-2 m-auto d-block align-self-center w-100 mb-4 ">
                            <Spinner className="m-auto d-block" animation="border" />
                        </Col>
                    }
                    {
                        (customers.length === 0 && !customerLoading) ? (
                            <Row className="justify-content-center align-items-center no-result-filter mt-4">
                                <Col className="col-12 text-center">
                                    هیج نتیجه ای یافت نشد!
                                </Col>
                            </Row>
                        ) : null
                    }
                    {/* {
                        alertMessage &&
                        <>
                            <div className="modal-backdrop show"></div>
                            <Row className="justify-content-center text-center ">
                                <Alert variant={alerType}>
                                    {alertMessage}
                                </Alert>
                            </Row>
                        </>
                    } */}
                    {
                        customers
                            ? (customers.map((customer, index) => <Customer key={index} customer={customer} />))
                            : null
                    }
                    <CustomerSearch show={modalShow} onHide={() => setModalShow(false)} filters={filters} setFilters={setFilters} />
                </Container>
            </div>
        </>
    )
}

