import React from 'react'
import { useLocation, NavLink } from "react-router-dom";
import { List, Typography, Link } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';

import { isPermitted } from '../../../helpers/permission'


export const SideBarItem = ({ route }) => {

    const location = useLocation();
    let user_type = JSON.parse(localStorage.getItem('type'));
    return (
        <>
            {
                (route.path === "/setting" && user_type !== 1) ? null :
                    isPermitted(route.path) ? (
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