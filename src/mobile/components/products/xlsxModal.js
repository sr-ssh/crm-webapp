import React, { useEffect } from 'react'
import { Container, Button, Row, Col, Modal, Spinner, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { productActions } from '../../../actions'

// Icons
import closeIcon from '../../assets/images/close.svg'
import dowloadIcon from '../../assets/images/order/dowload.svg'
import uploadIcon from '../../assets/images/order/upload.svg'


export const XlsxModal = (props) => {

    const dispatch = useDispatch()
    const uploadLoader = useSelector(state => state.uploadExcelProducts)

    let uploadHandler = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('excel', e.target.files[0])
        dispatch(productActions.uploadExcelProducts(formData))
    }

    const getExcel = () => {
        dispatch(productActions.getExcelProducts())
    }
    useEffect(() => {
        return () => dispatch(productActions.getProducts())
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
                <Button className="border-0 customer-modal-close" type="button" onClick={e => props.onHide(false)}>
                    <img className="d-flex m-auto customer-modal-close-svg" src={closeIcon} alt="close-btn" />
                </Button>
                <Row>
                    <Col className="py-2 ">
                        <Button className="w-100 py-3  btn-outline-dark btn--sale--opprotunity border-0" style={{ position: "relative" }}>
                            <img src={uploadIcon} height="30px" alt="uplaod-icon" />
                            <span className="fs-7 me-2">بارگذاری اکسل</span>
                            <input type="file" id="file" name="file" className="btn--upload" accept=".xlsx, .xls, .csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" onChange={uploadHandler} />
                        </Button>
                    </Col>
                    <Col className="py-2 ">
                        <Button className="w-100 py-3  btn-outline-dark btn--sale--opprotunity border-0" onClick={() => { props.onHide(false); getExcel() }} >
                            <img src={dowloadIcon} height="30px" alt="download-icon" />
                            <span className="fs-7 me-2">دانلود اکسل</span>
                        </Button>
                    </Col>
                </Row>
            </Modal.Body>

        </Modal >
    )
}
