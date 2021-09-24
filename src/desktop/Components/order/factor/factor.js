import React, { useEffect } from 'react'
import { Col, Container, Row, Card, Table } from 'react-bootstrap'
import CircularProgress from '@material-ui/core/CircularProgress';
import { useDispatch, useSelector } from 'react-redux'




// Actions
import { orderActions } from '../../../../actions';



// Components
import { FormalFactor } from './formalFactor';
import { InformalFactor } from './informalFactor';




export const Factor = (props) => {


    const dispatch = useDispatch()
    let factor = useSelector(state => state.orderDetails)
    useEffect(() => {
        if (props.match.params.orderId && props.match.params.keyLink)
            dispatch(orderActions.orderDetails(props.match.params))
    }, [dispatch])
    return (
        <div>
            {
                factor.loading ? (
                    <Container fluid className="factor--page--desktop d-flex justify-content-center align-items-center">
                        <CircularProgress />
                    </Container>
                ) : (
                    factor.data.invoiceType == 0 ? <FormalFactor factor={factor.data} /> : <InformalFactor factor={factor.data} />
                )}
        </div >
    )
}
