import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Container, Spinner, Col, Row, Alert } from 'react-bootstrap';
import { Button } from '@material-ui/core'

// Actions
import { supplierActions, employeeActions } from '../../../actions';


// components
import { Supplier } from './supplier'
import { CustomerSearch } from './search';
import { Header } from '../base/headerExcel'

export const Suppliers = () => {

    let alertMessage = useSelector(state => state.alert.message)
    let alerType = useSelector(state => state.alert.type)
    const [filters, setFilters] = useState({})

    const [modalShow, setModalShow] = useState(false)
    let suppliers = useSelector(state => state.getSuppliers.suppliers)
    let supplierLoading = useSelector(state => state.getSuppliers.loading)
    const {user : userInfo ,loading : userInfoLoading } = useSelector(state => state.appInfo)
    const sideBar = useSelector(state => state.sideBar)

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
            <Header isBTNSearch={true} searchModalShow={() => setModalShow(true)} userPermission={userInfo.data.permission.getExcelSuppliers} isGetExcel={true} getExcel={getExcel} isBtnAdd={" "} />


            <div className="product-page orders margin--top--header" style={{ paddingRight: sideBar.open ? "250px" : 0 }}>
                <Container fluid className="m-0 w-100 d-flex justify-content-center flex-wrap ">
                    {
                        supplierLoading &&
                        <Col className="col-3 mt-2 m-auto d-block align-self-center w-100 mb-4 ">
                            <Spinner className="m-auto d-block" animation="border" />
                        </Col>
                    }
                    {
                        (suppliers.length === 0 && !supplierLoading) ? (
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
                    {/* <Row className="mx-1"> */}
                        {
                            suppliers
                                ? (suppliers.map((supplier, index) => <Col key={index} xs={4} className="px-3"><Supplier supplier={supplier} /></Col>))
                                : null
                        }
                    {/* </Row> */}

                    <CustomerSearch show={modalShow} onHide={() => setModalShow(false)} filters={filters} setFilters={setFilters} />
                </Container>
            </div>
        </>
    )
}

