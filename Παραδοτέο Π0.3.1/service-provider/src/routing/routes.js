import React from "react";
import {Router, Route, browserHistory} from "react-router";
import HomePage from "../components/homePage";
import {syncHistoryWithStore} from "react-router-redux";
import CallbackPageOL from "../components/callbackOL";
import CallbackPageKC from "../components/callbackKC";
import LoginPage from "../components/loginPage";
import MainPage from "../components/mainPage";
import store from "../store/store";
import storage from "../components/storage"
import Verifier from "../components/verifier"
import button from "../components/button"
import main from "../components/main"
import storage1 from "../components/storage1"
import personalization from "../components/personalization";
import navbar from "../components/navbar";
import Application from "../components/Application";
import buttonapp from "../components/buttonapp";
import master from "../components/master";
import buttonmsc from "../components/buttonmsc";
import watch from "../components/watch"
import springboot from "../components/springboot"
import Loginemail from "../components/Loginemail"
import appform from "../components/appform";
import error from "../components/error";


const history = syncHistoryWithStore(browserHistory, store);
export default function Routes(props) {
    return (
        <Router history={history}>
            <Route path="/" component={HomePage}/>
            <Route path="/login" component={LoginPage}/>
            <Route path="/administrator" component={Application}/>
            <Route path="/success" component={MainPage}/>
            <Route path="/callbackOL" component={CallbackPageOL}/>
            <Route path="/callbackKC" component={CallbackPageKC}/>
            <Route path="/credential/storage" component={storage}/>
            <Route path="/verifier" component={Verifier}/>
            <Route path="/app" component={button}/>
            <Route path="/succes" component={main}/>
            <Route path="/information" component={personalization}/>
            <Route path="/adminpage" component={navbar}/>
            <Route path="/view/credential" component={storage1}/>
            <Route path="/continue" component={buttonapp}/>
            <Route path="/continue/msc" component={buttonmsc}/>
            <Route path="/master/cred" component={master}/>
            <Route path="/select" component={watch}/>
 		<Route path="/application" component={appform}/>
                <Route path="/userpanel" component={springboot}/>
                <Route path="/logine" component={Loginemail}/>
		<Route path="/404" component={error}/>











        </Router>
    );
}
