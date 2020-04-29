import React from 'react';
import './App.css';

import {
    BrowserRouter as Router
} from "react-router-dom"

import Reports from "./containers/Reports/Reports"
import CaseDetail from "./containers/CaseDetail/CaseDetail";
import {useAuth0} from "./shared/Auth";
import NavBar from "./components/NavBar/NavBar";
import PrivateRoute from "./shared/PrivateRoute";
import {Route, Switch} from "react-router";
import Logout from "./containers/Logout/Logout";
import DoctorRegistration from "./containers/DoctorRegistration/DoctorRegistration";
import Landing from "./containers/Landing/Landing";

function App() {

    const {loading} = useAuth0()

    if (loading) {
        return <div>Cargando...</div>
    }

    return (
        <div>
            <Router>
                <Switch>
                    <Route path={"/"} exact>
                        <Landing/>
                    </Route>
                    <PrivateRoute path={"/reports"} exact>
                        <NavBar/>
                        <Reports/>
                    </PrivateRoute>
                    <PrivateRoute path={"/reports/:id"} exact>
                        <NavBar/>
                        <CaseDetail/>
                    </PrivateRoute>
                    <PrivateRoute path={"/logout"} exact>
                        <Logout/>
                    </PrivateRoute>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
