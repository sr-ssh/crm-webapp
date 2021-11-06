import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Container, Spinner, Col, Row, Alert } from 'react-bootstrap';

// Actions
import { customerActions, employeeActions } from '../../../actions';


// components
import { Header } from '../base/serachHeader';
import { Seller } from './seller'
import { SellerSearch } from './search';

export const Sellers = () => {

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

    }, [dispatch])


    return (
        <>
            <div className="product-page orders">
                <Header title="فروشنده ها" setModalShow={setModalShow} getExcel={getExcel} userPermission={userPermissions.excelCustomer} />
                <Container fluid className="m-auto">
                    {
                        customerLoading &&
                        <Row>
                            <Col className="col-3 mt-2 m-auto ">
                                <Spinner className="m-auto d-block" animation="border" />
                            </Col>
                        </Row>
                    }
                    {
                        (customers.length === 0 && !customerLoading) ? (
                            <Row className="justify-content-center align-items-center no-result-filter">
                                <Col className="col-8 text-center">
                                    هیج نتیجه ای یافت نشد!
                                </Col>
                            </Row>
                        ) : null
                    }
                    {
                        alertMessage &&
                        <>
                            <div className="modal-backdrop show"></div>
                            <Row className="justify-content-center text-center ">
                                <Alert variant={alerType}>
                                    {alertMessage}
                                </Alert>
                            </Row>
                        </>
                    }
                    {
                        customers
                            ? (customers.map((customer, index) => <Seller key={index} customer={customer} />))
                            : null
                    }
                    <SellerSearch show={modalShow} onHide={() => setModalShow(false)} filters={filters} setFilters={setFilters} />
                </Container>
            </div>
        </>
    )
}

