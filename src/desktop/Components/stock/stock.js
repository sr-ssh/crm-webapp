import React, { useEffect, useState } from 'react'
import { Container, Card, Row, Alert, Spinner, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import moment from 'jalali-moment';
import persianJs from 'persianjs/persian.min';
import { Button } from '@material-ui/core'

// Actions
import { productActions, employeeActions, stockActions } from '../../../actions'
// Components
import { AddStock } from './addStock'
import { EditStock } from './editStock'
import { Header } from '../base/headerExcel'


// Icons
import editIcon from '../../assets/images/Products/edit.svg'
import { StockCard } from './stockCard';

export const Stock = () => {

    const [addModalShow, setAddModalShow] = useState(false)
    const [editModalShow, setEditModalShow] = useState(false)
    const [product, setProduct] = useState({})
    const dispatch = useDispatch()
    const products = useSelector(state => state.getStock.stock)
    const productLoading = useSelector(state => state.getProducts.loading)
    const sideBar = useSelector(state => state.sideBar)

    useEffect(() => {
        if (!editModalShow && !addModalShow)
            dispatch(stockActions.getStock())
    }, [dispatch, editModalShow, addModalShow])

    return (
        <>
            <Header isBTNSearch={false} userPermission={false} isGetExcel={false} isBtnAdd={"اضافه مواد خام"} btnAdd={() => setAddModalShow(true)} />

            <div className="product-page d-flex flex-column align-items-center margin--top--header" style={{ paddingRight: sideBar.open ? "250px" : 0 }}>
                <Container fluid className="m-0 px-4 w-100 d-flex justify-content-evenly flex-wrap">
                    {
                        (productLoading) &&
                        <Col className="col-3 mt-2 m-auto d-block align-self-center w-100 mb-4 ">
                            <Spinner className="m-auto d-block" animation="border" />
                        </Col>
                    }

                    {products ?
                        (products.map((item, index) =>
                            <StockCard item={item} sideBar={sideBar.open} setEditModalShow={setEditModalShow} setProduct={setProduct} />
                        ))

                        : null}

                    <AddStock show={addModalShow} onHide={() => setAddModalShow(false)} />
                    <EditStock show={editModalShow} onHide={() => setEditModalShow(false)} product={product} />
                </Container>
            </div>
        </>
    )
}
