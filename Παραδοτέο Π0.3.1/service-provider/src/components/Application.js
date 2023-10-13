import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import { RaisedButton } from "material-ui";
import TextField from "material-ui/TextField";
import { userManager, userManagerOlympus } from "../utils/userManager";
import { push } from "react-router-redux";
import { Button, Container } from "@material-ui/core";
import Typography from "@mui/material/Typography";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isAuthenticated: false, // Add isAuthenticated state
    };
  }

  // Add a login function
  handleLogin = () => {
    // Check the username and password
    if (this.state.username === "admin" && this.state.password === "admin") {
      // If credentials are correct, set isAuthenticated to true
      this.setState({ isAuthenticated: true });

      // Perform your authentication logic here (e.g., userManager.getUser())

      // Redirect to the admin page
      window.open("http://localhost:10000/adminpage", "_self");
    } else {
      // Handle authentication failure (e.g., show an error message)
      alert("Invalid username or password");
    }
  };

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <AppBar title="Administrator Page" className="bar" />

            <Typography variant="subtitle1" align="center">
              <img src="cybersecuoi.png" width="250" height="160" />
            </Typography>

            <div className="wrapper">
              <Typography variant="subtitle1" align="center">
                <TextField
                  className="input"
                  hintText="Username"
                  value={this.state.username}
                  onChange={(event, newValue) =>
                    this.setState({ username: newValue })
                  }
                />
              </Typography>

              <br />

              <Typography variant="subtitle1" align="center">
                <TextField
                  className="input"
                  input type="password"
                  hintText="Password"
                  value={this.state.password}
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
                  onClick={this.handleLogin} // Call the login function
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
