import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Container, Row, Col, Spinner } from 'react-bootstrap'
// Actions
import { receiptActions } from '../../../actions';

// Components
import { Header } from '../base/serachHeader'
import { FactorSearch } from './search'
import { Factor } from './factor'


export const Factors = () => {

    const dispatch = useDispatch()

    const [modalShow, setModalShow] = useState(false)
    const [cancelFactorShow, setCancelFactorShow] = useState(false)

    let { receipts, loading } = useSelector(state => state.getReceipts)


    useEffect(() => {
        !cancelFactorShow && dispatch(receiptActions.getReceipts())
    }, [dispatch, cancelFactorShow])

    console.log(receipts)




    return (
        <div className="factors--page">
            <Header className="noPrint" title="فاکتور ها " modalShow={modalShow} setModalShow={setModalShow} />
            <Container fluid>
                {
                    loading &&
                    <Row>
                        <Col className="col-3 mt-2 m-auto ">
                            <Spinner className="m-auto d-block" animation="border" />
                        </Col>
                    </Row>
                }
                {
                    (receipts.length === 0 && !loading) ? (
                        <Row className="justify-content-center align-items-center no-result-filter">
                            <Col className="col-8 text-center">
                                هیج نتیجه ای یافت نشد!
                            </Col>
                        </Row>
                    ) : null
                }

                {(receipts.length > 0) ?
                    (receipts.map((factores, index) =>
                        <Factor key={index} factor={factores} />
                    ))
                    : null}

                <FactorSearch show={modalShow} onHide={() => setModalShow(false)} />
                {/* <CancelOrder status="2" show={cancelOrderShow} onHide={() => setCancelOrderShow(false)} order={activeOrder} /> */}


            </Container>
        </div>
    )
}
