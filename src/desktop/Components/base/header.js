import React, { useState } from 'react'
import { AppBar, Toolbar, IconButton, Drawer } from '@material-ui/core';
import { Button } from 'react-bootstrap'
import { makeStyles } from '@material-ui/core/styles';
import { history } from '../../../helpers';
import { useDispatch, useSelector } from 'react-redux';


// Actions
import { sideBarActions } from '../../../actions';

// Icon
import menuIcon from '../../assets/images/header/list.svg'
import SearchIcon from '@material-ui/icons/Search';
// Components
import { SideBar } from '../main/sideBar'
import routes from "../../routes";
import { Logout } from './logout';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    appBar: props => ({
        backgroundColor: "#ebebeb",
        boxShadow: "none",
        paddingRight: props.open ? "250px" : 0
    }),
    menuButton: {
        marginLeft: theme.spacing(2),
        backgroundColor: "#0a58ca",
        boxShadow: theme.shadows[5],
        padding: "9px",
        '&:hover': {
            backgroundColor: "#0a58ca",
        }
    }
}));



export const Header = (props) => {


    const [showLogout, setShowLogout] = useState(false)
    const sideBar = useSelector(state => state.sideBar)
    const classes = useStyles({ open: sideBar.open });
    const dispatch = useDispatch()


    return (
        <>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    {sideBar.open ?
                        null
                        :
                        <IconButton
                            onClick={() => dispatch(sideBarActions.sideBar(1))}
                            edge="start"
                            classes={{ root: classes.menuButton }}
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="open drawer"
                        >
                            <img src={menuIcon} className="" height="23px" alt="delete-icon" />

                        </IconButton>

                    }
                    <Drawer
                        anchor={'right'}
                        open={sideBar.open}
                        variant="persistent"
                        onClose={() => dispatch(sideBarActions.sideBar(2))}
                    >
                        <SideBar routes={routes} setShowLogout={setShowLogout}/>

                    </Drawer>
                    {props.isBTNSearch ?
                        <>
                            <Button className="btn--search--desktop ff-iranSans p-2 me-2"
                                onClick={() => props.searchModalShow(true)}
                            >
                                <SearchIcon className="me-2 col-3" />
                                <span className="col-8 text-light">جستجو</span>
                            </Button>
                        </>
                        : null
                    }
                    {props.isBTNRequest ?
                        <>
                            <Button className="btn--add--desktop d-flex justify-content-center ff-iranSans p-2 me-auto"
                                onClick={() => history.push("/employees/add")}
                            >
                                <span className="text-light">در خواست ها</span>
                            </Button>
                        </>
                        : null
                    }
                    {props.isBTNSort ?
                        <>
                            <Button className="btn--search--desktop d-flex justify-content-center ff-iranSans p-2 me-auto"
                                onClick={() => props.sortModalShow(true)}
                            >
                                <SearchIcon className="me-2 col-3" />
                                <span className="col-8 text-light">مرتب کردن</span>
                            </Button>
                        </>
                        : null
                    }
                </Toolbar>
                <Logout show={showLogout} onHide={() => setShowLogout(false)}/>
            </AppBar>

        </>
    )
}
