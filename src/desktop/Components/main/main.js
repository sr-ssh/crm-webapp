import React, { useEffect } from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { productActions } from '../../../actions/productActions'


// Components
import { EmployeeApp } from './employeeApp'
import { EmployeeNoApp } from './employeeNoApp'
import { EmployerNoProduct } from './employerNoProduct'
import { MainMenuOptions } from './mainMenuOptions'
import { Header } from '../base/header'


export const Main = () => {

    let user_type = JSON.parse(localStorage.getItem('type'));
    let application_status = JSON.parse(localStorage.getItem('applicationStatus'));
    const permissions = useSelector(state => state.getPermissions.permissions);
    const products = useSelector(state => state.getProducts.product)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(productActions.getProducts())
    }, [dispatch, permissions])

    return (

        <div>
            <Header />
            <Container fluid className="m-0 w-100 d-flex justify-content-center align-items-center flex-column " style={{ height: "100vh" }}>
                {((user_type === 1 && products.length > 0) || (user_type === 2 && application_status === 2)) &&
                    <MainMenuOptions />
                }
                {user_type === 2 && application_status === 1 &&
                    <EmployeeApp />
                }
                {user_type === 1 && !products.length &&
                    <EmployerNoProduct />
                }
                {user_type === 2 && application_status === 3 &&
                    <EmployeeNoApp />
                }
            </Container>
        </div >

    );
}