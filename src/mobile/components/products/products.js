import React, { useEffect, useState } from 'react'
import { Container, Card, Row, Alert, Spinner, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import moment from 'jalali-moment';
import persianJs from 'persianjs/persian.min';
import commaNumber from 'comma-number'
// Actions
import { productActions, employeeActions } from '../../../actions'
// Components
import { Header } from '../base/productsExcelHeader';
import { AddProduct } from './addProduct'
import { EditProduct } from './editProduct'
import { XlsxModal } from './xlsxModal';

// Icons
import editIcon from '../../assets/images/Products/edit.svg'

export const Products = () => {


    const [addModalShow, setAddModalShow] = useState(false)
    const [editModalShow, setEditModalShow] = useState(false)
    const [xlsxModalShow, setXlsxModalShow] = useState(false)

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
        if (!editModalShow && !addModalShow && !xlsxModalShow)
            dispatch(productActions.getProducts())
    }, [dispatch, editModalShow, addModalShow, xlsxModalShow])


    return (
        <div className="product-page">
            <Header title="محصولات" getExcel={() => setXlsxModalShow(true)} setModalShow={setAddModalShow} userPermission={userPermissions.excelProduct} />
            <Container className="m-auto">
                {
                    (productLoading) &&
                    <Row>
                        <Col className="col-3 mt-2 m-auto ">
                            <Spinner className="m-auto d-block" animation="border" />
                        </Col>
                    </Row>
                }
                {products ?
                    (products.map((item, index) =>
                        <Card key={index} className="m-auto mt-3 bg-light productCard" >
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
                                    <span style={{ "color": "var(--text-color-one)" }}>قیمت فروش : </span>{item.sellingPrice && persianJs(commaNumber(item.sellingPrice)).englishNumber().toString()}
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
                <XlsxModal show={xlsxModalShow} onHide={() => setXlsxModalShow(false)} />

            </Container>
        </div>
    )
}
