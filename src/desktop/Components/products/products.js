import React, { useEffect, useState } from 'react'
import { Container, Spinner, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'

import { Button } from '@material-ui/core'

// Actions
import { productActions, employeeActions } from '../../../actions'
// Components
import { AddProduct } from './addProduct'
import { EditProduct } from './editProduct'
import { Header } from '../base/headerExcel'
import { XlsxModal } from './xlsxModal';
import { Product } from './product'


export const Products = () => {


    const [addModalShow, setAddModalShow] = useState(false)
    const [editModalShow, setEditModalShow] = useState(false)
    const [xlsxModalShow, setXlsxModalShow] = useState(false)
    const [product, setProduct] = useState({})
    const dispatch = useDispatch()
    const products = useSelector(state => state.getProducts.product)
    const productLoading = useSelector(state => state.getProducts.loading)
    const addProductLoading = useSelector(state => state.addProduct.loading)
    const {user : userInfo ,loading : userInfoLoading } = useSelector(state => state.appInfo)
    const sideBar = useSelector(state => state.sideBar)




    useEffect(() => {
        if (!editModalShow && !addModalShow && !xlsxModalShow)
            dispatch(productActions.getProducts())
    }, [dispatch, editModalShow, addModalShow, xlsxModalShow])

    return (
        <>
            <Header isBTNSearch={false} userPermission={userInfo?.data.permission.ExcelProducts} isGetExcel={true} getExcel={() => setXlsxModalShow(true)} isBtnAdd={"اضافه محصول"} btnAdd={() => setAddModalShow(true)} />
            <div className="product-page d-flex flex-column align-items-center margin--top--header" style={{ paddingRight: sideBar.open ? "250px" : 0 }}>
                <Container fluid className="m-0 px-4 w-100 d-flex justify-content-evenly flex-wrap ">
                    {/* {
                        (productLoading) &&
                        <Col className="col-3 mt-2 m-auto d-block align-self-center w-100 mb-4 ">
                            <Spinner className="m-auto d-block" animation="border" />
                        </Col>
                    } */}
                    {products ?
                        (products.map((item, index) =>
                            <Product key={index} sideBar={sideBar.open} item={item} setEditModalShow={() => setEditModalShow(true)} setProduct={(product) => setProduct(product)} />
                        ))
                        : null}

                    <AddProduct show={addModalShow} onHide={() => setAddModalShow(false)} />
                    <EditProduct show={editModalShow} onHide={() => setEditModalShow(false)} product={product} />
                    <XlsxModal show={xlsxModalShow} onHide={() => setXlsxModalShow(false)} />

                </Container>
            </div>
        </>
    )
}
