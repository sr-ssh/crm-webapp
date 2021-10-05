import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col, Modal, Spinner } from 'react-bootstrap';

// Actions
import { orderActions } from '../../../actions';

// Icons
import closeIcon from '../../assets/images/close.svg'
import fileIcon from '../../assets/images/order/file.svg'


export const UploadDocuments = (props) => {

    const [product, setProduct] = useState(null)
    const [file, setFile] = useState("")
    const [fileName, setFileName] = useState("")
    const [validated, setValidated] = useState(false);
    const [productnameValidated, setProductNameValidated] = useState(false);
    const addProductLoading = useSelector(state => state.addStock.loading)
    const dispatch = useDispatch()
    
    const data = new FormData() 

    let formHandler = (e) => {
        e.preventDefault()
       
        console.log(product)
        if (file && fileName) {
            data.append('file', file)
            data.append('fileName', fileName)
            data.append('orderId', props.order.id)
            dispatch(orderActions.uploadDoc(data))
            setFileName("")
            setFile("")
            setFile(null)
            setProductNameValidated(false)
        }
        else {
            setProductNameValidated(true)
        }
    }

    useEffect(() => {
        setFileName("")
        setFile("")
    }, [])
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="mx-3 order-serach-modal"
        >
            <Modal.Body className="add-product px-4">
                <Button className="border-0 customer-modal-close--desktop" type="button" onClick={e => { props.onHide(false); setProductNameValidated(false);}}>
                    <img className="d-flex m-auto customer-modal-close-svg--desktop" src={closeIcon} alt="close-btn" />
                </Button>
                <Form onSubmit={formHandler} >
                    <Row className="mt-1">
                        <Col className="col-12 order-filter-input">
                            <Form.Group controlId="name">
                                <Form.Label className="pe-3">اسم فایل</Form.Label>
                                <Form.Control name="productname" className="order-input" type="text"
                                    value={fileName}
                                    onChange={e => setFileName(e.target.value)}
                                    isInvalid={(!product?.name && productnameValidated)}
                                    isValid={((product?.name && validated) || (productnameValidated && product?.name) && true)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="top-16">
                        <Col>
                            <img className="file--icon--mobile" src={fileIcon} alt="file-icon" height="30px" />
                            <span className="pe-4 fs-7 file--icon--mobile fw-bold">{!file ? "آدرس فایل را مشخص کنید" : file.name}</span>
                            <input type="file" accept="image/png, image/gif, image/jpeg" className={`d-flex flex-row w-100 align-items-center justify-content-center btn--add--note--desktop receipt--add--note  py-0 upload--file--input pe-0 h-50`} onChange={e => {console.log(e.target.files[0]);setFile(e.target.files[0]);}} title="آدرس فایل را مشخص کنید"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {
                                addProductLoading ? (
                                    <Button className="fw-bold receipt--btn--mobile border-0 w-100 mt-0 fs-6-sm py-2" size="lg" type="submit" disabled>
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
                                    <Button className="fw-bold receipt--btn--mobile border-0 w-100 mt-0 fs-6-sm py-2" size="lg" type="submit" block>
                                        آپلود
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
