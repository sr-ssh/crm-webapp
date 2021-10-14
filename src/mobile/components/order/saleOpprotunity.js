import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { Header } from '../base/header2';
import { CancelOrder } from './cancelOrder'


// Actions

import { orderActions } from '../../../actions';


//components
import { Order } from './order';
import { Delivery } from './delivery'
import { RecordOrder } from './recordOrder'
import { UploadDocuments } from './uploadDoc'


export const SaleOpprotunity = () => {



    const [recordOrderShow, setRecordOrderShow] = useState(false)
    const [deliveryShow, setDeliveryShow] = useState(false)
    const [activeOrder, setActiveOrder] = useState({})
    const [order, setOrder] = useState('')
    const [cancelOrderShow, setCancelOrderShow] = useState(false)
    const [uploadModalShow, setUploadModalShow] = useState(false)
    const [customerInfoShow, setCustomerInfoShow] = useState(false)
    const [refresh, setRefresh] = useState(false)


    const dispatch = useDispatch()


    const orders = useSelector(state => state.getOrders.orders)
    let orderLoading = useSelector(state => state.getOrders.loading)


    useEffect(() => {
        !recordOrderShow && dispatch(orderActions.getOrders({ status: 3 }))
    }, [dispatch, recordOrderShow])

    useEffect(() => {
        dispatch(orderActions.getOrders({ status: 3 }))
    }, [refresh])



    return (
        <div className="product-page orders ">
            <Header className="noPrint" title="فرصت فروش" backLink="/" />
            <Container className="m-auto">
                {
                    orderLoading &&
                    <Row>
                        <Col className="col-3 mt-2 m-auto ">
                            <Spinner className="m-auto d-block" animation="border" />
                        </Col>
                    </Row>
                }
                {
                    (orders.length === 0 && !orderLoading) ? (
                        <Row className="justify-content-center align-items-center no-result-filter">
                            <Col className="col-8 text-center">
                                هیج نتیجه ای یافت نشد!
                            </Col>
                        </Row>
                    ) : null
                }



                {(orders.length > 0) ?
                    (orders.map((order, index) => <Order key={index} refresh={refresh} setRefresh={setRefresh} order={order} deliveryShow={deliveryShow} setDeliveryShow={setDeliveryShow} recordOrderShow={recordOrderShow} setRecordOrderShow={setRecordOrderShow} setActiveOrder={setActiveOrder} setOrder={setOrder} cancelOrderShow={cancelOrderShow} setCancelOrderShow={setCancelOrderShow} setUploadModalShow={setUploadModalShow} setCustomerInfoShow={setCustomerInfoShow}  />))

                    : null}

                {/* <OrderSearch show={modalShow} onHide={() => setModalShow(false)} /> */}
                <Delivery show={deliveryShow} onHide={() => setDeliveryShow(false)} order={order} />
                <RecordOrder show={recordOrderShow} onHide={() => setRecordOrderShow(false)} order={activeOrder} />
                <CancelOrder status="4" show={cancelOrderShow} onHide={() => setCancelOrderShow(false)} order={activeOrder} />
                <UploadDocuments show={uploadModalShow} onHide={() => setUploadModalShow(false)} order={activeOrder} />
            </Container>
        </div>
    )
}
