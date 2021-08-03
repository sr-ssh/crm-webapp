import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Dropdown, Modal, Row, Col, Form, Button, Table, Spinner, Alert, Card } from 'react-bootstrap'
import persianJs from 'persianjs/persian.min';
//Assets
import closeIcon from '../../assets/images/close.svg'
import deleteIcon from './../../assets/images/delete.svg'
import spinnerIcon from './../../assets/images/sppiner.svg'
import plusIcon from './../../assets/images/plus.svg'

//Actions
import { orderActions, productActions } from '../../actions'

export const EditeProductOrder = (props) => {

    const [dimStatus, setDimStatus] = useState(false)
    const [selectedItem, setItem] = useState("")
    const [totalPrice, insertPrice] = useState("0")
    const [quantityOrder, setQuantityOrder] = useState(1)
    const [order, insertOrder] = useState([])
    const [oldProduct, setOldProduct] = useState([])
    const [validated, setValidated] = useState(false)
    const [addressUser, setAddressUser] = useState('')
    const dispatch = useDispatch()

    const products = useSelector(state => state.getProducts.product)
    const loader = useSelector(state => state.editProducOrder.loading)

    let productHandler = (e) => {
        e.preventDefault()
        dispatch(productActions.getProducts())
    }
    let newOrder = (e) => {

        e.preventDefault();
        let product = products.find(item => item.name === selectedItem)
        let oldProduct = order.find(item => item.name === selectedItem);

        if (!product)
            return

        let newOrder = {
            _id: product._id,
            name: product.name,
            quantity: parseInt(quantityOrder),
            sellingPrice: product.sellingPrice
        };
        console.log(newOrder.quantity, order)
        const isOrderPresent = order.some((item) => item._id === product._id);
        if (isOrderPresent) {
            const updatedOrder = order.map((item) => {
                if (item._id === product._id) {
                    return { ...item, quantity: parseInt(item.quantity) + parseInt(quantityOrder) };
                }
                return item;
            });
            console.log(order);
            insertPrice(parseInt(totalPrice) + (parseInt(quantityOrder) * parseInt(oldProduct.sellingPrice)))
            insertOrder(updatedOrder);
        } else {
            insertOrder((prevOrderState) => [...prevOrderState, newOrder]);
            insertPrice(parseInt(totalPrice) + (parseInt(quantityOrder) * parseInt(product.sellingPrice)))
        }
    };
    let removeOrder = (e, product) => {
        e.preventDefault();
        insertPrice(totalPrice - (parseInt(product.quantity) * parseInt(product.sellingPrice)));
        let updatedOrder = order.filter(item => item._id !== product._id);
        insertOrder(updatedOrder)
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
        insertPrice(parseInt(total))
    }, [props.show])

    let closeHandler = e => {
        props.onHide(false);
        insertOrder([])
        insertPrice("0")
        setItem("")
    }
    let addressInputHandler = e => {
        setAddressUser(e.target.value)
    }
    const formHandler = (e) => {
        e.preventDefault()

        if (order) {
            let orders = order.map(item => { return { _id: item._id, quantity: item.quantity, sellingPrice: item.sellingPrice } })
            let params = {
                orderId: props.order.id,
                products: orders,
                address: addressUser || ""
            };

            dispatch(orderActions.editProductOrder(params))
            setValidated(true)

            setTimeout(() => {
                dispatch(orderActions.getOrders())
                props.onHide(false)
            }, 1000);
        } else {
            setValidated(false)
        }
    }


    console.log(loader);

    return (
        <Modal
            {...props}
            size="lg"
            backdrop="static"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="w-100 m-0 p-0"
        >
            <Modal.Body className="add-product px-3">
                <Button className="border-0 customer-modal-close" type="button" onClick={closeHandler}>
                    <img className="d-flex m-auto customer-modal-close-svg" src={closeIcon} alt="close-btn" />
                </Button>

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
                                <Card className="border-0 p-3 pt-2 basket--Product--Container">
                                    <Card.Body className="p-0 basket-flex">
                                        <Row>
                                            <h6 className="order-input fw-bold">سبد خرید</h6>
                                        </Row>
                                        <Row className="d-flex align-content-center">
                                            <Col className="col-10 pe-2">
                                                <Dropdown onToggle={(e) => setDimStatus(!dimStatus)} onClick={(e) => productHandler(e)}>
                                                    <Dropdown.Toggle className="d-flex align-items-center justify-content-between px-1 py-3 ">

                                                        {selectedItem.length ? <span>{selectedItem}</span> : <span>محصولات</span>}
                                                        <img className="me-auto img-fluid" src={spinnerIcon} height="30px" alt="spinner-icon" />
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu className={`${dimStatus ? "dim" : ""} dropdownProductMenu`}>
                                                        {products
                                                            ? products.map((item, index) => {
                                                                return (
                                                                    item.active && (
                                                                        <Col key={index}>
                                                                            {index ? <Dropdown.Divider /> : null}
                                                                            <Dropdown.Item onClick={() => setItem(item.name)}>
                                                                                <Row>
                                                                                    <Col className="text-end  pe-1">{item.name}</Col>

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
                                            <Col className="col-2 m-0 p-0 ps-2 text-center products-add-btn">
                                                <Button className="products-add  p-0 border-0 w-100 py-1" type="button" onClick={(e) => newOrder(e)}>
                                                    <img className="d-flex m-auto " src={plusIcon} alt="add-button" />
                                                </Button>
                                            </Col>

                                        </Row>

                                        <Row className="pt-2 pe-2">
                                            <div className="table-wrapper-scroll-y my-custom-scrollbar px-1">
                                                <Table className="lh-lg" borderless size="sm">
                                                    <thead>
                                                        <tr>
                                                            <th className="fw-bold">سفارش</th>
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
                                            <Row className="border-top-blue pt-2 mt-auto">
                                                <Col className="col-5 m-0 p-0">
                                                    <span className="">جمع کل :</span>
                                                </Col>
                                                <Col className="px-1">
                                                    {totalPrice && persianJs(totalPrice).englishNumber().toString()}
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
