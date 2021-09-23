import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Container, Spinner, Col, Row, Alert } from 'react-bootstrap';

// Actions
import { supplierActions, employeeActions } from '../../../actions';


// components
import { Header } from '../base/searchExcelHeader2';
import { Supplier } from './supplier'
import { CustomerSearch } from './search';

export const Suppliers = () => {

    let alertMessage = useSelector(state => state.alert.message)
    let alerType = useSelector(state => state.alert.type)
    const [filters, setFilters] = useState({})

    const [modalShow, setModalShow] = useState(false)
    let suppliers = useSelector(state => state.getSuppliers.suppliers)
    let supplierLoading = useSelector(state => state.getSuppliers.loading)
    const userPermissions = useSelector(state => state.getPermissions.permissions)

    const dispatch = useDispatch()

    const getExcel = () => {

        dispatch(supplierActions.getExcelSuppliers(filters))
    }

    useEffect(() => {
        dispatch(supplierActions.getSuppliers());
        dispatch(employeeActions.getPermissions())

    }, [dispatch])


    return (
        <>
            <div className="product-page orders">
                <Header title="تامین کننده ها" setModalShow={setModalShow} getExcel={getExcel} userPermission={userPermissions.excelCustomer} />
                <Container fluid className="m-auto pb-3">
                    {
                        supplierLoading &&
                        <Row>
                            <Col className="col-3 mt-2 m-auto ">
                                <Spinner className="m-auto d-block" animation="border" />
                            </Col>
                        </Row>
                    }
                    {
                        (suppliers.length === 0 && !supplierLoading) ? (
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
                        suppliers
                            ? (suppliers.map((supplier, index) => <Supplier key={index} supplier={supplier} />))
                            : null
                    }
                    <CustomerSearch show={modalShow} onHide={() => setModalShow(false)} filters={filters} setFilters={setFilters} />
                </Container>
            </div>
        </>
    )
}

