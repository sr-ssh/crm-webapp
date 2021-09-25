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
    const addProductLoading = useSelector(state => state.addProduct.loading)
    const userPermissions = useSelector(state => state.getPermissions.permissions)

    const getExcel = () => {
        dispatch(productActions.getExcelProducts())
    }


    useEffect(() => {
        if (!editModalShow && !addModalShow)
            dispatch(stockActions.getStock())
        dispatch(employeeActions.getPermissions())
    }, [dispatch, editModalShow, addModalShow])

    return (
        <>
            <Header isBTNSearch={true} userPermission={userPermissions.excelProduct} isGetExcel={true} getExcel={getExcel} isBtnAdd={"اضافه مواد خام"} btnAdd={() => setAddModalShow(true)} />
            <div className="product-page d-flex flex-column align-items-center margin--top--header ">
                <Container className="m-0 w-100 d-flex justify-content-center flex-wrap ">
                    {
                        (productLoading) &&
                        <Col className="col-3 mt-2 m-auto d-block align-self-center w-100 mb-4 ">
                            <Spinner className="m-auto d-block" animation="border" />
                        </Col>
                    }
                    <Row>
                        
                    {products ?
                        (products.map((item, index) =>
                        <Col key={index} xs={3}>
                            <StockCard item={item} setEditModalShow={setEditModalShow} setProduct={setProduct} />
                        </Col>
                        ))

                        : null}

                    </Row>
                    <AddStock show={addModalShow} onHide={() => setAddModalShow(false)} />
                    <EditStock show={editModalShow} onHide={() => setEditModalShow(false)} product={product} />
                </Container>
            </div>
        </>
    )
}
