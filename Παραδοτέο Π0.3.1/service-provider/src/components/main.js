import React, {useState} from "react";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import FrontPage from "./frontPage";
import {AppBar, Button, Container, IconButton, Link, Menu, MenuItem, Typography} from "@material-ui/core";
import {userManager, userManagerOlympus} from "../utils/userManager";
import {push} from "react-router-redux";
import swal from "sweetalert";
import {connect} from "react-redux";
import {Details, Storage} from "@material-ui/icons";
import {InMemoryWebStorage} from "oidc-client";
import {Card} from "@material-ui/core";
import Draggable from "react-draggable";
import {cleanup} from "@testing-library/react";
import DeleteIcon from "@material-ui/icons/Delete";
import SwipeMe from 'react-swipe-me'
import PopupState, {bindTrigger, bindMenu} from 'material-ui-popup-state';
import {styled} from '@mui/material/styles';
import SwipeToDismiss from 'react-swipe-to-dismiss';
import 'react-swipe-to-delete-component/dist/swipe-to-delete.css';
import SwipeToDelete from 'react-swipe-to-delete-component';

import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';

class main extends React.Component {


    render() {

        const {user} = this.props;


        return (

            <Container style={styles.root}>
                <Container style={styles.title}>
                    <Box sx={{flexGrow: 1}}>
                        {/*    <AppBar position="static">*/}
                        {/*        <Toolbar>*/}
                        {/*            <IconButton*/}
                        {/*                size="large"*/}
                        {/*                edge="start"*/}
                        {/*                color="inherit"*/}
                        {/*                aria-label="menu"*/}
                        {/*                sx={{ mr: 2 }}*/}
                        {/*            >*/}
                        {/*                <MenuIcon />*/}
                        {/*            </IconButton>*/}

                        {/*            <Button color="inherit"  align="right">Login</Button>*/}
                        {/*            <Button color="inherit"  align="right">Login</Button>*/}

                        {/*        </Toolbar>*/}
                        {/*    </AppBar>*/}
                    </Box>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{mr: 2}}
                            >
                                <MenuIcon/>
                            </IconButton>
                            <PopupState variant="popover" popupId="demo-popup-menu">
                                {(popupState) => (
                                    <React.Fragment>
                                        <Button color="inherit" uppercase={false} {...bindTrigger(popupState)}
                                                size="small"

                                        >
                                            Dashboard
                                        </Button>

                                        <Menu {...bindMenu(popupState)}>
                                            <MenuItem onClick={() => {
                                            }}
                                                      style={{color: "red"}}>Welcome {user ? user.profile.name : "Mister Unknown"}</MenuItem>
                                            <MenuItem onClick={(event) => {
                                                event.preventDefault();
                                                userManager.getUser();
                                                userManagerOlympus.storeUser().then(r => this.props.dispatch(push("/success")))
                                            }}>Home</MenuItem>
                                            <MenuItem onClick={(event) => {
                                                event.preventDefault();
                                                userManager.getUser();
                                                userManagerOlympus.storeUser()
                                                swal({
                                                    title: "Privacy notice!",
                                                    text: "CyberSec4 Europe is committed to the protection of individuals privacy and data protection!",
                                                    icon: "warning",
                                                    button: "Ok",
                                                }).then(r => this.props.dispatch(push("/information")))
                                            }}>Personal Information</MenuItem>
                                            <MenuItem onClick={(event) => {
                                                event.preventDefault();
                                                userManager.getUser();
                                                userManagerOlympus.storeUser();
                                                window.close();
                                                window.open("http://localhost:8080/deleteAccount", "_blank");
                                            }}>Delete Account</MenuItem>
                                            <MenuItem onClick={(event) => {
                                                event.preventDefault();
                                                userManager.getUser();
                                                userManagerOlympus.storeUser();
                                                window.close();
                                                window.open("http://localhost:10000/logine", "_blank");
                                            }}>View submissions and messages</MenuItem>
                                            <MenuItem onClick={(event) => {
                                                event.preventDefault();
                                                userManager.getUser();
                                                userManagerOlympus.storeUser();
                                                window.close();
                                                window.open("https://drive.google.com/file/d/1pxSatSyO8veLId-qDQ8eVl2oVSVbzcXq/view?usp=sharing", "_blank");
                                            }}>Application Guide</MenuItem>
                                            <MenuItem onClick={(event) => {
                                                event.preventDefault();
                                                userManager.getUser();
                                                userManagerOlympus.storeUser();
                                                window.close();
                                                window.open("https://drive.google.com/file/d/1-irxW-NwKabHXH3V9FbFb6B9OR3GFnji/view?usp=sharing", "_blank");
                                            }}>Introduction to ABCs</MenuItem>
                                            <MenuItem onClick={(event) => {
                                                event.preventDefault();
                                                userManager.getUser();
                                                userManagerOlympus.storeUser();
                                                window.close();
                                                window.open("http://localhost:8080/logout", "_self");
                                            }}>Logout</MenuItem>
                                        </Menu>

                                    </React.Fragment>
                                )}
                            </PopupState>
                            {/*<Typography variant="center" component="div" sx={{ flexGrow: 2 }} >*/}
                            {/*    <h5  style={{color: "white"}}>Welcome:{user ? user.profile.name : "Mister Unknown"  }  </h5>*/}
                            {/*</Typography >*/}

                        </Toolbar>

                    </AppBar>

                    <Typography variant="subtitle1" align="center">
                        <img src="cybersecuoi.png" width="250" height="160"/>

                        <Typography variant="body1" align="center">


                            <SwipeToDelete

                                axis="x"

                                // grid={[100, 100]}
                                // onDrag={this.delete}
                                //  onDrag={(event) => {
                                //      userManagerOlympus.clearStaleState();
                                //  cleanup();
                                //  return Promise.resolve();
                                //  }}

                                onTouchMove={(touchMoveEvent) => console.log(touchMoveEvent)}

                                onDrag={this.handleEvent}
                                onStart={this.handleEvent}
                                onStop={this.handleEvent}
                                onMouseDown={this.handleEvent}
                                onMouseUp={this.handleEvent}
                                onTouchStart={this.handleEvent}
                                onTouchEnd={this.handleEvent}>

                                <Card>
                                    <details>
                                        <summary>Credentials Storage</summary>
                                        <h6 style={{color: "black"}}>FullName:{user ? user.profile.name : "Mister Unknown"}  </h6>
                                        <h6 style={{color: "black"}}>Birthdate: {user ? user.profile.birthdate : ""}</h6>
                                        <h6 style={{color: "black"}}>University: {user ? user.profile.middle_name : "University"}</h6>
                                        <h6 style={{color: "black"}}>Awarded
                                            Degree: {user ? user.profile.given_name : "awardeddegree"}</h6>
                                        <h6 style={{color: "black"}}>Student
                                            Id: {user ? user.profile.nickname : "Student Id"}</h6>

                                    </details>

                                </Card>

                            </SwipeToDelete>

                            <details>

                                <summary>Credentials Storage</summary>
                                <h6 style={{color: "black"}}>FullName:{user ? user.profile.name : "Mister Unknown"}  </h6>
                                <h6 style={{color: "black"}}>Birthdate: {user ? user.profile.birthdate : ""}</h6>
                                <h6 style={{color: "black"}}>University: {user ? user.profile.middle_name : "University"}</h6>
                                <h6 style={{color: "black"}}>Awarded
                                    Degree: {user ? user.profile.family_name : "awardeddegree"}</h6>
                                <h6 style={{color: "black"}}>Student
                                    Id: {user ? user.profile.nickname : "Student Id"}</h6>
                                {/*<h6 style={{color: "black"}} >Application Category: {user ? user.profile.applicationcategory : "Student Id"}</h6>*/}

                                {/*<h6 style={{color: "black"}}>token:{ user ? user.token_type : "token_type"}</h6>*/}
                                <Button
                                    size="small"
                                    variant="outlined"
                                    onClick={(event) => {
                                        event.preventDefault();
                                        //userManager.getpolicy()
                                        //policy edw kai meta store
                                        userManager.getUser();
                                        userManagerOlympus.storeUser().then(r => this.props.dispatch(push("/master/cred")));
                                    }
                                    }

                                >
                                    Select
                                </Button>
                            </details>


                        </Typography>


                    </Typography>
                    {/*<Typography variant="subtitle1" align="center" style={styles.subtitle}>You're over 18!</Typography>*/}
                    {/*<Typography variant="subtitle1" align="center">A reservation has been made in your name!</Typography>*/}
                </Container>
                <h5 style={{color: "blue"}}>1.If you have a University Degree from a Department of University of
                    Ioannina you can get your privacy-Attribute Based Credential. Click below to "Get a Credential" that
                    you posses a MSc/PhD Degree from a department of University of Ioannina. </h5>


                <Container style={styles.buttonBox}>
                    {/*<Button*/}
                    {/*  size="medium"*/}
                    {/*  variant="outlined"*/}
                    {/*  onClick={(event) => {*/}
                    {/*    event.preventDefault();*/}
                    {/*    userManager.removeUser();*/}
                    {/*    userManagerOlympus.removeUser();*/}
                    {/*    this.props.dispatch(push("/"));*/}
                    {/*  }}*/}
                    {/*>*/}
                    {/*  Logout*/}
                    {/*</Button>*/}

                    {/*<Button*/}
                    {/*    size="medium"*/}
                    {/*    variant="outlined"*/}
                    {/*    onClick={(event) => {*/}
                    {/*        event.preventDefault();*/}
                    {/*        userManager.getUser();*/}
                    {/*        userManagerOlympus.storeUser().then(r =>  window.open("http://localhost:8080/getpolicy", "_blank")*/}
                    {/*    );*/}
                    {/*        // this.props.dispatch(push("http://localhost:8080/getpolicy"));*/}

                    {/*    }}*/}
                    {/*>*/}
                    {/*    Get Policy*/}
                    {/*</Button>*/}

                    <Button
                        size="medium"
                        variant="outlined"
                        onClick={(event) => {
                            event.preventDefault();
                            // userManager.getpolicy()
                            //policy edw kai meta store
                            userManager.getUser();
                            userManagerOlympus.storeUser().then(r => this.props.dispatch(push("/view/credential"))
                            );
                            //window.open("http://localhost:8080/applicationform", "_blank");

                        }}
                    >
                        Get Credential for P-ABC
                    </Button>
                </Container>
                <h5 style={{color: "blue"}}>2.If you posses a Credential from a Department of University of Ioannina you
                    can."Verify your possessed Credential".</h5>

                <Button
                    size="medium"
                    variant="outlined"
                    onClick={(event) => {
                        event.preventDefault();
                        userManager.getUser();
                        userManagerOlympus.storeUser().then(r => this.props.dispatch(push("/select"))
                        );
                        // swal({
                        //     title: "University of Ioannina ",
                        //     text: "You are Verified!",
                        //     icon: "success",
                        //     button: "Ok",
                        // }).then(r => window.open('http://localhost:3000/app'));


                    }}
                >
                    Verify your possessed Credential
                </Button>
            </Container>
        );
    }
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

function mapStateToProps(state) {
    return {
        user: state.oidc.user,
    };
}

export default connect(mapStateToProps)(main);
