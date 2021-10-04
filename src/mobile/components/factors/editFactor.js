import React, { useState, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Dropdown, Modal, Row, Col, Form, Button, Table, Spinner, Alert, Card } from 'react-bootstrap'
import persianJs from 'persianjs/persian.min';
import commaNumber from 'comma-number'
//Assets
import closeIcon from '../../assets/images/close.svg'
// import deleteIcon from './../../assets/images/delete.svg'
import spinnerIcon from './../../assets/images/sppiner.svg'
import plusIcon from './../../assets/images/plus.svg'
import deleteIcon from '../../assets/images/discounts/deletee.svg'
import editIcon from './../../assets/images/order/edit.svg'
import tickIcon from './../../assets/images/order/ok.svg'
import deleteeIcon from './../../assets/images/order/close.svg'

//Actions
import { receiptActions, stockActions, alertActions } from '../../../actions'


// Componenst
import { EditStock } from './editStock'



export const EditFactor = (props) => {

    const dispatch = useDispatch()
    const [dimStatus, setDimStatus] = useState(false)
    const [selectedItem, setItem] = useState("")
    const [quantity, setQuantity] = useState(1)
    const [quantityFactor, setQuantityFactor] = useState(false)
    const [factor, setFactor] = useState([])
    const [inputProductValidation, setInputProductValidation] = useState(false)
    const [addressUser, setAddressUser] = useState('')
    const [validationInputPrice, setValidationInputPrice] = useState(false)
    const [getTotalPriceLoading, setGetTotalPriceLoading] = useState(false)

    const stocks = useSelector(state => state.getStock.stock)
    const loader = useSelector(state => state.editReceipt.loading)

    let alertMessage = useSelector(state => state.alert.message)
    let alerType = useSelector(state => state.alert.type)

    useEffect(async () => {
        await setFactor(props.factor.stock)
        await setAddressUser(props.factor.address)
        let total = 0
        props.factor.stock?.map(item => {
            total += item.price * item.quantity;
            return total
        })
    }, [props.show])


    let stockHandler = (e) => {
        e.preventDefault()
        dispatch(stockActions.getStock())
    }
    let newOrder = (e) => {
        e.preventDefault();

        if (selectedItem == "")
            return setInputProductValidation(true)
        else
            setInputProductValidation(false)

        let stock = stocks.find(item => item.name === selectedItem)
        let oldFactor = factor.find(item => item.name === selectedItem);


        if (oldFactor == undefined) {
            let newFactor = {
                _id: stock._id,
                name: stock.name,
                quantity: parseInt(quantity),
                price: stock.price
            };
            setFactor((prevFactorState) => [...prevFactorState, newFactor]);
            setGetTotalPriceLoading(true)
        } else {
            const updatedFactor = factor.map((item) => {
                if (item._id === stock._id) {
                    return { ...item, quantity: parseInt(item.quantity) + parseInt(quantity) };
                }
                return item;
            });
            setFactor(updatedFactor);
        }
    };
    let editPriceStock = (stock, value) => {
        if (value == "" || value == "0") {
            setValidationInputPrice(true)
        } else {
            setValidationInputPrice(false)
            let updatedFactor = factor.map((item) => {
                if (item._id === stock._id) {
                    return { ...item, price: value };
                }
                return item;
            });
            setFactor(updatedFactor);
            setGetTotalPriceLoading(false)
        }
    }

    let removeFactor = (stock) => {
        if (factor.length == 1) {
            dispatch(alertActions.error("کمتر از یک کالا در سبد خرید مجاز نیست"))
            setTimeout(() => {
                dispatch(alertActions.clear())
            }, 1500);
        } else {
            let updateFactor = factor.filter(item => item._id !== stock._id);
            setFactor(updateFactor)
        }
    }

    const getTotalPrice = (factor) => {
        let total = 0
        factor?.map(item => {
            total += parseInt(item.price) * item.quantity
        })
        return total
    }



    let closeHandler = e => {
        props.onHide(false);
        setFactor([])
        setQuantity(1)
        setItem("")
    }
    let addressInputHandler = e => {
        setAddressUser(e.target.value)
    }
    const formHandler = (e) => {
        e.preventDefault();
        if (factor.length > 0) {
            let stocks = factor.map(item => { return { _id: item._id, quantity: item.quantity, price: item.price } })
            let params = {
                receiptId: props.factor.id,
                stocks: stocks,
                address: addressUser || ""
            };

            dispatch(receiptActions.editReceipt(params))

            setTimeout(() => {
                dispatch(receiptActions.getReceipts())
                props.onHide(false)
            }, 1000);
        }
    }
    let quantityFactorHandler = (e) => {
        if (e.target.value == "0") {
            setQuantityFactor(true)
        } else {
            setQuantityFactor(false);
            setQuantity(e.target.value || 1);
        }
    }

    return (
        <Modal
            {...props}
            size="lg"
            backdrop="static"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="w-100 m-0 p-0"
        >
            {
                alertMessage &&
                <>
                    <div className="modal-backdrop show"></div>
                    <Row className="justify-content-center text-center ">
                        <Alert variant={alerType}>
                            {alertMessage}
                        </Alert>
                    </Row>
                </>
            }
            <Button className="border-0 customer-modal-close" type="button" onClick={closeHandler}>
                <img className="d-flex m-auto customer-modal-close-svg" src={closeIcon} alt="close-btn" />
            </Button>
            <Modal.Body className="add-product px-3">
                {
                    props.show &&
                    <Form onSubmit={formHandler}>
                        <Container className="m-0 p-0 mx-auto d-flex flex-column justify-content-between">
                            <Row className="m-0 p-0 mt-2" >
                                <Col className="p-0 ">
                                    <Card className="border-0 bg-transparent text-light">
                                        <Form.Label className="pe-3">آدرس</Form.Label>
                                        <Form.Control className="order-input address-input" type="text"
                                            defaultValue={props.factor.address}
                                            onChange={addressInputHandler}
                                        />
                                    </Card>
                                </Col>
                            </Row>
                            <Row className="m-0 p-0 mt-4">
                                <Form.Label className="pe-3">سبد خرید</Form.Label>
                                <Card className="border-0 p-3 pt-2  basket--edit--product--container">
                                    <Card.Body className="p-0 basket-flex">
                                        <Row className="d-flex align-content-center justify-content-evenly">
                                            <Col className="col-6 pe-0 ps-1">
                                                <Dropdown onToggle={(e) => setDimStatus(!dimStatus)} onClick={(e) => stockHandler(e)} >
                                                    <Dropdown.Toggle className={`d-flex align-items-center justify-content-between px-1 py-3 ${inputProductValidation ? 'border border-danger' : null} `}>

                                                        {selectedItem.length ? <span>{selectedItem}</span> : <span>محصولات</span>}
                                                        <img className="me-auto" src={spinnerIcon} height="30px" alt="spinner-icon" />
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu className={`${dimStatus ? "dim" : ""} dropdownProductMenu`}>
                                                        {stocks
                                                            ? stocks.map((item, index) => {
                                                                return (
                                                                    item.active && (
                                                                        <Col key={index}>
                                                                            {index ? <Dropdown.Divider /> : null}
                                                                            <Dropdown.Item onClick={() => { setItem(item.name); setQuantity(1) }}>
                                                                                <Row>
                                                                                    <Col className="text-end pe-1">{item.name}</Col>
                                                                                    {/* <Col>{item.price && persianJs(item.price).englishNumber().toString()} </Col> */}
                                                                                </Row>
                                                                            </Dropdown.Item>
                                                                        </Col>
                                                                    ))
                                                            })
                                                            : null
                                                        }
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </Col>
                                            <Col className="col-3 p-0 m-0  d-flex justify-content-center">

                                                <Form.Control
                                                    placeholder="تعداد"
                                                    value={Number.isInteger(quantity) ? "" : quantity}
                                                    onChange={(e) => quantityFactorHandler(e)}
                                                    className={` order-input--desktop text-center ${quantityFactor ? 'border border-danger' : null}`}
                                                    type="number"
                                                    min="1"
                                                    name="duration"
                                                    style={{ 'maxHeight': '35px' }} >
                                                </Form.Control>
                                            </Col>
                                            <Col className="col-2 m-0 p-0 px-1 text-center products-add-btn">
                                                <Button className="products-add--mobile  p-0 border-0 w-100 py-1" type="button" onClick={(e) => newOrder(e)}>
                                                    <img className="d-flex m-auto " src={plusIcon} alt="add-button" />
                                                </Button>
                                            </Col>

                                        </Row>

                                        <Row className="pt-2 pe-2">
                                            <div className="table-wrapper-scroll-y my-custom-scrollbar px-1">
                                                <Table className="lh-lg" borderless size="sm">
                                                    <thead>
                                                        <tr>
                                                            <th className="fw-bold col-4">سفارش</th>
                                                            <th className="fw-bold ">قیمت (تومان)</th>
                                                            <th className="fw-bold">تعداد</th>
                                                            <th></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            factor?.length
                                                                ? factor.map(item => {
                                                                    return (
                                                                        <EditStock key={item._id} item={item} factor={factor} removeFactor={() => removeFactor(item)} validationInputPrice={validationInputPrice} editPriceStock={(item, inputCurrentPriceProduct) => editPriceStock(item, inputCurrentPriceProduct)} getTotalPriceLoading={setGetTotalPriceLoading} />
                                                                    )
                                                                })
                                                                : null
                                                        }
                                                    </tbody>
                                                </Table>
                                            </div>

                                            <Row className="border-top-blue--desktop pt-2 mt-auto align-items-center">
                                                <Col className="col-6 m-0 p-0">
                                                    <span className="">جمع کل :</span>
                                                </Col>
                                                <Col className="px-1">
                                                    {getTotalPriceLoading ?
                                                        <Spinner className="" animation="border" />
                                                        :
                                                        <>
                                                            {getTotalPrice(factor) && persianJs(commaNumber(getTotalPrice(factor))).englishNumber().toString()}
                                                        </>
                                                    }
                                                </Col>
                                            </Row>
                                        </Row>

                                    </Card.Body>
                                </Card>
                            </Row>
                            {
                                loader ? (
                                    <Button className="fw-bold order-submit btn-dark-blue border-0 w-100 mt-4" size="lg" type="submit" disabled>
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
                                    <Button className="fw-bold order-submit btn-dark-blue border-0 w-100 mt-4 notes-round" size="lg" type="submit" block>
                                        ثبت
                                    </Button>
                                )
                            }
                        </Container>
                    </Form>
                }

            </Modal.Body >
        </Modal >
    )
}
