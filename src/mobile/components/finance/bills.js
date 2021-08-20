import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from 'react-bootstrap';
import { Header } from '../base/billsHeader';



//actions
import { financeActions } from "../../../actions";

//components
import { Bill } from "./bill";
import { AddBill } from './addBill'


const Bills = () => {

    const [addModalShow, setAddModalShow] = useState(false)
    let bills = useSelector(state => state.bill.items)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(financeActions.getBills())
    }, [dispatch])

    return (
        <div className="product-page orders">
            <Header title="هزینه های جاری" modalShow={addModalShow} setModalShow={setAddModalShow} backLink="/finance" />
            <Container className="m-auto">
                {
                    bills ?
                        bills.map((bill, index) => <Bill key={index} bill={bill} />)
                        : null
                }
                <AddBill show={addModalShow} onHide={() => setAddModalShow(false)} />
            </Container>
        </div>
    )
}

export default Bills;