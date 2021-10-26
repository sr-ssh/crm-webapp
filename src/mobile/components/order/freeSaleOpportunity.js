import React , {useState} from 'react'
import { Container, Form, Card, Table, Row, Col, Spinner, Button } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux'

// Components
import { FreeOrder } from './freeOrder';


const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff !important',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    productCard: {
        width: '100%'
    },
    rounded: {
        borderRadius: "15px"
    },
    paper: {
        maxWidth: "700px",
        borderRadius: "15px",
        overflowY: "visible"
    }
}));


export const FreeSaleOpportunity = ({refresh ,setRefresh, ...props}) =>  {


    const classes = useStyles();
    const dispatch = useDispatch()

    const [freeModalShow, setFreeModalShow] = useState(false);
    const [freeStatus, setFreeStatus] = useState('')

    return (
        <Card className={`m-auto mt-3 bg-light productCard border-0 lh-lg mx-1 ${classes.productCard}`} >
        <Row className="my-4 mx-2 flex-column ">
        <Col className="col-12 d-flex align-items-center">
            <span>
                آیا می خواهید این فرصت فروش را قبول کنید؟
            </span>
        </Col>
        <Col className="mt-2 col-5 align-self-end">
        <Button className="w-100 btn-outline-dark btn--sale--opprotunity p-1 border-0 noPrint py-2 pe-2 d-flex justify-content-center" type="button"
        onClick={() => setFreeModalShow(true)}
        >
            <span className="noPrint fs-7 py-1 me-1">قبول فرصت فروش</span>
        </Button>
        </Col>
        </Row>
        <FreeOrder  show={freeModalShow} onHide={() => {setFreeModalShow(false); setRefresh(!refresh)} } order={props.order?.id} status={1} />

        </Card >
    )
}
