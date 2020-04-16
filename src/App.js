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


function App() {

    const {loading} = useAuth0()

    if (loading) {
        return <div>Cargando...</div>
    }

    return (
        <div>
            <Router>
                <PrivateRoute path={"/"}>
                    <NavBar/>
                </PrivateRoute>
                <PrivateRoute path={"/reports"} exact>
                    <Reports/>
                </PrivateRoute>
                <PrivateRoute path={"/reports/:id"} exact>
                    <CaseDetail/>
                </PrivateRoute>
            </Router>
        </div>
    );
}

export default App;
