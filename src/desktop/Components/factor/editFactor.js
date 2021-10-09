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
import { receiptActions, stockActions, alertActions } from '../../../actions'

export const EditFactor = (props) => {


    const [dimStatus, setDimStatus] = useState(false)
    const [selectedItem, setItem] = useState("")
    const [quantity, setQuantity] = useState(1)
    const [quantityFactor, setQuantityFactor] = useState(false)
    const [factor, setFactor] = useState([])
    const [validated, setValidated] = useState(false)
    const [inputProductValidation, setInputProductValidation] = useState(false)
    const [addressUser, setAddressUser] = useState('')
    const [activeProduct, setActiveProduct] = useState("")
    const [editPriceCurrentProduct, setEditPriceCurrentProduct] = useState(false)
    const [deleteCurrentProduct, setDeleteCurrentProduct] = useState(false)
    const [inputCurrentPriceProduct, setInputCurrentPriceProduct] = useState(false)
    const [inputCurrentPriceProductValidation, setInputCurrentPriceProductValidation] = useState(false)
    const [getTotalPriceLoading, setGetTotalPriceLoading] = useState(false)


    const dispatch = useDispatch()

    const stocks = useSelector(state => state.getStock.stock)
    const loader = useSelector(state => state.editReceipt.loading)


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
    let editPriceStock = (e, stock) => {
        e.preventDefault();
        if (inputCurrentPriceProduct == "" || inputCurrentPriceProduct == "0") {
            setInputCurrentPriceProductValidation(true)
        } else {
            setInputCurrentPriceProductValidation(false)

            let updatedFactor = factor.map((item) => {
                if (item._id === stock._id) {
                    return { ...item, price: inputCurrentPriceProduct };
                }
                return item;
            });
            setFactor(updatedFactor);
            setEditPriceCurrentProduct(false)
            setGetTotalPriceLoading(false)

        }
    }
    let removeFactor = (e, stock) => {

        if (factor.length == 1) {
            dispatch(alertActions.error("کمتر از یک کالا در سبد خرید مجاز نیست"))
            setTimeout(() => {
                dispatch(alertActions.clear())
            }, 1500);
        } else {


            let updateFactor = factor.filter(item => item._id !== stock._id);

            setFactor(updateFactor)
            setActiveProduct("")
            setDeleteCurrentProduct(false)
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
        let value = persianJs(e.target.value).toEnglishNumber().toString()

        if (value == "0") {
            setQuantityFactor(true)
        } else {
            setQuantityFactor(false);
            setQuantity(value || 1);
        }
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
            <Container className="m-0 p-0 " style={{ top: "0", zIndex: "2" }} >
                <Row className="m-0 p-0 header--notes--desktop header--edit--order--desktop">
                    <Col className="m-0 p-0 d-flex justify-content-center  ">
                        <span className="text-light">ویرایش فاکتور</span>
                    </Col>
                </Row>
            </Container>
            <Modal.Body className="add-product px-3">


                <Form onSubmit={formHandler}>
                    <Container className="m-0 p-0 mx-auto d-flex flex-column justify-content-between">
                        <Row className="m-0 p-0 mt-1" >
                            <Col className="m-0 p-0 ">
                                <Card className="border-0 bg-transparent text-light">
                                    <Form.Label className="pe-3">آدرس</Form.Label>
                                    <Form.Control className="order-input address-input py-2" type="text"
                                        defaultValue={props.factor?.address}
                                        onChange={addressInputHandler}
                                    />
                                </Card>
                            </Col>
                        </Row>
                        <Row className="m-0 p-0 mt-3">
                            <Form.Label className="pe-3">سبد خرید</Form.Label>
                            <Card className="border-0 p-3 pt-2 basket--Product--Container basket--edit--product--container">
                                <Card.Body className="p-0 basket-flex">
                                    <Row className="m-0 p-0 mt-2 justify-content-evenly">
                                        <Col className="col-7 p-0 m-0">
                                            <Dropdown onToggle={(e) => setDimStatus(!dimStatus)} onClick={(e) => stockHandler(e)}>
                                                <Dropdown.Toggle className={`px-1 d-flex align-items-center ${inputProductValidation ? 'border border-danger' : null}`} >
                                                    {selectedItem.length ? <span className="me-2">{selectedItem}</span > : <span className="me-2 fw-bold">مواد خام</span>}
                                                    <img className="me-auto" src={spinnerIcon} height="20px" alt="spinner-icon" style={{ transform: dimStatus ? "rotate(180deg)" : null }} />
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
                                                                                {/* <Col>{item.sellingPrice && persianJs(item.sellingPrice).englishNumber().toString()} </Col> */}
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

                                        <Col className="col-3 p-0 m-0 pe-3 d-flex justify-content-center">

                                            <Form.Control
                                                placeholder="تعداد"
                                                value={Number.isInteger(quantity) ? "" : quantity}
                                                onChange={(e) => quantityFactorHandler(e)}
                                                className={` order-input--desktop text-center ${quantityFactor ? 'border border-danger' : null}`}
                                                type="tel"
                                                inputMode="tel"
                                                pattern="[0-9]*"
                                                name="duration"
                                                style={{ 'maxHeight': '35px' }} >
                                            </Form.Control>
                                        </Col>
                                        <Col className="m-0 p-0 text-center products-add-btn d-flex justify-content-end">
                                            <Button className="products-add--desktop border-0 py-1 w-75  " onClick={(e) => newOrder(e)} type="button" style={{ height: "35px" }}>
                                                <img className="d-flex m-auto " src={plusIcon} alt="add-button" />
                                            </Button>
                                        </Col>

                                    </Row>

                                    <Row className="pt-2 pe-2">
                                        <div className="table-wrapper-scroll-y my-custom-scrollbar px-1" style={{ height: "31vh" }}>
                                            <Table className="lh-lg" borderless size="sm">
                                                <thead>
                                                    <tr className="mb-5 pb-5">
                                                        <th className="fw-bold col-6 mb-3">سفارش</th>
                                                        <th className="fw-bold mb-3 pe-3">قیمت (تومان)</th>
                                                        <th className="fw-bold mb-3">تعداد</th>
                                                        <th className="mb-3"></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        factor?.length
                                                            ? factor.map(item => {

                                                                return (
                                                                    <tr key={item.name}>
                                                                        <td  >{item.name && persianJs(item.name).englishNumber().toString()}</td>
                                                                        {(editPriceCurrentProduct && activeProduct._id == item._id) || (item.price == undefined) ?
                                                                            <>
                                                                                <td className={`m-0 px-0 ${(editPriceCurrentProduct || item.price == undefined) ? "d-flex" : null} `} style={{ width: "155px" }}>
                                                                                    <img src={tickIcon} onClick={(e) => editPriceStock(e, item)} className="ms-2" alt="tick-icon" style={{ width: "20px" }} />
                                                                                    <img src={deleteeIcon} onClick={(e) => { if (item.price != undefined) { setEditPriceCurrentProduct(false); setGetTotalPriceLoading(false) } setInputCurrentPriceProductValidation(false) }} className="ms-2" alt="delete-icon" style={{ width: "20px" }} />
                                                                                    <Form.Control className={`notes-round ${inputCurrentPriceProductValidation ? 'border border-danger' : null}`} min="1" type="tel"
                                                                                        inputMode="tel"
                                                                                        pattern="[0-9]*" defaultValue={item.price} onChange={e => setInputCurrentPriceProduct(e.target.value && persianJs(e.target.value).toEnglishNumber().toString())} />
                                                                                </td>
                                                                            </>
                                                                            :
                                                                            <>
                                                                                <td className="px-0">
                                                                                    <img src={editIcon} onClick={(e) => { setEditPriceCurrentProduct(true); setActiveProduct(item); setGetTotalPriceLoading(true) }} className="ms-3 " alt="edit-icon" style={{ width: "33px" }} />
                                                                                    {(item.quantity * item.price) && persianJs(item.quantity * item.price).englishNumber().toString()}
                                                                                </td>
                                                                            </>
                                                                        }
                                                                        <td className="pe-2">{item.quantity && persianJs(item.quantity).englishNumber().toString()}</td>
                                                                        {

                                                                            (deleteCurrentProduct && activeProduct._id == item._id) ?
                                                                                <td className="text-start " style={{ width: "155px" }}>
                                                                                    <img src={tickIcon} onClick={(e) => removeFactor(e, item)} className="ms-2" alt="tick-icon" style={{ width: "20px" }} />
                                                                                    <img src={deleteeIcon} onClick={(e) => { setDeleteCurrentProduct(false) }} className="ms-2" alt="delete-icon" style={{ width: "20px" }} />
                                                                                    <span>آیا حذف شود؟</span>
                                                                                </td>
                                                                                :
                                                                                <td onClick={(e) => { setDeleteCurrentProduct(true); setActiveProduct(item) }}><img src={deleteIcon} className="d-block me-auto" alt="delete-icon" /></td>
                                                                        }
                                                                    </tr>
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
                                            <Col className="px-1 fs-5">
                                                {getTotalPriceLoading ?
                                                    <Spinner className="" animation="border" />
                                                    :
                                                    <>
                                                        {getTotalPrice(factor) && persianJs(getTotalPrice(factor)).englishNumber().toString()}
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
