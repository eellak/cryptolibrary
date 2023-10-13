import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import { RaisedButton } from "material-ui";
import TextField from "material-ui/TextField";
import {userManager, userManagerOlympus} from "../utils/userManager";
import {push} from "react-router-redux";
import {Button, Container} from "@material-ui/core";
import Typography from "@mui/material/Typography";
import swal from "sweetalert";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "admin",
            password: "admin"
        };
    }

    render() {
        // // swal("University of Ioannina!", "Put an email that you have created only for this application!", "warning");
        //
        // swal({
        //     title: "University of Ioannina ",
        //     text: "Put an email that you have created only for this application!",
        //     icon: "warning",
        //     button: "Ok",
        // }).then(r => this.props.dispatch(push("/master/cred")));

        return (

            <div>

                <MuiThemeProvider>
                    <div>

                        <AppBar title="" className="bar" />
                        <Stack sx={{ width: '100%' }} spacing={4}>

                        </Stack>
                        <Typography variant="subtitle1" align="center" >
                            <img src="cybersecuoi.png" width="250" height="160"/>

                            <Typography variant="body1" align="center" >
                            </Typography>
                        </Typography>

                        <div className="wrapper">
                            <Typography variant="subtitle1" align="center" >
                                <TextField
                                    className="input"
                                    input type="username"
                                    hintText="Username"
                                    onChange={(event, newValue) =>
                                        this.setState({ email: newValue })
                                    }
                                />
                            </Typography>

                            <br />
                            <Typography variant="subtitle1" align="center" >
                                <TextField
                                    className="input"
                                    input type="password"
                                    hintText="Password"
                                    onChange={(event, newValue) => {
                                        this.setState({ password: newValue });
                                    }}
                                />
                            </Typography>

                            <br />
                            <Container style={styles.buttonBox}>

                                <RaisedButton
                                    className="submit button"
                                    label="Login"
                                    primary={true}
                                    onClick={(event) => {
                                        event.preventDefault();
                                        userManager.getUser();
                                        userManagerOlympus.storeUser().then(r =>  window.open("http://localhost:10000/userpanel", "_self")) }}
                                />
                            </Container>
                        </div>
                    </div>
                </MuiThemeProvider>
            </div>
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
export default Login;
