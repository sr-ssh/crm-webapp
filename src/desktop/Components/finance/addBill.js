import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Button, Row, Col, Modal } from 'react-bootstrap';
import closeIcon from '../../assets/images/close.svg'
import persianJs from 'persianjs/persian.min';



//actions
import { financeActions } from '../../../actions'

export const AddBill = (props) => {

    const [inputs, setInputs] = useState({});
    const [billnameValidate, setBillNameValidate] = useState(false);
    const [costValidate, setCostValidate] = useState(false);
    const [validated, setValidated] = useState(false);


    const { name, cost } = inputs;
    const dispatch = useDispatch()




    console.log(name, cost);
    // handle validation input name 
    let billNameHandler = (value) => {
        const name = value;
        const patt = /^[آ-یa-zA-Z0-9 ]+$/;
        // return true if value be like pattern
        let res = patt.test(name);
        console.log(res);
        if (res) {
            setBillNameValidate(false)
            return value
        }
        else {
            return undefined
        }
    }
    // handle validation input cost
    let costHandler = (value) => {
        const cost = value;
        const patt = /^[0-9]+$/m;
        // return true if value be like pattern
        let res = patt.test(cost);
        if (res) {
            setCostValidate(false)
            return value
        }
        else {
            return undefined
        }
    }

    const handleChange = (e) => {
        console.log(!inputs.name);
        let { id, value } = e.target;
        if (id === "name") {
            console.log("_______________________________handleChange_______________________________");
            value = billNameHandler(value)
        }
        if (id === "cost") {
            console.log("_______________________________costHandler_______________________________");
            value = persianJs(value).toEnglishNumber().toString()

        }
        setInputs({ ...inputs, [id]: value })
    }

    const formHandler = e => {
        e.preventDefault();
        // name && cost && dispatch(financeActions.addBill(inputs));
        // props.onHide(false)
        ////////////////////
        if (name && cost) {
            dispatch(financeActions.addBill(inputs));
            props.onHide(false)
            setInputs({ name: "", cost: "" })
        } else {
            console.log('empty order can not be sent')
            setValidated(true);
        }
    }
    const closewindowHandle = () => {
        props.onHide(false);
        setValidated(false);
        setInputs({ name: "", cost: "" })
    }
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="mx-3 order-serach-modal"
        >
            <Modal.Body className="add-product px-3">
                <Button className="border-0 customer-modal-close--desktop" type="button" onClick={closewindowHandle}>
                    <img className="d-flex m-auto customer-modal-close-svg--desktop" src={closeIcon} alt="close-btn" />
                </Button>
                <Form onSubmit={formHandler} >
                    <Row className="">
                        <Col xs={9} className="order-filter-input">
                            <Form.Group controlId="name">
                                <Form.Label className="pe-3">نام هزینه</Form.Label>
                                <Form.Control className="order-input" type="text"
                                    onChange={handleChange}
                                    isInvalid={((!inputs.name && validated) || (billnameValidate))}
                                    isValid={((inputs.name && validated) || (billnameValidate && inputs.name) && true)}

                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col xs={9} className="order-filter-input">
                            <Form.Group controlId="cost">
                                <Form.Label className="pe-3">میزان هزینه</Form.Label>
                                <Form.Control className="order-input" type="tel"
                                    inputMode="tel"
                                    pattern="[0-9]*"
                                    onChange={handleChange}
                                    isInvalid={((!cost && validated) || (costValidate) && true)}
                                    isValid={((cost && validated) || (costValidate && cost) && true)}

                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-1">
                        <Col>
                            <Button className="add-product-btn mt-4 w-100 h-75 p-1" type="submit" >ثبت</Button>
                        </Col>
                    </Row>
                </Form>

            </Modal.Body>

        </Modal>
    )
}