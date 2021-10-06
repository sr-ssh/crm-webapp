import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col, Modal, Spinner, Alert } from 'react-bootstrap';
import persianJs from 'persianjs/persian.min';

// Actions
import { productActions } from '../../../actions';

// Icons
import closeIcon from '../../assets/images/close.svg'


export const AddProduct = (props) => {

    const [product, setProduct] = useState({})
    const [validated, setValidated] = useState(false);
    const [productnameValidated, setProductNameValidated] = useState(false);
    const [productpriceValidated, setProductPriceValidated] = useState(false);
    const [checkWareHouse, setCheckWareHouse] = useState(0)
    const [direct, setDirect] = useState(0)
    const addProductLoading = useSelector(state => state.addProduct.loading)
    const alert = useSelector(state => state.alert)
    const dispatch = useDispatch()

    let productnameHandler = (value) => {
        const pName = value;
        const patt = /^[آ-یa-zA-Z0-9 ]+$/;
        let res = patt.test(pName.trim());
        if (res) {
            setProductNameValidated(true)
            return value
        }
        else {
            return undefined
        }
    }
    let productpriceHandler = (value) => {
        const pPrice = value;
        const patt = /^[0-9]+$/m;
        let res = patt.test(pPrice);
        if (res) {
            setProductPriceValidated(true)
            return value
        }
        else
            return undefined
    }



    let handleChange = (e) => {
        e.preventDefault()
        let value = e.target.value
        let name = e.target.name
        if (name === "productname") {
            value = productnameHandler(value)
        }
        if (name === "productprice") {
            value = productpriceHandler(value)
        }
        if (e.target.id === 'sellingPrice' && value?.length)
            value = persianJs(value).toEnglishNumber().toString();
        setProduct({ ...product, [e.target.id]: value })
    }

    let formHandler = (e) => {
        e.preventDefault()
        if (product?.name && product?.sellingPrice) {
            dispatch(productActions.addProduct({...product, checkWareHouse, direct}))
            setProduct({ name: "", sellingPrice: "", description: "" })
            setCheckWareHouse(0)
            setDirect(0)
            setProductNameValidated(false)
            setProductPriceValidated(false)
        }
        else {
            setProductNameValidated(true)
            setProductPriceValidated(true)
        }
    }

    useEffect(() => {
        setProduct()
        setCheckWareHouse(0)
        setDirect(0)
    }, [props.show])

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="mx-3 order-serach-modal"
        >
            <Modal.Body className="add-product px-4">
                <Button className="border-0 customer-modal-close" type="button" onClick={e => { props.onHide(false); setProductNameValidated(false); setProductPriceValidated(false) }}>
                    <img className="d-flex m-auto customer-modal-close-svg" src={closeIcon} alt="close-btn" />
                </Button>
                {
                    alert.message &&
                    <>
                        <div className="modal-backdrop show"></div>
                        <Row className="justify-content-center text-center ">
                            <Alert variant={alert.type}>
                                {alert.message}
                            </Alert>
                        </Row>
                    </>
                }
                <Form onSubmit={formHandler} >
                    <Row className="mt-3">
                        <Col className="col-12 order-filter-input">
                            <Form.Group controlId="name">
                                <Form.Label className="pe-3">نام محصول</Form.Label>
                                <Form.Control name="productname" className="order-input" type="text"
                                    value={addProductLoading ? "" : null}
                                    onChange={handleChange}
                                    isInvalid={(!product?.name && productnameValidated)}
                                    isValid={((product?.name && validated) || (productnameValidated && product?.name) && true)}

                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col className="col-12 order-filter-input">
                            <Form.Group controlId="sellingPrice">
                                <Form.Label className="pe-3">قیمت (تومان)</Form.Label>
                                <Form.Control name="productprice" className="order-input" type="number" min="0"
                                    value={addProductLoading ? "" : null}
                                    onChange={handleChange}

                                    isInvalid={(!product?.sellingPrice && productpriceValidated)}
                                    isValid={((product?.sellingPrice && validated) || (productpriceValidated && product?.sellingPrice) && true)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="description" className="order-filter-input mt-3">
                                <Form.Label className="pe-3">توضیحات</Form.Label>
                                <Form.Control name="productdescription" className="order-input border-0 h-100" as="textarea" rows={6} value={addProductLoading ? "" : null} onChange={handleChange} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                    <Row className="p-0 m-0 my-1 mt-3">
                        <Col className="col-6 ps-2 d-flex align-items-center">
                            <input type="checkbox" id="pass" name="pass" className="btn-toggle-status-green" checked={checkWareHouse} onChange={() => setCheckWareHouse(!checkWareHouse)} />
                            <span className="fw-bold pe-3">انبار</span>
                        </Col>
                        <Col className="col-6 pe-2 d-flex align-items-center">
                            <input type="checkbox" id="fail" name="fail" className="btn-toggle-status-green" checked={direct} onChange={() => setDirect(!direct)} />
                            <span className="fw-bold pe-3">مستقیم</span>
                        </Col>
                    </Row>
                        <Col>
                            {
                                addProductLoading ? (
                                    <Button className="fw-bold order-submit border-0 w-100 mt-4" size="lg" type="submit" disabled>
                                        <Spinner
                                            as="span"
                                            animation="grow"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />
                                        در حال انجام عملیات...
                                    </Button>
                                ) : (
                                    <Button className="fw-bold order-submit border-0 w-100 mt-4" size="lg" type="submit" block>
                                        ثبت
                                    </Button>
                                )
                            }
                        </Col>
                    </Row>
                </Form>

            </Modal.Body>

        </Modal>
    )
}
