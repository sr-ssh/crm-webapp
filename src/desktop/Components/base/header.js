

import React, { useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Popover, Typography, Paper, Menu, MenuItem, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { userActions } from '../../../actions'
import { NavLink } from "react-router-dom";

// Icons
import SettingsIcon from '@material-ui/icons/Settings';
import PersonIcon from '@material-ui/icons/Person';
import searchIcon from '../../assets/images/order/search.svg'
import userAvatar from '../../assets/images/user-avatar.jpg'

const useStyles = makeStyles((theme) => ({
    PopoverAccount: {
        width: "220px",
        display: "flex",
        flexDirection: "column"
    },
    button: {
        margin: theme.spacing(1),
    },
}));

export const Header = () => {

    const [anchorEl, setAnchorEl] = useState(null);
    const classes = useStyles();
    let user_type = JSON.parse(localStorage.getItem('type'));


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


    return (
        <>
            <header className="header--desktop">
                <Navbar expand="lg" className="nav--header--desktop justify-content-between">
                    <Nav className="mr-auto">
                        <Nav.Item>
                            <Nav.Link className="search--icon--navbar">
                                <img src={searchIcon} alt="search-icon" height="30" />
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Nav className="mr-auto">
                        <Nav.Item>
                            <Nav.Link className="user--icon--navbar">
                                <img src={userAvatar} alt="user-icon" height="30" onClick={handleClick} />

                                <Popover
                                    id={id}
                                    open={open}

                                    anchorEl={anchorEl}
                                    onClose={handleClose}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'center',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'center',
                                    }}
                                >
                                    <Paper className={classes.PopoverAccount}>
                                        <MenuItem onClick={handleClose} className={`${classes.button} ff-iranSans`} ><PersonIcon className="ms-1 " />
                                            <NavLink to="/account" className="nav-link text-dark fw-bold" activeClassName="active">
                                                حساب کاربری
                                            </NavLink></MenuItem>
                                        {user_type === 1 &&
                                            <MenuItem onClick={handleClose} className={`${classes.button} ff-iranSans`}><SettingsIcon className="ms-1" />
                                                <NavLink to="/setting" className="nav-link text-dark fw-bold" activeClassName="active">
                                                    تنظیمات
                                                </NavLink>
                                            </MenuItem>
                                        }
                                        <Button variant="contained" size="large" color="primary" className={`${classes.button} ff-iranSans`} onClick={e => userActions.logout()}>
                                            خروج
                                        </Button>
                                    </Paper>
                                </Popover>
                            </Nav.Link>
                        </Nav.Item>

                    </Nav>


                </Navbar>
            </header >


        </>
    )
}