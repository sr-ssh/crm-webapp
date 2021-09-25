import React, { useEffect } from 'react'
import { Container, Row, Alert } from 'react-bootstrap'
import CircularProgress from '@material-ui/core/CircularProgress';
import { useDispatch, useSelector } from 'react-redux'
import { Helmet } from "react-helmet";

// Actions
import { orderActions } from '../../../../actions';

// Components
import { FormalFactor } from './formalFactor';
import { InformalFactor } from './informalFactor';


export const Factor = (props) => {

    const dispatch = useDispatch()
    let alertMessage = useSelector(state => state.alert.message)
    let alerType = useSelector(state => state.alert.type)
    let factor = useSelector(state => state.orderDetails)
    useEffect(() => {
        if (props.match.params.orderId && props.match.params.keyLink)
            dispatch(orderActions.orderDetails(props.match.params))
    }, [dispatch])
    return (
        <div className="product-page">
            <Helmet>
                <meta name="viewport" content="width=device-width,height=' + window.innerHeight + ', initial-scale=1.0 maximum-scale=5, user-scalable=yes" />
            </Helmet>
            {
                !factor.loading && alertMessage &&
                <>
                    <div className="modal-backdrop--order-detail show"></div>
                    <Row className="justify-content-center text-center ">
                        <Alert variant={alerType}>
                            {alertMessage}
                        </Alert>
                    </Row>
                </>
            }
            {
                factor.loading ? (
                    <Container fluid className="d-flex justify-content-center align-items-center" style={{ minHeight: "90vh" }}>
                        <CircularProgress />
                    </Container>
                ) : (
                    factor.data.invoiceType == 0 ? <FormalFactor order={factor.data} /> : <InformalFactor order={factor.data} />

                )
            }
        </div >
    )
}
