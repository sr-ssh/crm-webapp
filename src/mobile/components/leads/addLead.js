import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col, Modal, Spinner } from 'react-bootstrap';
import persianJs from 'persianjs/persian.min';

// Actions
import { leadActions } from '../../../actions';

// Icons
import closeIcon from '../../assets/images/close.svg'

//components


export const AddLead = (props) => {

    const [input, setInput] = useState({})
    const loading = useSelector(state => state.addLead.loading)
    const dispatch = useDispatch()


    let handleChange = (e) => {
        e.preventDefault()
        let value = e.target.value
        let name = e.target.name
        if (e.target.id === 'mobile' && value?.length)
            value = persianJs(value).toEnglishNumber().toString();
        setInput({ ...input, [e.target.id]: value })
    }

    let formHandler = (e) => {
        e.preventDefault()
        if (input?.family && input?.mobile) {
            dispatch(leadActions.addLead(input))
            setInput({ family: "", mobile: "", description: "" })
        }
    }

    useEffect(() => {
        setInput({ family: "", mobile: "", description: "" })
    }, [props.show])


    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="mx-3 order-serach-modal"
        >
            <Modal.Body className="add-product px-3">
                <Button className="border-0 customer-modal-close--desktop" type="button" onClick={e => props.onHide(false)}>
                    <img className="d-flex m-auto customer-modal-close-svg--desktop" src={closeIcon} alt="close-btn" />
                </Button>
                <Form onSubmit={formHandler} >
                    <Row className="mt-3">
                        <Col className="col-12 order-filter-input">
                            <Form.Group controlId="family">
                                <Form.Label className="pe-3">نام</Form.Label>
                                <Form.Control name="family" className="order-input" type="text"
                                    value={loading ? "" : null}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col className="col-12 order-filter-input">
                            <Form.Group controlId="mobile">
                                <Form.Label className="pe-3">موبایل</Form.Label>
                                <Form.Control name="mobile" className="order-input" type="tel" min="0"
                                    value={loading ? "" : null}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="description" className="order-filter-input mt-3">
                                <Form.Label className="pe-3">توضیحات</Form.Label>
                                <Form.Control name="description" className="order-input border-0 h-100" as="textarea" rows="6" value={loading ? "" : null} onChange={handleChange} />
                            </Form.Group>
                        </Col>
                    </Row>


                    <Row>
                        <Col>
                            {
                                loading ? (
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
                                    <Button className="radius-10 fs-6 py-2 fw-bold backgound--dark--blue border-0 w-100 mt-4" size="lg" type="submit" block>
                                        ثبت
                                    </Button>
                                )
                            }
                        </Col>
                    </Row>
                </Form>

            </Modal.Body>

        </Modal>
    )
}
