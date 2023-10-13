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

export default function MenuAppBar() {

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
                        Administrator Panel
                    </Typography>
                    {auth && (
                        <div>
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
                                    userManagerOlympus.storeUser().then(r =>  window.open("http://localhost:8080/createUser", "_self")) }}>Create User Account</MenuItem>
                                <MenuItem onClick={(event)=>{
                                    event.preventDefault();
                                    userManager.getUser();
                                    userManagerOlympus.storeUser();
                                    window.open("http://localhost:8080/deleteAccount", "_blank");}}>Delete account</MenuItem>
                                <MenuItem onClick={(event)=>{
                                    event.preventDefault();
                                    userManager.getUser();
                                    userManagerOlympus.storeUser();
                                    window.close();
                                    window.open("ttp://localhost:8080/:8080/logout", "_self");}}>Logout</MenuItem>

                            </Menu>
                        </div>
                    )}
                </Toolbar>

            </AppBar>
            <Typography variant="subtitle1" align="center" >


                <img src="cybersecuoi.png" width="250" height="160"/>
            </Typography>

        </Box>

    );
}
