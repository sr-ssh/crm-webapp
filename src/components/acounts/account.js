import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Header } from '../base/header2';
import { Container , Form , Button , Row , Col, Alert, Spinner, Card } from 'react-bootstrap';
import "react-multi-date-picker/styles/layouts/mobile.css"


//actions
import { userActions } from '../../actions/userActions'

//components
import {EmployerAccount} from './employerAccount'
import { WithEmployeeAccount } from './withEmployeeAccount'

export const Account = () => {

    let user_type = JSON.parse(localStorage.getItem('type'));
    let application_status = JSON.parse(localStorage.getItem('applicationStatus'));
    const userInfo = useSelector(state => state.getUserInfo.user);
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(userActions.getUserInfo())
    }, [dispatch])

    return (
        <div className="product-page">
            <Header title="حساب کاربری" backLink="/dashboard"/>
            <Container className="m-auto emplyees-text-gray">
                <Card className="m-auto mt-3 productCard border-0" >
                    <Card.Body className="ps-1 rounded-3 ">
                        {
                            userInfo && user_type === 1 && <EmployerAccount user={userInfo}/>
                        }
                        {
                            userInfo && user_type === 2 && application_status === 2 && <WithEmployeeAccount user={userInfo}/>
                        }
                    </Card.Body>
                </Card> 
            </Container>
        </div>
    )
}
