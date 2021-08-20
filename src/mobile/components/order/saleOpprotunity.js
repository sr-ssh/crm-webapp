import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Card, Table, Row, Col, Spinner, Button } from 'react-bootstrap';
import { Header } from '../base/header2';

//icons
import deliveryIcon from './../../assets/images/order/delivery.svg'
import printIcon from './../../assets/images/order/print.svg'
import submitIcon from './../../assets/images/order/submit.svg'
import editIcon from '../../assets/images/Products/edit.svg'
import deleteIcon from '../../assets/images/delete.svg'
import editeOrderIcon from '../../assets/images/order/edit-order-list.svg'
import addNoteIcon from '../../assets/images/order/add-note-white.svg'
import noteListIcon from '../../assets/images/order/note-list-white.svg'

// Actions

import { orderActions } from '../../../actions';


//components
import { Order } from './order';
import { Delivery } from './delivery'
import { RecordOrder } from './recordOrder'

export const SaleOpprotunity = () => {



    const [recordOrderShow, setRecordOrderShow] = useState(false)
    const [modalShow, setModalShow] = useState(false)
    const [deliveryShow, setDeliveryShow] = useState(false)
    const [activeOrder, setActiveOrder] = useState({})
    const [order, setOrder] = useState('')

    const dispatch = useDispatch()


    const orders = useSelector(state => state.getOrders.orders)
    let orderLoading = useSelector(state => state.getOrders.loading)


    useEffect(() => {
        !recordOrderShow && dispatch(orderActions.getOrders({ status: 3 }))
        console.log('444444444444444444444444444444444444444444444444444')
    }, [dispatch, recordOrderShow])



    return (
        <div className="product-page orders ">
            <Header className="noPrint" title="فرصت سفارشات" backLink="/" />
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
                    (orders.map((order, index) => <Order key={index} order={order} deliveryShow={deliveryShow} setDeliveryShow={setDeliveryShow} recordOrderShow={recordOrderShow} setRecordOrderShow={setRecordOrderShow} setActiveOrder={setActiveOrder} setOrder={setOrder} />))

                    : null}

                {/* <OrderSearch show={modalShow} onHide={() => setModalShow(false)} /> */}
                <Delivery show={deliveryShow} onHide={() => setDeliveryShow(false)} order={order} />
                <RecordOrder show={recordOrderShow} onHide={() => setRecordOrderShow(false)} order={activeOrder} />

            </Container>
        </div>
    )
}
