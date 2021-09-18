import React, { useState, useEffect } from 'react'
import { AppBar, Toolbar, IconButton, Drawer } from '@material-ui/core';
import { Button } from 'react-bootstrap'
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';

// Icon
import menuIcon from '../../assets/images/header/list.svg'
import excelIcon from '../../assets/images/header/excel.svg'
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
// Components
import { SideBar } from '../main/sideBar'
import routes from "../../routes";

// Actions
import { userActions, employeeActions } from '../../../actions'
import { SignalCellularConnectedNoInternet0BarTwoTone } from '@material-ui/icons';
import { getPermissions } from '../../../reducers/employeeReducer';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    appBar: {
        backgroundColor: "#ebebeb",
        boxShadow: "none",

    },
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

    const classes = useStyles();

    const [isSdieBarOpen, setIsSdieBarOpen] = useState(false)
    let userType = JSON.parse(localStorage.getItem('type'));






    return (
        <>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        onClick={() => setIsSdieBarOpen(true)}
                        edge="start"
                        classes={{ root: classes.menuButton }}
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                    >
                        <img src={menuIcon} className="" height="23px" alt="delete-icon" />

                    </IconButton>
                    <Drawer anchor={'right'} open={isSdieBarOpen}
                        onClose={() => setIsSdieBarOpen(false)}
                    >
                        <SideBar routes={routes} />

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
                    {
                        (userType == 2 && !props.userPermission) ? null :
                            props.isGetExcel ?
                                <>
                                    <Button className="btn--excel--desktop border-0 ff-iranSans p-2 me-4"
                                        onClick={() => props.getExcel()}
                                    >
                                        <img src={excelIcon} className="" height="30px" alt="delete-icon" />

                                    </Button>
                                </>
                                : null
                    }
                    {props.isBtnAdd != " " ?
                        <>
                            <Button className="btn--add--desktop ff-iranSans p-2 me-auto"
                                onClick={() => props.btnAdd()}
                            >
                                <AddIcon className="mx-2 col-3" />
                                <span className="col-8 text-light ms-2 ">{props.isBtnAdd}</span>
                            </Button>
                        </>
                        : null
                    }
                </Toolbar>
            </AppBar>

        </>
    )
}
