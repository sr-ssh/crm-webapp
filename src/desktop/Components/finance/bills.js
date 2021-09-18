import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col } from 'react-bootstrap';
import { Button } from '@material-ui/core'



//actions
import { financeActions } from "../../../actions";

//components
import { Bill } from "./bill";
import { AddBill } from './addBill'
import { Header } from '../base/headerExcel'


const Bills = () => {

    const [addModalShow, setAddModalShow] = useState(false)
    let bills = useSelector(state => state.bill.items)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(financeActions.getBills())
    }, [dispatch])

    return (
        <>
            <Header isBTNSearch={true}
                //  isGetExcel={true} getExcel={getExcel}
                isBtnAdd={"اضافه هزینه"} btnAdd={() => setAddModalShow(true)} />

            <div className="product-page orders margin--top--header">
                <Container fluid className="m-0 w-100 d-flex justify-content-center flex-wrap ">
                    {
                        bills ?
                            bills.map((bill, index) => <Bill key={index} bill={bill} />)
                            : null
                    }
                    <AddBill show={addModalShow} onHide={() => setAddModalShow(false)} />
                </Container>
            </div>
        </>
    )
}

export default Bills;