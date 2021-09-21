import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
// Actions
// Components
import { Header } from '../base/serachHeader'
import { FactorSearch } from './search'
import { Factor } from './factor'


export const Factors = () => {


    const [modalShow, setModalShow] = useState(false)
    const orders = [
        {
            id: "6149bcb098760605b5f3fa96",
            active: true,
            status: 0,
            products: [
                {
                    _id: "612b90b5c35fce6d64602fde",
                    name: "لاته با خامه",
                    quantity: 2,
                    sellingPrice: "15555"
                }
            ],
            notes: [],
            customer: {
                _id: "61065ab9fc8924372c006a80",
                family: "محمد جواد حیدری",
                mobile: "09105044033",
                createdAt: "2021-08-01T08:26:33.370Z"
            },
            createdAt: "2021-09-21T11:06:24.463Z",
            updatedAt: "2021-09-21T11:06:33.989Z",
            employee: {
                _id: "61065a83fc8924372c006a7e",
                family: "محمد جواد حیدری"
            }
        }
    ]


    return (
        <div className="factors--page">
            <Header className="noPrint" title="فاکتور ها " modalShow={modalShow} setModalShow={setModalShow} />
            <Container fluid>
                {/* {
                    orderLoading &&
                    <Row>
                        <Col className="col-3 mt-2 m-auto ">
                            <Spinner className="m-auto d-block" animation="border" />
                        </Col>
                    </Row>
                } */}
                {/* {
                    (orders.length === 0 && !orderLoading) ? (
                        <Row className="justify-content-center align-items-center no-result-filter">
                            <Col className="col-8 text-center">
                                هیج نتیجه ای یافت نشد!
                            </Col>
                        </Row>
                    ) : null
                } */}


                {(orders.length > 0) ?
                    (orders.map((factores, index) =>
                        <Factor key={index} factor={factores} />
                    ))
                    : null}

                <FactorSearch show={modalShow} onHide={() => setModalShow(false)} />
                {/* <CancelOrder status="2" show={cancelOrderShow} onHide={() => setCancelOrderShow(false)} order={activeOrder} /> */}


            </Container>
        </div>
    )
}
