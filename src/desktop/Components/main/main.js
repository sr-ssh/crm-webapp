import React, { useEffect } from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

// Actions
import { userActions } from '../../../actions'


// Components
import {CircularProgress} from '@material-ui/core';
import { EmployeeApp } from './employeeApp'
import { EmployeeNoApp } from './employeeNoApp'
import { EmployerNoProduct } from './employerNoProduct'
import { MainMenuOptions } from './mainMenuOptions'
import { Header } from '../base/header'


export const Main = () => {

    let user_type = JSON.parse(localStorage.getItem('type'));
    let application_status = JSON.parse(localStorage.getItem('applicationStatus'));
    const sideBar = useSelector(state => state.sideBar)
    const dispatch = useDispatch()
    const {user : userInfo ,loading : userInfoLoading } = useSelector(state => state.appInfo)

    useEffect(() => {
        userInfoLoading !== undefined && !userInfoLoading &&  dispatch(userActions.appInfo());
    }, [])


    return (

        <div>
            <Header isBTNSearch={false} isBTNRequest={false} />
            <Container fluid className="m-0 w-100 d-flex justify-content-center align-items-center flex-column " style={{ height: "100vh", paddingRight: sideBar.open ? "250px" : 0 }}>
            { userInfoLoading ? 
            <CircularProgress/>
            :
                <>
                    {((user_type === 1 && userInfo?.data?.products_count > 0) || (user_type === 2 && application_status === 2)) &&
                        <MainMenuOptions />
                    }
                    {user_type === 2 && application_status === 1 &&
                        <EmployeeApp />
                    }
                    {user_type === 1 && userInfo?.data?.products_count < 1  &&
                        <EmployerNoProduct />
                    }
                    {user_type === 2 && application_status === 3 &&
                        <EmployeeNoApp />
                    }
                </>
            }
            </Container>
        </div >

    );
}