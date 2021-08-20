import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Container, Alert, Spinner } from 'react-bootstrap';
// Actions
import { orderActions } from '../../../actions';
// Components
import { Header } from '../base/serachHeader';
import { OrderSearch } from './search'
import { Order } from './order';
import { Delivery } from './delivery'
import { CancelOrder } from './cancelOrder'


export const Orders = () => {

    let alertMessage = useSelector(state => state.alert.message)
    let alerType = useSelector(state => state.alert.type)
    const [modalShow, setModalShow] = useState(false)
    const [deliveryShow, setDeliveryShow] = useState(false)
    const [cancelOrderShow, setCancelOrderShow] = useState(false)
    const [activeOrder, setActiveOrder] = useState({})
    const [order, setOrder] = useState('')
    const dispatch = useDispatch()
    const orders = useSelector(state => state.getOrders.orders)
    let orderLoading = useSelector(state => state.getOrders.loading)
    // let { err: cancelErr, loading: cancelLoading } = useSelector(state => state.cancelProductOrder)



    useEffect(() => {
        !cancelOrderShow && dispatch(orderActions.getOrders({ status: "" }))
        console.log('444444444444444444444444444444444444444444444444444')
    }, [dispatch, cancelOrderShow])


    return (
        <div className="product-page orders ">
            <Header className="noPrint" title="سفارش ها" modalShow={modalShow} setModalShow={setModalShow} />
            <Container className="m-auto">
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
                    (orders.map((order, index) => <Order key={index} order={order} deliveryShow={deliveryShow} setDeliveryShow={setDeliveryShow} cancelOrderShow={cancelOrderShow} setCancelOrderShow={setCancelOrderShow} setActiveOrder={setActiveOrder} setOrder={setOrder} />))

                    : null}

                <OrderSearch show={modalShow} onHide={() => setModalShow(false)} />
                <Delivery show={deliveryShow} onHide={() => setDeliveryShow(false)} order={order} />
                <CancelOrder show={cancelOrderShow} onHide={() => setCancelOrderShow(false)} order={activeOrder} />
            </Container>
        </div>
    )
}
