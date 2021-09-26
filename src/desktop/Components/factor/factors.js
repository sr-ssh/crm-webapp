import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Container, Alert, Spinner, Button } from 'react-bootstrap';
import { Backdrop } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

// Icons
import SearchIcon from '@material-ui/icons/Search';

// Actions
import { receiptActions } from '../../../actions';
// Components
import { FactorSearch } from './search'
import { Factor } from './factor';
import { CancelFactor } from './cancelFactor'
import { Header } from '../base/header'
import { UploadDocuments } from './uploadDoc'





export const Factors = () => {


    let alertMessage = useSelector(state => state.alert.message)
    let alerType = useSelector(state => state.alert.type)
    const [modalShow, setModalShow] = useState(false)
    const [uploadModalShow, setUploadModalShow] = useState(false)
    const [cancelFactorShow, setCancelFactorShow] = useState(false)
    const [activeFactor, setActiveFactor] = useState({})

    const [order, setOrder] = useState('')
    const dispatch = useDispatch()


    let { receipts, loading } = useSelector(state => state.getReceipts)


    // let { err: cancelErr, loading: cancelLoading } = useSelector(state => state.cancelProductOrder)



    useEffect(() => {
        !cancelFactorShow && dispatch(receiptActions.getReceipts())
    }, [dispatch, cancelFactorShow])





    return (
        <>
            <Header isBTNSearch={true} searchModalShow={() => setModalShow(true)} isBTNRequest={false} />
            <div className="product-page orders w-100 margin--top--header">
                <Container fluid className="m-0  mt-5 w-100 d-flex justify-content-center flex-wrap mb-5 ">
                    {
                        loading ?
                            <Col className="col-3 mt-5 m-auto d-block align-self-center w-100 mb-4 ">
                                <Spinner className="m-auto d-block" animation="border" />
                            </Col>
                            : null

                    }
                    {
                        (receipts.length === 0 && !loading) ? (
                            <Row className="justify-content-center align-items-center no-result-filter">
                                <Col className="col-8 text-center">
                                    هیج نتیجه ای یافت نشد!
                                </Col>
                            </Row>
                        ) : null
                    }

                    {(receipts.length > 0) ?
                        (receipts.map((factores, index) =>
                            <Factor key={index} factor={factores} setCancelFactorShow={setCancelFactorShow} setActiveFactor={setActiveFactor} setUploadModalShow={setUploadModalShow} />
                        ))
                        : null}

                    <FactorSearch show={modalShow} onHide={() => { setModalShow(false) }} />
                    <CancelFactor status="1" show={cancelFactorShow} onHide={() => setCancelFactorShow(false)} factor={activeFactor} />
                    <UploadDocuments show={uploadModalShow} onHide={() => setUploadModalShow(false)} />
                </Container>

            </div>
        </>
    )
}
