import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Container, Card, Col, Spinner } from 'react-bootstrap'
import persianJs from 'persianjs/persian.min';
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

// Actions
import { employeeActions } from '../../../actions/employeeActions'
// Helpers
import { translate } from '../../../helpers';

// Components
import { AddEmployee } from './addEmployee'
import { EditEmployee } from './editEmployee'
import { RemoveEmployee } from './removeEmployee'
import { Applications } from './applications'
import { Header } from '../base/header'

// Icons
import editIcon from '../../assets/images/Products/edit.svg'
import deleteIcon from '../../assets/images/discounts/deletee.svg'
import checkIcon from '../../assets/images/tick.svg'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';


const useStyles = makeStyles((theme) => ({
    root: {
        fontSize: "0.5rem",
        color: "#4caf50"
    }
}));

export const Employees = () => {

    const classes = useStyles();
    const [addModalShow, setAddModalShow] = useState(false)
    const [editModalShow, setEditModalShow] = useState(false)
    const [removeModalShow, setRemoveModalShow] = useState(false)
    const [employee, setEmployee] = useState({})
    const sideBar = useSelector(state => state.sideBar)
    const userPermissions = useSelector(state => state.getPermissions.permissions)

    let employees = useSelector(state => state.getEmployees.employees)
    let getEmployeesLoading = useSelector(state => state.getEmployees.loading)
    const dispatch = useDispatch()
    useEffect(() => {
        if (!addModalShow && !removeModalShow)
            dispatch(employeeActions.getEmployees())
    }, [dispatch, addModalShow, removeModalShow])

    return (
        <>
            <Header isBTNSearch={false} isBTNRequest={userPermissions.employeeRequests} />

            <div className="product-page margin--top--header" style={{ paddingRight: sideBar.open ? "250px" : 0 }}>

                <Container fluid className="m-0 w-100 d-flex justify-content-around flex-wrap ">

                    {
                        getEmployeesLoading &&
                        <Col className="col-3 mt-2 m-auto d-block align-self-center w-100 mb-4 ">
                            <Spinner className="m-auto d-block" animation="border" />
                        </Col>
                    }
                    {employees ?
                        (employees.map((item, index) =>
                            <Card key={index} className="m-0 p-0 mt-3 employees--card pt-3 px-3 mx-1" >
                                <Card.Body className="p-0 rounded-3 d-flex flex-column justify-content-between">
                                    <Row className="m-0 p-0 ">
                                        <Card.Text className="p-0  employees-text-gray--desktop">
                                            نام : <span>{item.family && persianJs(item.family).englishNumber().toString()}</span>
                                        </Card.Text>
                                        <Card.Text className="p-0 employees-text-gray--desktop">
                                            موبایل : <span>{item.mobile && persianJs(item.mobile).englishNumber().toString()}</span>
                                        </Card.Text>
                                        <Col className="m-0 mb-2 p-0 d-flex  ">
                                            <Card.Text className="m-0 p-0 fs-6 ms-2 employees-text-gray--desktop">
                                                sip :
                                            </Card.Text>
                                            <Card.Text className="m-0 p-0 employees-text-gray--desktop">
                                                <span>{item.voipNumber && persianJs(item.voipNumber).englishNumber().toString()}</span>
                                            </Card.Text>
                                        </Col>
                                        
                                        <Row className="m-0 p-0 d-flex align-items-center">
                                            <Col xs={6} className="p-0 ">
                                                <Card.Text className="employees-text-gray--desktop">
                                                    سطح دسترسی:
                                                </Card.Text>
                                            </Col>
                                            {
                                                Object.keys(item.permission).map((per, index) =>
                                                    per === "getDiscounts" ? null :
                                                        item.permission[per]
                                                            ? <Col xs={6} className="p-0 mt-2 employees-text-permission--desktop d-flex  align-items-center "><FiberManualRecordIcon classes={{ root: classes.root }} /><span className="me-1">{translate(per)}</span></Col>
                                                            : null
                                                )
                                            }
                                        </Row>
                                    </Row>
                                    <Row className="p-0 m-0 mt-4 d-flex justify-content-end" >
                                        <Row className="justify-content-end">
                                            <Card.Link className="d-flex justify-content-center editLogo m-0" onClick={() => { setRemoveModalShow(true); setEmployee(item) }}>
                                                <img className="" src={deleteIcon} height="29px" alt="delete-icon" />
                                            </Card.Link>
                                            <Card.Link className="d-flex justify-content-center editLogo m-0" onClick={() => { setEditModalShow(true); setEmployee(item) }}>
                                                <img className="" src={editIcon} height="39px" alt="edit-icon" />
                                            </Card.Link>
                                        </Row>
                                    </Row>

                                </Card.Body>
                            </Card>
                        ))

                        : null
                    }
                </Container>
                <AddEmployee show={addModalShow} onHide={() => setAddModalShow(false)} />
                <EditEmployee show={editModalShow} onHide={() => setEditModalShow(false)} employee={employee} />
                <RemoveEmployee show={removeModalShow} onHide={() => setRemoveModalShow(false)} employee={employee} />
            </div >
        </>
    )
}
