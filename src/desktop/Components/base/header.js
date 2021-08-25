

import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { Navbar, Nav } from 'react-bootstrap';
import { Popover, Drawer, Paper, IconButton, MenuItem, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import { userActions } from '../../../actions'
import { NavLink } from "react-router-dom";

// Components
import { SideBar } from '../main/sideBar'
import routes from "../../routes";
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
    buttonMenu: {
        paddingleft: 12,
        marginLeft: 0,
        '@media (min-width: 1200px)': {
            display: "none"
        }
    },
    buttonMenuIcon: {
        fontSize: 30,
        color: '#70b2e2'
    },
}));

export const Header = ({ history }) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
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

    let toggleDrawer = (isOpen) => {
        setIsDrawerOpen(isOpen)
    }

    useEffect(() => { setIsDrawerOpen(false) }, [history.location.pathname])

    return (
        <>
            <header className="header--desktop">
                <Navbar expand="lg" className="nav--header--desktop justify-content-between">
                    <Nav className="mr-auto d-flex flex-row">
                        <Nav.Item>
                            <IconButton
                                color="primary"
                                aria-label="open drawer"
                                onClick={() => toggleDrawer(true)}
                                edge="start"
                                className={`${classes.buttonMenu}`}

                            >
                                <MenuIcon className={`${classes.buttonMenuIcon}`} />
                            </IconButton>
                        </Nav.Item>
                        <Nav.Item className="d-flex justify-content-center align-items-center">
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

            <Drawer anchor="right" open={isDrawerOpen} onClose={() => toggleDrawer(false)} >
                <SideBar routes={routes} />
            </Drawer>


        </>
    )
}