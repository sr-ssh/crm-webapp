import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { productActions } from '../../actions';
import { Card , Dropdown , Button , Table , Row , Col, FormControl } from 'react-bootstrap';
import persianJs from 'persianjs/persian.min';


//icons
import deleteIcon from './../../assets/images/delete.svg'
import spinnerIcon from './../../assets/images/sppiner.svg'
import plusIcon from './../../assets/images/plus.svg'

export const Basket = ({order, insertOrder, totalPrice, insertPrice, selectedItem, setItem, quantity, setQuantity}) => {

    const [dimStatus, setDimStatus] = useState(false)
    const [quantityOrder, setQuantityOrder] = useState(false)
    const products = useSelector(state => state.getProducts.product)
    const dispatch = useDispatch()
    let newOrder = (e) => {
        e.preventDefault();
        let product = products.find(item => item.name === selectedItem)
        if(!product || quantityOrder)
            return 
        
        insertPrice(parseInt(totalPrice) + (parseInt(quantity) * parseInt(product.sellingPrice)))
        let newOrder = {
          _id: product._id,
          name: product.name,
          quantity: parseInt(quantity),
          sellingPrice: product.sellingPrice,
        };
        console.log(newOrder.quantity, order)
        const isOrderPresent = order.some((item) => item._id === product._id);
        if (isOrderPresent) {
          const updatedOrder = order.map((item) => {
            if (item._id === product._id) {
              return {...item, quantity: item.quantity + parseInt(quantity)};
            }
            return item;
          });
          insertOrder(updatedOrder);
        } else {
          insertOrder((prevOrderState) => [...prevOrderState, newOrder]);
        }
    };

    let removeOrder = (e, product) => {
        e.preventDefault();
        console.log(product);
        insertPrice(totalPrice - (parseInt(product.quantity) * parseInt(product.sellingPrice)));
        let updatedOrder = order.filter(item => item._id !== product._id);
        insertOrder(updatedOrder)
    }

    let productHandler = (e) => {
        e.preventDefault()
        dispatch(productActions.getProducts())
    }
    let quantityOrderHandler = (e) =>{
        console.log(e.target.value);
        if(e.target.value == "0" ) { 
            setQuantityOrder(true) 
        }else{
        setQuantityOrder(false);
        setQuantity(e.target.value || 1);
        }
    }

    return (
        <>
        <Row>
            <Card className="border-0 p-3 pt-2  basketContainer">
                <Card.Body className="p-0 basket-flex">
                    <Row>
                        <h6 className="order-input fw-bold">سفارشات</h6>
                    </Row>
                    <Row>
                        <Col className="col-8 pe-2">
                            <Dropdown onToggle={(e) => setDimStatus(!dimStatus)} onClick={(e) => productHandler(e)}>
                                <Dropdown.Toggle className="d-flex">
                                    {selectedItem.length ? <span>{selectedItem}</span> : <span>محصولات</span>} 
                                    <img className="me-auto" src={spinnerIcon} height="20px" alt="spinner-icon"/>
                                </Dropdown.Toggle> 
                                <Dropdown.Menu className={`${dimStatus ? "dim" : ""} dropdownProductMenu`}>
                                    {products 
                                        ? products.map((item, index) =>  {
                                            return(
                                                item.active && (
                                                <Col key={index}>
                                                    {index ? <Dropdown.Divider  /> : null}
                                                    <Dropdown.Item onClick={() => setItem(item.name) }>
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

                        <Col className="col-2 px-1">
                            <FormControl  onChange={(e) =>quantityOrderHandler(e) } className={`order-input text-center ${quantityOrder ? 'border border-danger' : null}`} type="number" min="1" name="duration" style={{'maxHeight': '32px'}} />
                        </Col>
                        <Col className="col-2 p-0 text-center products-add-btn">
                            <Button className="products-add border-0 py-1" onClick={(e) => newOrder(e)} type="button">
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
                                    <th className="fw-bold">قیمت (تومان)</th>
                                    <th className="fw-bold">تعداد</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                order.length 
                                ? order.map(item => {
                                            return (
                                                <tr key={item.name}>
                                                    <td>{item.name && persianJs(item.name).englishNumber().toString()}</td>
                                                    <td className="text-center">{(item.quantity * item.sellingPrice) && persianJs(item.quantity * item.sellingPrice).englishNumber().toString()} </td>
                                                    <td className="pe-3">{item.quantity && persianJs(item.quantity).englishNumber().toString()}</td>
                                                    <td onClick={(e) => removeOrder(e, item)}><img src={deleteIcon} className="d-block me-auto" alt="delete-icon"/></td>
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