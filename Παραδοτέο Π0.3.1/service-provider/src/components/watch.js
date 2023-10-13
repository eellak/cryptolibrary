import React, { useState } from 'react';
import Typography from "@mui/material/Typography";
import { Button, Container, Switch } from "@material-ui/core";
import { userManager, userManagerOlympus } from "../utils/userManager";
import swal from 'sweetalert';
import { connect } from "react-redux";

const fieldDisplayNames = {
    name: "Full Name",
    birthdate: "Date of Birth",
    middle_name: "University",
    family_name: "Awarded Degree",
    nickname: "Student Id",
};

const Watch = ({ user }) => {
    const [revealDetails, setRevealDetails] = useState({
        name: true,
        birthdate: true,
        middle_name: true,
        family_name: true,
        nickname: true,
    });

    const handleToggleReveal = (field) => {
        setRevealDetails((prevState) => ({
            ...prevState,
            [field]: !prevState[field],
        }));
    };

    const canUserContinue = () => {
        // Verify if at least one field is set to true in revealDetails
        const atLeastOneFieldRevealed = Object.values(revealDetails).some((value) => value === true);

        // Check if the university is "University of Ioannina"
        const isUniversityOfIoannina = user ? user.profile.middle_name === "University of Ioannina" : false;

        return atLeastOneFieldRevealed && isUniversityOfIoannina;
    };

    const handleContinueClick = () => {
        userManager.getUser();
        userManagerOlympus.storeUser();

        const canContinue = canUserContinue();

        if (canContinue) {
            // Display information about revealed and hidden details
            const revealedInfo = Object.entries(revealDetails)
                .filter(([field, value]) => value)
                .map(([field, value]) => fieldDisplayNames[field] + ": " + (user ? user.profile[field] : field.charAt(0).toUpperCase() + field.slice(1)))
                .join(', ');

            const hiddenInfo = Object.entries(revealDetails)
                .filter(([field, value]) => !value)
                .map(([field, value]) => fieldDisplayNames[field] + ": " + (user ? user.profile[field] : field.charAt(0).toUpperCase() + field.slice(1)))
                .join(', ');

            swal({
                title: "Information",
                text: `Revealed: ${revealedInfo}\nHidden: ${hiddenInfo}`,
                icon: "info",
                button: "Ok",
            }).then(() => {
                // University of Ioannina verification message
                swal({
                    title: "University of Ioannina",
                    text: "You are Verified!!",
                    icon: "success",
                    button: "Ok",
                }).then(() => {
                    // After the user closes the second popup, open the application form
                    setTimeout(() => window.open("http://localhost:10000/app", "_self"), 1000);
                });
            });
        } else {
            // User does not meet the criteria, show a warning and initiate logout
            swal({
                title: "Details Not Revealed or Invalid University",
                text: "Please select at least one detail to reveal and make sure you are from the University of Ioannina.",
                icon: "warning",
                button: "Ok",
            }).then(() => {
                // Initiate logout
                userManagerOlympus.signoutRedirect(); // Use your OIDC client's signout method
            });
        }
    };

    return (
        <Typography variant="subtitle1" align="center">
            <img src="cybersecuoi.png" width="250" height="160"/>
            <h2 style={{ padding: "10px 20px", color: "black" }}>Credential</h2>

            <summary>
                <h3 style={{ color: "green" }}>Reveal</h3>
            </summary>
            <div>
                {Object.entries(revealDetails).map(([field, value]) => (
                    <div key={field}>
                        <label style={{ display: "block" }}>
                            {fieldDisplayNames[field]}: {/* Use display name here */}
                            {user ? user.profile[field] : field.charAt(0).toUpperCase() + field.slice(1)}
                            <Switch
                                checked={value}
                                onChange={() => handleToggleReveal(field)}
                                color="primary"
                            />
                        </label>
                    </div>
                ))}
            </div>

            <summary>
                <h3 style={{ color: "red" }}>Hide</h3>
            </summary>
            <div>
                {Object.entries(revealDetails).map(([field, value]) => (
                    <div key={field}>
                        <label style={{ display: "block" }}>
                            {fieldDisplayNames[field]}: {/* Use display name here */}
                            {user ? user.profile[field] : field.charAt(0).toUpperCase() + field.slice(1)}
                            <Switch
                                checked={!value}
                                onChange={() => handleToggleReveal(field)}
                                color="secondary"
                            />
                        </label>
                    </div>
                ))}
            </div>

            <Container style={styles.buttonBox}>
                <Button
                    size="medium"
                    variant="outlined"
                    onClick={handleContinueClick}
                >
                    Continue to application form
                </Button>
            </Container>
        </Typography>
    );
};

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
        marginBottom: "auto",
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

export default connect(mapStateToProps)(Watch);
