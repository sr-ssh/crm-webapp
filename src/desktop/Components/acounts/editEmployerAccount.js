import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Dropdown, Modal, Row, Col, Form, Button, Table, Spinner, Alert, Card } from 'react-bootstrap'
import persianJs from 'persianjs/persian.min';
//Assets
import closeIcon from '../../assets/images/close.svg'
import deleteeIcon from './../../assets/images/order/close.svg'
import tickIcon from './../../assets/images/order/ok.svg'
import spinnerIcon from './../../assets/images/sppiner.svg'
import plusIcon from './../../assets/images/plus.svg'
import editIcon from './../../assets/images/order/edit.svg'
import deleteIcon from '../../assets/images/discounts/deletee.svg'

//Actions
import { orderActions, productActions, alertActions, userActions } from '../../../actions'

export const EditEmployerAccount = (props) => {

    let {user} = props
    const [oldProduct, setOldProduct] = useState([])
    const [validated, setValidated] = useState(false)
    const [inputProductValidation, setInputProductValidation] = useState(false)
    const [inputs, setInputs] = useState('')
    const dispatch = useDispatch()

    const loader = useSelector(state => state.editProducOrder.loading)


    useEffect(() => {
        user && setInputs({
            family: user.family,
            company: user.company, 
            nationalCode: user.nationalCode,
            financialCode: user.financialCode,
            registerNo: user.registerNo,
            postalCode:  user.postalCode,
            address: user.address,
            nationalIDCode: user.nationalIDCode
        })
        console.log(inputs)
    }, [props.show])

    let closeHandler = e => {
        props.onHide(false);
    }
    
    let companyNameInputHandler = e => {
        setInputs({...inputs, [e.target.name]: e.target.value })
        console.log(inputs)
    }

    const formHandler = (e) => {
        e.preventDefault();
           
        dispatch(userActions.editEmployerAccount(inputs))

    }

    return (
        <Modal
            {...props}
            size="lg"
            backdrop="static"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="w-100 m-0 p-0 "
        >
            <Button className="border-0 customer-modal-close--desktop" type="button" onClick={closeHandler}>
                <img className="d-flex m-auto customer-modal-close-svg--desktop" src={closeIcon} alt="close-btn" />
            </Button>
           
            <Modal.Body className="add-product px-3">


                <Form onSubmit={formHandler}>
                    <Container className="m-0 p-0 mx-auto d-flex flex-column justify-content-between">
                       
                        <Row className="m-0 p-0 mt-2" >

                            <Col className="p-0 ps-3">
                                <Card className="border-0 bg-transparent text-light">
                                    <Form.Label className="pe-3">نام</Form.Label>
                                    <Form.Control className="order-input company-input" type="text"
                                        defaultValue={inputs.family}
                                        onChange={companyNameInputHandler} name="family"
                                    />
                                </Card>
                            </Col>

                            <Col className="p-0 ps-3">
                                <Card className="border-0 bg-transparent text-light">
                                    <Form.Label className="pe-3">کد ملی</Form.Label>
                                    <Form.Control className="order-input company-input" type="text"
                                        defaultValue={inputs.nationalIDCode}
                                        onChange={companyNameInputHandler} name="nationalIDCode"
                                    />
                                </Card>
                            </Col>

                            <Col className="p-0 ps-3">
                                <Card className="border-0 bg-transparent text-light">
                                    <Form.Label className="pe-3">نام شرکت</Form.Label>
                                    <Form.Control className="order-input company-input" type="text"
                                        defaultValue={inputs.company}
                                        onChange={companyNameInputHandler} name="company"
                                    />
                                </Card>
                            </Col>
                            
                               
                            </Row>

                        <Row className="m-0 p-0 mt-1" >
                            <Col className="m-0 p-0 ">
                                <Card className="border-0 bg-transparent text-light">
                                    <Form.Label className="pe-3">آدرس</Form.Label>
                                    <Form.Control className="order-input address-input py-2" type="text"
                                        defaultValue={inputs.address}
                                        onChange={companyNameInputHandler} name="address"
                                    />
                                </Card>
                            </Col>
                        </Row>

                        <Row className="m-0 p-0 mt-2" >
                            
                            <Col className="p-0 ps-3">
                                <Card className="border-0 bg-transparent text-light">
                                    <Form.Label className="pe-3">شناسه ملی شرکت</Form.Label>
                                    <Form.Control className="order-input company-input" type="text"
                                        defaultValue={inputs.nationalCode}
                                        onChange={companyNameInputHandler} name="nationalCode"
                                    />
                                </Card>
                            </Col>

                            <Col className="p-0 ">
                                <Card className="border-0 bg-transparent text-light">
                                    <Form.Label className="pe-3">کداقتصادی</Form.Label>
                                    <Form.Control className="order-input company-input" type="text"
                                        defaultValue={inputs.financialCode}
                                        onChange={companyNameInputHandler} name="financialCode"
                                    />
                                </Card>
                            </Col>

                        </Row>
                    
                        <Row className="m-0 p-0 mt-1" >

                            <Col className="p-0 ps-3">
                                <Card className="border-0 bg-transparent text-light">
                                    <Form.Label className="pe-3">شماره ثبت</Form.Label>
                                    <Form.Control className="order-input company-input" type="text"
                                        defaultValue={inputs.registerNo}
                                        onChange={companyNameInputHandler} name="registerNo"
                                    />
                                </Card>
                            </Col>

                            <Col className="p-0 ">
                                <Card className="border-0 bg-transparent text-light">
                                    <Form.Label className="pe-3">کدپستی</Form.Label>
                                    <Form.Control className="order-input company-input" type="text"
                                        defaultValue={inputs.postalCode}
                                        onChange={companyNameInputHandler} name="postalCode"
                                    />
                                </Card>
                            </Col>

                        </Row>

                        {
                            loader ? (
                                <Button className="fw-bold order-submit border-0 w-100 mt-4" size="lg" type="submit" disabled>
                                    <Spinner
                                        as="span"
                                        animation="grow"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                    در حال انجام عملیات...
                                </Button>
                            ) : (
                                <Button className="fw-bold btn-dark-blue notes-round border-0 w-100 mt-4" size="lg" type="submit" block>
                                    ثبت
                                </Button>
                            )
                        }

                    </Container>
                </Form>

            </Modal.Body >

        </Modal >
    )
}
