import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Container, Spinner, Col, Row, Alert } from 'react-bootstrap';

// Actions
import { customerActions } from '../../../actions/customerActions';


// components
import { Header } from '../base/serachHeader';
import { Customer } from './customer'
import { CustomerSearch } from './search';

export const Customers = () => {

    let alertMessage = useSelector(state => state.alert.message)
    let alerType = useSelector(state => state.alert.type)

    const [modalShow, setModalShow] = useState(false)
    let customers = useSelector(state => state.getCustomers.customers)
    let customerLoading = useSelector(state => state.getCustomers.loading)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(customerActions.getCustomers());
    }, [dispatch])


    return (
        <>
            <div className="product-page orders">
                <Header title="مشتریان" modalShow={modalShow} setModalShow={setModalShow} />
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
                            ? (customers.map((customer, index) => <Customer key={index} customer={customer} />))
                            : null
                    }
                    <CustomerSearch show={modalShow} onHide={() => setModalShow(false)} />
                </Container>
            </div>
        </>
    )
}

