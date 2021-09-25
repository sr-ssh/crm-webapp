import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col, Modal, Spinner, Alert } from 'react-bootstrap';
import persianJs from 'persianjs/persian.min';

// Actions
import { productActions, stockActions } from '../../../actions';
// Icons
import closeIcon from '../../assets/images/close.svg'

export const EditStock = (props) => {
    const [newProduct, setnewProduct] = useState(props.product)
    const editProductLoading = useSelector(state => state.editStock.loading)
    const alert = useSelector(state => state.alert)
    const dispatch = useDispatch()
    const [validated, setValidated] = useState(false);
    const [productnameValidated, setProductNameValidated] = useState(false);

    let productnameHandler = (value) => {
        const pName = value;
        console.log(pName.trim());
        const patt = /^[آ-یa-zA-Z0-9 ]+$/;
        let res = patt.test(pName.trim());
        if (res) {
            setProductNameValidated(false)
            return value
        }
        else {
            return undefined
        }
    }
    let handleChange = (e) => {
        let { id, value } = e.target;
        console.log(id, value);
        // product name validation 
        if (id === 'name')
            value = productnameHandler(value)
        // product sellingPrice validation  
        if (id === 'active1')
            setnewProduct({ ...newProduct, active: true })
        else if (id === 'active0')
            setnewProduct({ ...newProduct, active: false })
        else
            setnewProduct({ ...newProduct, [id]: value })
    }

    let formHandler = (e) => {
        e.preventDefault()
        console.log(newProduct);
        if (newProduct.name) {
            dispatch(stockActions.editStock(newProduct))

        }
        else
            setValidated(true)

        // dispatch(productActions.editProduct(newProduct))
    }

    useEffect(() => {
        setnewProduct(props.product)
    }, [props.product])


    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered className="mx-3 order-serach-modal--medium"
        >
            <Modal.Body className="add-product px-4">
                <Button className="border-0 customer-modal-close--desktop" type="button" onClick={e => props.onHide(false)}>
                    <img className="d-flex m-auto customer-modal-close-svg--desktop" src={closeIcon} alt="close-btn" />
                </Button>
                {/* {
                    alert.message &&
                    <>
                        <div className="modal-backdrop show"></div>
                        <Row className="justify-content-center text-center ">
                            <Alert variant={alert.type}>
                                {alert.message}
                            </Alert>
                        </Row>
                    </>
                } */}
                <Form onSubmit={formHandler} >
                    <Row className="my-3 mb-4 justify-content-center">
                        <Col className="ms-3">
                            <Form.Group className="fw-bold product-checkbox" onChange={handleChange}>
                                <Row>
                                    <Col className="fw-bold product-checkbox" xs={1}>
                                        <Form.Check.Input name="activity" id="active1" defaultChecked={props.product.active} inline type="radio" isValid />
                                    </Col>
                                    <Col className="fw-bold product-checkbox">
                                        <Form.Check.Label htmlFor="active1" inline className="me-1 product-checkbox--success">فعال</Form.Check.Label>
                                    </Col>
                                </Row>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="fw-bold product-checkbox" onChange={handleChange}>
                            <Row>
                                    <Col className="fw-bold product-checkbox" xs={1}>
                                <Form.Check.Input name="activity" id="active0" defaultChecked={!props.product.active} inline type="radio" isInvalid /></Col>
                                    <Col className="fw-bold product-checkbox">
                                <Form.Check.Label htmlFor="active0" inline className="me-1 product-checkbox--danger">غیر فعال</Form.Check.Label>
                                </Col>
                                </Row>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col className="col-6 order-filter-input">
                            <Form.Group controlId="name">
                                <Form.Label className="pe-3">نام</Form.Label>
                                <Form.Control className="order-input" type="text" defaultValue={props.product.name}
                                    onChange={handleChange}
                                    isInvalid={((!newProduct.name && validated) || (productnameValidated) && true)}
                                    isValid={((newProduct.name && validated) || (productnameValidated && newProduct.name) && true)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="description" className="order-filter-input mt-3">
                                <Form.Label className="pe-3">توضیحات</Form.Label>
                                <Form.Control className="order-input--description border-0 h-100" as="textarea" defaultValue={props.product.description} rows={6} onChange={handleChange} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {
                                editProductLoading ? (
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
                                        ویرایش کردن
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
