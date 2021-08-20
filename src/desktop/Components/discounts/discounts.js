import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import { Button } from '@material-ui/core'

// Actions
import { discountActions } from '../../../actions/discountActions';


// components
import { Discount } from './discount'
import { AddDiscount } from './addDiscount';

export const Discounts = () => {

    const [modalShow, setModalShow] = useState(false)
    let discounts = useSelector(state => state.getDiscounts.discounts)
    let loader = useSelector(state => state.getDiscounts)
    console.log(loader);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(discountActions.getDiscounts());

    }, [dispatch])

    console.log(discounts);
    return (
        <>
            <div className="product-page orders">
                <Container fluid className="m-0 w-100 d-flex justify-content-center flex-wrap ">
                    <Row>
                        <Col>
                            <Button variant="contained" size="large" color="primary" className="ff-iranSans " onClick={() => setModalShow(true)}>
                                <span className="text-light">اضافه تخفیف</span>
                            </Button>
                        </Col>
                    </Row>
                </Container>
                <Container fluid className="m-0 w-100 d-flex justify-content-center flex-wrap ">

                    {
                        discounts.length > 0
                            ? (discounts.map((discount, index) => <Discount key={index} discount={discount} />))
                            : <>
                                <Col className="col-12 mt-4 d-flex justify-content-center w-100 mb-4">
                                    <span>  هنوز تخفیفی ثبت نشده!</span>
                                </Col>
                            </>
                    }
                    {discounts ? console.log(discounts) : null}
                    <AddDiscount show={modalShow} onHide={() => setModalShow(false)} />
                </Container>
            </div>
        </>
    )
}

