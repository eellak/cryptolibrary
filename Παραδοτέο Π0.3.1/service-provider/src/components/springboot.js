import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import {InMemoryWebStorage} from "oidc-client";
import {userManager, userManagerOlympus} from "../utils/userManager";
import {push} from "react-router-redux";
import {Badge, Button, Container} from "@material-ui/core";
import swal from "sweetalert";
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailIcon from '@mui/icons-material/Mail';

export default function MenuAppBar1() {

    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleChange = (event) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    return (


        <Box sx={{ flexGrow: 1 }}>
            <FormGroup>

            </FormGroup>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 3 }}>
                        User Panel
                    </Typography>
                    {auth && (
                        <div>

                            <IconButton
                                size="large"
                                aria-label="show 2 new notifications"
                                color="inherit"
                            >

                                <Badge badgeContent={2} color="error">
                                    <NotificationsIcon />
                                </Badge>


                            </IconButton>

                                <IconButton size="large" aria-label="show 2 new mails" color="inherit">
                                    <Badge badgeContent={2} color="error">
                                        <MailIcon />
                                    </Badge>
                                </IconButton>

                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />

                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >

                                <MenuItem onClick={(event)=>{
                                    event.preventDefault();
                                    userManager.getUser();
                                    userManagerOlympus.storeUser()
                                    swal({
                                        title: "Reminder!",
                                        text: "Please click on 'Ok' button to withdraw the submitted MSc Application. " +
                                            "If you want to delete the submitted MSc Application click on 'Delete' button",
                                        icon: "warning",
                                        buttons: ["Delete", true],
                                        dangerMode: true,
                                    })
                                        .then((willDelete) => {
                                            if (willDelete) {
                                                swal("See your Application", {
                                                    icon: "info",
                                                }).then(r => window.open("http://localhost:8080/applicationform", "_self"));
                                            } else {
                                                swal("Your application is deleted", {
                                                    icon: "success",
                                                })
                                            }
                                        });
                                }}
                                > Withdraw your Application for MsC
                                </MenuItem>
                                <MenuItem onClick={(event)=>{
                                    event.preventDefault();
                                    userManager.getUser();
                                    userManagerOlympus.storeUser();
                                    swal({
                                        title: "Reminder!",
                                        text: "Please click on 'Ok' button to withdraw the submitted PhD Application. " +
                                            "If you want to delete the submitted PhD Application click on 'Delete' button",
                                        icon: "warning",
                                        buttons: ["Delete", true],
                                        dangerMode: true,
                                    })
                                        .then((willDelete) => {
                                            if (willDelete) {
                                                swal("See your Application", {
                                                    icon: "info",
                                                }).then(r => window.open("http://localhost:8080/phdapplication", "_self"));
                                            } else {
                                                swal("Your application is deleted", {
                                                    icon: "success",
                                                })
                                            }
                                        });
                                }}
                                > Withdraw your Application for PhD
                                </MenuItem>
                                <MenuItem onClick={(event)=>{
                                    event.preventDefault();
                                    userManager.getUser();
                                    userManagerOlympus.storeUser();
                                    window.close();
                                    window.open("http://localhost:8080/logout", "_self");}}>Logout</MenuItem>

                            </Menu>
                        </div>
                    )}
                </Toolbar>

            </AppBar>
            <Typography variant="subtitle1" align="center" >


                <img src="cybersecuoi.png" width="250" height="160"/>

            </Typography>

            <Button
                size="large"
                variant="outlined"
                onClick={(event) => {
                    event.preventDefault();

                    userManager.getUser();
                    userManagerOlympus.storeUser().then(r => window.open("http://localhost:8080/form1", "_blank")
                    );
                    //window.open("http://localhost:8080/applicationform", "_blank");

                }}
            >
                View  submitted MSc application form
            </Button>
            <Button
                size="large"
                variant="outlined"
                onClick={(event) => {
                    event.preventDefault();

                    userManager.getUser();
                    userManagerOlympus.storeUser().then(r => window.open("http://localhost:8080/form2", "_blank")
                    );
                    //window.open("http://localhost:8080/applicationform", "_blank");



                }}
            >
                View  submitted Phd application form
            </Button>
        </Box>

    );
}
const styles = {
    root: {
        display: "flex",
        flexDirection: "column",
    },
    title: {
        flex: "1 0 auto",
    },
    list: {
        listStyle: "none",
    },
    li: {
        display: "flex",
    },
    buttonBox: {
        paddingTop: "10px",
        marginTop: "auto",
        marginButtom: "auto",
        width: "150px",
    },
    subtitle: {
        paddingTop: "10px",
    },
};
