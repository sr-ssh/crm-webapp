import React from 'react'
import { Card, Col } from 'react-bootstrap';

import moment from 'jalali-moment';
import persianJs from 'persianjs/persian.min';
import { Backdrop } from '@material-ui/core'


// Icons
import editIcon from '../../assets/images/Products/edit.svg'

export const StockCard = ({item, setEditModalShow, setProduct}) => {
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
      setOpen(false);
    };
    const handleToggle = () => {
      setOpen(!open);
    };
  
    return (
        <>
        <Card className="m-auto mt-3 bg-light productCard mx-2 border-0" >
            <Card.Body className="pb-0 ps-1 rounded-3">
                <Card.Title>
                    {item.active
                        ? <div className="activeStatus"><span></span> فعال</div>
                        : <div className="deActiveStatus"><span></span> غیرفعال</div>}
                </Card.Title>
                <Card.Text className="pt-1">
                    <span style={{ "color": "var(--text-color-one)" }}>نام : </span>{item.name && persianJs(item.name).englishNumber().toString()}
                </Card.Text>
                <Card.Text className="pt-1">
                    <span style={{ "color": "var(--text-color-one)" }}>تاریخ ویرایش : </span>{item.updatedAt && persianJs(moment.from(item.updatedAt, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')).englishNumber().toString()}
                </Card.Text>
                <Card.Text className="pt-1 ps-1 description--height">
                    <span style={{ "color": "var(--text-color-one)" }}>توضیحات :   </span>
                    <span className="editLogo w-100 d-block m-auto more--description fs-7" onClick={() => { handleToggle(); setProduct(item) }}>
                    بیشتر...
                    </span>{item.description && persianJs(item.description).englishNumber().toString()}
                </Card.Text>
                <Card.Link className="editLogo w-100 d-block m-auto" onClick={() => { setEditModalShow(true); setProduct(item) }}>
                    <img className="d-block me-auto" src={editIcon} height="42px" alt="back-icon" />
                </Card.Link>
            </Card.Body>
        </Card>
        <Backdrop
        sx={{ 'color': '#fff', 'zIndex': '10000' }}
        open={open}
        onClick={handleClose}
        style={{'zIndex': '1101'}}
        >
            <Col xs={3}>
                
                <Card className="m-auto mt-3 bg-light productCard mx-2 border-0" >
            <Card.Body className="pb-0 ps-1 rounded-3">
                <Card.Title>
                    {item.active
                        ? <div className="activeStatus"><span></span> فعال</div>
                        : <div className="deActiveStatus"><span></span> غیرفعال</div>}
                </Card.Title>
                <Card.Text className="pt-1">
                    <span style={{ "color": "var(--text-color-one)" }}>نام : </span>{item.name && persianJs(item.name).englishNumber().toString()}
                </Card.Text>
                <Card.Text className="pt-1">
                    <span style={{ "color": "var(--text-color-one)" }}>تاریخ ویرایش : </span>{item.updatedAt && persianJs(moment.from(item.updatedAt, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')).englishNumber().toString()}
                </Card.Text>
                <Card.Text className="pt-1 ps-1">
                    <span style={{ "color": "var(--text-color-one)" }}>توضیحات :   </span>{item.description && persianJs(item.description).englishNumber().toString()}
                </Card.Text>
                <Card.Link className="editLogo w-100 d-block m-auto" onClick={() => { setEditModalShow(true); setProduct(item) }}>
                    <img className="d-block me-auto" src={editIcon} height="42px" alt="back-icon" />
                </Card.Link>
            </Card.Body>
        </Card>
            </Col>
            
        </Backdrop>
        </>
    )
}
