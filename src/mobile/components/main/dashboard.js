import React, { useState, useEffect } from 'react'
import Sidebar from 'react-sidebar'
import { Container, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import routes from './../../routes'
import { makeStyles } from '@material-ui/core/styles';

// Components
import { SideBar } from './sideBar'
import { MainMenuOptions } from './mainMenuOptions'
import { EmployerNoProduct } from './employerNoProduct';
import { EmployeeApp } from './employeeApp'
import { EmployeeNoApp } from './employeeNoApp'
import {CircularProgress} from '@material-ui/core';

// Icons
import menuIcon from './../../assets/images/menu.svg'
import logo from '../../assets/images/crm.svg'
// Actions
import { userActions, employeeActions } from '../../../actions'
import { productActions } from '../../../actions/productActions'


export const Dashboard = (props) => {

    const [isOpen, setIsOpen] = useState(false)
    const dispatch = useDispatch()

    let user_type = JSON.parse(localStorage.getItem('type'));
    let application_status = JSON.parse(localStorage.getItem('applicationStatus'));
    const permissions = useSelector(state => state.getPermissions.permissions);
    const {user : userInfo ,loading : userInfoLoading } = useSelector(state => state.appInfo)
    const products = useSelector(state => state.getProducts.product)


    useEffect(() => {
        dispatch(userActions.appInfo());
    }, [dispatch])

    console.log(userInfo?.data,userInfoLoading)


    return (
        <>
            <Sidebar
                sidebar={<SideBar routes={routes} />}
                open={isOpen}
                onSetOpen={setIsOpen}
                pullRight={true}
                styles={{
                    sidebar: { background: "white", width: "45vw", "zIndex": "1040" },
                    overlay: { zIndex: "1030" }
                }}
                overlayClassName="test3"
                shadow={true}
                touch={false}
            >
                <div className="form-page">
                    <div id="triangle-up"></div>
                    <Container fluid className="p-0 d-flex flex-column ms-0">
                         <Row className="p-0 m-0 mzLogo">
                            <Col className="">
                                <img className="logo" src={logo} alt="logo" width="160px" />
                            </Col>
                        </Row>
                        {userInfoLoading  ?
                        <Col className="w-100 d-flex justify-content-center ">
                            <CircularProgress/>
                       </Col>
                        :
                        <Row className="ms-0 justify-content-center no-product-main-body" style={{ "zIndex": 1 }}>
                            <Row className="mb-4 pe-3 mt-0">
                                <Col xs={3} className="me-4 ms-auto">
                                    <Button className="main-button me-auto d-block p-2" type="submit" onClick={() => setIsOpen(!isOpen)}>
                                        <img src={menuIcon} height="38px" alt="menu-icon" />
                                    </Button>
                                </Col>
                            </Row>
                            {((user_type === 1 && userInfo?.data.products_count > 0) || (user_type === 2 && application_status === 2)) &&
                                <MainMenuOptions />
                            }
                            {user_type === 1 && userInfo?.data.products_count < 1 &&
                                <EmployerNoProduct />
                            }
                            {user_type === 2 && application_status === 1 &&
                                <EmployeeApp />
                            }
                            {user_type === 2 && application_status === 3 &&
                                <EmployeeNoApp />
                            }
                        </Row>
                    }
                    </Container>

                    <div id="triangle-down"></div>
                </div>
            </Sidebar>
        </>
    )
}
