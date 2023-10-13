import React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import FrontPage from "./frontPage";
import {AppBar, Button, Collapse, Container, IconButton, Menu, MenuItem, Typography} from "@material-ui/core";
import swal from 'sweetalert';
import { browserHistory } from 'react-router';
import { userManager, userManagerOlympus } from "../utils/userManager";
import {InMemoryWebStorage} from "oidc-client";
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import transitions from "@material-ui/core/styles/transitions";
import CloseIcon from '@mui/icons-material/Close';
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import {MiToggleSwitch} from "mi-toggle-switch";
import {Label} from "./style";



class MainPage extends React.Component {


    render() {

    const { user } = this.props;
    console.log("start user");
    console.log(user);
    console.log("end user");
    // Fetch user profile and check if user is > 18 years
    var birthdate = user.profile.birthdate;
    var today = new Date();
    console.log(today.getYear());
    today.setYear(today.getYear() + 1900 - 18);
    var over18 = new Date(birthdate) < today;

        var hasChangedPassword = localStorage.getItem('hasChangedPassword');

        // Check if it's the user's first login and they need to change their password
        if (!hasChangedPassword) {
            swal({
                title: "Password Change Required",
                text: "You need to change your password on your first login.",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then((willDelete) => {
                if (willDelete) {
                    // Redirect the user to the change password page
                    window.location.href = 'http://localhost:8080/changePassword\n';
                } else {
                    // Handle the case where the user chooses not to change the password
                    swal("Password Changes not required",{
                        icon:"info",
                    }).then(() => {
                        // You can put any additional logic here that should occur
                        // after the user sees the "Password Change Not Required" message.
                        // For example, you can redirect them to the dashboard or perform other actions.
                        // If there's nothing specific to do, you can omit this 'then' block.
                        // For example:
                        // window.location.href = 'http://example.com/dashboard';
                    });
                }
            });
            localStorage.setItem('hasChangedPassword', 'true');

        } else {
            // Handle the case where it's not the first login or password change is not required
            // For example, you can redirect the user to the dashboard or perform other actions.
            // If there's nothing specific to do, you can omit this 'else' block.
            // For example:
            // window.location.href = 'http://example.com/dashboard';
        }

        // Failed to validate age check
    if (!over18) {
      alert("under 18, sending back to front");
      return <FrontPage />;
    }

    return (

        <Container style={styles.root}>
          <Container style={styles.title}>

              {/*<Alert variant="filled" severity="success">*/}
              {/*    Welcome:{user ? user.profile.name : "Mister Unknown"  }*/}
              {/*</Alert>*/}


              <Box sx={{ flexGrow: 1 }}>
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
                          sx={{ mr: 2 }}
                      >
                          <MenuIcon />
                      </IconButton>
                      <PopupState variant="popover" popupId="demo-popup-menu" >
                          {(popupState) => (
                              <React.Fragment>
                                  <Button color="inherit" uppercase={false} {...bindTrigger(popupState)}
                                          size="small"

                                  >
                                      Dashboard
                                  </Button>

                                  <Menu {...bindMenu(popupState)}>
                                      <MenuItem onClick={()=>{}}style={{color: "red"}}>Welcome {user ? user.profile.name : "Mister Unknown"  }</MenuItem>
                                      <MenuItem onClick={(event)=>{
                                          event.preventDefault();
                                          userManager.getUser();
                                          userManagerOlympus.storeUser().then(r => this.props.dispatch(push("/success")))}}>Home</MenuItem>
                                      <MenuItem onClick={(event)=>{
                                          event.preventDefault();
                                          userManager.getUser();
                                          userManagerOlympus.storeUser()
                                          swal({
                                              title: "Privacy notice!",
                                              text: "CyberSec4 Europe is committed to the protection of individuals privacy and data protection!",
                                              icon: "warning",
                                              button: "Ok",
                                          }).then(r => this.props.dispatch(push("/information")))}}>Personal Information</MenuItem>
                                      <MenuItem onClick={(event)=>{
                                          event.preventDefault();
                                          // userManager.getpolicy()
                                          //policy edw kai meta store
                                          userManager.getUser();
                                          userManagerOlympus.storeUser().then(r => this.props.dispatch(push("/succes")))}}>See your Credentials</MenuItem>
                                      <MenuItem onClick={(event)=>{
                                          event.preventDefault();
                                          userManager.getUser();
                                          userManagerOlympus.storeUser();
                                          window.close();
                                          window.open("http://localhost:8080/deleteAccount", "_blank");}}>Delete Account</MenuItem>
                                      <MenuItem onClick={(event)=>{
                                          event.preventDefault();
                                          userManager.getUser();
                                          userManagerOlympus.storeUser();
                                          window.close();
                                          window.open("http://localhost:10000/logine", "_blank");}}>View submissions and messages</MenuItem>
                                           <MenuItem onClick={(event)=>{
                                                event.preventDefault();
                                                userManager.getUser();
                                                userManagerOlympus.storeUser();
                                                window.close();
                                                window.open("https://drive.google.com/file/d/1pxSatSyO8veLId-qDQ8eVl2oVSVbzcXq/view?usp=sharing", "_blank");}}>Application Guide</MenuItem>
                                                 <MenuItem onClick={(event)=>{
                                                event.preventDefault();
                                                userManager.getUser();
                                                userManagerOlympus.storeUser();
                                                window.close();
                                                window.open("https://drive.google.com/file/d/1-irxW-NwKabHXH3V9FbFb6B9OR3GFnji/view?usp=sharing", "_blank");}}>Introduction to ABCs</MenuItem>
                                      <MenuItem onClick={(event)=>{
                                          event.preventDefault();
                                          userManager.getUser();
                                          userManagerOlympus.storeUser();
                                          window.close();
                                          window.open("http://localhost:8080/logout", "_self");}}>Logout</MenuItem>
                                  </Menu>

                              </React.Fragment>
                          )}
                      </PopupState>
                      {/*<Typography variant="center" component="div" sx={{ flexGrow: 2 }} >*/}
                      {/*    <h5  style={{color: "white"}}>Welcome:{user ? user.profile.name : "Mister Unknown"  }  </h5>*/}
                      {/*</Typography >*/}

                  </Toolbar>

              </AppBar>
              <Typography variant="subtitle1" align="center" >


              <img src="cybersecuoi.png" width="250" height="160"/>
                  <Button


                      onClick={(event) => {
                          event.preventDefault();
                          // userManager.getpolicy()
                          //policy edw kai meta store
                          userManager.getUser();
                          userManagerOlympus.storeUser().then(r => this.props.dispatch(push("/succes"))
                          );
                          //window.open("http://localhost:8080/applicationform", "_blank");

                      }}
                  >
                  </Button>
                  <Typography variant="subtitle1" align="center" hidden="yes">

                <h6 style={{ color: "grey"}}>Welcome:{user ? user.profile.name : "Mister Unknown"  }  </h6>
                <h6 style={{color: "grey"}}>Birthdate: {user ?  user.profile.birthdate:""}</h6>
                <h6 style={{color: "grey"}}>University: {user ? user.profile.middle_name : "University"}</h6>
                <h6 style={{color: "grey"}}>Awarded Degree: {user ? user.profile.family_name : "awardeddegree"}</h6>
                <h6 style={{color: "grey"}} >Student Id: {user ? user.profile.nickname : "Student Id"}</h6>
                <h6 style={{color: "grey"}}>token:{ user ? user.token_type : "token_type"}</h6>
                <h6 style={{color: "grey"}}>token:{ InMemoryWebStorage.name}</h6>


            </Typography>

            </Typography>
            {/*<Typography variant="subtitle1" align="center" style={styles.subtitle}>You're over 18!</Typography>*/}
            {/*<Typography variant="subtitle1" align="center">A reservation has been made in your name!</Typography>*/}
          </Container>
          <h5 style={{color: "blue"}}>1.If you have a University Degree from a Department of University of Ioannina you can get your privacy-Attribute Based Credential. Click below to "Get a Credential" that you posses a MSc/PhD Degree from a department of University of Ioannina. </h5>


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
                  userManagerOlympus.storeUser().then(r => this.props.dispatch(push("/credential/storage"))
                );
                    //window.open("http://localhost:8080/applicationform", "_blank");

                }}
            >
              Get Credential for P-ABC
            </Button>
          </Container>
          <h5 style={{color: "blue"}}>2.If you posses a Credential from a Department of University of Ioannina you can."Verify your possessed Credential".</h5>

          <Button
              size="medium"
              variant="outlined"
              onClick={(event) => {
                event.preventDefault();
                  userManager.getUser();
                  userManagerOlympus.storeUser().then(r => this.props.dispatch(push("/select"))

                  );

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

export default connect(mapStateToProps)(MainPage);
