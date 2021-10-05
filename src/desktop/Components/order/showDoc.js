import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col, Modal, Spinner, Card } from 'react-bootstrap';
import persianJs from 'persianjs/persian.min';

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
    const documentsLoading = useSelector(state => state.showDoc);

    props.show && console.log(documents, documentsLoading);
    const dispatch = useDispatch()
    

    

    useEffect(() => {
        dispatch(orderActions.showDoc({ orderId: props.order}))
        setDocs(documents)
    }, [props.order])
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="mx-3 order-serach-modal--large"
        >
            <Modal.Body className="add-product px-4">
                <Button className="border-0 customer-modal-close--desktop" type="button" onClick={e => { props.onHide(false); setProductNameValidated(false);}}>
                    <img className="d-flex m-auto customer-modal-close-svg--desktop" src={closeIcon} alt="close-btn" />
                </Button>
                <Card className="m-auto mt-2 mb-2 bg-light productCard lh-lg " >
                    <Card.Body className="p-3 px-4 mx-2 rounded-3 fs-6-sm">
                        <Row>
                        {
                            props.show  ?
                            documents?.map((doc, index) => 
                            <Col key={index} xs={4} className="mb-3 px-4">
                                <Col>{doc.name}</Col>
                                <Col>
                                <Card className="productCard bg-light lh-lg border--blue" style={{'height': '106px'}}>
                                    <Card.Body className="rounded-3 px-2">
                                        {doc.location && <img src={doc.location} alt="document-picc" className="doc--img"/>}
                                    
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
