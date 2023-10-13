import React from "react";
import { connect } from "react-redux";
import { userManager, userManagerOlympus } from "../utils/userManager";
import { push } from "react-router-redux";
import swal from "sweetalert";
import { Button, Container, Typography } from "@material-ui/core";

class Storage extends React.Component {
  componentDidMount() {
    // Perform data verification when the component mounts
    this.verifyUserData(this.props.user);
  }

  // Function to verify user data
  verifyUserData(user) {
    const requiredFields = ["name", "sub", "birthdate", "middle_name", "family_name", "nickname"];

    if (user && user.profile) {
      // Check if all required fields exist in the user object
      const missingFields = requiredFields.filter((field) => !user.profile[field]);
      
      if (missingFields.length === 0) {
        // All required fields are present, data is valid
        swal({
          title: "University of Ioannina ",
          text: "would like to deliver a Credential to your Storage!",
          icon: "warning",
          button: "Allow",
        });
      } else {
        // Some required fields are missing
        swal({
          title: "Error",
          text: `Missing fields: ${missingFields.join(", ")}`,
          icon: "error",
          button: "Close",
        });
      }
    } else {
      // User object or profile data is missing
      swal({
        title: "Error",
        text: "User data is missing or incomplete.",
        icon: "error",
        button: "Close",
      });
    }
  }

  render() {
    // Render your component's UI here
    const { user } = this.props;

    return (
      <div style={styles.root}>
        <div style={styles.title}>
          <Typography variant="subtitle1" align="center">
            <div align="center">
              <img src={"/cybersecuoi.png"} width="250" height="160" />
              <h4 style={{ color: "grey" }}>Full Name: {user ? user.profile.name : "Mister Unknown"}</h4>
              <h4 style={{ color: "grey" }}>Username: {user ? user.profile.sub : "Mister Unknown"}</h4>
              <h4 style={{ color: "grey" }}>Birthdate: {user ? user.profile.birthdate : "Birth"}</h4>
              <h4 style={{ color: "grey" }}>University: {user ? user.profile.middle_name : "University"}</h4>
              <h4 style={{ color: "grey" }}>Awarded Degree: {user ? user.profile.given_name : "University"}</h4>
              <h4 style={{ color: "grey" }}>Student Id: {user ? user.profile.nickname : "Student Id"}</h4>
              <Container style={styles.buttonBox} align="center">
                <Button
                  size="large"
                  variant="outlined"
                  onClick={(event) => {
                    event.preventDefault();
                    userManager.getUser();
                    userManagerOlympus.storeUser();
                    window.close();
                    window.open("http://localhost:8080/logout", "_self");
                  }}
                >
                  Close
                </Button>
              </Container>
            </div>
          </Typography>
        </div>
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
};

function mapStateToProps(state) {
  return {
    user: state.oidc.user,
  };
}

export default connect(mapStateToProps)(Storage);
