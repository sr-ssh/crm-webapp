import React from 'react'
import { Container, Button, Row, Col, Modal, Spinner, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { productActions } from '../../../actions'




// Icons
import closeIcon from '../../assets/images/close.svg'
import dowloadIcon from '../../assets/images/order/dowload.svg'
import uploadIcon from '../../assets/images/order/upload.svg'









export const XlsxModal = (props) => {

    const dispatch = useDispatch()


    let uploadHandler = (e) => {
        console.log(e.target.files[0]);
    }

    const getExcel = () => {
        dispatch(productActions.getExcelProducts())
    }


    return (
        <Modal
            {...props}
            backdrop="static"
            aria-labelledby=""
            centered

            className=""
        >
            <Modal.Body className="add-product px-4" style={{ maxWidth: "550px" }}>
                <Button className="border-0 customer-modal-close--desktop" type="button" onClick={e => props.onHide(false)}>
                    <img className="d-flex m-auto customer-modal-close-svg--desktop" src={closeIcon} alt="close-btn" />
                </Button>
                <Container className="my-3  ">
                    <Row>
                        <Col className="py-2 ">
                            <Button className="w-100 py-3  btn-outline-dark btn--sale--opprotunity border-0" style={{ position: "relative" }}>
                                <img src={uploadIcon} height="35px" alt="uplaod-icon" />
                                <span className="fs-6 me-2">بارگذاری اکسل</span>
                                <input type="file" id="file" name="file" className="btn--upload" accept=".xlsx, .xls, .csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" onChange={uploadHandler} />
                            </Button>
                        </Col>
                        <Col className="py-2 ">
                            <Button className="w-100 py-3  btn-outline-dark btn--sale--opprotunity border-0" onClick={() => { props.onHide(false); getExcel() }} >
                                <img src={dowloadIcon} height="35px" alt="download-icon" />
                                <span className="fs-6 me-2">دانلود اکسل</span>
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>

        </Modal >
    )
}
