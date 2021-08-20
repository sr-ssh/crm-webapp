import React, { useEffect, useState } from 'react'
import { Col, Row, Button, Card, Form, Alert } from 'react-bootstrap'
import { useSelector } from 'react-redux'

// Actions
import { orderActions } from '../../../actions'

// Components
import { Header } from '../base/settingHeader'
import { SettingMenu } from './settingMenu'
import { OrderSetting } from './orderSetting'

export const Setting = () => {

    const [state, setState] = useState('تنظیمات')
    let alertMessage = useSelector(state => state.alert.message)
    let alerType = useSelector(state => state.alert.type)


    return (
        <div className="product-page">
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
            <Header title={state} setState={setState} />
            {state === 'تنظیمات' && <SettingMenu state={state} setState={setState} />}
            {state === 'سفارش' && <OrderSetting state={state} setState={setState} />}
        </div>
    )
}
