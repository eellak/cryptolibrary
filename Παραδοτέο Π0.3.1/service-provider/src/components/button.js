import React, { useState } from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import {
  Button,
  Container,
  Typography,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  ButtonGroup,
} from "@material-ui/core";
import { userManager, userManagerOlympus } from "../utils/userManager";
import swal from "sweetalert";

class ButtonComponent extends React.Component {
  state = {
    isDialogOpen: false,
  };

  openDialog = () => {
    this.setState({ isDialogOpen: true });
  };

  closeDialog = () => {
    this.setState({ isDialogOpen: false });
  };

  continueToApplication = () => {
    this.openDialog();
  };

  render() {
    return (
      <Container>
        <Container style={styles.title}>
          <Typography variant="h6" align="center">
            University Verification System
          </Typography>
          <Typography variant="h4" align="center"></Typography>
        </Container>
        <Typography variant="subtitle1" align="center" style={styles.subtitle}></Typography>
        <Container style={styles.buttonBox}>
          <Button
            size="large"
            variant="outlined"
            onClick={this.continueToApplication}
          >
            Continue to application form
          </Button>
        </Container>
        <Dialog open={this.state.isDialogOpen} onClose={this.closeDialog}>
          <DialogTitle>Application Form</DialogTitle>
          <DialogContent>
            <ButtonGroup fullWidth>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  userManager.getUser();
                  userManagerOlympus.storeUser().then(() => {
                    window.open("http://localhost:8080/reviewm", "_blank");
                    this.closeDialog();
                  });
                }}
              >
                MsC Application
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  userManager.getUser();
                  userManagerOlympus.storeUser().then(() => {
                    window.open("http://localhost:8080/reviewphd", "_blank");
                    this.closeDialog();
                  });
                }}
              >
                PhD Application
              </Button>
            </ButtonGroup>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeDialog} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    );
  }
}

const styles = {
  buttonBox: {
    paddingTop: "10px",
    marginTop: "auto",
    marginBottom: "auto",
    width: "150px",
  },
  subtitle: {
    paddingTop: "10px",
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

export default connect(mapStateToProps)(ButtonComponent);
