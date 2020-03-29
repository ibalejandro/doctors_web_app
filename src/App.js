import React from 'react';
import './App.css';

import {
    BrowserRouter as Router, Route
} from "react-router-dom"

import Reports from "./containers/Reports/Reports"
import Login from "./containers/Login/Login"
import CaseDetail from "./containers/CaseDetail/CaseDetail";
import VideoCall from "./containers/VideoCall/VideoCall"
import {useAuth0} from "./shared/Auth";
import NavBar from "./components/NavBar/NavBar";


function App() {

    const {loading} = useAuth0()

    if(loading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <Router>
                <Route path={"/"}>
                    <NavBar/>
                </Route>
                <Route path={"/login"} exact>
                    <Login/>
                </Route>
                <Route path={"/reports"} exact>
                    <Reports/>
                </Route>
                <Route path={"/cases/:id"} exact>
                    <CaseDetail/>
                </Route>
                <Route path={"/videocall"} exact>
                    <VideoCall/>
                </Route>
            </Router>
        </div>
    );
}

export default App;
