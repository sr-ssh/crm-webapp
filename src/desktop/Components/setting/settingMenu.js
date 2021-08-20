import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'

// Icons
import orderLogo from '../../assets/images/setting/order.svg'

export const SettingMenu = ({ state, setState }) => {
    return (
        <>
            <Row className="setting-btn-row">
                <Button className="setting-order-btn text-center" onClick={() => setState('سفارش')}><img src={orderLogo} height="35px" className="setting-logo" />  سفارش</Button>
            </Row>
        </>
    )
}
