import React, { useState, useEffect } from 'react'
import { Popover, Backdrop } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Form, Button } from 'react-bootstrap'
import persianJs from 'persianjs/persian.min';



// Icons
import deleteIcon from '../../assets/images/discounts/deletee.svg'
import editIcon from './../../assets/images/order/edit.svg'
import tickGreenIcon from './../../assets/images/order/ok.svg'
import deleteRedIcon from './../../assets/images/order/close.svg'
import cancelIcon from './../../assets/images/employees/cancel.svg'
import tickIcon from './../../assets/images/employees/tick.svg'


const useStyles = makeStyles((theme) => ({
    root: {
        zIndex: "9999 !important",
        backgroundColor: "rgb(0, 0, 0,0.5)"
    },
    popover: {
        minHeight: "65px",
        width: "230px",
        display: "flex",
        alignItems: "center",
    },
    backdrop: {
        zIndex: "5000 !important"
    }
}));



export const EditStock = ({ item, factor, removeFactor, validationInputPrice, editPriceStock, getTotalPriceLoading }) => {

    const classes = useStyles();

    const [editPriceCurrentProduct, setEditPriceCurrentProduct] = useState(false)
    const [inputCurrentPriceProduct, setInputCurrentPriceProduct] = useState("")
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handlePrice = (e) => {
        setInputCurrentPriceProduct(e.target.value)
    }

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


    return (
        <>
            <tr>
                <td>{item.name && persianJs(item.name).englishNumber().toString()}</td>
                {(editPriceCurrentProduct || item.price == undefined) ?
                    <td className={`m-0 px-0 d-flex`} style={{ width: "135px" }} >
                        <img src={tickGreenIcon} className="ms-2" alt="tick-icon" style={{ width: "20px" }} onClick={() => { editPriceStock(item, inputCurrentPriceProduct); setEditPriceCurrentProduct(false) }} />
                        <img src={deleteRedIcon} className="ms-2" alt="delete-icon" style={{ width: "20px" }} onClick={() => { setEditPriceCurrentProduct(false); getTotalPriceLoading(false) }} />
                        <Form.Control className={`notes-round ${validationInputPrice ? 'border border-danger' : null}`} min="1" type="number" defaultValue={item.price} onChange={handlePrice} />
                    </td>
                    :
                    <td className="px-0" >
                        <img src={editIcon} className="ms-3 " alt="edit-icon" style={{ width: "33px" }} onClick={() => { setEditPriceCurrentProduct(true); getTotalPriceLoading(true) }} />
                        {(item.quantity * item.price) && persianJs(item.quantity * item.price).englishNumber().toString()}
                    </td>
                }
                <td className="pe-3">{item.quantity && persianJs(item.quantity).englishNumber().toString()}</td>
                <td aria-describedby={id} onClick={handleClick}>
                    <img src={deleteIcon} className="d-block me-auto" alt="delete-icon" />
                </td>
                <Backdrop open={open} classes={{ root: classes.backdrop }} >
                    <Popover
                        classes={{ root: classes.root, paper: classes.popover }}
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'center',
                            horizontal: 'left',
                        }}
                    >

                        <span className="me-2 fw-bold">حذف شود؟</span>
                        <Button className="border-0 hire-application-btn p-0 mx-3" type="button" onClick={() => { setAnchorEl(null); removeFactor() }} >
                            <img className="d-flex m-auto " src={tickIcon} alt="close-btn" height="40px" />
                        </Button>
                        <Button className="border-0 close-application-btn p-0 mx-2" type="button" onClick={() => { setAnchorEl(null) }} >
                            <img className="d-flex m-auto " src={cancelIcon} alt="close-btn" height="40px" />
                        </Button>

                    </Popover>
                </Backdrop>
            </tr>
        </>
    )
}
