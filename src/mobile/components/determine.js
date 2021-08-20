import React, { useState } from 'react'
import { Row, Col, Button, Container } from 'react-bootstrap';

// Components
import { EmployeeRegister } from './employeeRegister'
import { EmployerRegister } from './employerRegister'

// Assets
import logo from './../assets/images/crm.svg'

export const Determine = () => {

    const [position, setPosition] = useState({})
    const [submitted, setSubmitted] = useState(false)

    const handleClick = (value) => {
        setPosition({ [value]: true })

    }
    // label="کارمند" name="setPosition" id="employee"
    return (
        <>
            {!Object.keys(position).length && (
                <div className="d-flex align-items-center determine-page">
                    <Container fluid className="d-flex determine-container flex-column justify-content-center align-items-center">
                        <Row className="p-0 m-0 mzLogo">
                            <Col className="">
                                <img className="logo" src={logo} alt="logo" width="168px" />
                            </Col>
                        </Row>
                        <Row className="text-center w-100 determine-btn-row">
                            <Col>
                                <Button onClick={() => handleClick("employee")} className="determine-btn-employee">کارمند</Button>
                            </Col>
                            <Col>
                                <Button onClick={() => { handleClick("employer") }} className="determine-btn-employer">کارفرما</Button>
                            </Col>
                        </Row>
                    </Container>
                </div>
            )}
            {position.employer && <EmployerRegister />}
            {position.employee && <EmployeeRegister />}
        </>
    )
}
