import React, { useEffect, useState } from 'react'
import { Container, Card, Row, Alert, Spinner, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import moment from 'jalali-moment';
import persianJs from 'persianjs/persian.min';
import { Button } from '@material-ui/core'

// Actions
import { productActions, employeeActions } from '../../../actions'
// Components
import { AddProduct } from './addProduct'
import { EditProduct } from './editProduct'
import { Header } from '../base/headerExcel'

// Icons
import editIcon from '../../assets/images/Products/edit.svg'

export const Products = () => {


    const [addModalShow, setAddModalShow] = useState(false)
    const [editModalShow, setEditModalShow] = useState(false)
    const [product, setProduct] = useState({})
    const dispatch = useDispatch()
    const products = useSelector(state => state.getProducts.product)
    const productLoading = useSelector(state => state.getProducts.loading)
    const addProductLoading = useSelector(state => state.addProduct.loading)
    const userPermissions = useSelector(state => state.getPermissions.permissions)

    const getExcel = () => {
        dispatch(productActions.getExcelProducts())
    }


    useEffect(() => {
        if (!editModalShow && !addModalShow)
            dispatch(productActions.getProducts())
        dispatch(employeeActions.getPermissions())
    }, [dispatch, editModalShow, addModalShow])

    return (
        <>
            <Header isBTNSearch={true} userPermission={userPermissions.excelProduct} isGetExcel={true} getExcel={getExcel} isBtnAdd={"اضافه محصول"} btnAdd={() => setAddModalShow(true)} />
            <div className="product-page d-flex flex-column align-items-center margin--top--header ">
                <Container className="m-0 w-100 d-flex justify-content-center flex-wrap ">
                    {
                        (productLoading) &&
                        <Col className="col-3 mt-2 m-auto d-block align-self-center w-100 mb-4 ">
                            <Spinner className="m-auto d-block" animation="border" />
                        </Col>
                    }
                    {products ?
                        (products.map((item, index) =>
                            <Card key={index} className="m-auto mt-3 bg-light productCard col-3 mx-2" >
                                <Card.Body className="pb-0 ps-1 rounded-3">
                                    <Card.Title>
                                        {item.active
                                            ? <div className="activeStatus"><span></span> فعال</div>
                                            : <div className="deActiveStatus"><span></span> غیرفعال</div>}
                                    </Card.Title>
                                    <Card.Text className="pt-1">
                                        <span style={{ "color": "var(--text-color-one)" }}>نام : </span>{item.name && persianJs(item.name).englishNumber().toString()}
                                    </Card.Text>
                                    <Card.Text className="pt-1">
                                        <span style={{ "color": "var(--text-color-one)" }}>قیمت فروش : </span>{item.sellingPrice && persianJs(item.sellingPrice).englishNumber().toString()}
                                    </Card.Text>
                                    <Card.Text className="pt-1">
                                        <span style={{ "color": "var(--text-color-one)" }}>تاریخ ویرایش : </span>{item.updatedAt && persianJs(moment.from(item.updatedAt, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')).englishNumber().toString()}
                                    </Card.Text>
                                    <Card.Text className="pt-1 ps-1">
                                        <span style={{ "color": "var(--text-color-one)" }}>توضیحات :   </span>{item.description && persianJs(item.description).englishNumber().toString()}
                                    </Card.Text>
                                    <Card.Link className="editLogo w-100 d-block m-auto" onClick={() => { setEditModalShow(true); setProduct(item) }}>
                                        <img className="d-block me-auto" src={editIcon} height="42px" alt="back-icon" />
                                    </Card.Link>
                                </Card.Body>
                            </Card>
                        ))

                        : null}

                    <AddProduct show={addModalShow} onHide={() => setAddModalShow(false)} />
                    <EditProduct show={editModalShow} onHide={() => setEditModalShow(false)} product={product} />
                </Container>
            </div>
        </>
    )
}
