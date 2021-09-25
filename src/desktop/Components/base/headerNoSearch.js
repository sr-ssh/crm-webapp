import React, { useState } from 'react'
import { AppBar, Toolbar, IconButton, Drawer } from '@material-ui/core';
import { Button } from 'react-bootstrap'
import { makeStyles } from '@material-ui/core/styles';

// Icon
import menuIcon from '../../assets/images/header/list.svg'
import AddIcon from '@material-ui/icons/Add';
// Components
import { SideBar } from '../main/sideBar'
import routes from "../../routes";


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
