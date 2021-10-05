import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col, Modal, Spinner, Card } from 'react-bootstrap';
import persianJs from 'persianjs/persian.min';

// Components
import CircularProgress from '@material-ui/core/CircularProgress';
// Actions
import { orderActions } from '../../../actions';

// Icons
import closeIcon from '../../assets/images/close.svg'
import fileIcon from '../../assets/images/order/file.svg'


export const ShowDocuments = (props) => {

    const [docs, setDocs] = useState(useSelector(state => state.showDoc.data))
    const [productnameValidated, setProductNameValidated] = useState(false);
    const addProductLoading = useSelector(state => state.addStock.loading)
    const documents = useSelector(state => state.showDoc.data);
    const documentsLoading = useSelector(state => state.showDoc.loading);

    props.show && console.log(documents, documentsLoading);
    const dispatch = useDispatch()

    console.log(documentsLoading);
    console.log(documents)


    useEffect(() => {
        if (props.show == true) {
            dispatch(orderActions.showDoc({ orderId: props.order }))
            setDocs(documents)
        }
    }, [props.order, props.show])
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop="static"
            className="px-3"
        >
            <Modal.Body className="add-product px-4" style={{ height: documents?.length == 0 ? null : "80vh" }}>
                <Button className="border-0 customer-modal-close--desktop" type="button" onClick={e => { props.onHide(false); setProductNameValidated(false); }}>
                    <img className="d-flex m-auto customer-modal-close-svg--desktop" src={closeIcon} alt="close-btn" />
                </Button>
                <Card className="m-auto mt-2 mb-2 bg-light productCard lh-lg " style={{ height: "100%" }} >
                    <Card.Body className={`card--body--show--doc--mobile p-3 px-0 mx-2 rounded-3 fs-6-sm ${documentsLoading && 'd-flex justify-content-center'} `}>
                        {props.show && !documentsLoading && documents?.length == 0 && <><h6 className="mt-5 text-center lh-lg ">هنوز مدرکی برای این سفارش اضافه نشده است</h6><br /> <h6 className="mb-5 text-center text--dark--blue" style={{ cursor: "pointer" }} onClick={() => { props.onHide(false); setProductNameValidated(false); props.UploadModalShow() }}>بارگذاری مدرک</h6>  </>}
                        {documentsLoading ? <CircularProgress className="my-5 text-center" /> : null}


                        <Row style={{ height: "100%" }}>
                            {
                                props.show ?
                                    documents?.length > 0 && documents?.map((doc, index) =>
                                        <Col key={index} xs={6} className="mb-3 px-4">
                                            <Col>{doc.name}</Col>
                                            <Col>
                                                <Card className="productCard bg-light lh-lg border--blue" style={{ 'height': '106px' }}>
                                                    <Card.Body className="rounded-3">
                                                        {doc.location && <img src={doc.location} alt="document-picc" className="doc--img img-fluid" />}
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        </Col>
                                    )
                                    : null
                            }
                        </Row>
                    </Card.Body>
                </Card>
            </Modal.Body>

        </Modal>
    )
}
