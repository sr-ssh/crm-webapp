import React from 'react'
import { useLocation, NavLink } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, Typography, Link, Collapse, ListItemText } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Brightness1Icon from '@material-ui/icons/Brightness1';
import { isPermitted , getPermissionRoutesChilde } from '../../../helpers/permission'
import { Row, Col, Card, Nav } from 'react-bootstrap';
import logo from '../../assets/images/crm-dark.svg'




const useStyles = makeStyles((theme) => ({
    muiListIcon: {
        width: "8px",
        height: "8px",
        marginLeft: 9,
        color: "grey"
    },
    muiListIconActive: {
        width: "11px",
        height: "11px",
        marginLeft: 9,
        color: "#1d64cd"
    },
    expandIcon: {
        color: "#1d64cd",
        fontSize:"25px"
    }
}));



export const SideBarItem = ({ route }) => {

    const classes = useStyles()
    const location = useLocation();
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };
    let user_type = JSON.parse(localStorage.getItem('type'));
    return (
        <>
            {
                (route.path === "/setting" && user_type !== 1) ? null :
                    (route?.children?.length > 0 && getPermissionRoutesChilde(route)) ?
                        <>
                        {/* <Row className="m-0 p-0 py-3 d-flex flex-row logo--sidebar--desktop">
                        <Col className="d-flex justify-content-center">
                            <img className=" noPrint" height="50px" src={logo} alt="crmx-logo" />
                        </Col>
                    </Row> */}
                            <ListItem ListItem button className={`px-2 py-2 item--sidebar noPrint ${location.pathname.includes(route.layout) ? 'active--item--sidebar' : null}`} onClick={handleClick} >
                                <Typography color="textPrimary" className="w-100 d-flex flex-row align-items-center text-end text-dark fw-bold pe-2 py-2 noPrint  ff-iranSans">
                                    <span className="px-2  pe-3 noPrint ">{route.name}</span>
                                    <div className="noPrint" style={{ flexGrow: 1 }}></div>
                                    {open ? <ExpandLess classes="noPrint" classes={{root:classes.expandIcon}} /> : <ExpandMore className="noPrint" classes={{root:classes.expandIcon}} />}
                                </Typography>
                            </ListItem>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                {route?.children.map((item, index) => {
                                    return (
                                        isPermitted(item.path) && 
                                        <ListItem ListItem button className={`px-2 py-2 pe-2 item--sidebar noPrint`} >
                                            <Typography color="textPrimary" variant="subtitle2" className="text-end text-dark fw-bold ff-iranSans noPrint">
                                                <NavLink to={item.path} className="nav-link fw-bold d-flex align-items-center noPrintr" activeClassName="active">

                                                    {item.path === location.pathname ? <Brightness1Icon className={classes.muiListIconActive} /> : <Brightness1Icon className={classes.muiListIcon} />}
                                                    {item.name}
                                                </NavLink>
                                            </Typography>
                                        </ListItem>
                                    )
                                })
                                }

                            </Collapse>
                        </> : isPermitted(route.path) ? (
                            <>
                                <ListItem ListItem button className={`px-2 py-2 item--sidebar noPrint  ${route.path == location.pathname ? 'active--item--sidebar' : null}`} >
                                    <Typography color="textPrimary" className="text-end text-dark fw-bold pe-2 ff-iranSans noPrint">
                                        <NavLink to={route.path} className="nav-link fw-bold noPrint" activeClassName="active">
                                            {route.name}
                                        </NavLink>
                                    </Typography>
                                </ListItem>
                            </>
                        ) : null
            }
        </>

    )
}