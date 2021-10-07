import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col, Modal, Spinner, Alert } from 'react-bootstrap';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
export const AddProductCheck = (props) => {

    
    let {checkWareHouse, setCheckWareHouse} = props
    let {direct, setDirect} = props
    
    useEffect(() => {
        console.log(props.checkWareHouse)
    }, [props.checkWareHouse])

    return (
   
        <>
        <Row className="p-0 m-0 my-1 mt-3">
            <Col className="col-6 ps-2 d-flex align-items-center">
                <input type="checkbox" id="pass" name="pass" className="btn-toggle-status-blue" checked={checkWareHouse} onChange={() => setCheckWareHouse(!checkWareHouse)} />
                <label className="fw-bold pe-3" htmlFor="pass">انبار
                {checkWareHouse ? <ExpandLess className="me-3" style={{'fill': '#1d64cd'}}/> : <ExpandMore className="me-3" style={{'fill': '#1d64cd'}} />}</label>
            </Col>
            
        </Row>
        {
            checkWareHouse === true && 
            <>
            <Row className="p-0 m-0 my-1 mt-3 pe-4">
                <Col className="col-6 pe-2 d-flex align-items-center">
                    <input type="checkbox" id="fail" name="fail" className="btn-toggle-status-blue" checked={direct} onChange={() => setDirect(!direct)} />
                    <label className="fw-bold pe-3" htmlFor="fail">مستقیم</label>
                </Col>
            </Row>
            <Row className="p-0 m-0 my-1 mt-3 pe-4">
            <Col className="col-6 pe-2 d-flex align-items-center" disabled>
                <input type="checkbox" id="fail" name="fail" className="btn-toggle-status-blue" checked={false} onChange={() => setDirect(!direct)} disabled/>
                <span className="fw-bold pe-3 text--color--disabled">ترکیبی</span>
                </Col>
            </Row>
            </>
        }
        </>
    )
}
