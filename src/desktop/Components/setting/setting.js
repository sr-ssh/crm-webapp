import React, { useEffect, useState } from 'react'
import { Container, Col, Row, Button, Card, Form, Alert } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Tabs, Tab, ButtonBase } from '@material-ui/core';
import ReceiptIcon from '@material-ui/icons/Receipt';
import orderLogo from '../../assets/images/setting/order.svg'

// Actions
import { orderActions } from '../../../actions'

// Components
// import { SettingMenu } from './settingMenu'
import { OrderSetting } from './orderSetting'
import { Header } from '../base/header'

export const Setting = () => {

    const [state, setState] = useState('تنظیمات')
    let alertMessage = useSelector(state => state.alert.message)
    let alerType = useSelector(state => state.alert.type)


    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    console.log(value);
    return (
        <>
            <Header isBTNSearch={false} isBTNRequest={false} />
            <Container fluid className="m-0 w-100 d-flex justify-content-start flex-wrap margin--top--header ">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    <Tab id="orders-tab" aria-controls="orders-tab" label={
                        <ButtonBase disabled className="d-flex flex-row">
                            <img src={orderLogo} height="25px" />
                            <span className="me-2 ff-iranSans fw-bold fs-6">سفارش</span>
                        </ButtonBase>
                    } />
                    <Tab label={
                        <ButtonBase disabled className="d-flex flex-row">
                            {/* <img src={orderLogo} height="25px" /> */}
                            <ReceiptIcon />
                            <span className="me-2 ff-iranSans fw-bold fs-6">فاکتور</span>
                        </ButtonBase>
                    } />
                </Tabs>
            </Container>
            {/* {state === 'تنظیمات' && <SettingMenu state={state} setState={setState} />} */}
            {value === 0 && <OrderSetting state={state} setState={setState} />}
        </>
    )
}
