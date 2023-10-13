import React from "react";
import {connect} from "react-redux";
import {Button, Container, Typography} from "@material-ui/core";
import {userManager, userManagerOlympus} from "../utils/userManager";
import swal from "sweetalert";

class buttonmsc extends React.Component {
    render() {
        return (
            <Container>
                <Container style={styles.title}>
                    <Typography variant="h6" align="center">
                        University Verification System

                    </Typography>
                    <Typography variant="h4" align="center">
                    </Typography>
                </Container>
                <Typography variant="subtitle1" align="center" style={styles.subtitle}>

                </Typography>
                <Container style={styles.buttonBox}>
                    <Button
                        size="large"
                        variant="outlined"
                        onClick={(event) => {
                            event.preventDefault();
                            userManager.getUser();
                            userManagerOlympus.storeUser();

                            window.open("http://localhost:8080/applicationform", "_blank");

                            //this.props.dispatch(push("/login"));
                        }}
                    >
                        Continue to application form
                    </Button>
                </Container>

            </Container>
        );
    }
}

const styles = {
    buttonBox: {
        paddingTop: "10px",
        marginTop: "auto",
        marginButtom: "auto",
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

export default connect(mapStateToProps)(buttonmsc);
