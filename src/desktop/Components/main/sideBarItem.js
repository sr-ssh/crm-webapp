import React from 'react'
import { useLocation, NavLink } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, Typography, Link, Collapse, ListItemText } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Brightness1Icon from '@material-ui/icons/Brightness1';
import { isPermitted } from '../../../helpers/permission'




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
        color: "#70b2e2"
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
                    route?.children?.length > 0 ?
                        <>
                            <ListItem ListItem button className={`px-2 py-2 item--sidebar ${location.pathname.includes(route.layout) ? 'active--item--sidebar' : null}`} onClick={handleClick} >
                                <Typography color="textPrimary" className="w-100 d-flex flex-row align-items-center text-end text-dark fw-bold pe-4 py-2  ff-iranSans">
                                    <span className="px-2  pe-3 ">{route.name}</span>
                                    <div style={{ flexGrow: 1 }}></div>
                                    {open ? <ExpandLess /> : <ExpandMore />}
                                </Typography>
                            </ListItem>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                {route?.children.map((item, index) => {
                                    return (
                                        <ListItem ListItem button className={`px-2 py-2 pe-3 item--sidebar`} >
                                            <Typography color="textPrimary" variant="subtitle2" className="text-end text-dark fw-bold pe-4 ff-iranSans">
                                                <NavLink to={item.path} className="nav-link fw-bold d-flex align-items-center" activeClassName="active">

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
                                <ListItem ListItem button className={`px-2 py-2 item--sidebar  ${route.path == location.pathname ? 'active--item--sidebar' : null}`} >
                                    <Typography color="textPrimary" className="text-end text-dark fw-bold pe-4 ff-iranSans">
                                        <NavLink to={route.path} className="nav-link fw-bold" activeClassName="active">
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