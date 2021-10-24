import React from 'react'
import { Modal, Button , Row , Col} from 'react-bootstrap'
import {Backdrop  } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import persianJs from 'persianjs/persian.min';
import { history } from '../../../helpers';



// Icons
import closeIcon from '../../assets/images/close.svg'
import callIcon from '../../assets/images/call.png'

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: 1500,
      color: '#fff',
    },
  }));

export const NotificationCallIncoming = (props) =>  {


    const classes = useStyles();
    const sideBar = useSelector(state => state.sideBar)

    let addOrder = (e, mobile) => {
        history.push({
            pathname: '/order/add',
            state: {mobile}
        })
    }

    return (
        <>
            <Backdrop className={classes.backdrop} open={props.incomCall} >
                <Modal
                    show={props.incomCall}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    backdrop="static"
                    className="mx-3 order-serach-modal"
                    >

                    <Modal.Body className="add-product px-4 permission-card applications-text-gray"  >
                    <Button className="border-0 customer-modal-close" type="button" style={{left : "-10px"}}
                     onClick={e => props.setIncomCall(false)}
                     >
                    <img className="d-flex m-auto customer-modal-close-svg" src={closeIcon} alt="close-btn" />
                    </Button>
                    <Row className="d-flex justify-content-center " >
                        <Col>
                        <img className="d-flex m-auto" width="77" src={callIcon} alt="close-btn" />
                        </Col>
                    </Row>
                    <Row className="mt-3 d-flex justify-content-center " >
                        <Col className="d-flex justify-content-center ">
                        <span className="fs-5 fw-bold ">{props.incomCallMessage.baseCall &&  persianJs(props.incomCallMessage.baseCall).englishNumber().toString()}</span>
                        </Col>
                    </Row>
                    <Row className="mt-3 d-flex justify-content-center " >
                        <Col>
                        <Button className={`d-flex flex-row w-100 align-items-center justify-content-center btn--answer--incom--call radius-16 receipt--add--note mb-0`}
                        onClick={(e) =>{ props.setIncomCall(false); addOrder(e, props.incomCallMessage.baseCall) }}
                        >
                           <span className="text--dark--blue fw-bold"> رفتن به ثبت سفارش</span>
                        </Button>
                        </Col>
                    </Row>
                    </Modal.Body>
                 </Modal>
            </Backdrop>
        </>
    )
}
