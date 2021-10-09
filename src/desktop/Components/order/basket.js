import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Card, Dropdown, Button, Table, Row, Col, Form } from 'react-bootstrap';
import persianJs from 'persianjs/persian.min';

// Actions
import { productActions, alertActions } from '../../../actions';

//icons
import deleteIcon from './../../assets/images/delete.svg'
import spinnerIcon from './../../assets/images/sppiner.svg'
import plusIcon from './../../assets/images/plus.svg'

export const Basket = ({ order, insertOrder, totalPrice, insertPrice, selectedItem, setItem, quantity, setQuantity }) => {

    const [dimStatus, setDimStatus] = useState(false)
    const [quantityOrder, setQuantityOrder] = useState(false)
    const products = useSelector(state => state.getProducts.product)
    const dispatch = useDispatch()

    let checkProductSupply = (product, prevQuantity) => {
        if (product.checkWareHouse) {
            let check = !product.ingredients.some(stock => stock.stock.amount < stock.amount * (parseInt(quantity) + prevQuantity))
            if (!check)
                dispatch(alertActions.error('موجودی محصول کافی نیست'))
            return check
        }
        else return true
    }

    let newOrder = (e) => {
        e.preventDefault();
        let product = products.find(item => item.name === selectedItem)
        if (!product || quantityOrder)
            return

        let newOrder = {
            _id: product._id,
            name: product.name,
            quantity: parseInt(quantity),
            sellingPrice: product.sellingPrice,
            ingredients: product.ingredients,
            checkWareHouse: product.checkWareHouse
        };

        const isOrderPresent = order.some((item) => item._id === product._id);

        if (isOrderPresent) {
            const updatedOrder = order.map((item) => {
                if (item._id === product._id) {
                    if (checkProductSupply(product, item.quantity)) {
                        insertPrice(parseInt(totalPrice) + (parseInt(quantity) * parseInt(product.sellingPrice)))
                        return { ...item, quantity: item.quantity + parseInt(quantity) };
                    }

                    else return item
                }
                return item;
            });
            insertOrder(updatedOrder);
        } else {
            if (checkProductSupply(newOrder, 0)) {
                insertPrice(parseInt(totalPrice) + (parseInt(quantity) * parseInt(product.sellingPrice)))
                insertOrder((prevOrderState) => [...prevOrderState, newOrder]);
            }
        }
    };

    let removeOrder = (e, product) => {
        e.preventDefault();
        insertPrice(totalPrice - (parseInt(product.quantity) * parseInt(product.sellingPrice)));
        let updatedOrder = order.filter(item => item._id !== product._id);
        insertOrder(updatedOrder)
    }

    let productHandler = (e) => {
        e.preventDefault()
        dispatch(productActions.getProducts())
    }
    let quantityOrderHandler = (e) => {
        let value = persianJs(e.target.value).toEnglishNumber().toString()
        if (value == "0") {
            setQuantityOrder(true)
        } else {
            setQuantityOrder(false);
            setQuantity(value || 1);
        }

    }
    return (
        <>
            <Row>
                <Card className="border-0 p-3 pt-2  basketContainer">
                    <Card.Body className="mt-2 mx-3 p-0 basket-flex--desktop">
                        <Row className="ms-3 justify-content-evenly">
                            <Col className="col-7 p-0 m-0">
                                <Dropdown onToggle={(e) => setDimStatus(!dimStatus)} onClick={(e) => productHandler(e)}>
                                    <Dropdown.Toggle className=" px-1 d-flex align-items-center">
                                        {selectedItem.length ? <span className="me-2">{selectedItem}</span > : <span className="me-2 fw-bold">محصولات</span>}
                                        <img className="me-auto" src={spinnerIcon} height="20px" alt="spinner-icon" />
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

                            <Col className="col-3 p-0 m-0 px-3 d-flex justify-content-center">

                                <Form.Control
                                    placeholder="تعداد"
                                    value={Number.isInteger(quantity) ? "" : quantity}
                                    onChange={quantityOrderHandler}
                                    className={` order-input--desktop text-center ${quantityOrder ? 'border border-danger' : null}`}
                                    type="tel"
                                    inputMode="tel"
                                    pattern="[0-9]*"
                                    name="duration"
                                    style={{ 'maxHeight': '40px' }} >
                                </Form.Control>
                            </Col>
                            <Col className="m-0 p-0 text-center products-add-btn ">
                                <Button className="products-add--desktop border-0 py-1 w-75  " onClick={(e) => newOrder(e)} type="button">
                                    <img className="d-flex m-auto " src={plusIcon} alt="add-button" />
                                </Button>
                            </Col>

                        </Row>

                        <Row className="pt-2">
                            <div className="table-wrapper-scroll-y my-custom-scrollbar--desktop px-1">
                                <Table className="lh-lg" borderless size="sm">
                                    <thead>
                                        <tr>
                                            <th className="fw-bold col-6">سفارش</th>
                                            <th className="fw-bold">قیمت (تومان)</th>
                                            <th className="fw-bold">تعداد</th>
                                            <th className="col-1"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            order.length
                                                ? order.map(item => {
                                                    return (
                                                        <tr key={item.name}>
                                                            <td>{item.name && persianJs(item.name).englishNumber().toString()}</td>
                                                            <td className="">{(item.quantity * item.sellingPrice) && persianJs(item.quantity * item.sellingPrice).englishNumber().toString()} </td>
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
                                <Col className="col-5">
                                    <span className="">جمع کل</span>
                                </Col>
                                <Col className="px-1">
                                    {totalPrice && persianJs(totalPrice).englishNumber().toString()}
                                </Col>
                            </Row>
                        </Row>

                    </Card.Body>
                </Card>
            </Row>
        </>
    )
}