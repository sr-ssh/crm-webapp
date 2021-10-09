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
import { orderActions, productActions, alertActions } from '../../../actions'

export const EditeProductOrder = (props) => {

    const [dimStatus, setDimStatus] = useState(false)
    const [selectedItem, setItem] = useState("")
    const [quantity, setQuantity] = useState(1)
    const [quantityOrder, setQuantityOrder] = useState(false)
    const [order, insertOrder] = useState([])
    const [oldProduct, setOldProduct] = useState([])
    const [validated, setValidated] = useState(false)
    const [inputProductValidation, setInputProductValidation] = useState(false)
    const [addressUser, setAddressUser] = useState('')
    const [activeProduct, setActiveProduct] = useState("")
    const [editPriceCurrentProduct, setEditPriceCurrentProduct] = useState(false)
    const [deleteCurrentProduct, setDeleteCurrentProduct] = useState(false)
    const [inputCurrentPriceProduct, setInputCurrentPriceProduct] = useState(false)
    const [inputCurrentPriceProductValidation, setInputCurrentPriceProductValidation] = useState(false)
    const [companyName, setCompanyName] = useState('')


    const dispatch = useDispatch()

    const products = useSelector(state => state.getProducts.product)
    const loader = useSelector(state => state.editProducOrder.loading)

    let productHandler = (e) => {
        e.preventDefault()
        dispatch(productActions.getProducts())
    }
    let newOrder = (e) => {
        e.preventDefault();
        if (selectedItem == "")
            return setInputProductValidation(true)
        else
            setInputProductValidation(false)

        let product = products.find(item => item.name === selectedItem)
        let oldProduct = order.find(item => item.name === selectedItem);


        if (oldProduct == undefined) {
            let newOrder = {
                _id: product._id,
                name: product.name,
                quantity: parseInt(quantity),
                sellingPrice: product.sellingPrice
            };
            insertOrder((prevOrderState) => [...prevOrderState, newOrder]);
        } else {
            const updatedOrder = order.map((item) => {
                if (item._id === product._id) {
                    return { ...item, quantity: parseInt(item.quantity) + parseInt(quantity) };
                }
                return item;
            });
            insertOrder(updatedOrder);
        }
    };
    let editPriceProduct = (e, product) => {
        e.preventDefault();
        if (inputCurrentPriceProduct == "" || inputCurrentPriceProduct == "0")
            return setInputCurrentPriceProductValidation(true)
        else
            setInputCurrentPriceProductValidation(false)

        let updatedOrder = order.map((item) => {
            if (item._id === product._id) {
                return { ...item, sellingPrice: inputCurrentPriceProduct };
            }
            return item;
        });
        insertOrder(updatedOrder);
        setEditPriceCurrentProduct(false)
    }
    let removeOrder = (e, product) => {

        e.preventDefault();
        if (order.length == 1)
            return dispatch(alertActions.error("کمتر از یک کالا در سبد خرید مجاز نیست"))
        let updatedOrder = order.filter(item => item._id !== product._id);
        insertOrder(updatedOrder)
        setActiveProduct("")
        setDeleteCurrentProduct(false)
    }

    const getTotalPrice = (order) => {
        let total = 0
        order?.map(item => {
            total += item.sellingPrice * item.quantity
        })
        return total
    }

    useEffect(async () => {
        await insertOrder(props.order.products)
        await setOldProduct(props.order.products)
        await setAddressUser(props.order.address)
        props.order.customer && await setCompanyName({
            company: props.order.customer.company,
            nationalCard: props.order.customer.nationalCard,
            financialCode: props.order.customer.financialCode,
            registerNo: props.order.customer.registerNo,
            postalCode: props.order.customer.postalCode
        })
        let total = 0
        props.order.products?.map(item => {
            total += item.sellingPrice * item.quantity;
            return total
        })
    }, [props.show])

    let closeHandler = e => {
        props.onHide(false);
        insertOrder([])
        setQuantity(1)
        setItem("")
    }
    let addressInputHandler = e => {
        setAddressUser(e.target.value)
    }
    let companyNameInputHandler = e => {
        setCompanyName({ ...companyName, [e.target.name]: e.target.value })
    }
    const formHandler = (e) => {
        e.preventDefault();
        if (order.length > 0) {
            let orders = order.map(item => { return { _id: item._id, quantity: item.quantity, sellingPrice: item.sellingPrice } })
            let params = {
                orderId: props.order.id,
                products: orders,
                address: addressUser || ""
            };

            dispatch(orderActions.editProductOrder({ ...params, ...companyName }))

            setTimeout(() => {
                dispatch(orderActions.getOrders({ status: props.status || " " }))
                props.onHide(false)
            }, 1000);
        }
    }
    let quantityOrderHandler = (e) => {
        let value = e.target.value ? persianJs(e.target.value).toEnglishNumber().toString() : null
        if (value == "0") {
            setQuantityOrder(true)
        } else {
            setQuantityOrder(false);
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
                        <span className="text-light">تغییر</span>
                    </Col>
                </Row>
            </Container>
            <Modal.Body className="add-product px-3">


                <Form onSubmit={formHandler}>
                    <Container className="m-0 p-0 mx-auto d-flex flex-column justify-content-between">

                        <Row className="m-0 p-0 mt-2" >
                            <Col className="p-0 ps-3">
                                <Card className="border-0 bg-transparent text-light">
                                    <Form.Label className="pe-3">نام شرکت</Form.Label>
                                    <Form.Control className="order-input company-input" type="text"
                                        defaultValue={props.order.customer?.company}
                                        onChange={companyNameInputHandler}
                                    />
                                </Card>
                            </Col>
                            <Col className="p-0 ps-3">
                                <Card className="border-0 bg-transparent text-light">
                                    <Form.Label className="pe-3">شناسه ملی شرکت</Form.Label>
                                    <Form.Control className="order-input company-input" type="text"
                                        defaultValue={props.order.customer?.nationalCard}
                                        onChange={companyNameInputHandler} name="nationalCard"
                                    />
                                </Card>
                            </Col>
                            <Col className="p-0 ">
                                <Card className="border-0 bg-transparent text-light">
                                    <Form.Label className="pe-3">کداقتصادی</Form.Label>
                                    <Form.Control className="order-input company-input" type="text"
                                        defaultValue={props.order.customer?.financialCode}
                                        onChange={companyNameInputHandler} name="financialCode"
                                    />
                                </Card>
                            </Col>
                        </Row>

                        <Row className="m-0 p-0 mt-1" >
                            <Col className="m-0 p-0 ">
                                <Card className="border-0 bg-transparent text-light">
                                    <Form.Label className="pe-3">آدرس</Form.Label>
                                    <Form.Control className="order-input address-input py-2" type="text"
                                        defaultValue={props.order.address}
                                        onChange={addressInputHandler}
                                    />
                                </Card>
                            </Col>
                        </Row>
                        <Row className="m-0 p-0 mt-2" >
                            <Col className="p-0 ps-3">
                                <Card className="border-0 bg-transparent text-light">
                                    <Form.Label className="pe-3">شماره ثبت</Form.Label>
                                    <Form.Control className="order-input company-input" type="text"
                                        defaultValue={props.order.customer?.registerNo}
                                        onChange={companyNameInputHandler} name="registerNo"
                                    />
                                </Card>
                            </Col>
                            <Col className="p-0 ">
                                <Card className="border-0 bg-transparent text-light">
                                    <Form.Label className="pe-3">کدپستی</Form.Label>
                                    <Form.Control className="order-input company-input" type="text"
                                        defaultValue={props.order.customer?.postalCode}
                                        onChange={companyNameInputHandler} name="postalCode"
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
                                            <Dropdown onToggle={(e) => setDimStatus(!dimStatus)} onClick={(e) => productHandler(e)}>
                                                <Dropdown.Toggle className={`px-1 d-flex align-items-center ${inputProductValidation ? 'border border-danger' : null}`} >
                                                    {selectedItem.length ? <span className="me-2">{selectedItem}</span > : <span className="me-2 fw-bold">محصولات</span>}
                                                    <img className="me-auto" src={spinnerIcon} height="20px" alt="spinner-icon" style={{ transform: dimStatus ? "rotate(180deg)" : null }} />
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu className={`${dimStatus ? "dim" : ""} dropdownProductMenu`}>
                                                    {products
                                                        ? products.map((item, index) => {
                                                            return (
                                                                item.active && (
                                                                    <Col key={index}>
                                                                        {index ? <Dropdown.Divider /> : null}
                                                                        <Dropdown.Item onClick={() => { setItem(item.name); setQuantity(1) }}>
                                                                            <Row>
                                                                                <Col className="text-end basket-dropdown-border-left pe-1">{item.name}</Col>
                                                                                <Col>{item.sellingPrice && persianJs(item.sellingPrice).englishNumber().toString()} </Col>
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
                                                onChange={quantityOrderHandler}
                                                className={` order-input--desktop text-center ${quantityOrder ? 'border border-danger' : null}`}
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
                                                        order?.length
                                                            ? order.map(item => {

                                                                return (
                                                                    <tr key={item.name}>
                                                                        <td  >{item.name && persianJs(item.name).englishNumber().toString()}</td>
                                                                        {(editPriceCurrentProduct && activeProduct._id == item._id) ?
                                                                            <>
                                                                                <td className={`m-0 px-0 ${editPriceCurrentProduct ? "d-flex" : null} `} style={{ width: "155px" }}>
                                                                                    <img src={tickIcon} onClick={(e) => editPriceProduct(e, item)} className="ms-2" alt="tick-icon" style={{ width: "20px" }} />
                                                                                    <img src={deleteeIcon} onClick={(e) => { setEditPriceCurrentProduct(false); }} className="ms-2" alt="delete-icon" style={{ width: "20px" }} />
                                                                                    <Form.Control className={`notes-round ${inputCurrentPriceProductValidation ? 'border border-danger' : null}`} min="1" type="number" defaultValue={activeProduct.sellingPrice} onChange={e => setInputCurrentPriceProduct(e.target.value)} />
                                                                                </td>
                                                                            </>
                                                                            :
                                                                            <>
                                                                                <td className="px-0">
                                                                                    <img src={editIcon} onClick={(e) => { setEditPriceCurrentProduct(true); setActiveProduct(item) }} className="ms-3 " alt="edit-icon" style={{ width: "33px" }} />
                                                                                    {(item.quantity * item.sellingPrice) && persianJs(item.quantity * item.sellingPrice).englishNumber().toString()}
                                                                                </td>
                                                                            </>
                                                                        }
                                                                        <td className="pe-2">{item.quantity && persianJs(item.quantity).englishNumber().toString()}</td>
                                                                        {

                                                                            (deleteCurrentProduct && activeProduct._id == item._id) ?
                                                                                <td className="text-start " style={{ width: "155px" }}>
                                                                                    <img src={tickIcon} onClick={(e) => removeOrder(e, item)} className="ms-2" alt="tick-icon" style={{ width: "20px" }} />
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
                                                {getTotalPrice(order) && persianJs(getTotalPrice(order)).englishNumber().toString()}
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
