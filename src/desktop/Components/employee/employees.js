import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Container, Card, Col, Spinner } from 'react-bootstrap'
import persianJs from 'persianjs/persian.min';
import { Button } from '@material-ui/core'


// Actions
import { employeeActions } from '../../../actions/employeeActions'
// Helpers
import { translate } from '../../../helpers';

// Components
import { AddEmployee } from './addEmployee'
import { EditEmployee } from './editEmployee'
import { RemoveEmployee } from './removeEmployee'
import { Applications } from './applications'
// Icons
import editIcon from '../../assets/images/Products/edit.svg'
import deleteIcon from '../../assets/images/discounts/deletee.svg'
import checkIcon from '../../assets/images/tick.svg'

export const Employees = () => {
    const [addModalShow, setAddModalShow] = useState(false)
    const [editModalShow, setEditModalShow] = useState(false)
    const [removeModalShow, setRemoveModalShow] = useState(false)
    const [employee, setEmployee] = useState({})

    let employees = useSelector(state => state.getEmployees.employees)
    let getEmployeesLoading = useSelector(state => state.getEmployees.loading)
    const dispatch = useDispatch()
    useEffect(() => {
        if (!addModalShow && !editModalShow && !removeModalShow)
            dispatch(employeeActions.getEmployees())
    }, [dispatch, addModalShow, editModalShow, removeModalShow])

    return (
        <div className="product-page">

            <Container fluid className="m-0 w-100 d-flex justify-content-center flex-wrap ">

                {
                    getEmployeesLoading &&
                    <Col className="col-3 mt-2 m-auto d-block align-self-center w-100 mb-4 ">
                        <Spinner className="m-auto d-block" animation="border" />
                    </Col>
                }
                {employees ?
                    (employees.map((item, index) =>
                        <Card key={index} className="m-auto mt-3 productCard col-3 mx-1" >
                            <Card.Body className="pb-0 ps-1 rounded-3 ">
                                <Card.Text className="pt-1">
                                    نام : <span>{item.family && persianJs(item.family).englishNumber().toString()}</span>
                                </Card.Text>
                                <Card.Text className="pt-1">
                                    موبایل : <span>{item.mobile && persianJs(item.mobile).englishNumber().toString()}</span>
                                </Card.Text>
                                <Row>
                                    <Col xs={4} className="ps-0">
                                        <Card.Text className="pt-1">
                                            سطح دسترسی:
                                        </Card.Text>
                                    </Col>
                                    <Col className="pe-0">
                                        <Card.Text className="pt-1">
                                            {
                                                Object.keys(item.permission).map(per =>
                                                    item.permission[per]
                                                        ? <Col><img src={checkIcon} height="27px" alt="tick-icon" className="application-check-icon" /> <span>{translate(per)}</span></Col>
                                                        : null
                                                )
                                            }
                                        </Card.Text>
                                    </Col>
                                </Row>


                                <Row className="justify-content-end">
                                    <Card.Link className="d-flex justify-content-center editLogo" onClick={() => { setRemoveModalShow(true); setEmployee(item) }}>
                                        <img className="" src={deleteIcon} height="29px" alt="delete-icon" />
                                    </Card.Link>
                                    <Card.Link className="d-flex justify-content-center editLogo" onClick={() => { setEditModalShow(true); setEmployee(item) }}>
                                        <img className="" src={editIcon} height="39px" alt="edit-icon" />
                                    </Card.Link>
                                </Row>
                            </Card.Body>
                        </Card>
                    ))

                    : null}
            </Container>
            <AddEmployee show={addModalShow} onHide={() => setAddModalShow(false)} />
            <EditEmployee show={editModalShow} onHide={() => setEditModalShow(false)} employee={employee} />
            <RemoveEmployee show={removeModalShow} onHide={() => setRemoveModalShow(false)} employee={employee} />
        </div>
    )
}
