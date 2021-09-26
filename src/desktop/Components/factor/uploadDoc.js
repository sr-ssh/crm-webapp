import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col, Modal, Spinner, Alert } from 'react-bootstrap';
import persianJs from 'persianjs/persian.min';

// Actions
import { productActions, stockActions } from '../../../actions';

// Icons
import closeIcon from '../../assets/images/close.svg'


export const UploadDocuments = (props) => {

    const [product, setProduct] = useState(null)
    const [file, setFile] = useState("")
    const [validated, setValidated] = useState(false);
    const [productnameValidated, setProductNameValidated] = useState(false);
    const addProductLoading = useSelector(state => state.addStock.loading)
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

    let handleChange = (e) => {
        e.preventDefault()
        let value = e.target.value
        let name = e.target.name
        if (name === "productname") {
            value = productnameHandler(value)
        }
        setProduct({ ...product, [e.target.id]: value })
    }

    let formHandler = (e) => {
        e.preventDefault()
        const data = new FormData() 
        data.append('file', file)
        if (product?.name && file) {
            dispatch(stockActions.addStock(product))
            setProduct({ name: ""})
            setFile(null)
            setProductNameValidated(false)
        }
        else {
            setProductNameValidated(true)
        }
    }

    useEffect(() => {
        setProduct()
    }, [])
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="mx-3 order-serach-modal--medium"
        >
            <Modal.Body className="add-product px-4">
                <Button className="border-0 customer-modal-close--desktop" type="button" onClick={e => { props.onHide(false); setProductNameValidated(false);}}>
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
                    <Row className="mt-3">
                        <Col className="col-12 order-filter-input">
                            <Form.Group controlId="name">
                                <Form.Label className="pe-3">نام</Form.Label>
                                <Form.Control name="productname" className="order-input" type="text"
                                    value={product?.name ? "" : null}
                                    onChange={handleChange}
                                    isInvalid={(!product?.name && productnameValidated)}
                                    isValid={((product?.name && validated) || (productnameValidated && product?.name) && true)}

                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <input type="file" className={`d-flex flex-row w-100 align-items-center justify-content-center btn--add--note--desktop radius-16 receipt--add--note`} onChange={e => {console.log(e.target.files[0]);setFile(e.target.files[0]);}} />
                                {/* {
                                    file ?
                                        <>
                                            <span className="me-1 fw-bold ms-3">
                                                {file}
                                            </span>
                                        </>
                                        :
                                        <>
                                        {/* <Form.Control name="productname" className="order-input" type="file" /> */}
                                            {/* <img className="me-3" src={addIcon} height="25px" alt="edit-icon" />
                                            <span className="me-3 fw-bold ms-3">
                                                آدرس فایل را مشخص کنید
                                            </span>

                                        </>
                                }
                            </input> */}
                        </Col>
                    </Row>
                    <Row>
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
                                    <Button className="fw-bold receipt--btn--mobile border-0 w-100 mt-4" size="lg" type="submit" block>
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
