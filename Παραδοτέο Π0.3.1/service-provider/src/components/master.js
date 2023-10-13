import React from "react";
import {connect} from "react-redux";
import {userManager, userManagerOlympus} from "../utils/userManager";
import {push} from "react-router-redux";
import swal from 'sweetalert';
import {Button, Container, Typography} from "@material-ui/core";

class master extends React.Component {
    render() {

        sessionStorage.setItem('', 'value');
        let data = sessionStorage.getItem('key');
        sessionStorage.removeItem('key');
        sessionStorage.clear();

        const {user} = this.props;

        // // window.alert ("You must change your password from Manage Account! ")
        // //  if(!alert("You are going to submit your application"))
        // //      setTimeout(() =>   window.open ('http://localhost:8080/applicationform'),9000);
        // //  swal("You are going to submit your application!")
        // //      .then(r => setTimeout(() =>   window.open ('http://localhost:8080/applicationform'),9000) );
        // swal({
        //     title: "University of Ioannina ",
        //     text: "would like to deliver a Credential to your Storage!",
        //     icon: "warning",
        //     button: "Allow",
        // }).then(r =>setTimeout(() =>   window.open ('http://localhost:3000/continue'),9000) );
        // setTimeout("window.close('http://localhost:3000/credential/storage','width=550,height=400')",9000)

        return (


            <div style={styles.root}>
                <div style={styles.title}>

                    <div align="center">
                        <img src={"/cybersecuoi.png"} width="250" height="160"/>

                        <h4 style={{color: "grey"}}>Full Name:{user ? user.profile.name : "Mister Unknown"}</h4>
                        <h4 style={{color: "grey"}}> Username: {user ? user.profile.sub : "Mister Unknown"}</h4>
                        <h4 style={{color: "grey"}}>Birthdate: {user ? user.profile.birthdate : "Birth"}</h4>
                        <h4 style={{color: "grey"}}>University: {user ? user.profile.family_name : "University"}</h4>
                        <h4 style={{color: "grey"}}>Awarded
                            Degree: {user ? user.profile.applicationcategory : "University"}</h4>
                        <h4 style={{color: "grey"}}>Student Id: {user ? user.profile.nickname : "Student Id"}</h4>
                    </div>
                    {/*<h4>Course: {user ? user.profile.course : "Course"}</h4>*/}
                    {/*<h4>Authorization  :{user?user.profile.auth_time:"authorization"}</h4>*/}
                    {/*<h4>Authorization Time :{user?user.profile.state:"authorization"}</h4>*/}
                    {/*<h4>Jti(JWT ID):{user?user.profile.jti:"key"}</h4>*/}

                </div>

                <Container style={styles.buttonBox}>
                    <Typography variant="subtitle1" align="center">

                        <Button
                            size="medium"
                            variant="outlined"
                            onClick={() => {
                            userManager.getUser();
                            userManagerOlympus.storeUser();
                            // this.props.dispatch(push("/verify"));
                            setTimeout(() => window.open("http://localhost:10000/continue", "_blank"), 1000);
                        }}
                        >
                            Continue to application form
                        </Button>
                    </Typography>

                </Container>
            </div>

        );
    }
}

const styles = {
    root: {
        display: "flex",
        flexDirection: "column"
    },
    title: {
        flex: "1 0 auto"
    },
    list: {
        listStyle: "none"
    },
    li: {
        display: "flex"
    }
};

function mapStateToProps(state) {
    return {
        user: state.oidc.user,
    };

}

export default connect(mapStateToProps)(master);
