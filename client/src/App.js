import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";
import Chat from "./Chat";
import Logout from "./Logout";
import History from "./History";

export default function App() {
    return (
        <Router>
            <Switch>
                <Route path="/login">
                    <Login/>
                </Route>
                <Route path="/signup">
                    <SignUp/>
                </Route>
                <Route path="/logout">
                    <Logout/>
                </Route>
                <Route path="/history">
                    <History/>
                </Route>
                <Route path="/">
                    <Chat/>
                </Route>
            </Switch>
        </Router>
    )
}
