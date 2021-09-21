import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Container, Alert, Spinner, Button } from 'react-bootstrap';
import { Backdrop } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

// Icons
import SearchIcon from '@material-ui/icons/Search';

// Actions
import { orderActions } from '../../../actions';
// Components
import { OrderSearch } from './search'
import { Order } from './order';
import { Delivery } from './delivery'
import { CancelOrder } from './cancelOrder'
import { Header } from '../base/header'






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
        !cancelOrderShow && dispatch(orderActions.getOrders({ status: " " }))
        console.log('444444444444444444444444444444444444444444444444444')
    }, [dispatch, cancelOrderShow])





    return (
        <>
            <Header isBTNSearch={true} searchModalShow={() => setModalShow(true)} isBTNRequest={false} />
            <div className="product-page orders w-100 margin--top--header">
                <Container fluid className="m-0  mt-5 w-100 d-flex justify-content-center flex-wrap mb-5 ">
                    {
                        orderLoading ?
                            <Col className="col-3 mt-5 m-auto d-block align-self-center w-100 mb-4 ">
                                <Spinner className="m-auto d-block" animation="border" />
                            </Col>
                            : null

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

                    <OrderSearch show={modalShow} onHide={() => { setModalShow(false) }} />
                    <Delivery show={deliveryShow} onHide={() => setDeliveryShow(false)} order={order} />
                    <CancelOrder status="2"  show={cancelOrderShow} onHide={() => setCancelOrderShow(false)} order={activeOrder} />

                </Container>

            </div>
        </>
    )
}