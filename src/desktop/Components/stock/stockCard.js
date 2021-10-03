import React, { useState } from 'react'
import { Card, Col, Button } from 'react-bootstrap';

import moment from 'jalali-moment';
import persianJs from 'persianjs/persian.min';
import { Popover, Backdrop } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';


// Icons
import editIcon from '../../assets/images/Products/edit.svg'
import closeIcon from '../../assets/images/close.svg'


const useStyles = makeStyles((theme) => ({
    root: {
        zIndex: "9999 !important",
        backgroundColor: "rgb(0, 0, 0,0.5)"
    },
    popover: {
        width: "23%",
        backgroundColor: "transparent",
        // display: "flex",
        alignItems: "center",
        overflow: "inherit"
    },
    backdrop: {
        zIndex: "5000 !important"
    }
}));
export const StockCard = ({ item, sideBar, setEditModalShow, setProduct, ...props }) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const classes = useStyles();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


    return (
        <>
            <Card className={`m-auto mt-3 bg-light  product--card--desktop mx-2`} aria-describedby={id} >
                <Card.Body className="pb-0 ps-1 rounded-3">
                    <Card.Title>
                        {item.active
                            ? <div className="activeStatus d-flex"><span></span><p className="fs-6">فعال</p> </div>
                            : <div className="deActiveStatus d-flex"><span></span><p className="fs-6">غیر فعال</p></div>}

                    </Card.Title>
                    <Card.Text >
                        <span className="text-gray fw-bold" >نام : </span>
                        <span className="fs-7 me-2 fw-bold">{item.name && persianJs(item.name).englishNumber().toString()}</span>

                    </Card.Text>
                    <Card.Text className="pt-1">
                        <span className="text-gray fw-bold">تاریخ ویرایش : </span>
                        <span className="fs-7 me-2 fw-bold">{item.updatedAt && persianJs(moment.from(item.updatedAt, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')).englishNumber().toString()}</span>

                    </Card.Text>
                    <Card.Text className="m-0 p-0 pt-1 d-flex align-items-start">

                        <span className="text-gray fw-bold text--description--product">توضیحات :</span>
                        <span className="fs-7 me-2 ms-2 fw-bold text--breake--dscription">{item.description && persianJs(item.description).englishNumber().toString()}</span>
                        <Col className="d-flex justify-content-center ">
                            {item?.description?.length > 26 ? <span className="fw-bold fs-7 text--dark--blue text--more--product--desktop" onClick={handleClick}>بیشتر...</span> : null}
                        </Col>
                    </Card.Text>
                    <Card.Link className="editLogo w-100 d-block m-auto" onClick={() => { setEditModalShow(true); setProduct(item) }}>
                        <img className="d-block me-auto" src={editIcon} height="42px" alt="back-icon" />
                    </Card.Link>
                </Card.Body>
            </Card >
            <Backdrop open={open} classes={{ root: classes.backdrop }} >
                <Popover
                    classes={{ root: classes.root, paper: classes.popover }}
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    // onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'center',
                        horizontal: 'left',
                    }}
                >
                    <Button className="border-0 customer-modal-close--desktop" type="button" onClick={handleClose}>
                        <img className="d-flex m-auto customer-modal-close-svg--desktop" src={closeIcon} alt="close-btn" />
                    </Button>
                    <Card className="bg-light product--card--popover--desktop" aria-describedby={id}>
                        <Card.Body className="pb-0 ps-1 rounded-3 ">
                            <Card.Title>
                                {item.active
                                    ? <div className="activeStatus d-flex"><span></span><p className="fs-6">فعال</p> </div>
                                    : <div className="deActiveStatus d-flex"><span></span><p className="fs-6">غیر فعال</p></div>}
                            </Card.Title>
                            <Card.Text className="pt-1">
                                <span className="text-gray fw-bold" >نام : </span>
                                <span className="fs-7 me-2 fw-bold">{item.name && persianJs(item.name).englishNumber().toString()}</span>
                            </Card.Text>
                            <Card.Text className="pt-1">
                                <span className="text-gray fw-bold">تاریخ ویرایش : </span>
                                <span className="fs-7 me-2 fw-bold">{item.updatedAt && persianJs(moment.from(item.updatedAt, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')).englishNumber().toString()}</span>

                            </Card.Text>
                            <Card.Text className="m-0 p-0 pt-1 ">
                                <span className="text-gray fw-bold text--description--product">توضیحات :</span>
                                <span className="fs-7 me-2 fw-bold " style={{ wordBreak: "break-word" }}>{item.description && persianJs(item.description).englishNumber().toString()}</span>

                            </Card.Text>

                            <Card.Link className="editLogo w-100 d-block m-auto" >
                                <img className="d-block me-auto" src={editIcon} height="42px" alt="back-icon" onClick={() => { handleClose(); setEditModalShow(true); setProduct(item) }} />
                            </Card.Link>
                        </Card.Body>
                    </Card>
                </Popover>
            </Backdrop>

        </>
    )
}
