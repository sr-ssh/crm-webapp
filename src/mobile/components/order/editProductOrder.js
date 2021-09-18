import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Dropdown, Modal, Row, Col, Form, Button, Table, Spinner, Alert, Card } from 'react-bootstrap'
import persianJs from 'persianjs/persian.min';
//Assets
import closeIcon from '../../assets/images/close.svg'
// import deleteIcon from './../../assets/images/delete.svg'
import spinnerIcon from './../../assets/images/sppiner.svg'
import plusIcon from './../../assets/images/plus.svg'
import deleteIcon from '../../assets/images/discounts/deletee.svg'
import editIcon from './../../assets/images/order/edit.svg'

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

    const dispatch = useDispatch()

    const products = useSelector(state => state.getProducts.product)
    const loader = useSelector(state => state.editProducOrder.loading)
    let alertMessage = useSelector(state => state.alert.message)
    let alerType = useSelector(state => state.alert.type)

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
    let removeOrder = (e, product) => {
        e.preventDefault();
        if (order.length == 1) {
            dispatch(alertActions.error("کمتر از یک کالا در سبد خرید مجاز نیست"))
            setTimeout(() => {
                dispatch(alertActions.clear())
            }, 1000);
        } else {
            let updatedOrder = order.filter(item => item._id !== product._id);
            insertOrder(updatedOrder)
        }
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
    const formHandler = (e) => {
        e.preventDefault();
        if (order.length > 0) {
            let orders = order.map(item => { return { _id: item._id, quantity: item.quantity, sellingPrice: item.sellingPrice } })
            let params = {
                orderId: props.order.id,
                products: orders,
                address: addressUser || ""
            };

            dispatch(orderActions.editProductOrder(params))

            setTimeout(() => {
                dispatch(orderActions.getOrders({ status: props.status || " " }))
                props.onHide(false)
            }, 1000);
        }
    }
    let quantityOrderHandler = (e) => {
        if (e.target.value == "0") {
            setQuantityOrder(true)
        } else {
            setQuantityOrder(false);
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
                                            defaultValue={props.order.address}
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
                                                <Dropdown onToggle={(e) => setDimStatus(!dimStatus)} onClick={(e) => productHandler(e)}>
                                                    <Dropdown.Toggle className="d-flex align-items-center justify-content-between px-1 py-3 ">

                                                        {selectedItem.length ? <span>{selectedItem}</span> : <span>محصولات</span>}
                                                        <img className="me-auto" src={spinnerIcon} height="30px" alt="spinner-icon" />
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
                                            <Col className="col-3 p-0 m-0  d-flex justify-content-center">

                                                <Form.Control
                                                    placeholder="تعداد"
                                                    value={Number.isInteger(quantity) ? "" : quantity}
                                                    onChange={(e) => quantityOrderHandler(e)}
                                                    className={` order-input--desktop text-center ${quantityOrder ? 'border border-danger' : null}`}
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
                                                            order?.length
                                                                ? order.map(item => {

                                                                    return (
                                                                        <tr key={item.name}>
                                                                            <td>{item.name && persianJs(item.name).englishNumber().toString()}</td>
                                                                            <td className="px-0">
                                                                                <img src={editIcon} className="ms-3 " alt="edit-icon" style={{ width: "33px" }} />
                                                                                {(item.quantity * item.sellingPrice) && persianJs(item.quantity * item.sellingPrice).englishNumber().toString()}
                                                                            </td>
                                                                            {/* <td className={`m-0 px-0`} >
                                                                                <img src={editIcon} className="ms-2" alt="tick-icon" style={{ width: "20px" }} />
                                                                                <img src={editIcon} className="ms-2" alt="delete-icon" style={{ width: "20px" }} />
                                                                                <Form.Control className={`notes-round`} min="1" type="number" />
                                                                            </td> */}
                                                                            <td className="pe-3">{item.quantity && persianJs(item.quantity).englishNumber().toString()}</td>
                                                                            <td onClick={(e) => removeOrder(e, item)}><img src={deleteIcon} className="d-block me-auto" alt="delete-icon" /></td>
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
                                                <Col className="px-1">
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
                                    <Button className="fw-bold order-submit border-0 w-100 mt-4" size="lg" type="submit" block>
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
